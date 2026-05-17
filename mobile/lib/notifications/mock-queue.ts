import { create } from "zustand";
import { IMG } from "@/lib/images/unsplash";

export interface PushPayload {
  id: string;
  avatar: string;
  appName: string;
  title: string;
  body: string;
  href: string;
}

export const MOCK_PUSHES: PushPayload[] = [
  {
    id: "matue-drop",
    avatar: IMG.matuePortrait,
    appName: "30praum",
    title: "Matuê",
    body: "Acabou de soltar peça nova de XTRANHO. Toca aqui pra ver.",
    href: "/eleitos/matue",
  },
  {
    id: "plantao-vip",
    avatar: IMG.plantaoPoster26,
    appName: "Plantão · 30praum",
    title: "Plantão 2026 · ingressos VIP",
    body: "Front Boladão liberado por 24h. Garanta o seu.",
    href: "/plantao",
  },
  {
    id: "wiu-teto-colab",
    avatar: IMG.wiuPortrait,
    appName: "30praum",
    title: "Wiu × Teto",
    body: "Colapso Global agora disponível em tudo. Ouve já.",
    href: "/eleitos/wiu",
  },
  {
    id: "brandao-isso-trap",
    avatar: IMG.brandaoPortrait,
    appName: "30praum",
    title: "Brandão85",
    body: "Isso é Trap Vol.02 chegou. Capítulo final do trap nacional.",
    href: "/eleitos/brandao",
  },
];

interface NotificationStore {
  current: PushPayload | null;
  cursor: number;
  show: (payload: PushPayload) => void;
  showNext: () => void;
  dismiss: () => void;
}

export const useNotificationQueue = create<NotificationStore>((set, get) => ({
  current: null,
  cursor: 0,
  show: (payload) => set({ current: payload }),
  showNext: () => {
    const { cursor } = get();
    const next = MOCK_PUSHES[cursor % MOCK_PUSHES.length];
    set({ current: next, cursor: cursor + 1 });
  },
  dismiss: () => set({ current: null }),
}));
