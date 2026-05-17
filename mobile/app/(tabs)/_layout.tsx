import { Tabs } from "expo-router";
import { Home, CalendarDays, ShoppingBag, User } from "lucide-react-native";
import { useTheme } from "@/lib/theme";

export default function TabsLayout() {
  const tokens = useTheme((s) => s.tokens);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.accent,
        tabBarInactiveTintColor: "#5a6577",
        tabBarStyle: {
          backgroundColor: "#070707",
          borderTopColor: "rgba(255,255,255,0.06)",
          borderTopWidth: 1,
          height: 88,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: "Cinzel-500",
          fontSize: 10,
          letterSpacing: 1.5,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ color }) => <Home size={22} color={color} strokeWidth={1.6} />,
        }}
      />
      <Tabs.Screen
        name="plantao"
        options={{
          title: "PLANTÃO",
          tabBarIcon: ({ color }) => <CalendarDays size={22} color={color} strokeWidth={1.6} />,
        }}
      />
      <Tabs.Screen
        name="loja"
        options={{
          title: "LOJA",
          tabBarIcon: ({ color }) => <ShoppingBag size={22} color={color} strokeWidth={1.6} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "PERFIL",
          tabBarIcon: ({ color }) => <User size={22} color={color} strokeWidth={1.6} />,
        }}
      />
    </Tabs>
  );
}
