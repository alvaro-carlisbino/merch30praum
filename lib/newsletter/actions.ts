"use server";
import { getPayloadClient } from "@/lib/payload/client";

export type SubscribeStatus = "idle" | "ok" | "invalid" | "unavailable";
export type SubscribeState = { status: SubscribeStatus };
export type SubscribeSource = "home" | "loja" | "plantao" | "other";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCES = new Set<SubscribeSource>(["home", "loja", "plantao", "other"]);

export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  if (formData.get("website")) return { status: "ok" };
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const rawSource = String(formData.get("source") ?? "home");
  const source: SubscribeSource = SOURCES.has(rawSource as SubscribeSource)
    ? (rawSource as SubscribeSource)
    : "other";
  if (!EMAIL_RE.test(email) || email.length > 120) return { status: "invalid" };
  try {
    const payload = await getPayloadClient();
    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
    });
    if (!existing.docs.length) {
      await payload.create({
        collection: "subscribers",
        data: { email, source, consent: true },
      });
    }
    return { status: "ok" };
  } catch (err) {
    console.error("[newsletter] falha ao salvar inscrição", err);
    return { status: "unavailable" };
  }
}
