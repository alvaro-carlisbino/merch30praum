import { STORE_POLICY } from "@/lib/shop/official-store";

export function PromoBanner() {
  return (
    <div className="w-full px-4 py-3 text-center" style={{ background: "#ede4d6", color: "#0f0f0e" }}>
      <p className="text-sm">
        Loja oficial · {STORE_POLICY.shipping.toLowerCase()} · troca em até 7 dias após a entrega
      </p>
    </div>
  );
}
