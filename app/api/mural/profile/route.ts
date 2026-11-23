import { NextResponse, type NextRequest } from "next/server";
import { MIN_AGE, TERMS_VERSION, UFS, ageOn, nicknameKey } from "@/lib/fans/profile";
import { isSameOrigin } from "@/lib/fans/session";
import { MAX_NICK, checkNickname, cleanText } from "@/lib/mural/moderation";
import { getPayloadClient, getViewer } from "@/lib/mural/server";

export const dynamic = "force-dynamic";

const bad = (error: string, field: string) => NextResponse.json({ error, field }, { status: 422 });

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req.headers)) return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  try {
    const payload = await getPayloadClient();
    const viewer = await getViewer(payload, req.headers);
    if (!viewer.fan) return NextResponse.json({ error: "Entre com sua conta primeiro.", code: "login" }, { status: 401 });

    // Apelido definido não muda por aqui: trocar de nome não pode virar fuga de moderação.
    const nickname = viewer.fan.nickname ?? cleanText(input.nickname, MAX_NICK).replace(/\n/g, " ");
    const nick = checkNickname(nickname, false);
    if (!nick.ok) return bad(nick.reason, "nickname");

    const fullName = cleanText(input.fullName, 80).replace(/\n/g, " ");
    const parts = fullName.split(" ").filter(Boolean);
    if (parts.length < 2) return bad("Coloca nome e sobrenome.", "fullName");

    const birthRaw = String(input.birthDate ?? "");
    const birth = /^\d{4}-\d{2}-\d{2}$/.test(birthRaw) ? new Date(`${birthRaw}T00:00:00.000Z`) : null;
    if (!birth || Number.isNaN(birth.getTime()) || birth.toISOString().slice(0, 10) !== birthRaw) {
      return bad("Data de nascimento inválida.", "birthDate");
    }
    const age = ageOn(birth, new Date());
    if (age < 0 || age > 120) return bad("Data de nascimento inválida.", "birthDate");
    if (age < MIN_AGE) return bad(`O chat é para maiores de ${MIN_AGE} anos.`, "birthDate");

    const city = cleanText(input.city, 80).replace(/\n/g, " ");
    if (city.length < 2) return bad("Coloca sua cidade.", "city");
    const state = String(input.state ?? "").toUpperCase();
    if (!UFS.includes(state)) return bad("Escolhe seu estado.", "state");

    const phoneRaw = cleanText(input.phone, 24);
    const digits = phoneRaw.replace(/\D/g, "");
    if (phoneRaw && (digits.length < 10 || digits.length > 13)) return bad("Celular inválido.", "phone");
    if (input.accept !== true) return bad("Aceite as regras para entrar no chat.", "accept");

    const key = nicknameKey(nickname);
    const taken = await payload.find({
      collection: "fans",
      where: { and: [{ nicknameKey: { equals: key } }, { id: { not_equals: viewer.fan.id } }] },
      limit: 1,
      depth: 0,
      pagination: false,
      overrideAccess: true,
      select: { nicknameKey: true },
    });
    if (taken.docs.length) return bad("Esse apelido já tem dono.", "nickname");

    try {
      await payload.update({
        collection: "fans",
        id: viewer.fan.id,
        data: {
          nickname,
          nicknameKey: key,
          firstName: parts[0],
          lastName: parts.slice(1).join(" "),
          birthDate: birth.toISOString(),
          city,
          state,
          ...(phoneRaw ? { phone: phoneRaw } : {}),
          acceptedTermsAt: new Date().toISOString(),
          termsVersion: TERMS_VERSION,
        },
        depth: 0,
        overrideAccess: true,
      });
    } catch {
      // Dois fãs pedindo o mesmo apelido ao mesmo tempo: o índice único decide.
      return bad("Esse apelido já tem dono.", "nickname");
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[fans] falha ao salvar cadastro", err);
    return NextResponse.json({ error: "Não deu para salvar agora." }, { status: 503 });
  }
}
