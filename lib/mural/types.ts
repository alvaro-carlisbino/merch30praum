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

export interface MuralViewer {
  name: string | null;
  badge: AuthorType;
  isMod: boolean;
}

export interface MuralFeed {
  messages: MuralMessage[];
  removed: number[];
  reactions: Record<string, number>;
  online: number;
  serverTime: string;
  enabled: boolean;
  slowModeSeconds: number;
  pinned: { text: string; href?: string } | null;
  viewer: MuralViewer;
}

export const REACTION_EMOJIS = ["🔥", "🐐", "💯", "😂", "❤️", "🤯"] as const;
