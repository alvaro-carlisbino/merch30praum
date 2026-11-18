export interface MuralMessage {
  id: number;
  nickname: string;
  body: string;
  createdAt: string;
}

export interface MuralFeed {
  messages: MuralMessage[];
  removed: number[];
  online: number;
  serverTime: string;
}
