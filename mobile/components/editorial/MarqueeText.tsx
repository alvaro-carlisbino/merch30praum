import { useEffect } from "react";
import { View, Text, type TextStyle, type StyleProp } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface Props {
  text: string;
  durationMs?: number;
  style?: StyleProp<TextStyle>;
  spacing?: number;
}

export function MarqueeText({ text, durationMs = 14000, style, spacing = 48 }: Props) {
  const x = useSharedValue(0);

  useEffect(() => {
    x.value = 0;
    x.value = withRepeat(
      withTiming(-1, { duration: durationMs, easing: Easing.linear }),
      -1,
      false
    );
  }, [durationMs, x]);

  const animated = useAnimatedStyle(() => ({ transform: [{ translateX: `${x.value * 100}%` }] }));

  const block = `${text}${" ".repeat(Math.max(1, Math.round(spacing / 4)))}`;
  const repeated = block.repeat(4);

  return (
    <View style={{ overflow: "hidden", flexDirection: "row" }}>
      <Animated.View style={[{ flexDirection: "row" }, animated]}>
        <Text style={style} numberOfLines={1}>
          {repeated}
        </Text>
        <Text style={style} numberOfLines={1}>
          {repeated}
        </Text>
      </Animated.View>
    </View>
  );
}
