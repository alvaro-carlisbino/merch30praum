import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import type { FeedItem } from "@/lib/feed/feed-items";
import { ARTIST_THEMES } from "@/lib/theme";

interface Props {
  item: FeedItem;
}

const onPress = (href: string) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  router.push(href as never);
};

export function FeedCard({ item }: Props) {
  if (item.kind === "drop") {
    const accent = ARTIST_THEMES[item.artistSlug].accent;
    return (
      <Pressable onPress={() => onPress(item.href)} style={{ marginHorizontal: 16 }}>
        <View
          style={{
            borderRadius: 22,
            overflow: "hidden",
            aspectRatio: 4 / 5,
            backgroundColor: "#111",
          }}
        >
          <Image source={{ uri: item.coverImage }} style={{ flex: 1 }} contentFit="cover" />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.85)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "60%",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 20,
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: accent,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: "#0a0a0a",
                  fontFamily: "Cinzel-700",
                  fontSize: 10,
                  letterSpacing: 1.5,
                }}
              >
                DROP ATIVO
              </Text>
            </View>
            <Text
              style={{
                color: "#f5f0e8",
                fontFamily: "BebasNeue-400",
                fontSize: 48,
                lineHeight: 50,
                letterSpacing: 2,
              }}
            >
              {item.lettering}
            </Text>
            <Text
              style={{
                color: "rgba(245,240,232,0.7)",
                fontFamily: "Inter-400",
                fontSize: 13,
                marginTop: 4,
              }}
            >
              {item.chapter}
            </Text>
            <View
              style={{
                marginTop: 14,
                alignSelf: "flex-start",
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(245,240,232,0.4)",
              }}
            >
              <Text style={{ color: "#f5f0e8", fontFamily: "Cinzel-500", fontSize: 12, letterSpacing: 2 }}>
                {item.cta.toUpperCase()} →
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  if (item.kind === "plantao") {
    const dateLabel = formatDate(item.date);
    return (
      <Pressable onPress={() => onPress(item.href)} style={{ marginHorizontal: 16 }}>
        <View
          style={{
            borderRadius: 22,
            overflow: "hidden",
            aspectRatio: 16 / 11,
            backgroundColor: "#111",
          }}
        >
          <Image source={{ uri: item.heroImage }} style={{ flex: 1 }} contentFit="cover" />
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.85)"]}
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          />
          <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 20 }}>
            <Text
              style={{
                color: "rgba(245,240,232,0.7)",
                fontFamily: "Cinzel-500",
                fontSize: 11,
                letterSpacing: 2,
              }}
            >
              {dateLabel.toUpperCase()} · MARINA PARK · CE
            </Text>
            <Text
              style={{
                color: "#f5f0e8",
                fontFamily: "BebasNeue-400",
                fontSize: 42,
                letterSpacing: 1,
                marginTop: 4,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "rgba(245,240,232,0.75)",
                fontFamily: "Inter-400",
                fontSize: 13,
                marginTop: 4,
              }}
              numberOfLines={2}
            >
              {item.tagline}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  if (item.kind === "colab") {
    return (
      <Pressable onPress={() => onPress(item.href)} style={{ marginHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            borderRadius: 18,
            overflow: "hidden",
            backgroundColor: "#0f0f0f",
            borderWidth: 1,
            borderColor: "rgba(245,240,232,0.08)",
          }}
        >
          <Image source={{ uri: item.coverImage }} style={{ width: 120, height: 120 }} contentFit="cover" />
          <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
            <Text
              style={{
                color: "rgba(245,240,232,0.55)",
                fontFamily: "Cinzel-500",
                fontSize: 10,
                letterSpacing: 2,
              }}
            >
              COLAB
            </Text>
            <Text
              style={{
                color: "#f5f0e8",
                fontFamily: "BebasNeue-400",
                fontSize: 26,
                letterSpacing: 1,
                marginTop: 2,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: "rgba(245,240,232,0.7)",
                fontFamily: "Inter-400",
                fontSize: 12,
                marginTop: 4,
              }}
              numberOfLines={2}
            >
              {item.caption}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => onPress(item.href)} style={{ marginHorizontal: 16 }}>
      <View
        style={{
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: "#0f0f0f",
          borderWidth: 1,
          borderColor: "rgba(245,240,232,0.08)",
        }}
      >
        <Image source={{ uri: item.heroImage }} style={{ width: "100%", aspectRatio: 16 / 9 }} contentFit="cover" />
        <View style={{ padding: 18 }}>
          <Text
            style={{
              color: "#c89858",
              fontFamily: "Cinzel-500",
              fontSize: 10,
              letterSpacing: 2,
            }}
          >
            {item.eyebrow.toUpperCase()}
          </Text>
          <Text
            style={{
              color: "#f5f0e8",
              fontFamily: "BebasNeue-400",
              fontSize: 26,
              letterSpacing: 0.5,
              marginTop: 4,
              lineHeight: 28,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: "rgba(245,240,232,0.7)",
              fontFamily: "Inter-400",
              fontSize: 13,
              marginTop: 6,
              lineHeight: 19,
            }}
            numberOfLines={3}
          >
            {item.excerpt}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
