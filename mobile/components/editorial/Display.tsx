import { Dimensions, Text, View, type TextStyle, type StyleProp } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const SHORT = WINDOW_WIDTH < 380;

export function scaleType(base: number, opts?: { minScale?: number }): number {
  const minScale = opts?.minScale ?? 0.82;
  return SHORT ? base * minScale : base;
}

type DisplayFont = "display" | "matue" | "wiu" | "teto" | "brandao" | "cinzel";

const FONT_MAP: Record<DisplayFont, string> = {
  display: "BebasNeue-400",
  matue: "SpaceGrotesk-500",
  wiu: "CormorantGaramond-500-Italic",
  teto: "Archivo-700",
  brandao: "Anton-400",
  cinzel: "Cinzel-700",
};

function negativeTracking(size: number): number {
  if (size >= 100) return -size * 0.04;
  if (size >= 60) return -size * 0.03;
  if (size >= 36) return -size * 0.02;
  if (size >= 20) return -size * 0.012;
  return 0;
}

interface DisplayProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  font?: DisplayFont;
  lineHeight?: number;
  align?: "left" | "center" | "right";
  italic?: boolean;
  style?: StyleProp<TextStyle>;
}

export function Display({
  children,
  size = 56,
  color = "#F5F5F5",
  font = "display",
  lineHeight = 0.92,
  align = "left",
  italic = false,
  style,
}: DisplayProps) {
  const scaled = scaleType(size);
  return (
    <Text
      style={[
        {
          color,
          fontFamily: FONT_MAP[font],
          fontSize: scaled,
          lineHeight: scaled * lineHeight,
          letterSpacing: negativeTracking(scaled),
          textTransform: font === "wiu" ? "none" : "uppercase",
          textAlign: align,
          fontStyle: italic ? "italic" : "normal",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

interface WordmarkProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  tracking?: number;
  style?: StyleProp<TextStyle>;
}

export function Wordmark({ children, size = 14, color = "#F5F5F5", tracking = 0.4, style }: WordmarkProps) {
  return (
    <Text
      style={[
        {
          color,
          fontFamily: "Cinzel-700",
          fontSize: scaleType(size),
          letterSpacing: scaleType(size) * tracking,
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
  size?: number;
}

export function Eyebrow({ children, color = "#FFFFFF", align = "left", size = 10 }: EyebrowProps) {
  return (
    <Text
      style={{
        color,
        fontFamily: "Cinzel-700",
        fontSize: size,
        letterSpacing: size * 0.4,
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

export function PullQuote({ children, color = "#F5F5F5", size = 22 }: PullQuoteProps) {
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

export function DropCap({ children, color = "rgba(245,245,245,0.85)", accent = "#FFFFFF" }: DropCapProps) {
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
          marginRight: 10,
          marginTop: 2,
          letterSpacing: -2,
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

export function Divider({ color = "rgba(255,255,255,0.12)", margin = 24 }: DividerProps) {
  return <View style={{ height: 1, backgroundColor: color, marginVertical: margin }} />;
}
