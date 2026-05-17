import { useEffect } from "react";
import { Pressable, Text, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { Image } from "expo-image";
import { router } from "expo-router";

import { useNotificationQueue } from "@/lib/notifications/mock-queue";

const AUTO_DISMISS_MS = 5500;
const HIDDEN_Y = -160;

export function PushNotificationOverlay() {
  const insets = useSafeAreaInsets();
  const current = useNotificationQueue((s) => s.current);
  const dismiss = useNotificationQueue((s) => s.dismiss);

  const translateY = useSharedValue(HIDDEN_Y);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!current) {
      translateY.value = withTiming(HIDDEN_Y, { duration: 220 });
      opacity.value = withTiming(0, { duration: 220 });
      return;
    }
    translateY.value = withSpring(insets.top + 8, { damping: 18, stiffness: 180 });
    opacity.value = withTiming(1, { duration: 180 });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    const t = setTimeout(() => {
      dismiss();
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [current, dismiss, insets.top, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const swipeUp = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .onUpdate((e) => {
      if (e.translationY < 0) {
        translateY.value = insets.top + 8 + e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY < -40) {
        runOnJS(dismiss)();
      } else {
        translateY.value = withSpring(insets.top + 8, { damping: 18, stiffness: 180 });
      }
    });

  const handleTap = () => {
    if (!current) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    const href = current.href;
    dismiss();
    setTimeout(() => router.push(href as never), 120);
  };

  if (!current) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 999,
        },
        animatedStyle,
      ]}
    >
      <GestureDetector gesture={swipeUp}>
        <Pressable onPress={handleTap} style={{ width: "92%" }}>
          <BlurView
            intensity={Platform.OS === "ios" ? 80 : 60}
            tint="dark"
            style={{
              borderRadius: 18,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                gap: 12,
                backgroundColor: "rgba(20,20,20,0.55)",
              }}
            >
              <Image
                source={{ uri: current.avatar }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  backgroundColor: "#222",
                }}
                contentFit="cover"
              />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text
                    style={{
                      color: "#f5f0e8",
                      fontFamily: "Inter-600",
                      fontSize: 13,
                      letterSpacing: 0.3,
                    }}
                    numberOfLines={1}
                  >
                    {current.appName}
                  </Text>
                  <Text style={{ color: "rgba(245,240,232,0.55)", fontSize: 11, fontFamily: "Inter-400" }}>
                    agora
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#f5f0e8",
                    fontFamily: "Inter-600",
                    fontSize: 14,
                    marginTop: 2,
                  }}
                  numberOfLines={1}
                >
                  {current.title}
                </Text>
                <Text
                  style={{
                    color: "rgba(245,240,232,0.75)",
                    fontFamily: "Inter-400",
                    fontSize: 13,
                    marginTop: 1,
                  }}
                  numberOfLines={2}
                >
                  {current.body}
                </Text>
              </View>
            </View>
          </BlurView>
        </Pressable>
      </GestureDetector>
    </Animated.View>
  );
}
