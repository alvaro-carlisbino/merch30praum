import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FeedHeader } from "@/components/home/FeedHeader";
import { StoriesRow } from "@/components/home/StoriesRow";
import { FeaturedHero } from "@/components/home/FeaturedHero";
import { EditorialFeed } from "@/components/home/EditorialFeed";

import { MOCK_PUSHES, useNotificationQueue } from "@/lib/notifications/mock-queue";
import { useTheme } from "@/lib/theme";
import { useArtists, useCurrentPlantao } from "@/lib/cms/queries";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const showPayload = useNotificationQueue((s) => s.show);
  const setActive = useTheme((s) => s.setActive);
  const tokens = useTheme((s) => s.tokens);

  const { data: artists } = useArtists();
  const { data: plantao } = useCurrentPlantao();

  const [refreshing, setRefreshing] = useState(false);

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

  const featured = (artists ?? []).find((a) => a.drop.status === "live") ?? artists?.[0] ?? null;

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={tokens.accent}
          />
        }
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 40 }}
      >
        <FeedHeader />
        {featured ? <FeaturedHero artist={featured} /> : null}
        <StoriesRow />
        {artists && plantao ? <EditorialFeed artists={artists} plantao={plantao} /> : null}
      </ScrollView>
    </View>
  );
}
