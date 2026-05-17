import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";

import { Eyebrow, Display, Divider, DropCap, scaleType } from "@/components/editorial/Display";
import { MarqueeText } from "@/components/editorial/MarqueeText";
import { ARTIST_THEMES } from "@/lib/theme";
import type { ArtistConfig, ArtistSlug } from "@/lib/artists/types";
import type { PlantaoEdition } from "@/lib/plantao/registry";
import { IMG } from "@/lib/images/unsplash";

const onPress = (href: string) => {
  Haptics.selectionAsync().catch(() => {});
  router.push(href as never);
};

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

interface Props {
  artists: ArtistConfig[];
  plantao: PlantaoEdition;
}

export function EditorialFeed({ artists, plantao }: Props) {
  const map = new Map(artists.map((a) => [a.slug, a]));
  const matue = map.get("matue");
  const wiu = map.get("wiu");
  const teto = map.get("teto");

  const countdown = useCountdown(plantao.date);

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 60 }}>
      <Eyebrow>EDITORIAL</Eyebrow>
      <Display size={42} style={{ marginTop: 6 }}>
        Quatro almas{"\n"}uma assinatura.
      </Display>

      <Divider margin={32} />

      {/* PLANTAO MEGA CARD */}
      <Pressable onPress={() => onPress("/plantao")}>
        <View
          style={{
            aspectRatio: 3 / 4,
            backgroundColor: "#0d0d0d",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: plantao.posterImage }} style={{ flex: 1 }} contentFit="cover" />
          <LinearGradient
            colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.65)", "rgba(0,0,0,0.95)"]}
            locations={[0.3, 0.75, 1]}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <View
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <Eyebrow color="#F5F0E8">PLANTÃO · {plantao.year}</Eyebrow>
          </View>
          <View style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
            <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6, marginBottom: 12 }}>
              <Text
                style={{
                  color: "#F5F0E8",
                  fontFamily: "BebasNeue-400",
                  fontSize: 56,
                  letterSpacing: 2,
                  lineHeight: 56,
                }}
              >
                {String(countdown.d).padStart(2, "0")}
              </Text>
              <Text style={{ color: "rgba(245,240,232,0.6)", fontFamily: "Cinzel-700", fontSize: 11, letterSpacing: 3 }}>
                DIAS
              </Text>
              <Text
                style={{
                  color: "#F5F0E8",
                  fontFamily: "BebasNeue-400",
                  fontSize: 56,
                  letterSpacing: 2,
                  lineHeight: 56,
                  marginLeft: 16,
                }}
              >
                {String(countdown.h).padStart(2, "0")}
              </Text>
              <Text style={{ color: "rgba(245,240,232,0.6)", fontFamily: "Cinzel-700", fontSize: 11, letterSpacing: 3 }}>
                HORAS
              </Text>
            </View>
            <Display size={48}>{plantao.title}</Display>
            <Text
              style={{
                color: "rgba(245,240,232,0.7)",
                fontFamily: "CormorantGaramond-500-Italic",
                fontSize: 16,
                marginTop: 4,
              }}
            >
              {plantao.tagline}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 18, gap: 12 }}>
              <View style={{ height: 1, width: 48, backgroundColor: "#C89858" }} />
              <Text style={{ color: "#C89858", fontFamily: "Cinzel-700", fontSize: 10, letterSpacing: 3 }}>
                GARANTIR INGRESSO
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      <Divider margin={32} />

      {/* COLAB STRIP */}
      {wiu && teto && (
        <Pressable onPress={() => onPress(`/eleitos/wiu`)}>
          <Eyebrow color={ARTIST_THEMES.wiu.accent}>COLAB · 2026</Eyebrow>
          <Display size={36} style={{ marginTop: 4 }}>
            Wiu × Teto
          </Display>
          <Text
            style={{
              color: "rgba(245,240,232,0.6)",
              fontFamily: "CormorantGaramond-500-Italic",
              fontSize: 17,
              marginTop: 4,
            }}
          >
            Colapso Global — agora em todas plataformas.
          </Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 16, height: 200 }}>
            <View style={{ flex: 1, overflow: "hidden", backgroundColor: ARTIST_THEMES.wiu.bg }}>
              <Image source={{ uri: wiu.portraitImage }} style={{ flex: 1 }} contentFit="cover" />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.85)"]}
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: "50%" }}
              />
              <View style={{ position: "absolute", bottom: 10, left: 10 }}>
                <Text style={{ color: "#F5F0E8", fontFamily: "BebasNeue-400", fontSize: 22, letterSpacing: 1 }}>
                  WIU
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, overflow: "hidden", backgroundColor: ARTIST_THEMES.teto.bg }}>
              <Image source={{ uri: teto.portraitImage }} style={{ flex: 1 }} contentFit="cover" />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.85)"]}
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: "50%" }}
              />
              <View style={{ position: "absolute", bottom: 10, left: 10 }}>
                <Text style={{ color: "#F5F0E8", fontFamily: "BebasNeue-400", fontSize: 22, letterSpacing: 1 }}>
                  TETO
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}

      <Divider margin={32} />

      {/* INCUBADORA EDITORIAL */}
      <Pressable onPress={() => onPress("/perfil")}>
        <Eyebrow>INCUBADORA</Eyebrow>
        <Display size={36} style={{ marginTop: 4 }}>
          Uma porta{"\n"}pra quem ainda{"\n"}não está dentro.
        </Display>
        <View style={{ marginTop: 18 }}>
          <DropCap>
            Antes do nome, antes do escritório, antes do Plantão — a 30praum era um grupo pequeno apostando em quem ninguém apostou. Matuê fundou. Wiu chegou como beatmaker. Teto veio do quarto. Brandão85 estava na capa do Plantão em dois anos.
          </DropCap>
        </View>
        <View
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTopColor: "rgba(245,240,232,0.12)",
            borderTopWidth: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#C89858", fontFamily: "Cinzel-700", fontSize: 11, letterSpacing: 3, flex: 1 }}>
            CANDIDATAR-SE →
          </Text>
          <Text style={{ color: "rgba(245,240,232,0.5)", fontFamily: "Inter-400", fontSize: 11 }}>
            ar@30praum.com
          </Text>
        </View>
      </Pressable>

      <Divider margin={32} />

      {/* MATUE DROP STRIP */}
      {matue && (
        <Pressable onPress={() => onPress("/loja")}>
          <Eyebrow color={ARTIST_THEMES.matue.accent2}>DROP · XTRANHO</Eyebrow>
          <View style={{ marginTop: 12, height: 260, position: "relative", overflow: "hidden" }}>
            <Image source={{ uri: matue.album.coverImage }} style={{ flex: 1 }} contentFit="cover" />
            <LinearGradient
              colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.95)"]}
              style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <View style={{ position: "absolute", left: 16, right: 0, bottom: 16, top: 16 }}>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Display size={64} style={{ color: ARTIST_THEMES.matue.fg }}>
                  XTRANHO
                </Display>
                <Text
                  style={{
                    color: "rgba(245,240,232,0.65)",
                    fontFamily: "CormorantGaramond-500-Italic",
                    fontSize: 15,
                    marginTop: 4,
                  }}
                >
                  Capítulo final · enviado em security bag
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 12 }}>
            <MarqueeText
              text="VER COLEÇÃO  ·"
              durationMs={18000}
              style={{
                color: ARTIST_THEMES.matue.accent,
                fontFamily: "Cinzel-700",
                fontSize: 14,
                letterSpacing: 4,
              }}
            />
          </View>
        </Pressable>
      )}

      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Text style={{ color: "rgba(245,240,232,0.35)", fontFamily: "Cinzel-500", fontSize: 9, letterSpacing: 4 }}>
          30PRAUM · FORTALEZA · CE
        </Text>
      </View>
    </View>
  );
}
