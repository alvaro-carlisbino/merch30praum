import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/fans/session";
import { isFanLoginEnabled } from "@/lib/fans/shopify-auth";
import { getPayloadClient, getViewer } from "@/lib/mural/server";
import type { MuralViewer } from "@/lib/mural/types";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
const ANON: MuralViewer = { name: null, badge: "fan", isMod: false, fan: null, loginAvailable: isFanLoginEnabled };

// Quem está olhando. Sem cookie de conta responde sem carregar o Payload.
export async function GET(req: NextRequest) {
  if (!req.cookies.has("payload-token") && !req.cookies.has(SESSION_COOKIE)) return NextResponse.json(ANON, { headers: NO_STORE });
  try {
    const payload = await getPayloadClient();
    const { name, badge, isMod, fan } = await getViewer(payload, req.headers);
    const publicFan = fan
      ? { nickname: fan.nickname, needsProfile: fan.needsProfile, fullName: fan.fullName, city: fan.city, state: fan.state, phone: fan.phone }
      : null;
    return NextResponse.json({ name, badge, isMod, fan: publicFan, loginAvailable: isFanLoginEnabled } satisfies MuralViewer, {
      headers: NO_STORE,
    });
  } catch {
    return NextResponse.json(ANON, { headers: NO_STORE });
  }
}
