import { FlatList, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { STORIES } from "@/lib/feed/stories";
import { ARTIST_THEMES, useTheme } from "@/lib/theme";

export function StoriesRow() {
  const setActive = useTheme((s) => s.setActive);

  return (
    <FlatList
      data={STORIES}
      keyExtractor={(s) => s.slug}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 14, paddingVertical: 4 }}
      renderItem={({ item }) => {
        const accent = ARTIST_THEMES[item.slug].accent;
        return (
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              setActive(item.slug);
              router.push(`/eleitos/${item.slug}` as never);
            }}
            style={{ alignItems: "center", width: 76 }}
          >
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                padding: item.isActiveDrop ? 2.5 : 1,
                borderWidth: item.isActiveDrop ? 2 : 1,
                borderColor: item.isActiveDrop ? accent : "rgba(245,240,232,0.18)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 31,
                  backgroundColor: "#1a1a1a",
                }}
                contentFit="cover"
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                color: "#f5f0e8",
                fontFamily: "Cinzel-500",
                fontSize: 10,
                letterSpacing: 1.2,
                marginTop: 6,
              }}
            >
              {item.label.toUpperCase()}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}
