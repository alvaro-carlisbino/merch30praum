import "server-only";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";
let cached: Promise<Payload> | null = null;
export function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}

/**
 * Cliente usado nas leituras de conteúdo. Na versão ?visual=editado o conteúdo vem
 * dos registries revisados: o erro cai no fallback estático de cada leitor em lib/cms.
 */
export function getContentClient(): Promise<Payload> {
  if (process.env.VISUAL_EDITADO === "1") {
    return Promise.reject(new Error("visual editado usa conteúdo estático"));
  }
  return getPayloadClient();
}
