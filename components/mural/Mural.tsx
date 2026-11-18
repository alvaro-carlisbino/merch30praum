"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Flag, SendHorizontal } from "lucide-react";
import type { MuralFeed, MuralMessage } from "@/lib/mural/types";

const MAX_BODY = 280;
const MAX_NICK = 24;
const POLL_VISIBLE_MS = 2500;
const POLL_HIDDEN_MS = 15000;

interface Props {
  room: string;
  title: string;
  accentHex: string;
  bgHex: string;
}

function readStorage(key: string): string {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function visitorId(): string {
  let id = readStorage("mural:visitor");
  if (!/^[a-z0-9]{8,40}$/i.test(id)) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    writeStorage("mural:visitor", id);
  }
  return id;
}

function timeLabel(iso: string, now: number): string {
  const diff = Math.max(0, now - Date.parse(iso));
  if (diff < 45_000) return "agora";
  const min = Math.round(diff / 60_000);
  if (min < 60) return `${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h`;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

export function Mural({ room, title, accentHex, bgHex }: Props) {
  const [messages, setMessages] = useState<MuralMessage[]>([]);
  const [online, setOnline] = useState(0);
  const [status, setStatus] = useState<"loading" | "live" | "offline">("loading");
  const [nickname, setNickname] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reported, setReported] = useState<Set<number>>(new Set());
  const [now, setNow] = useState(() => Date.now());

  const cursor = useRef<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const stickToBottom = useRef(true);
  const visitor = useRef("");

  useEffect(() => {
    visitor.current = visitorId();
    // Apelido salvo só existe no navegador: lido depois da hidratação.
    const t = setTimeout(() => setNickname((cur) => cur || readStorage("mural:nickname")), 0);
    return () => clearTimeout(t);
  }, []);

  const merge = useCallback((incoming: MuralMessage[], removed: number[] = []) => {
    setMessages((prev) => {
      const gone = new Set(removed);
      const byId = new Map(prev.filter((m) => !gone.has(m.id)).map((m) => [m.id, m]));
      for (const m of incoming) if (!gone.has(m.id)) byId.set(m.id, m);
      const next = [...byId.values()].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      return next.slice(-200);
    });
    const newest = incoming.at(-1)?.createdAt;
    if (newest && (!cursor.current || newest > cursor.current)) cursor.current = newest;
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;
    const controller = new AbortController();

    async function poll() {
      try {
        const qs = new URLSearchParams({ v: visitor.current || visitorId() });
        if (cursor.current) qs.set("after", cursor.current);
        const res = await fetch(`/api/mural/${room}?${qs}`, { cache: "no-store", signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        const feed: MuralFeed = await res.json();
        merge(feed.messages, feed.removed);
        if (!cursor.current) cursor.current = feed.serverTime;
        setOnline(feed.online);
        setStatus("live");
      } catch {
        if (!controller.signal.aborted) setStatus("offline");
      }
      if (!stopped) {
        timer = setTimeout(poll, document.hidden ? POLL_HIDDEN_MS : POLL_VISIBLE_MS);
      }
    }

    const onVisible = () => {
      if (!document.hidden) {
        clearTimeout(timer);
        poll();
      }
    };

    poll();
    document.addEventListener("visibilitychange", onVisible);
    const clock = setInterval(() => setNow(Date.now()), 30_000);
    return () => {
      stopped = true;
      controller.abort();
      clearTimeout(timer);
      clearInterval(clock);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [room, merge]);

  useEffect(() => {
    const el = listRef.current;
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function onScroll() {
    const el = listRef.current;
    if (el) stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const nick = nickname.trim();
    const text = body.trim();
    if (nick.length < 2) return setError("Escolha um apelido antes.");
    if (!text) return;
    setSending(true);
    setError("");
    try {
      const website = String(new FormData(e.currentTarget).get("website") ?? "");
      const res = await fetch(`/api/mural/${room}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nick, body: text, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Não foi agora. Tenta de novo.");
        return;
      }
      writeStorage("mural:nickname", nick);
      setBody("");
      stickToBottom.current = true;
      if (data.message) merge([data.message]);
    } catch {
      setError("Sem conexão. Tenta de novo.");
    } finally {
      setSending(false);
    }
  }

  async function report(id: number) {
    setReported((prev) => new Set(prev).add(id));
    await fetch("/api/mural/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }

  const myNick = nickname.trim().toLowerCase();

  return (
    <section
      aria-labelledby="mural"
      className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <h2 id="mural" className="font-display text-3xl uppercase sm:text-4xl">
            Mural
          </h2>
          <p className="mt-3 max-w-sm leading-relaxed text-white/70">
            Deixa seu recado sobre {title}. Quem está ouvindo agora vê na hora.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/80" aria-live="polite">
            <span className="relative flex size-2.5" aria-hidden>
              {status === "live" && (
                <span
                  className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
                  style={{ background: accentHex }}
                />
              )}
              <span
                className="relative inline-flex size-2.5 rounded-full"
                style={{ background: status === "live" ? accentHex : "rgba(255,255,255,0.3)" }}
              />
            </span>
            {status === "loading" && "Conectando"}
            {status === "offline" && "Reconectando"}
            {status === "live" && (
              <span className="tabular-nums">
                {online} {online === 1 ? "pessoa" : "pessoas"} no mural agora
              </span>
            )}
          </p>
          <p className="mt-8 max-w-sm text-xs leading-relaxed text-white/45">
            Link, ofensa e flood não passam. Três denúncias tiram um recado do ar e a equipe da 30praum
            acompanha tudo.
          </p>
        </div>

        <div className="flex min-h-0 flex-col border border-white/12 bg-black/25">
          <ol
            ref={listRef}
            onScroll={onScroll}
            className="h-[26rem] overflow-y-auto overscroll-contain px-4 py-4 sm:px-6"
            aria-label={`Recados sobre ${title}`}
          >
            {status !== "loading" && messages.length === 0 && (
              <li className="flex h-full items-center justify-center text-center text-sm text-white/50">
                Ninguém escreveu ainda. O primeiro recado é seu.
              </li>
            )}
            <AnimatePresence initial={false}>
              {messages.map((m) => {
                const mine = m.nickname.toLowerCase() === myNick && myNick.length > 0;
                return (
                  <motion.li
                    key={m.id}
                    layout="position"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="group py-2.5"
                  >
                    <div className="flex items-baseline gap-2 text-xs">
                      <span className="font-medium" style={{ color: mine ? "#fff" : accentHex }}>
                        {m.nickname}
                      </span>
                      <time dateTime={m.createdAt} className="text-white/40">
                        {timeLabel(m.createdAt, now)}
                      </time>
                      {!mine && (
                        <button
                          type="button"
                          onClick={() => report(m.id)}
                          disabled={reported.has(m.id)}
                          className="ml-auto inline-flex items-center gap-1 text-white/35 opacity-0 transition-opacity hover:text-white/80 focus-visible:opacity-100 group-hover:opacity-100 disabled:opacity-100"
                          aria-label={`Denunciar recado de ${m.nickname}`}
                        >
                          <Flag aria-hidden size={12} strokeWidth={1.6} />
                          {reported.has(m.id) ? "Denunciado" : "Denunciar"}
                        </button>
                      )}
                    </div>
                    <p className="mt-1 whitespace-pre-line break-words leading-relaxed text-white/90">{m.body}</p>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>

          <form onSubmit={send} className="border-t border-white/12 p-3 sm:p-4">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="mural-nick">
                Apelido
              </label>
              <input
                id="mural-nick"
                value={nickname}
                onChange={(e) => setNickname(e.target.value.slice(0, MAX_NICK))}
                placeholder="Seu apelido"
                autoComplete="nickname"
                className="w-full border border-white/15 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-white/35 focus:border-white/50 sm:w-40"
              />
              <label className="sr-only" htmlFor="mural-body">
                Recado
              </label>
              <textarea
                id="mural-body"
                value={body}
                onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                rows={1}
                placeholder="Escreve seu recado"
                className="min-h-[2.75rem] flex-1 resize-none border border-white/15 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-white/35 focus:border-white/50"
              />
              <button
                type="submit"
                disabled={sending || !body.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 disabled:opacity-40"
                style={{ background: accentHex, color: bgHex }}
              >
                Mandar
                <SendHorizontal aria-hidden size={15} strokeWidth={1.8} />
              </button>
            </div>
            <div className="mt-2 flex justify-between gap-4 text-xs">
              <span className="text-[#ff8a8a]" role="status">
                {error}
              </span>
              <span className="tabular-nums text-white/35">
                {body.length}/{MAX_BODY}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
