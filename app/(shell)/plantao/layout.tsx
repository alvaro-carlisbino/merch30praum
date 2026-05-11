import type { ReactNode } from "react";

export default function PlantaoLayout({ children }: { children: ReactNode }) {
  return <div data-theme="plantao">{children}</div>;
}
