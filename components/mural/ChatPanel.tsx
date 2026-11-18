"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, BadgeCheck, Ban, EyeOff, Flag, Info, Pencil, Pin, SendHorizontal, Trash2 } from "lucide-react";
import { moderate, react, report, sendMessage } from "@/lib/mural/client";
import { emptyRoom, useChat } from "@/lib/mural/store";
import { REACTION_EMOJIS, type MuralMessage } from "@/lib/mural/types";

const MAX_BODY = 280;
const MAX_NICK = 24;
export const LIVE_RED = "#ff3b30";

const REPORT_REASONS = [
  { value: "ofensa", label: "Ofensa ou ódio" },
  { value: "sexual", label: "Conteúdo sexual" },
  { value: "dados", label: "Dados pessoais" },
  { value: "spam", label: "Spam ou golpe" },
];

function timeLabel(iso: string, now: number): string {
  const diff = Math.max(0, now - Date.parse(iso));
  if (diff < 45_000) return "agora";
  const min = Math.round(diff / 60_000);
  if (min < 60) return `${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h`;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

export function LiveDot({ live, size = 10 }: { live: boolean; size?: number }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }} aria-hidden>
      {live && (
        <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ background: LIVE_RED }} />
      )}
      <span
        className="relative inline-flex size-full rounded-full"
        style={{ background: live ? LIVE_RED : "rgba(255,255,255,0.3)" }}
      />
    </span>
  );
}

function Badge({ type }: { type: MuralMessage["authorType"] }) {
  if (type === "fan") return null;
  return (
    <span
      className="inline-flex items-center gap-0.5 rounded-sm px-1 py-px text-[10px] font-semibold uppercase tracking-wide"
      style={type === "artist" ? { background: "#f5d76e", color: "#000" } : { background: "#fff", color: "#000" }}
    >
      <BadgeCheck aria-hidden size={11} strokeWidth={2.2} />
      {type === "artist" ? "Artista" : "30praum"}
    </span>
  );
}

