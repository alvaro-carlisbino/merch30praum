import { FlatList, Pressable, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

import { useStories } from "@/lib/feed/stories";
import { useArtists } from "@/lib/cms/queries";
import { Lettering } from "@/components/editorial/Lettering";
import { ARTIST_THEMES, useTheme } from "@/lib/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 24 * 2 - 12) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.35;

export function StoriesRow() {
  const setActive = useTheme((s) => s.setActive);
  const stories = useStories();
  const { data: artists } = useArtists();
  const artistMap = new Map((artists ?? []).map((a) => [a.slug, a]));

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 6, paddingBottom: 16 }}>
      <Text
        style={{
          color: "rgba(245,240,232,0.55)",
          fontFamily: "Cinzel-700",
          fontSize: 10,
          letterSpacing: 4,
          marginBottom: 16,
        }}
      >
        ELEITOS DA CASA
      </Text>
      <FlatList
        data={stories}
        keyExtractor={(s) => s.slug}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          const tokens = ARTIST_THEMES[item.slug];
          const config = artistMap.get(item.slug);
          return (
            <Pressable
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setActive(item.slug);
                router.push(`/eleitos/${item.slug}` as never);
              }}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                backgroundColor: tokens.bg,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                style={{ flex: 1 }}
                contentFit="cover"
              />
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.95)"]}
                locations={[0.3, 1]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <View style={{ position: "absolute", top: 14, left: 14 }}>
                {item.isActiveDrop ? (
                  <View
                    style={{
                      paddingHorizontal: 6,
                      paddingVertical: 3,
                      backgroundColor: tokens.accent,
                    }}
                  >
                    <Text
                      style={{
                        color: "#0a0a0a",
                        fontFamily: "Cinzel-700",
                        fontSize: 8,
                        letterSpacing: 2,
                      }}
                    >
                      DROP ATIVO
                    </Text>
                  </View>
                ) : null}
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  right: 14,
                }}
              >
                <View style={{ marginBottom: 8 }}>
                  <Lettering artist={item.slug} width={CARD_WIDTH - 28} tint="#F5F0E8" />
                </View>
                <Text
                  style={{
                    color: "rgba(245,240,232,0.65)",
                    fontFamily: "Inter-400",
                    fontSize: 10,
                    letterSpacing: 2,
                  }}
                >
                  {(config?.universeName ?? "").toUpperCase()}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
