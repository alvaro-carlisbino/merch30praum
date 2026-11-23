import { normalize } from "@/lib/mural/normalize";

export const TERMS_VERSION = "2026-11";
export const MIN_AGE = 13;
export const UFS = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];

export const nicknameKey = (nickname: string) => normalize(nickname).replace(/\s/g, "");

export function ageOn(birth: Date, today: Date): number {
  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const m = today.getUTCMonth() - birth.getUTCMonth();
  if (m < 0 || (m === 0 && today.getUTCDate() < birth.getUTCDate())) age -= 1;
  return age;
}
