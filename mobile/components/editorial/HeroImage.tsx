import { View, type ViewStyle, type StyleProp } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  uri: string;
  height: number;
  overlay?: "soft" | "deep" | "none";
  tone?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function HeroImage({ uri, height, overlay = "deep", tone = "#0a0a0a", children, style }: Props) {
  return (
    <View style={[{ height, width: "100%", position: "relative", backgroundColor: tone }, style]}>
      <Image source={{ uri }} style={{ flex: 1 }} contentFit="cover" cachePolicy="memory-disk" />
      {overlay !== "none" && (
        <LinearGradient
          colors={
            overlay === "deep"
              ? ["rgba(0,0,0,0.05)", "rgba(0,0,0,0.55)", "rgba(0,0,0,0.92)"]
              : ["rgba(0,0,0,0.0)", "rgba(0,0,0,0.55)"]
          }
          locations={overlay === "deep" ? [0, 0.55, 1] : [0, 1]}
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        />
      )}
      {children}
    </View>
  );
}
