import { Pressable, Text, View } from "react-native";
import { Bell } from "lucide-react-native";
import { useNotificationQueue } from "@/lib/notifications/mock-queue";

export function FeedHeader() {
  const showNext = useNotificationQueue((s) => s.showNext);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 6,
        paddingBottom: 16,
      }}
    >
      <View>
        <Text
          style={{
            color: "#F5F0E8",
            fontFamily: "Cinzel-700",
            fontSize: 14,
            letterSpacing: 6,
          }}
        >
          30PRAUM
        </Text>
        <Text
          style={{
            color: "rgba(245,240,232,0.4)",
            fontFamily: "Cinzel-500",
            fontSize: 8,
            letterSpacing: 3,
            marginTop: 2,
          }}
        >
          PRA CENA · DA CENA
        </Text>
      </View>
      <Pressable onPress={showNext} hitSlop={16}>
        <Bell size={18} color="#F5F0E8" strokeWidth={1.4} />
      </Pressable>
    </View>
  );
}