export function BurstLayer({ room }: { room: string }) {
  const bursts = useChat((s) => s.rooms[room]?.bursts ?? []);
  const drop = useChat((s) => s.dropBurst);
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.span
            key={b.id}
            className="absolute bottom-16 text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            style={{ left: `${b.x}%` }}
            initial={{ y: 0, opacity: 0, scale: 0.4 }}
            animate={{
              y: [-10, -260, -420],
              opacity: [0, 1, 0],
              scale: [0.6, 1.25, 1],
              x: [0, (b.x > 50 ? -1 : 1) * 24, 0],
            }}
            transition={{ duration: 2.4, delay: b.delay, ease: "easeOut" }}
            onAnimationComplete={() => drop(room, b.id)}
          >
            {b.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface PanelProps {
  room: string;
  title: string;
  accentHex?: string;
  /** Altura da lista. No sheet do celular ela ocupa o que sobrar. */
  fill?: boolean;
  listClassName?: string;
  focused?: boolean;
}

export function ChatPanel({ room, title, accentHex = "#ffffff", fill, listClassName, focused = true }: PanelProps) {
  const state = useChat((s) => s.rooms[room]) ?? emptyRoom();
  const viewer = useChat((s) => s.viewer);
  const nickname = useChat((s) => s.nickname);
  const setNickname = useChat((s) => s.setNickname);
  const watch = useChat((s) => s.watch);
  const markRead = useChat((s) => s.markRead);

  const [body, setBody] = useState("");
  const [nickDraft, setNickDraft] = useState("");
  const [editingNick, setEditingNick] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [menu, setMenu] = useState<number | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  const listRef = useRef<HTMLOListElement>(null);
  const atBottom = useRef(true);
  const lastCount = useRef(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => watch(room, focused), [room, focused, watch]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useLayoutEffect(() => {
    const el = listRef.current;
    const count = state.messages.length;
    const added = count - lastCount.current;
    lastCount.current = count;
    if (!el) return;
    if (atBottom.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: added > 3 ? "auto" : "smooth" });
      markRead(room);
    } else if (added > 0) {
      setNewCount((n) => n + added);
    }
  }, [state.messages.length, room, markRead]);

  function onScroll() {
    const el = listRef.current;
    if (!el) return;
    atBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    if (atBottom.current && newCount) {
      setNewCount(0);
      markRead(room);
    }
  }

  function jumpToEnd() {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setNewCount(0);
  }

  const loggedName = viewer.name;
  const needsNick = !loggedName && (nickname.trim().length < 2 || editingNick);

  async function submit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (sending || cooldown > 0) return;
    if (needsNick) {
      const n = nickDraft.trim();
      if (n.length < 2) return setError("Escolha um apelido com pelo menos 2 letras.");
      setNickname(n);
      setEditingNick(false);
      setError("");
      if (!body.trim()) {
        inputRef.current?.focus();
        return;
      }
    }
    const text = body.trim();
    if (!text) return;
    setSending(true);
    setError("");
    const website = e ? String(new FormData(e.currentTarget).get("website") ?? "") : "";
    const result = await sendMessage(room, loggedName ?? (needsNick ? nickDraft.trim() : nickname), text, website);
    setSending(false);
    if (!result.ok) {
      setError(result.error);
      if (result.wait) setCooldown(result.wait);
      return;
    }
    setBody("");
    atBottom.current = true;
    if (!viewer.isMod) setCooldown(Math.max(state.slowModeSeconds, 3));
    inputRef.current?.focus();
  }

  async function clearAll() {
    if (!window.confirm(`Ocultar todos os recados de "${title}"? Eles somem para todo mundo.`)) return;
    await moderate("clear", { room });
  }

  const live = state.status === "live";

  return (
    <div className={`relative flex min-h-0 flex-col ${fill ? "h-full" : ""}`}>
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <LiveDot live={live} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <p className="text-xs tabular-nums text-white/55" aria-live="polite">
            {state.status === "loading" && "Conectando"}
            {state.status === "offline" && "Reconectando"}
            {live && `${state.online} ${state.online === 1 ? "pessoa" : "pessoas"} agora`}
          </p>
        </div>
        {viewer.isMod && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/70 hover:border-white/40 hover:text-white"
            title="Ocultar todos os recados desta sala"
          >
            <Trash2 aria-hidden size={13} /> Limpar
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowRules((v) => !v)}
          className="rounded-full p-1.5 text-white/55 hover:bg-white/10 hover:text-white"
          aria-expanded={showRules}
          aria-label="Regras e privacidade"
        >
          <Info aria-hidden size={17} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showRules && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-white/10 bg-white/[0.04]"
          >
            <ul className="space-y-1.5 px-4 py-3 text-xs leading-relaxed text-white/70">
              <li>Sem ódio, conteúdo sexual, golpe, link ou divulgação de perfil. A moderação barra na hora.</li>
              <li>Não passe telefone, e-mail, endereço ou documento. O chat bloqueia número longo e e-mail.</li>
              <li>Não guardamos seu IP. Usamos um código anônimo só para frear spam e aplicar banimentos.</li>
              <li>Recados somem sozinhos depois de alguns dias. Denúncias de várias pessoas tiram um recado do ar.</li>
              <li>Selo branco é a equipe da 30praum. Selo amarelo é artista. Ninguém mais pode usar esses nomes.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {state.pinned && (
        <div className="flex items-start gap-2 border-b border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm">
          <Pin aria-hidden size={14} className="mt-0.5 shrink-0 text-white/60" />
          {state.pinned.href ? (
            <Link href={state.pinned.href} className="underline-offset-4 hover:underline">
              {state.pinned.text}
            </Link>
          ) : (
            <span>{state.pinned.text}</span>
          )}
        </div>
      )}

      {/* Mensagens */}
      <div className={`relative min-h-0 ${fill ? "flex-1" : ""}`}>
        <ol
          ref={listRef}
          onScroll={onScroll}
          className={`overflow-y-auto overscroll-contain px-4 py-3 ${fill ? "absolute inset-0" : ""} ${listClassName ?? "h-[24rem]"}`}
          aria-label={`Recados em ${title}`}
        >
          {state.status !== "loading" && state.messages.length === 0 && (
            <li className="flex h-full min-h-40 flex-col items-center justify-center gap-2 text-center text-sm text-white/50">
              <span className="text-3xl" aria-hidden>
                🎙️
              </span>
              Ninguém escreveu ainda. Abre a roda.
            </li>
          )}
          <AnimatePresence initial={false}>
            {state.messages.map((m) => (
              <motion.li
                key={m.id}
                layout="position"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className={`group relative -mx-2 rounded-md px-2 py-1.5 ${m.mine ? "bg-white/[0.06]" : ""} ${m.authorType !== "fan" ? "bg-white/[0.08]" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                  <span
                    className="font-semibold"
                    style={{ color: m.authorType !== "fan" || m.mine ? "#fff" : accentHex === "#ffffff" ? "#c9c9c9" : accentHex }}
                  >
                    {m.nickname}
                  </span>
                  <Badge type={m.authorType} />
                  <time dateTime={m.createdAt} className="text-white/35">
                    {timeLabel(m.createdAt, now)}
                  </time>
                  {viewer.isMod && (m.reports ?? 0) > 0 && (
                    <span className="rounded bg-[#ff3b30]/20 px-1 text-[10px] text-[#ff8a80]">{m.reports} denúncias</span>
                  )}
                  {!m.mine && (
                    <button
                      type="button"
                      onClick={() => setMenu(menu === m.id ? null : m.id)}
                      className="ml-auto rounded p-1 text-white/30 opacity-100 transition hover:bg-white/10 hover:text-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                      aria-label={`Opções do recado de ${m.nickname}`}
                      aria-expanded={menu === m.id}
                    >
                      <Flag aria-hidden size={12} />
                    </button>
                  )}
                </div>
                <p className="mt-0.5 whitespace-pre-line break-words text-[15px] leading-snug text-white/90">{m.body}</p>

                <AnimatePresence>
                  {menu === m.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2 flex flex-wrap gap-1.5"
                    >
                      {viewer.isMod ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setMenu(null);
                              moderate("hide", { id: m.id, room });
                            }}
                            className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs hover:bg-white/20"
                          >
                            <EyeOff aria-hidden size={12} /> Ocultar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setMenu(null);
                              moderate("ban", { id: m.id, room, hours: 24 });
                            }}
                            className="inline-flex items-center gap-1 rounded-full bg-[#ff3b30]/20 px-2.5 py-1 text-xs text-[#ffb4ae] hover:bg-[#ff3b30]/30"
                          >
                            <Ban aria-hidden size={12} /> Banir 24h
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setMenu(null);
                              moderate("ban", { id: m.id, room, hours: 24 * 30 });
                            }}
                            className="inline-flex items-center gap-1 rounded-full bg-[#ff3b30]/20 px-2.5 py-1 text-xs text-[#ffb4ae] hover:bg-[#ff3b30]/30"
                          >
                            <Ban aria-hidden size={12} /> Banir 30 dias
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="w-full text-[11px] text-white/45">Denunciar por:</span>
                          {REPORT_REASONS.map((r) => (
                            <button
                              key={r.value}
                              type="button"
                              onClick={() => {
                                setMenu(null);
                                report(room, m.id, r.value);
                              }}
                              className="rounded-full bg-white/10 px-2.5 py-1 text-xs hover:bg-white/20"
                            >
                              {r.label}
                            </button>
                          ))}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>

        <AnimatePresence>
          {newCount > 0 && (
            <motion.button
              type="button"
              onClick={jumpToEnd}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black shadow-lg"
            >
              <ArrowDown aria-hidden size={13} /> {newCount} {newCount === 1 ? "novo" : "novos"}
            </motion.button>
          )}
        </AnimatePresence>
        <BurstLayer room={room} />
      </div>

      {/* Reações */}
      <div className="flex items-center justify-between gap-1 border-t border-white/10 px-3 py-2">
        {REACTION_EMOJIS.map((emoji) => (
          <motion.button
            key={emoji}
            type="button"
            whileTap={{ scale: 1.5, rotate: -8 }}
            whileHover={{ scale: 1.15 }}
            onClick={() => react(room, emoji)}
            className="flex-1 rounded-lg py-1.5 text-xl hover:bg-white/10"
            aria-label={`Reagir com ${emoji}`}
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Escrever */}
      {!state.enabled && !viewer.isMod ? (
        <p className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/60">
          O chat está fechado agora. Volta daqui a pouco.
        </p>
      ) : (
        <form onSubmit={submit} className="border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <div className="mb-2 flex items-center gap-2 text-xs text-white/55">
            {loggedName ? (
              <>
                Escrevendo como <strong className="text-white">{loggedName}</strong>
                <Badge type={viewer.badge} />
              </>
            ) : needsNick ? (
              <>
                <label htmlFor={`nick-${room}`} className="shrink-0">
                  Seu apelido
                </label>
                <input
                  id={`nick-${room}`}
                  value={nickDraft}
                  onChange={(e) => setNickDraft(e.target.value.slice(0, MAX_NICK))}
                  placeholder="como quer aparecer"
                  autoComplete="nickname"
                  className="min-w-0 flex-1 border-b border-white/25 bg-transparent py-1 text-sm text-white outline-none placeholder:text-white/30 focus:border-white"
                />
              </>
            ) : (
              <>
                Como <strong className="text-white">{nickname}</strong>
                <button
                  type="button"
                  onClick={() => {
                    setNickDraft(nickname);
                    setEditingNick(true);
                  }}
                  className="inline-flex items-center gap-1 text-white/45 hover:text-white"
                  aria-label="Trocar apelido"
                >
                  <Pencil aria-hidden size={11} /> trocar
                </button>
              </>
            )}
            {!state.enabled && viewer.isMod && <span className="ml-auto text-[#ff8a80]">Chat fechado para o público</span>}
          </div>
          <div className="flex items-end gap-2">
            <label htmlFor={`body-${room}`} className="sr-only">
              Recado
            </label>
            <textarea
              id={`body-${room}`}
              ref={inputRef}
              value={body}
              onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              rows={1}
              enterKeyHint="send"
              placeholder="Manda o papo"
              className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-[16px] text-white outline-none placeholder:text-white/35 focus:border-white/50 sm:text-sm"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.92 }}
              disabled={sending || cooldown > 0 || (!body.trim() && !needsNick)}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-black transition-opacity disabled:opacity-35"
              aria-label="Mandar recado"
            >
              {cooldown > 0 ? (
                <span className="text-sm font-semibold tabular-nums">{cooldown}</span>
              ) : (
                <SendHorizontal aria-hidden size={18} strokeWidth={2} />
              )}
            </motion.button>
          </div>
          <div className="mt-1.5 flex min-h-4 justify-between gap-4 text-xs">
            <span className="text-[#ff8a80]" role="status">
              {error}
            </span>
            {body.length > 200 && <span className="tabular-nums text-white/35">{body.length}/{MAX_BODY}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
