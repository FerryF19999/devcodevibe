export const CODEX_TOKEN_RATES = {
  "gpt-5.5": { input: 125, cachedInput: 12.5, output: 750 },
  "gpt-5.4": { input: 62.5, cachedInput: 6.25, output: 375 },
  "gpt-5.4-mini": { input: 18.75, cachedInput: 1.875, output: 113 },
  "gpt-5.3-codex": { input: 43.75, cachedInput: 4.375, output: 350 },
} as const;

export type TokenUsageModel = keyof typeof CODEX_TOKEN_RATES;

type TokenUsageInput = {
  model: TokenUsageModel;
  totalInputTokens: number;
  cachedInputTokens: number;
  outputTokens: number;
  multiplier?: number;
};

const GPT_5_5_INPUT_RATE = CODEX_TOKEN_RATES["gpt-5.5"].input;

/**
 * Normalizes actual usage into GPT-5.5-equivalent weighted tokens.
 * `totalInputTokens` includes cached input, matching API usage payloads.
 */
export function calculateWeightedTokenUsage({
  model,
  totalInputTokens,
  cachedInputTokens,
  outputTokens,
  multiplier = 1,
}: TokenUsageInput) {
  const rate = CODEX_TOKEN_RATES[model];
  const cached = Math.max(0, Math.min(totalInputTokens, cachedInputTokens));
  const uncached = Math.max(0, totalInputTokens - cached);
  const weightedTokens =
    ((uncached * rate.input + cached * rate.cachedInput + Math.max(0, outputTokens) * rate.output) /
      GPT_5_5_INPUT_RATE) *
    Math.max(0, multiplier);

  return {
    rawWeightedTokens: weightedTokens,
    chargedWeightedTokens: Math.ceil(weightedTokens),
    display:
      weightedTokens >= 1_000_000
        ? `${(weightedTokens / 1_000_000).toFixed(2)}M`
        : `${Math.ceil(weightedTokens / 1_000)}K`,
  };
}
