import { revalidatePath as nextRevalidatePath, revalidateTag as nextRevalidateTag } from "next/cache";

export function safeRevalidateTag(tag: string, profile: string = "default") {
  try {
    nextRevalidateTag(tag, profile);
  } catch {}
}

export function safeRevalidatePath(path: string) {
  try {
    nextRevalidatePath(path);
  } catch {}
}
