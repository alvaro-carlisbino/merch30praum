import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { useTheme } from "@/lib/theme";
import { useCurrentPlantao } from "@/lib/cms/queries";
import { Display, Eyebrow, Divider, scaleType } from "@/components/editorial/Display";
import { MarqueeText } from "@/components/editorial/MarqueeText";

const SCREEN_HEIGHT = Dimensions.get("window").height;

function useCountdown(iso: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(iso).getTime() - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function formatDateBR(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function PlantaoScreen() {
  const insets = useSafeAreaInsets();
  const setActive = useTheme((s) => s.setActive);
  const { data: edition } = useCurrentPlantao();

  useEffect(() => {
    setActive("plantao");
  }, [setActive]);

  if (!edition) return <View style={{ flex: 1, backgroundColor: "#06030a" }} />;

  const accent = "#ff2d2d";
  const bg = "#06030a";
  const fg = "#fff5ec";
  const heroHeight = Math.max(620, SCREEN_HEIGHT * 0.86);

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* CINEMATIC HERO — bloodglow */}
        <View style={{ height: heroHeight, position: "relative" }}>
          <Image
            source={{ uri: edition.heroImage }}
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
            contentFit="cover"
          />
          <LinearGradient
            colors={["rgba(255,45,45,0.15)", "rgba(0,0,0,0.0)", "rgba(255,45,45,0.25)", bg]}
            locations={[0, 0.3, 0.75, 1]}
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          />

          <View style={{ position: "absolute", top: insets.top + 16, left: 24, right: 24 }}>
            <Eyebrow color="#fff5ec">PLANTÃO · 30PRAUM</Eyebrow>
            <Text
              style={{
                color: "rgba(245,240,232,0.55)",
                fontFamily: "Cinzel-500",
                fontSize: 9,
                letterSpacing: 2,
                marginTop: 4,
              }}
            >
              {edition.venue.toUpperCase()} · {edition.city.toUpperCase()} · {edition.state}
            </Text>
          </View>

          <View style={{ position: "absolute", bottom: 30, left: 24, right: 24 }}>
            <Animated.View entering={FadeIn.duration(700)}>
              <Text
                style={{
                  color: accent,
                  fontFamily: "Cinzel-700",
                  fontSize: 11,
                  letterSpacing: 4,
                }}
              >
                {formatDateBR(edition.date).toUpperCase()}
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(900).delay(150)}>
              <Text
                style={{
                  color: "#fff5ec",
                  fontFamily: "BebasNeue-400",
                  fontSize: scaleType(150),
                  lineHeight: scaleType(150) * 0.92,
                  letterSpacing: scaleType(150) * -0.045,
                  marginTop: 4,
                }}
              >
                {edition.year}
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(900).delay(280)} style={{ maxWidth: 320 }}>
              <Text
                style={{
                  color: "rgba(245,240,232,0.75)",
                  fontFamily: "CormorantGaramond-500-Italic",
                  fontSize: 20,
                  marginTop: 12,
                  lineHeight: 26,
                }}
              >
                {edition.tagline}
              </Text>
            </Animated.View>
          </View>
        </View>

        {/* COUNTDOWN HUGE */}
        <Countdown date={edition.date} />

        {/* HEADLINER MARQUEE */}
        {edition.lineup[0] ? (
          <View style={{ marginTop: 40 }}>
            <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
              <Eyebrow color={accent}>HEADLINER</Eyebrow>
            </View>
            <MarqueeText
              text={`${edition.lineup[0].displayName.toUpperCase()}  ·  `}
              durationMs={18000}
              style={{
                color: "#fff5ec",
                fontFamily: "BebasNeue-400",
                fontSize: 84,
                letterSpacing: -2,
                lineHeight: 84,
              }}
            />
            {edition.lineup[0].highlightLabel ? (
              <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
                <Text
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontFamily: "CormorantGaramond-500-Italic",
                    fontSize: 16,
                  }}
                >
                  {edition.lineup[0].highlightLabel}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <Divider margin={40} />

        {/* LINEUP REST */}
        <View style={{ paddingHorizontal: 24 }}>
          <Eyebrow color={accent}>LINEUP</Eyebrow>
          <View style={{ marginTop: 18 }}>
            {edition.lineup.slice(1).map((l, i) => (
              <View
                key={`${l.displayName}-${i}`}
                style={{
                  paddingVertical: 14,
                  borderBottomColor: "rgba(245,240,232,0.1)",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: "#fff5ec",
                    fontFamily: "BebasNeue-400",
                    fontSize: 30,
                    letterSpacing: -0.3,
                    lineHeight: 32,
                  }}
                >
                  {l.displayName}
                </Text>
                {l.highlightLabel ? (
                  <Text
                    style={{
                      color: "rgba(245,240,232,0.5)",
                      fontFamily: "Inter-400",
                      fontSize: 11,
                      letterSpacing: 1,
                      marginTop: 2,
                    }}
                  >
                    {l.highlightLabel}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        <Divider margin={40} />

        {/* SECTORS — ticket stubs */}
        <View style={{ paddingHorizontal: 24 }}>
          <Eyebrow color={accent}>INGRESSOS</Eyebrow>
          <View style={{ marginTop: 18, gap: 12 }}>
            {edition.sectors.map((s, i) => {
              const soldout = s.status === "soldout";
              return (
                <View
                  key={`${s.name}-${i}`}
                  style={{
                    flexDirection: "row",
                    backgroundColor: soldout ? "rgba(20,20,20,0.6)" : "rgba(20,20,20,1)",
                    borderColor: soldout ? "rgba(245,240,232,0.08)" : "rgba(200,152,88,0.25)",
                    borderWidth: 1,
                    padding: 18,
                    opacity: soldout ? 0.55 : 1,
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 14 }}>
                    <Text
                      style={{
                        color: "#fff5ec",
                        fontFamily: "BebasNeue-400",
                        fontSize: 24,
                        letterSpacing: -0.2,
                      }}
                    >
                      {s.name}
                    </Text>
                    {s.perks ? (
                      <Text
                        style={{
                          color: "rgba(245,240,232,0.55)",
                          fontFamily: "Inter-400",
                          fontSize: 10,
                          marginTop: 4,
                          lineHeight: 14,
                        }}
                      >
                        {s.perks}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      width: 1,
                      backgroundColor: "rgba(245,240,232,0.12)",
                      marginRight: 16,
                    }}
                  />
                  <View style={{ minWidth: 80, alignItems: "flex-end", justifyContent: "center" }}>
                    {soldout ? (
                      <Text style={{ color: "#FF3B1F", fontFamily: "Cinzel-700", fontSize: 10, letterSpacing: 2 }}>
                        ESGOTADO
                      </Text>
                    ) : s.status === "upcoming" ? (
                      <Text style={{ color: accent, fontFamily: "Cinzel-700", fontSize: 10, letterSpacing: 2 }}>
                        EM BREVE
                      </Text>
                    ) : (
                      <>
                        <Text
                          style={{
                            color: "rgba(245,240,232,0.45)",
                            fontFamily: "Cinzel-500",
                            fontSize: 9,
                            letterSpacing: 2,
                            marginBottom: 2,
                          }}
                        >
                          A PARTIR DE
                        </Text>
                        <Text
                          style={{
                            color: "#fff5ec",
                            fontFamily: "BebasNeue-400",
                            fontSize: 28,
                            letterSpacing: -0.3,
                            lineHeight: 28,
                          }}
                        >
                          R$ {s.priceFrom}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <Divider margin={40} />

        {/* FAQ */}
        <View style={{ paddingHorizontal: 24 }}>
          <Eyebrow color={accent}>TIRA-DÚVIDAS</Eyebrow>
          <View style={{ marginTop: 18 }}>
            {edition.infoFAQ.slice(0, 4).map((q, i) => (
              <View
                key={i}
                style={{
                  paddingVertical: 16,
                  borderBottomColor: "rgba(245,240,232,0.1)",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ flexDirection: "row", gap: 12, marginBottom: 8 }}>
                  <Text
                    style={{
                      color: accent,
                      fontFamily: "Cinzel-700",
                      fontSize: 11,
                      letterSpacing: 2,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: "#fff5ec",
                      fontFamily: "BebasNeue-400",
                      fontSize: 18,
                      letterSpacing: -0.1,
                      lineHeight: 22,
                    }}
                  >
                    {q.question}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "rgba(245,240,232,0.65)",
                    fontFamily: "Inter-400",
                    fontSize: 13,
                    lineHeight: 19,
                    paddingLeft: 26,
                  }}
                >
                  {q.answer}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ color: "rgba(245,240,232,0.3)", fontFamily: "Cinzel-500", fontSize: 9, letterSpacing: 4 }}>
            PLANTÃO {edition.year} · 30PRAUM
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Countdown({ date }: { date: string }) {
  const c = useCountdown(date);
  return (
    <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
      <View
        style={{
          paddingVertical: 20,
          borderTopColor: "rgba(245,240,232,0.12)",
          borderBottomColor: "rgba(245,240,232,0.12)",
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[
            { v: c.d, l: "DIAS" },
            { v: c.h, l: "HORAS" },
            { v: c.m, l: "MIN" },
            { v: c.s, l: "SEG" },
          ].map((it, i) => (
            <View key={it.l} style={{ alignItems: "center", flex: 1, position: "relative" }}>
              <Text
                style={{
                  color: "#fff5ec",
                  fontFamily: "BebasNeue-400",
                  fontSize: scaleType(56),
                  lineHeight: scaleType(56),
                  letterSpacing: scaleType(56) * -0.025,
                }}
              >
                {String(it.v).padStart(2, "0")}
              </Text>
              <Text
                style={{
                  color: "rgba(245,240,232,0.45)",
                  fontFamily: "Cinzel-500",
                  fontSize: 9,
                  letterSpacing: 3,
                  marginTop: 4,
                }}
              >
                {it.l}
              </Text>
              {i < 3 ? (
                <View
                  style={{
                    position: "absolute",
                    right: -1,
                    top: "20%",
                    bottom: "20%",
                    width: 1,
                    backgroundColor: "rgba(245,240,232,0.1)",
                  }}
                />
              ) : null}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
