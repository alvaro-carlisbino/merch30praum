import type { ReactNode } from "react";

export default function SaborLayout({ children }: { children: ReactNode }) {
  return <div data-theme="sabor">{children}</div>;
}
