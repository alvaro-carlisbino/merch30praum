import { Pressable, Text, View } from "react-native";
import { Bell } from "lucide-react-native";
import { useNotificationQueue } from "@/lib/notifications/mock-queue";
import { useTheme } from "@/lib/theme";

export function FeedHeader() {
  const showNext = useNotificationQueue((s) => s.showNext);
  const tokens = useTheme((s) => s.tokens);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 14,
      }}
    >
      <Text
        style={{
          fontFamily: "Cinzel-700",
          fontSize: 22,
          color: tokens.fg,
          letterSpacing: 4,
        }}
      >
        30PRAUM
      </Text>
      <Pressable
        onPress={showNext}
        hitSlop={12}
        style={{
          width: 38,
          height: 38,
          borderRadius: 19,
          borderWidth: 1,
          borderColor: "rgba(245,240,232,0.12)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Bell size={18} color={tokens.fg} strokeWidth={1.5} />
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 9,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: tokens.accent,
          }}
        />
      </Pressable>
    </View>
  );
}
