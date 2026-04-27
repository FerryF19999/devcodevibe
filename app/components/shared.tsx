import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="vwc-sec-label">{children}</div>;
}

export function Hairline() {
  return <div className="vwc-hairline" />;
}
