"use server";
import { getPayloadClient } from "@/lib/payload/client";

export type SubmitStatus = "idle" | "ok" | "invalid" | "unavailable";
export type SubmitState = { status: SubmitStatus; message?: string };

const SPOTIFY_RE = /^https?:\/\/open\.spotify\.com\/(artist|track|album)\//i;
const SOUNDCLOUD_RE = /^https?:\/\/(www\.|on\.)?soundcloud\.com\//i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GENRES = new Set(["trap", "rap", "hiphop", "funk", "drill", "rnb", "other"]);

function text(formData: FormData, key: string, max: number): string {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

export async function submitDemo(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  if (formData.get("website")) return { status: "ok" };

  const artistName = text(formData, "artistName", 80);
  const email = text(formData, "email", 120).toLowerCase();
  const instagram = text(formData, "instagram", 60).replace(/^@/, "");
  const spotifyUrl = text(formData, "spotifyUrl", 300);
  const soundcloudUrl = text(formData, "soundcloudUrl", 300);
  const genre = text(formData, "genre", 20);
  const origin = text(formData, "origin", 60);
  const ageRaw = text(formData, "age", 3);
  const story = text(formData, "story", 500);
  const terms = formData.get("terms");

  if (!artistName) return { status: "invalid", message: "Falta o nome artístico." };
  if (!EMAIL_RE.test(email)) return { status: "invalid", message: "Confere o email." };
  if (!SPOTIFY_RE.test(spotifyUrl))
    return { status: "invalid", message: "URL Spotify inválida. Cola o link completo (open.spotify.com)." };
  if (soundcloudUrl && !SOUNDCLOUD_RE.test(soundcloudUrl))
    return { status: "invalid", message: "URL SoundCloud inválida." };
  if (!GENRES.has(genre)) return { status: "invalid", message: "Escolhe um gênero." };
  if (story.length < 20) return { status: "invalid", message: "Conta um pouco mais na história (mínimo 20 caracteres)." };
  if (!terms) return { status: "invalid", message: "Precisa aceitar o uso dos dados pra A&R." };

  const age = ageRaw ? Number(ageRaw) : undefined;

  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "submissions",
      data: {
        artistName,
        email,
        instagram: instagram || undefined,
        spotifyUrl,
        soundcloudUrl: soundcloudUrl || undefined,
        genre,
        origin: origin || undefined,
        age: age && Number.isFinite(age) ? age : undefined,
        story,
        status: "new",
      },
    });
    return { status: "ok" };
  } catch (err) {
    console.error("[incubadora] falha ao salvar candidatura", err);
    return { status: "unavailable", message: "Não deu pra salvar agora. Tenta de novo em instantes." };
  }
}
