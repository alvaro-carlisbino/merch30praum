import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRight, Bell, Heart, MapPin, Package, Sparkles } from "lucide-react-native";
import * as Haptics from "expo-haptics";

import { useNotificationQueue } from "@/lib/notifications/mock-queue";
import { useTheme } from "@/lib/theme";

const MENU = [
  { icon: Package, label: "Meus pedidos", hint: "2 pedidos · 1 a caminho" },
  { icon: Heart, label: "Favoritos", hint: "8 itens" },
  { icon: MapPin, label: "Endereços", hint: "Caponga · CE" },
  { icon: Bell, label: "Notificações", hint: "Ativas" },
];

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const tokens = useTheme((s) => s.tokens);
  const showNext = useNotificationQueue((s) => s.showNext);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0a0a0a" }}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 32 }}
    >
      <Text
        style={{
          color: tokens.fg,
          fontFamily: "BebasNeue-400",
          fontSize: 36,
          letterSpacing: -0.5,
          paddingHorizontal: 20,
          marginBottom: 24,
        }}
      >
        PERFIL
      </Text>

      <View
        style={{
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: "rgba(245,240,232,0.08)",
          backgroundColor: "#0f0f0f",
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: tokens.accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#0a0a0a", fontFamily: "BebasNeue-400", fontSize: 28, letterSpacing: -1 }}>V</Text>
        </View>
        <View>
          <Text style={{ color: tokens.fg, fontFamily: "BebasNeue-400", fontSize: 28, letterSpacing: -0.5 }}>
            Visitante 30praum
          </Text>
          <Text style={{ color: "rgba(245,240,232,0.55)", fontFamily: "Inter-400", fontSize: 12 }}>
            @visitante · membro desde 2026
          </Text>
        </View>
      </View>

      <Section title="CONTA">
        {MENU.map((m, i) => (
          <Row key={i} icon={<m.icon size={18} color={tokens.fg} strokeWidth={1.6} />} label={m.label} hint={m.hint} />
        ))}
      </Section>

      <Section title="DEMO · PITCH">
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
            showNext();
          }}
          style={{
            marginHorizontal: 20,
            padding: 16,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: tokens.accent,
            backgroundColor: "rgba(200,152,88,0.08)",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Sparkles size={18} color={tokens.accent} strokeWidth={1.6} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: tokens.fg, fontFamily: "Cinzel-700", fontSize: 12, letterSpacing: 1.5 }}>
              DISPARAR NOTIFICAÇÃO DEMO
            </Text>
            <Text style={{ color: "rgba(245,240,232,0.55)", fontFamily: "Inter-400", fontSize: 11, marginTop: 2 }}>
              Toque pra ver como o app empurra novidades
            </Text>
          </View>
        </Pressable>
      </Section>

      <View style={{ alignItems: "center", marginTop: 32 }}>
        <Text
          style={{
            color: "rgba(245,240,232,0.4)",
            fontFamily: "Cinzel-500",
            fontSize: 10,
            letterSpacing: 3,
          }}
        >
          30PRAUM · PRA CENA, DA CENA
        </Text>
        <Text style={{ color: "rgba(245,240,232,0.25)", fontFamily: "Inter-400", fontSize: 10, marginTop: 4 }}>
          v0.1.0 · demo
        </Text>
      </View>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: 28 }}>
      <Text
        style={{
          color: "rgba(245,240,232,0.5)",
          fontFamily: "Cinzel-500",
          fontSize: 10,
          letterSpacing: 2.5,
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function Row({ icon, label, hint }: { icon: React.ReactNode; label: string; hint: string }) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(245,240,232,0.06)",
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          backgroundColor: "#0f0f0f",
          borderWidth: 1,
          borderColor: "rgba(245,240,232,0.08)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#f5f0e8", fontFamily: "Inter-600", fontSize: 14 }}>{label}</Text>
        <Text style={{ color: "rgba(245,240,232,0.5)", fontFamily: "Inter-400", fontSize: 11, marginTop: 2 }}>
          {hint}
        </Text>
      </View>
      <ChevronRight size={16} color="rgba(245,240,232,0.4)" />
    </View>
  );
}
