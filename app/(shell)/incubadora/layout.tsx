import type { ReactNode } from "react";

export default function IncubadoraLayout({ children }: { children: ReactNode }) {
  return <div data-theme="incubadora">{children}</div>;
}
