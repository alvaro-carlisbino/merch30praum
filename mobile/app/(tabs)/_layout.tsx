import { Tabs } from "expo-router";
import { CustomTabBar } from "@/components/ui/CustomTabBar";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="plantao" />
      <Tabs.Screen name="loja" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}
