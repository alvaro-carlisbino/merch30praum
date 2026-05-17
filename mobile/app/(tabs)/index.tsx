import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FeedHeader } from "@/components/home/FeedHeader";
import { StoriesRow } from "@/components/home/StoriesRow";
import { FeedCard } from "@/components/home/FeedCard";
import { useFeedItems } from "@/lib/feed/feed-items";
import { MOCK_PUSHES, useNotificationQueue } from "@/lib/notifications/mock-queue";
import { useTheme } from "@/lib/theme";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const showPayload = useNotificationQueue((s) => s.show);
  const setActive = useTheme((s) => s.setActive);
  const tokens = useTheme((s) => s.tokens);
  const [refreshing, setRefreshing] = useState(false);
  const feedItems = useFeedItems();

  useEffect(() => {
    setActive("house");
    const t = setTimeout(() => showPayload(MOCK_PUSHES[0]), 4000);
    return () => clearTimeout(t);
  }, [setActive, showPayload]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showPayload(MOCK_PUSHES[1]);
    }, 700);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingTop: insets.top }}>
      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        ListHeaderComponent={
          <View>
            <FeedHeader />
            <StoriesRow />
            <View style={{ height: 18 }} />
          </View>
        }
        ListFooterComponent={<View style={{ height: 32 }} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={tokens.accent}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
