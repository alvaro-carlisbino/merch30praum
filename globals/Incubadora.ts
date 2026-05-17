import type { GlobalConfig } from "payload";
import {
  safeRevalidatePath as revalidatePath,
  safeRevalidateTag as revalidateTag,
} from "@/lib/cms/revalidate";

export const Incubadora: GlobalConfig = {
  slug: "incubadora",
  label: "Incubadora",
  access: { read: () => true },
  hooks: {
    afterChange: [
      () => {
        revalidateTag("incubadora", "default");
        revalidatePath("/incubadora");
        revalidatePath("/incubadora/submeter");
      },
    ],
  },
  fields: [
    { name: "programName", type: "text", required: true },
    { name: "shortTagline", type: "textarea", required: true },
    {
      name: "manifesto",
      type: "array",
      required: true,
      fields: [{ name: "paragraph", type: "textarea", required: true }],
    },
    {
      name: "howItWorks",
      type: "array",
      required: true,
      fields: [
        { name: "step", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "casesOfSuccess",
      type: "array",
      required: true,
      fields: [
        {
          name: "artistSlug",
          type: "select",
          required: true,
          options: [
            { label: "Matuê", value: "matue" },
            { label: "Wiu", value: "wiu" },
            { label: "Teto", value: "teto" },
            { label: "Brandão85", value: "brandao" },
          ],
        },
        { name: "displayName", type: "text", required: true },
        { name: "joinedYear", type: "number", required: true },
        { name: "excerpt", type: "textarea", required: true },
        { name: "image", type: "text", required: true },
      ],
    },
    {
      name: "whatWeLookFor",
      type: "array",
      required: true,
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "whatWeDontLookFor",
      type: "array",
      required: true,
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "formFields",
      type: "group",
      fields: [
        { name: "submissionUrl", type: "text" },
        { name: "contactEmail", type: "text", required: true },
      ],
    },
  ],
};
