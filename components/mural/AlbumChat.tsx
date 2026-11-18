"use client";

import { ChatPanel } from "./ChatPanel";
import { ChatRoomContext } from "./ChatDock";

export function AlbumChat({ room, title, accentHex }: { room: string; title: string; accentHex: string }) {
  return (
    <section
      aria-labelledby="chat-album"
      className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
    >
      <ChatRoomContext room={room} title={title} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <h2 id="chat-album" className="font-display text-3xl uppercase sm:text-4xl">
            Papo sobre {title}
          </h2>
          <p className="mt-3 max-w-sm leading-relaxed text-white/70">
            Quem está ouvindo agora escreve aqui. Faixa favorita, verso que pegou, o que você achou.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/30">
          <ChatPanel room={room} title={title} accentHex={accentHex} listClassName="h-[26rem]" />
        </div>
      </div>
    </section>
  );
}
