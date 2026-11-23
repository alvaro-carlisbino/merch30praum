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
 * Cliente das leituras de conteúdo. O conteúdo revisado vive nos registries; o banco só
 * volta a ser a fonte com CMS_CONTENT_ENABLED=1, depois de sincronizado.
 */
export function getContentClient(): Promise<Payload> {
  if (process.env.CMS_CONTENT_ENABLED !== "1") {
    return Promise.reject(new Error("conteúdo servido pelos registries"));
  }
  return getPayloadClient();
}
