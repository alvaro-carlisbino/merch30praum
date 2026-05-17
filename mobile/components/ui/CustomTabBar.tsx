import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { useTheme } from "@/lib/theme";

const LABELS: Record<string, string> = {
  index: "HOME",
  plantao: "PLANTÃO",
  loja: "LOJA",
  perfil: "PERFIL",
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const accent = useTheme((s) => s.tokens.accent);

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "rgba(7,7,7,0.96)",
        borderTopColor: "rgba(245,240,232,0.06)",
        borderTopWidth: 1,
        paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        paddingTop: 14,
        paddingHorizontal: 16,
      }}
    >
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const label = LABELS[route.name] ?? route.name.toUpperCase();
        return (
          <Pressable
            key={route.key}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name as never);
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                color: focused ? accent : "rgba(245,240,232,0.45)",
                fontFamily: "Cinzel-700",
                fontSize: 10,
                letterSpacing: 3,
              }}
            >
              {label}
            </Text>
            {focused ? (
              <Animated.View
                entering={FadeIn.duration(180)}
                exiting={FadeOut.duration(120)}
                style={{
                  marginTop: 6,
                  height: 2,
                  width: 18,
                  backgroundColor: accent,
                }}
              />
            ) : (
              <View style={{ marginTop: 6, height: 2, width: 18 }} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
