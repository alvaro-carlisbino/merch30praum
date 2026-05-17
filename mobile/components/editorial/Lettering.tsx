import { Image, type ImageContentFit } from "expo-image";

const SOURCES = {
  matue: require("@/assets/letterings/name-matue.svg"),
  wiu: require("@/assets/letterings/name-wiu.svg"),
  teto: require("@/assets/letterings/name-teto.svg"),
  brandao: require("@/assets/letterings/name-brandao.svg"),
  "30praum": require("@/assets/letterings/name-30praum.svg"),
} as const;

const ASPECT: Record<keyof typeof SOURCES, number> = {
  matue: 1,
  wiu: 1,
  teto: 1,
  brandao: 3.0,
  "30praum": 1.319,
};

interface Props {
  artist: keyof typeof SOURCES;
  width: number;
  tint?: string;
  contentFit?: ImageContentFit;
}

export function Lettering({ artist, width, tint = "#F5F0E8", contentFit = "contain" }: Props) {
  const height = width / ASPECT[artist];
  return (
    <Image
      source={SOURCES[artist]}
      style={{ width, height, tintColor: tint }}
      contentFit={contentFit}
    />
  );
}
