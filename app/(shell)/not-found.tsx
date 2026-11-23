import { NotFoundContent } from "@/components/shell/NotFoundContent";

export const metadata = {
  title: { absolute: "Página não encontrada" },
  description: "A rota que você buscou não existe.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
