import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  Cinzel_500Medium,
  Cinzel_700Bold,
} from "@expo-google-fonts/cinzel";
import {
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";
import { UnifrakturCook_700Bold } from "@expo-google-fonts/unifrakturcook";
import { Caveat_700Bold } from "@expo-google-fonts/caveat";
import { SpaceGrotesk_500Medium } from "@expo-google-fonts/space-grotesk";
import { CormorantGaramond_500Medium_Italic } from "@expo-google-fonts/cormorant-garamond";
import { Archivo_700Bold } from "@expo-google-fonts/archivo";
import { Anton_400Regular } from "@expo-google-fonts/anton";

import { PushNotificationOverlay } from "@/components/ui/PushNotificationOverlay";

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    "Cinzel-500": Cinzel_500Medium,
    "Cinzel-700": Cinzel_700Bold,
    "Inter-400": Inter_400Regular,
    "Inter-600": Inter_600SemiBold,
    "BebasNeue-400": BebasNeue_400Regular,
    "PermanentMarker-400": PermanentMarker_400Regular,
    "UnifrakturCook-700": UnifrakturCook_700Bold,
    "Caveat-700": Caveat_700Bold,
    "SpaceGrotesk-500": SpaceGrotesk_500Medium,
    "CormorantGaramond-500-Italic": CormorantGaramond_500Medium_Italic,
    "Archivo-700": Archivo_700Bold,
    "Anton-400": Anton_400Regular,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => {});
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0a0a0a" } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="eleitos/[artist]"
            options={{ presentation: "fullScreenModal", animation: "slide_from_bottom" }}
          />
        </Stack>
        <PushNotificationOverlay />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
