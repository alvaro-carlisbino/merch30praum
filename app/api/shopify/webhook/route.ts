import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "crypto";

// Webhook da Shopify (Configurações → Notificações → Webhooks, formato JSON).
// Tópicos úteis: products/create, products/update, products/delete e
// inventory_levels/update. Qualquer um deles derruba o cache de produtos,
// então preço e estoque aparecem no site no próximo acesso.
const HANDLED_TOPICS = new Set([
  "products/create",
  "products/update",
  "products/delete",
  "inventory_levels/update",
  "collections/update",
]);

function validSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  // Compara a string base64 inteira: o decoder do Node ignora lixo no fim do header.
  const expected = Buffer.from(createHmac("sha256", secret).update(rawBody, "utf8").digest("base64"));
  const received = Buffer.from(header);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function POST(req: NextRequest) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "webhook not configured" }, { status: 503 });
  }
  // A assinatura é calculada sobre o corpo cru, então ler como texto antes de qualquer parse.
  const rawBody = await req.text();
  if (!validSignature(rawBody, req.headers.get("x-shopify-hmac-sha256"), secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const topic = req.headers.get("x-shopify-topic") ?? "";
  if (!HANDLED_TOPICS.has(topic)) {
    // 200 para a Shopify não ficar reenviando um tópico que não usamos.
    return NextResponse.json({ ok: true, ignored: topic });
  }
  // Expira na hora (padrão recomendado pelo Next para webhooks de terceiros).
  revalidateTag("products", { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: "products", topic });
}
