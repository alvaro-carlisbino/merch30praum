import "server-only";
import { createHash } from "node:crypto";

export const MAX_BODY = 280;
export const MAX_NICK = 24;
export const ROOM_RE = /^(album|show|news|drop)-[a-z0-9-]{1,60}$/;

// Palavrão faz parte da linguagem do rap e passa. O que barra é ofensa
// racista, homofóbica, transfóbica e capacitista, além de link (spam e golpe).
// Lista curta de propósito: na versão final ela fica editável no CMS.
const BLOCKED = [
  "macaco",
  "macaca",
  "crioulo",
  "neguinho de merda",
  "viado",
  "veado",
  "bicha",
  "sapatao",
  "traveco",
  "retardado",
  "mongol",
  "aleijado",
  "nazista",
  "heil",
];

const LINK_RE = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|br|io|xyz|me|ly|gg|link|site|shop|app)\b)/i;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[4@]/g, "a")
    .replace(/3/g, "e")
    .replace(/[1!]/g, "i")
    .replace(/0/g, "o")
    .replace(/\$/g, "s")
    .replace(/[^a-z\s]/g, " ")
    .replace(/(.)\1{2,}/g, "$1")
    .replace(/\s+/g, " ");
}

function hasBlocked(text: string): boolean {
  const norm = ` ${normalize(text)} `;
  const squashed = norm.replace(/\s/g, "");
  return BLOCKED.some((word) => norm.includes(` ${word} `) || (word.length >= 6 && squashed.includes(word.replace(/\s/g, ""))));
}

export function cleanText(raw: unknown, max: number): string {
  return String(raw ?? "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F​-‏‪-‮]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, max);
}

export type Verdict = { ok: true } | { ok: false; reason: string };

export function moderate(nickname: string, body: string): Verdict {
  if (nickname.length < 2) return { ok: false, reason: "Escolha um apelido com pelo menos 2 letras." };
  if (!body) return { ok: false, reason: "Escreve alguma coisa antes de mandar." };
  if (LINK_RE.test(body) || LINK_RE.test(nickname)) {
    return { ok: false, reason: "Link não passa no mural." };
  }
  if (hasBlocked(nickname) || hasBlocked(body)) {
    return { ok: false, reason: "Esse recado não passou na moderação." };
  }
  const letters = body.replace(/[^a-zA-ZÀ-ÿ]/g, "");
  if (letters.length >= 12 && letters === letters.toUpperCase() && body.length > 60) {
    return { ok: false, reason: "Menos caps lock, mais recado." };
  }
  return { ok: true };
}

// Hash anônimo do IP: dá para limitar spam sem guardar o IP de ninguém.
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
