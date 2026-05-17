import { Dimensions, Text, View, type TextStyle, type StyleProp } from "react-native";

const SHORT = Dimensions.get("window").width < 380;

export function scaleType(base: number, opts?: { minScale?: number }): number {
  const minScale = opts?.minScale ?? 0.82;
  return SHORT ? base * minScale : base;
}

interface DisplayProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function Display({ children, size = 64, color = "#F5F0E8", style }: DisplayProps) {
  return (
    <Text
      style={[
        {
          color,
          fontFamily: "BebasNeue-400",
          fontSize: scaleType(size),
          lineHeight: scaleType(size) * 1.0,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  align?: "left" | "center" | "right";
}

export function Eyebrow({ children, color = "#C89858", align = "left" }: EyebrowProps) {
  return (
    <Text
      style={{
        color,
        fontFamily: "Cinzel-700",
        fontSize: 10,
        letterSpacing: 4,
        textTransform: "uppercase",
        textAlign: align,
      }}
    >
      {children}
    </Text>
  );
}

interface PullQuoteProps {
  children: string;
  color?: string;
  size?: number;
}

export function PullQuote({ children, color = "#F5F0E8", size = 22 }: PullQuoteProps) {
  return (
    <View style={{ paddingVertical: 12 }}>
      <Text
        style={{
          color,
          fontFamily: "CormorantGaramond-500-Italic",
          fontSize: scaleType(size),
          lineHeight: scaleType(size) * 1.25,
          letterSpacing: 0.2,
        }}
      >
        “{children}”
      </Text>
    </View>
  );
}

interface DropCapProps {
  children: string;
  color?: string;
  accent?: string;
}

export function DropCap({ children, color = "rgba(245,240,232,0.85)", accent = "#F5F0E8" }: DropCapProps) {
  if (!children) return null;
  const first = children.charAt(0);
  const rest = children.slice(1);
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{
          color: accent,
          fontFamily: "BebasNeue-400",
          fontSize: 64,
          lineHeight: 56,
          marginRight: 8,
          marginTop: 2,
        }}
      >
        {first}
      </Text>
      <Text
        style={{
          flex: 1,
          color,
          fontFamily: "Inter-400",
          fontSize: scaleType(14),
          lineHeight: scaleType(14) * 1.55,
        }}
      >
        {rest}
      </Text>
    </View>
  );
}

interface DividerProps {
  color?: string;
  margin?: number;
}

export function Divider({ color = "rgba(245,240,232,0.12)", margin = 24 }: DividerProps) {
  return <View style={{ height: 1, backgroundColor: color, marginVertical: margin }} />;
}
