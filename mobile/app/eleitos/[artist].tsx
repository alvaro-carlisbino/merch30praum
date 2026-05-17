import { useEffect, useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, Play, Music, Instagram } from "lucide-react-native";
import * as Haptics from "expo-haptics";

import { ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { ARTIST_THEMES, useTheme } from "@/lib/theme";

export default function EleitosScreen() {
  const { artist } = useLocalSearchParams<{ artist: string }>();
  const insets = useSafeAreaInsets();
  const setActive = useTheme((s) => s.setActive);

  const slug = (artist as ArtistSlug) || "matue";
  const config = useMemo(() => ARTISTS[slug] ?? ARTISTS.matue, [slug]);
  const tokens = ARTIST_THEMES[slug] ?? ARTIST_THEMES.matue;

  useEffect(() => {
    setActive(slug);
  }, [slug, setActive]);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={{ height: 560, position: "relative" }}>
          <Image
            source={{ uri: config.heroImage }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "transparent", tokens.bg]}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            locations={[0, 0.45, 1]}
          />
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={{
              position: "absolute",
              top: insets.top + 12,
              right: 18,
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderWidth: 1,
              borderColor: "rgba(245,240,232,0.2)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} color={tokens.fg} strokeWidth={1.6} />
          </Pressable>

          <View style={{ position: "absolute", bottom: 24, left: 20, right: 20 }}>
            <Text style={{ color: tokens.accent, fontFamily: "Cinzel-700", fontSize: 11, letterSpacing: 3 }}>
              ELEITOS DA CASA · {config.origin.toUpperCase()}
            </Text>
            <Text
              style={{
                color: tokens.fg,
                fontFamily: tokens.displayFont,
                fontSize: 88,
                lineHeight: 90,
                marginTop: 6,
                letterSpacing: -1,
              }}
            >
              {config.displayName}
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "CormorantGaramond-500-Italic",
                fontSize: 16,
                marginTop: 8,
                lineHeight: 22,
              }}
            >
              “{config.signatureLyric}”
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: -20 }}>
          <View
            style={{
              padding: 20,
              borderRadius: 18,
              backgroundColor: "rgba(0,0,0,0.4)",
              borderWidth: 1,
              borderColor: tokens.border,
            }}
          >
            <Text style={{ color: tokens.accent, fontFamily: "Cinzel-700", fontSize: 10, letterSpacing: 2.5 }}>
              {config.drop.statusLabel.toUpperCase()}
            </Text>
            <Text
              style={{
                color: tokens.fg,
                fontFamily: "BebasNeue-400",
                fontSize: 36,
                marginTop: 4,
                letterSpacing: 1,
              }}
            >
              {config.universeName}
            </Text>
            <Text
              style={{
                color: "rgba(245,240,232,0.7)",
                fontFamily: "Inter-400",
                fontSize: 13,
                lineHeight: 19,
                marginTop: 8,
              }}
            >
              {config.manifesto}
            </Text>
          </View>
        </View>

        <SectionTitle accent={tokens.accent}>ÁLBUM · {config.album.year}</SectionTitle>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <Image
              source={{ uri: config.album.coverImage }}
              style={{ width: 110, height: 110, borderRadius: 8, backgroundColor: "#111" }}
              contentFit="cover"
            />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  color: tokens.fg,
                  fontFamily: "BebasNeue-400",
                  fontSize: 30,
                  letterSpacing: 1,
                }}
              >
                {config.album.title}
              </Text>
              <Text
                style={{ color: "rgba(245,240,232,0.65)", fontFamily: "Inter-400", fontSize: 12, marginTop: 4 }}
                numberOfLines={3}
              >
                {config.album.tagline}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 18, gap: 8 }}>
            {config.album.highlightedTracks.slice(0, 5).map((track, i) => (
              <View
                key={track}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                <Text
                  style={{
                    color: "rgba(245,240,232,0.4)",
                    fontFamily: "Cinzel-500",
                    fontSize: 12,
                    width: 22,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text style={{ flex: 1, color: tokens.fg, fontFamily: "Inter-600", fontSize: 13 }}>
                  {track}
                </Text>
                <Pressable
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {})}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: tokens.accent,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Play size={14} color="#0a0a0a" fill="#0a0a0a" />
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        <SectionTitle accent={tokens.accent}>BIO</SectionTitle>
        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {config.bioParagraphs.map((p, i) => (
            <Text
              key={i}
              style={{ color: "rgba(245,240,232,0.78)", fontFamily: "Inter-400", fontSize: 13, lineHeight: 20 }}
            >
              {p}
            </Text>
          ))}
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
              router.back();
              setTimeout(() => router.push("/loja" as never), 250);
            }}
            style={{
              padding: 18,
              borderRadius: 12,
              backgroundColor: tokens.accent,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#0a0a0a",
                fontFamily: "Cinzel-700",
                fontSize: 12,
                letterSpacing: 2.5,
              }}
            >
              VER COLEÇÃO {config.universeName.toUpperCase()} →
            </Text>
          </Pressable>

          <View style={{ flexDirection: "row", justifyContent: "center", gap: 18, marginTop: 22 }}>
            <Pressable
              hitSlop={10}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                borderWidth: 1,
                borderColor: tokens.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Music size={16} color={tokens.fg} strokeWidth={1.6} />
            </Pressable>
            <Pressable
              hitSlop={10}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                borderWidth: 1,
                borderColor: tokens.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Instagram size={16} color={tokens.fg} strokeWidth={1.6} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SectionTitle({ children, accent }: { children: string; accent: string }) {
  return (
    <Text
      style={{
        color: accent,
        fontFamily: "Cinzel-700",
        fontSize: 11,
        letterSpacing: 3,
        marginTop: 32,
        marginBottom: 14,
        paddingHorizontal: 20,
      }}
    >
      {children}
    </Text>
  );
}
