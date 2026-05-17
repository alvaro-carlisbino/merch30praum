import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ShoppingBag } from "lucide-react-native";

import { CATEGORIES, type CategorySlug } from "@/lib/shop/categories";
import { PRODUCTS } from "@/lib/shop/products";
import { ARTIST_THEMES, useTheme } from "@/lib/theme";
import type { ArtistSlug } from "@/lib/artists/types";

type CategoryFilter = "all" | CategorySlug;
type ArtistFilter = "all" | ArtistSlug;

export default function LojaScreen() {
  const insets = useSafeAreaInsets();
  const tokens = useTheme((s) => s.tokens);
  const setActive = useTheme((s) => s.setActive);
  const [cat, setCat] = useState<CategoryFilter>("all");
  const [artist, setArtist] = useState<ArtistFilter>("all");

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => (cat === "all" || p.category === cat) && (artist === "all" || p.artistSlug === artist)
      ),
    [cat, artist]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingTop: insets.top }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 14,
        }}
      >
        <Text style={{ color: tokens.fg, fontFamily: "Cinzel-700", fontSize: 22, letterSpacing: 4 }}>
          LOJA
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(245,240,232,0.12)",
          }}
        >
          <ShoppingBag size={14} color={tokens.fg} strokeWidth={1.6} />
          <Text style={{ color: tokens.fg, fontFamily: "Inter-600", fontSize: 12 }}>2</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        <Pill label="Tudo" active={cat === "all"} onPress={() => setCat("all")} accent={tokens.accent} />
        {CATEGORIES.map((c) => (
          <Pill
            key={c.slug}
            label={c.label}
            active={cat === c.slug}
            onPress={() => setCat(c.slug)}
            accent={tokens.accent}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingTop: 10 }}
      >
        <Pill
          label="Todos artistas"
          active={artist === "all"}
          onPress={() => {
            setArtist("all");
            setActive("house");
          }}
          accent={tokens.accent}
          small
        />
        {(["matue", "wiu", "teto", "brandao"] as ArtistSlug[]).map((s) => (
          <Pill
            key={s}
            label={ARTIST_THEMES[s].label}
            active={artist === s}
            onPress={() => {
              setArtist(s);
              setActive(s);
            }}
            accent={ARTIST_THEMES[s].accent}
            small
          />
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 32, gap: 10 }}
        renderItem={({ item }) => {
          const accent = ARTIST_THEMES[item.artistSlug].accent;
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: "#0f0f0f",
                borderRadius: 14,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "rgba(245,240,232,0.06)",
              }}
            >
              <View style={{ aspectRatio: 1, backgroundColor: "#111" }}>
                <Image source={{ uri: item.image }} style={{ flex: 1 }} contentFit="cover" />
                {item.isDropLive ? (
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 999,
                      backgroundColor: accent,
                    }}
                  >
                    <Text
                      style={{
                        color: "#0a0a0a",
                        fontFamily: "Cinzel-700",
                        fontSize: 9,
                        letterSpacing: 1.5,
                      }}
                    >
                      DROP ATIVO
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={{ padding: 12 }}>
                <Text
                  style={{ color: tokens.fg, fontFamily: "Inter-600", fontSize: 12, lineHeight: 16 }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: tokens.fg,
                    fontFamily: "Cinzel-700",
                    fontSize: 18,
                    marginTop: 6,
                    letterSpacing: -0.3,
                  }}
                >
                  R$ {item.priceBRL}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

function Pill({
  label,
  active,
  onPress,
  accent,
  small,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  accent: string;
  small?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: small ? 12 : 16,
        paddingVertical: small ? 6 : 9,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? accent : "rgba(245,240,232,0.12)",
        backgroundColor: active ? accent : "transparent",
      }}
    >
      <Text
        style={{
          color: active ? "#0a0a0a" : "rgba(245,240,232,0.85)",
          fontFamily: active ? "Cinzel-700" : "Cinzel-500",
          fontSize: small ? 10 : 11,
          letterSpacing: 1.5,
        }}
      >
        {label.toUpperCase()}
      </Text>
    </Pressable>
  );
}
