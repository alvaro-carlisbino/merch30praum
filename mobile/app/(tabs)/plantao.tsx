import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, FlatList } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, MapPin } from "lucide-react-native";

import { getCurrentPlantao } from "@/lib/plantao/registry";
import { useTheme } from "@/lib/theme";

export default function PlantaoScreen() {
  const insets = useSafeAreaInsets();
  const setActive = useTheme((s) => s.setActive);
  const tokens = useTheme((s) => s.tokens);
  const edition = useMemo(() => getCurrentPlantao(), []);

  useEffect(() => {
    setActive("house");
  }, [setActive]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }} showsVerticalScrollIndicator={false}>
      <View style={{ height: 540, position: "relative" }}>
        <Image source={{ uri: edition.heroImage }} style={{ ...StyleAbsoluteFill }} contentFit="cover" />
        <LinearGradient
          colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.85)"]}
          style={{ ...StyleAbsoluteFill, top: "30%" }}
        />
        <View
          style={{
            position: "absolute",
            top: insets.top + 12,
            left: 20,
            right: 20,
          }}
        >
          <Text style={{ color: tokens.fg, fontFamily: "Cinzel-700", fontSize: 12, letterSpacing: 3 }}>
            PLANTÃO · 30PRAUM
          </Text>
        </View>
        <View style={{ position: "absolute", bottom: 24, left: 20, right: 20 }}>
          <Text
            style={{
              color: tokens.fg,
              fontFamily: "BebasNeue-400",
              fontSize: 88,
              lineHeight: 88,
              letterSpacing: 2,
            }}
          >
            {edition.year}
          </Text>
          <Text style={{ color: tokens.fg, fontFamily: "Inter-600", fontSize: 16, marginTop: -4 }}>
            {edition.tagline}
          </Text>
          <View style={{ flexDirection: "row", gap: 16, marginTop: 12 }}>
            <Pill icon={<Calendar size={12} color={tokens.fg} />} text={formatDate(edition.date)} />
            <Pill icon={<MapPin size={12} color={tokens.fg} />} text={`${edition.venue} · ${edition.city}`} />
          </View>
        </View>
      </View>

      <Countdown isoDate={edition.date} accent={tokens.accent} />

      <SectionTitle>LINEUP</SectionTitle>
      <FlatList
        data={edition.lineup}
        scrollEnabled={false}
        keyExtractor={(item, idx) => `${item.displayName}-${idx}`}
        numColumns={2}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              aspectRatio: item.isHeadliner ? 2 : 1,
              borderRadius: 14,
              overflow: "hidden",
              backgroundColor: "#0f0f0f",
            }}
          >
            <Image source={{ uri: item.imageUrl }} style={{ flex: 1 }} contentFit="cover" />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.85)"]}
              style={{ ...StyleAbsoluteFill, top: "40%" }}
            />
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12 }}>
              <Text style={{ color: tokens.fg, fontFamily: "BebasNeue-400", fontSize: 22, letterSpacing: 0.5 }}>
                {item.displayName}
              </Text>
              {item.highlightLabel ? (
                <Text style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter-400", fontSize: 10, marginTop: 2 }}>
                  {item.highlightLabel}
                </Text>
              ) : null}
            </View>
          </View>
        )}
      />

      <SectionTitle>INGRESSOS</SectionTitle>
      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        {edition.sectors.map((s, i) => (
          <View
            key={`${s.name}-${i}`}
            style={{
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "rgba(245,240,232,0.1)",
              backgroundColor: "#0f0f0f",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: s.status === "soldout" ? 0.55 : 1,
            }}
          >
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={{ color: tokens.fg, fontFamily: "Cinzel-700", fontSize: 14, letterSpacing: 1.5 }}>
                {s.name.toUpperCase()}
              </Text>
              {s.perks ? (
                <Text style={{ color: "rgba(245,240,232,0.6)", fontFamily: "Inter-400", fontSize: 11, marginTop: 4 }}>
                  {s.perks}
                </Text>
              ) : null}
            </View>
            <View style={{ alignItems: "flex-end" }}>
              {s.status === "soldout" ? (
                <Text style={{ color: "#ff3b1f", fontFamily: "Cinzel-700", fontSize: 10, letterSpacing: 2 }}>
                  ESGOTADO
                </Text>
              ) : s.status === "upcoming" ? (
                <Text style={{ color: tokens.accent, fontFamily: "Cinzel-700", fontSize: 10, letterSpacing: 2 }}>
                  EM BREVE
                </Text>
              ) : (
                <Text style={{ color: tokens.fg, fontFamily: "BebasNeue-400", fontSize: 22 }}>
                  R$ {s.priceFrom}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      <SectionTitle>FAQ</SectionTitle>
      <View style={{ paddingHorizontal: 16, gap: 10, marginBottom: 32 }}>
        {edition.infoFAQ.slice(0, 4).map((q, i) => (
          <View
            key={i}
            style={{
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "rgba(245,240,232,0.08)",
              backgroundColor: "#0d0d0d",
            }}
          >
            <Text style={{ color: tokens.fg, fontFamily: "Cinzel-500", fontSize: 12, letterSpacing: 1.5 }}>
              {q.question.toUpperCase()}
            </Text>
            <Text
              style={{ color: "rgba(245,240,232,0.7)", fontFamily: "Inter-400", fontSize: 12, marginTop: 6, lineHeight: 18 }}
            >
              {q.answer}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const StyleAbsoluteFill = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(245,240,232,0.25)",
      }}
    >
      {icon}
      <Text style={{ color: "#f5f0e8", fontFamily: "Inter-400", fontSize: 11 }}>{text}</Text>
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Text
      style={{
        color: "#f5f0e8",
        fontFamily: "Cinzel-700",
        fontSize: 13,
        letterSpacing: 3,
        marginTop: 28,
        marginBottom: 12,
        paddingHorizontal: 20,
      }}
    >
      {children}
    </Text>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function Countdown({ isoDate, accent }: { isoDate: string; accent: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = new Date(isoDate).getTime();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 16,
        marginTop: -36,
        padding: 18,
        borderRadius: 16,
        backgroundColor: "rgba(15,15,15,0.95)",
        borderWidth: 1,
        borderColor: "rgba(245,240,232,0.08)",
        zIndex: 5,
      }}
    >
      {[
        { v: d, l: "DIAS" },
        { v: h, l: "HORAS" },
        { v: m, l: "MIN" },
        { v: s, l: "SEG" },
      ].map((it) => (
        <View key={it.l} style={{ alignItems: "center" }}>
          <Text style={{ color: accent, fontFamily: "BebasNeue-400", fontSize: 32, lineHeight: 34 }}>
            {String(it.v).padStart(2, "0")}
          </Text>
          <Text style={{ color: "rgba(245,240,232,0.55)", fontFamily: "Cinzel-500", fontSize: 9, letterSpacing: 2 }}>
            {it.l}
          </Text>
        </View>
      ))}
    </View>
  );
}
