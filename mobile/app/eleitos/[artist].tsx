import { useEffect } from "react";
import { ActivityIndicator, Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, Play } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";

import { ARTISTS } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { ARTIST_THEMES, useTheme } from "@/lib/theme";
import { useArtist } from "@/lib/cms/queries";

import { Lettering } from "@/components/editorial/Lettering";
import { Display, Eyebrow, PullQuote, DropCap, Divider, scaleType } from "@/components/editorial/Display";
import { MarqueeText } from "@/components/editorial/MarqueeText";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function EleitosScreen() {
  const { artist } = useLocalSearchParams<{ artist: string }>();
  const insets = useSafeAreaInsets();
  const setActive = useTheme((s) => s.setActive);

  const slug = (artist as ArtistSlug) || "matue";
  const { data: fetched, isPending } = useArtist(slug);
  const config = fetched ?? ARTISTS[slug] ?? ARTISTS.matue;
  const tokens = ARTIST_THEMES[slug] ?? ARTIST_THEMES.matue;

  useEffect(() => {
    setActive(slug);
  }, [slug, setActive]);

  if (isPending && !fetched) {
    return (
      <View style={{ flex: 1, backgroundColor: tokens.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="small" color={tokens.accent} />
      </View>
    );
  }

  const heroHeight = Math.max(580, SCREEN_HEIGHT * 0.82);
  const letteringWidth = Math.min(SCREEN_WIDTH * 0.78, 360);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* CINEMATIC HERO */}
        <View style={{ height: heroHeight, width: "100%", position: "relative", backgroundColor: tokens.bg }}>
          <Image source={{ uri: config.heroImage }} style={{ position: "absolute", inset: 0 } as never} contentFit="cover" />
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.0)", "rgba(0,0,0,0.55)", tokens.bg]}
            locations={[0, 0.35, 0.78, 1]}
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          />

          <Pressable
            onPress={() => router.back()}
            hitSlop={14}
            style={{
              position: "absolute",
              top: insets.top + 16,
              right: 18,
              width: 38,
              height: 38,
              borderWidth: 1,
              borderColor: "rgba(245,240,232,0.4)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="#F5F0E8" strokeWidth={1.5} />
          </Pressable>

          <View
            style={{
              position: "absolute",
              top: insets.top + 16,
              left: 24,
            }}
          >
            <Eyebrow color="#F5F0E8">ELEITOS DA CASA</Eyebrow>
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 80,
              left: 24,
              right: 24,
            }}
          >
            <Animated.View entering={FadeIn.duration(900)}>
              <Eyebrow color={tokens.accent}>{config.origin.toUpperCase()}</Eyebrow>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1100).delay(200)} style={{ marginTop: 16 }}>
              <Lettering artist={slug} width={letteringWidth} tint="#F5F0E8" />
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(1100).delay(450)} style={{ marginTop: 18, maxWidth: 320 }}>
              <Text
                style={{
                  color: "rgba(245,240,232,0.85)",
                  fontFamily: "CormorantGaramond-500-Italic",
                  fontSize: scaleType(20),
                  lineHeight: scaleType(20) * 1.3,
                }}
              >
                “{config.signatureLyric}”
              </Text>
            </Animated.View>
          </View>

          <View
            style={{
              position: "absolute",
              bottom: 24,
              left: 0,
              right: 0,
            }}
          >
            <MarqueeText
              text={`${config.universeName} ·  ${config.universeName} ·  `}
              durationMs={22000}
              style={{
                color: tokens.accent,
                fontFamily: "BebasNeue-400",
                fontSize: 24,
                letterSpacing: 3,
              }}
            />
          </View>
        </View>

        {/* DROP MANIFESTO */}
        <Animated.View entering={FadeInUp.duration(700)} style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <View style={{ height: 1, width: 32, backgroundColor: tokens.accent }} />
            <Text style={{ color: tokens.accent, fontFamily: "Cinzel-700", fontSize: 10, letterSpacing: 3 }}>
              {config.drop.statusLabel.toUpperCase()}
            </Text>
          </View>
          <Display size={48}>{config.universeName}</Display>
          {config.drop.chapterName ? (
            <Text
              style={{
                color: "rgba(245,240,232,0.55)",
                fontFamily: "CormorantGaramond-500-Italic",
                fontSize: 17,
                marginTop: 6,
              }}
            >
              {config.drop.chapterName}
            </Text>
          ) : null}
          <Text
            style={{
              color: "rgba(245,240,232,0.78)",
              fontFamily: "Inter-400",
              fontSize: scaleType(14),
              lineHeight: scaleType(14) * 1.55,
              marginTop: 18,
            }}
          >
            {config.manifesto}
          </Text>
        </Animated.View>

        <Divider color={tokens.border} margin={36} />

        {/* BIO COM DROP CAP */}
        <View style={{ paddingHorizontal: 24 }}>
          <Eyebrow color={tokens.accent}>BIO</Eyebrow>
          <View style={{ marginTop: 14 }}>
            {config.bioParagraphs.map((p, i) => (
              <View key={i} style={{ marginBottom: i < config.bioParagraphs.length - 1 ? 16 : 0 }}>
                {i === 0 ? (
                  <DropCap accent={tokens.accent2}>{p}</DropCap>
                ) : (
                  <Text
                    style={{
                      color: "rgba(245,240,232,0.78)",
                      fontFamily: "Inter-400",
                      fontSize: scaleType(14),
                      lineHeight: scaleType(14) * 1.55,
                    }}
                  >
                    {p}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <Divider color={tokens.border} margin={36} />

        {/* ALBUM */}
        <View style={{ paddingHorizontal: 24 }}>
          <Eyebrow color={tokens.accent}>ÁLBUM · {config.album.year}</Eyebrow>
          <Display size={42} style={{ marginTop: 6 }}>
            {config.album.title}
          </Display>
          {config.album.tagline ? (
            <Text
              style={{
                color: "rgba(245,240,232,0.6)",
                fontFamily: "CormorantGaramond-500-Italic",
                fontSize: 17,
                marginTop: 6,
                lineHeight: 24,
              }}
            >
              {config.album.tagline}
            </Text>
          ) : null}

          <View style={{ marginTop: 20, aspectRatio: 1, position: "relative", overflow: "hidden" }}>
            <Image source={{ uri: config.album.coverImage }} style={{ flex: 1 }} contentFit="cover" />
          </View>

          <View style={{ marginTop: 22 }}>
            {config.album.highlightedTracks.slice(0, 6).map((track, i) => (
              <View
                key={track}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 14,
                  borderBottomColor: tokens.border,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: "rgba(245,240,232,0.4)",
                    fontFamily: "Cinzel-500",
                    fontSize: 11,
                    width: 32,
                    letterSpacing: 1.5,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: "#F5F0E8",
                    fontFamily: "Inter-600",
                    fontSize: scaleType(15),
                  }}
                >
                  {track}
                </Text>
                <Pressable
                  hitSlop={10}
                  onPress={() => Haptics.selectionAsync().catch(() => {})}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: tokens.accent,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Play size={11} color="#0a0a0a" fill="#0a0a0a" />
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        <Divider color={tokens.border} margin={36} />

        {/* VOICE / PROCESS */}
        {config.voice?.process?.length ? (
          <View style={{ paddingHorizontal: 24 }}>
            <Eyebrow color={tokens.accent}>O PROCESSO</Eyebrow>
            {config.voice.epigraph ? (
              <View style={{ marginTop: 12 }}>
                <PullQuote color="#F5F0E8" size={22}>
                  {config.voice.epigraph}
                </PullQuote>
              </View>
            ) : null}
            <View style={{ flexDirection: "row", gap: 8, marginTop: 18 }}>
              {config.voice.process.filter(Boolean).map((step, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    padding: 14,
                    backgroundColor: "rgba(245,240,232,0.04)",
                    borderColor: tokens.border,
                    borderWidth: 1,
                    minHeight: 110,
                  }}
                >
                  <Text
                    style={{
                      color: tokens.accent,
                      fontFamily: "BebasNeue-400",
                      fontSize: 24,
                      lineHeight: 24,
                      marginBottom: 8,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(245,240,232,0.78)",
                      fontFamily: "Inter-400",
                      fontSize: 11,
                      lineHeight: 16,
                    }}
                  >
                    {step}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <Divider color={tokens.border} margin={40} />

        {/* CTA */}
        <View style={{ paddingHorizontal: 24 }}>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              router.back();
              setTimeout(() => router.push("/loja" as never), 220);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 22,
                borderTopColor: tokens.border,
                borderBottomColor: tokens.border,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: tokens.accent,
                    fontFamily: "Cinzel-700",
                    fontSize: 10,
                    letterSpacing: 3,
                    marginBottom: 6,
                  }}
                >
                  COLEÇÃO OFICIAL
                </Text>
                <Display size={32}>VER {config.universeName}</Display>
              </View>
              <Text
                style={{
                  color: tokens.accent,
                  fontFamily: "BebasNeue-400",
                  fontSize: 42,
                }}
              >
                →
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: "rgba(245,240,232,0.3)", fontFamily: "Cinzel-500", fontSize: 9, letterSpacing: 4 }}>
            {config.displayName.toUpperCase()} · 30PRAUM
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
