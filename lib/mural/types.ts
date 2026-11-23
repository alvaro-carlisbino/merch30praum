export type AuthorType = "fan" | "staff" | "artist";

export interface MuralMessage {
  id: number;
  nickname: string;
  body: string;
  createdAt: string;
  authorType: AuthorType;
  mine?: boolean;
  reports?: number;
}

export interface FanView {
  nickname: string | null;
  needsProfile: boolean;
  fullName: string;
  city: string;
  state: string;
  phone: string;
}

export interface MuralViewer {
  name: string | null;
  badge: AuthorType;
  isMod: boolean;
  fan?: FanView | null;
  loginAvailable?: boolean;
}

export interface MuralFeed {
  messages: MuralMessage[];
  removed: number[];
  reactions: { id: number; emoji: string }[];
  serverTime: string;
  enabled: boolean;
  slowModeSeconds: number;
  pinned: { text: string; href?: string } | null;
  viewer: MuralViewer;
}

export const REACTION_EMOJIS = ["🔥", "🐐", "💯", "😂", "❤️", "🤯"] as const;
