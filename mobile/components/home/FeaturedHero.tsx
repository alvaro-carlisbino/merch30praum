import { Pressable, View, Text, Dimensions } from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { HeroImage } from "@/components/editorial/HeroImage";
import { Lettering } from "@/components/editorial/Lettering";
import { Eyebrow, PullQuote, scaleType } from "@/components/editorial/Display";
import { ARTIST_THEMES, useTheme } from "@/lib/theme";
import type { ArtistConfig, ArtistSlug } from "@/lib/artists/types";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

interface Props {
  artist: ArtistConfig;
}

export function FeaturedHero({ artist }: Props) {
  const setActive = useTheme((s) => s.setActive);
  const tokens = ARTIST_THEMES[artist.slug as ArtistSlug];

  const openArtist = () => {
    Haptics.selectionAsync().catch(() => {});
    setActive(artist.slug);
    router.push(`/eleitos/${artist.slug}` as never);
  };

  const heroHeight = Math.max(560, SCREEN_HEIGHT * 0.72);
  const letteringWidth = Math.min(SCREEN_WIDTH * 0.7, 320);

  return (
    <Pressable onPress={openArtist}>
      <HeroImage uri={artist.heroImage} height={heroHeight} overlay="deep" tone={tokens.bg}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingHorizontal: 24,
            paddingTop: 100,
            paddingBottom: 32,
            justifyContent: "space-between",
          }}
        >
          <Animated.View entering={FadeIn.duration(700)}>
            <Eyebrow color={tokens.accent2}>{artist.drop.statusLabel.toUpperCase()}</Eyebrow>
            <Text
              style={{
                color: "rgba(245,240,232,0.6)",
                fontFamily: "Inter-400",
                fontSize: 11,
                letterSpacing: 2,
                marginTop: 4,
              }}
            >
              {artist.origin.toUpperCase()}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(900).delay(200)}>
            <View style={{ marginBottom: 14 }}>
              <Lettering artist={artist.slug as ArtistSlug} width={letteringWidth} tint="#F5F0E8" />
            </View>

            <View style={{ maxWidth: 320 }}>
              <PullQuote size={scaleType(20)}>{artist.signatureLyric}</PullQuote>
            </View>

            <View
              style={{
                marginTop: 22,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View
                style={{
                  height: 1,
                  width: 56,
                  backgroundColor: tokens.accent,
                }}
              />
              <Text
                style={{
                  color: tokens.accent,
                  fontFamily: "Cinzel-700",
                  fontSize: 11,
                  letterSpacing: 4,
                }}
              >
                CONHECER {artist.universeName.toUpperCase()}
              </Text>
            </View>
          </Animated.View>
        </View>
      </HeroImage>
    </Pressable>
  );
}
