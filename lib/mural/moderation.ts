import "server-only";
import { createHash } from "node:crypto";

export const MAX_BODY = 280;
export const MAX_NICK = 24;
export const ROOM_RE = /^(geral|(album|show|news|drop)-[a-z0-9-]{1,60})$/;

// Palavrão faz parte da linguagem do rap e passa. O que barra:
// ódio (raça, gênero, sexualidade, deficiência), conteúdo sexual explícito,
// abuso, incentivo a se machucar, venda de conteúdo e golpe.
const HATE = [
  "macaco", "macaca", "crioulo", "negrinho de merda", "preto imundo", "senzala",
  "viado", "veado", "bicha", "sapatao", "traveco", "boiola", "baitola",
  "retardado", "mongol", "aleijado", "nazista", "nazismo", "heil", "hitler",
  "nordestino burro", "paraiba burro", "baiano preguicoso",
];
const SEXUAL = [
  "buceta", "boceta", "xoxota", "xereca", "piroca", "pirocao", "punheta", "siririca",
  "boquete", "chupa meu", "chupar meu", "gozar", "gozei", "gozada", "porno", "xvideos",
  "pornhub", "nudes", "manda nude", "pack do pe", "vendo pack", "onlyfans", "privacy",
  "sexo", "transar", "fuder voce", "te comer", "rabuda", "peituda",
];
const ABUSE = [
  "pedofil", "estupr", "abuso sexual", "menor de idade nua", "cp ",
  "se mata", "vai se matar", "se matar", "kys", "suicida", "morre logo",
  "vou te matar", "vou te achar", "sei onde voce mora",
];
const SCAM = ["pix pra", "chave pix", "ganhe dinheiro", "renda extra", "bet", "blaze", "tigrinho", "fortune tiger"];

const RESERVED_NICKS = [
  "30praum", "trintapraum", "matue", "wiu", "teto", "brandao", "brandao85",
  "admin", "adm", "moderador", "moderacao", "mod", "equipe", "oficial", "suporte", "staff",
];

const LINK_RE = /(https?:\/\/|www\.|\b[a-z0-9-]+\s?\.\s?(com|net|org|br|io|xyz|me|ly|gg|link|site|shop|app|tv|bio|cc)\b)/i;
const EMAIL_RE = /[a-z0-9._%+-]+\s?@\s?[a-z0-9.-]+\.[a-z]{2,}/i;
const HANDLE_RE = /(^|\s)@[a-z0-9._]{3,}/i;
// Telefone, CPF e afins: qualquer sequência longa de dígitos, com ou sem pontuação.
const DIGITS_RE = /(\d[\s().-]*){8,}/;

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[4@]/g, "a")
    .replace(/3/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/0/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z\s]/g, " ")
    .replace(/(.)\1{2,}/g, "$1$1")
    .replace(/(.)\1/g, "$1")
    .replace(/\s+/g, " ");
}

function contains(text: string, words: string[]): boolean {
  const norm = ` ${normalize(text)} `;
  const squashed = norm.replace(/\s/g, "");
  return words.some((raw) => {
    const w = normalize(raw).trim();
    if (!w) return false;
    if (norm.includes(` ${w} `) || norm.includes(` ${w}`) && w.length >= 5) return true;
    return w.replace(/\s/g, "").length >= 6 && squashed.includes(w.replace(/\s/g, ""));
  });
}

export function cleanText(raw: unknown, max: number): string {
  return String(raw ?? "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F​-‏‪-‮⁠-⁯﻿]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, max);
}

export type Verdict = { ok: true } | { ok: false; reason: string; code: string };

export function checkNickname(nickname: string, isStaff: boolean): Verdict {
  if (nickname.length < 2) return { ok: false, code: "nick", reason: "Escolha um apelido com pelo menos 2 letras." };
  if (LINK_RE.test(nickname) || EMAIL_RE.test(nickname) || DIGITS_RE.test(nickname)) {
    return { ok: false, code: "nick", reason: "Apelido não pode ter link, e-mail ou número de telefone." };
  }
  if (contains(nickname, [...HATE, ...SEXUAL, ...ABUSE])) {
    return { ok: false, code: "nick", reason: "Esse apelido não passa. Escolhe outro." };
  }
  if (!isStaff) {
    const squashed = normalize(nickname).replace(/\s/g, "");
    const hit = RESERVED_NICKS.some((r) =>
      r.length < 5 ? squashed === r || squashed === `${r}oficial` : squashed.includes(r),
    );
    if (hit) {
      return { ok: false, code: "nick", reason: "Esse nome é reservado para os artistas e a equipe." };
    }
  }
  return { ok: true };
}

export function checkBody(body: string, extraBlocked: string[] = []): Verdict {
  if (!body) return { ok: false, code: "empty", reason: "Escreve alguma coisa antes de mandar." };
  if (LINK_RE.test(body)) return { ok: false, code: "link", reason: "Link não passa no chat." };
  if (EMAIL_RE.test(body) || DIGITS_RE.test(body)) {
    return { ok: false, code: "privacy", reason: "Não compartilha telefone, e-mail ou documento aqui. É pra sua segurança." };
  }
  if (HANDLE_RE.test(body)) return { ok: false, code: "handle", reason: "Divulgação de perfil não passa no chat." };
  if (contains(body, SEXUAL)) return { ok: false, code: "nsfw", reason: "Conteúdo sexual não passa no chat." };
  if (contains(body, ABUSE)) return { ok: false, code: "abuse", reason: "Esse recado não passa. Se você precisa de ajuda, liga 188 (CVV)." };
  if (contains(body, HATE) || contains(body, extraBlocked)) return { ok: false, code: "hate", reason: "Esse recado não passou na moderação." };
  if (contains(body, SCAM)) return { ok: false, code: "scam", reason: "Promoção, aposta e pedido de Pix não passam no chat." };
  const letters = body.replace(/[^a-zA-ZÀ-ÿ]/g, "");
  if (letters.length >= 20 && letters === letters.toUpperCase()) {
    return { ok: false, code: "caps", reason: "Menos caps lock, mais recado." };
  }
  if (/(.)\1{9,}/u.test(body)) return { ok: false, code: "flood", reason: "Sem flood de letra repetida." };
  return { ok: true };
}

// Hash anônimo do IP + navegador: dá para limitar spam e banir sem guardar IP.
export function fingerprintFrom(headers: Headers): string {
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "local";
  return createHash("sha256")
    .update(`${ip}|${process.env.PAYLOAD_SECRET ?? "mural"}`)
    .digest("hex")
    .slice(0, 24);
}

export const RATE = { minGapMs: 3_000, perMinute: 8 };
