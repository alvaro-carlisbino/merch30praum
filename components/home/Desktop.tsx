"use client";

import { useEffect, useState } from "react";
import { useActiveArtist } from "@/lib/home/active-artist";
import type { ArtistSlug } from "@/lib/artists/types";
import { DesktopIcon } from "@/components/lanhouse/DesktopIcon";
import { Window } from "@/components/lanhouse/Window";
import { WindowsButton } from "@/components/lanhouse/WindowsButton";
import { VHSPlayer } from "@/components/lanhouse/VHSPlayer";
import {
  CalendarIcon,
  ExeIcon,
  FolderIcon,
  MediaIcon,
  MyComputerIcon,
  PeopleIcon,
} from "@/components/lanhouse/PixelIcons";

type Channel = {
  slug: ArtistSlug;
  name: string;
  poster: string;
  tape: string;
  trk: string;
};

const CHANNELS: Channel[] = [
  { slug: "matue", name: "MATUE", poster: "/figma-home/hero-matue.jpg", tape: "MATUE_XTRANHO_CRU", trk: "04" },
  { slug: "wiu", name: "WIU", poster: "/figma-home/hero-wiu.jpg", tape: "WIU_COLAPSO_BTKS", trk: "02" },
  { slug: "teto", name: "TETO", poster: "/figma-home/hero-teto.png", tape: "TETO_TRILHA_RAW", trk: "01" },
  { slug: "brandao", name: "BRANDAO85", poster: "/figma-home/hero-brandao.jpg", tape: "BRANDAO_XEROX_VHS", trk: "03" },
];

export function Desktop() {
  const [active, setActive] = useState(0);
  const setActiveStore = useActiveArtist((s) => s.setActive);

  const current = CHANNELS[active];

  useEffect(() => {
    setActiveStore(current.slug);
  }, [current.slug, setActiveStore]);

  return (
    <>
      <aside className="fixed left-3 top-3 z-[2] flex flex-col gap-2 sm:left-6 sm:top-6 sm:gap-4">
        <DesktopIcon icon={<MyComputerIcon size={40} />} label="meu computador" href="/loja" />
        <DesktopIcon icon={<FolderIcon size={40} />} label="loja\" href="/loja" />
        <DesktopIcon icon={<PeopleIcon size={40} />} label="artistas\" href="/artistas" />
        <DesktopIcon icon={<CalendarIcon size={40} />} label="plantao.ics" href="/plantao" />
        <DesktopIcon icon={<FolderIcon size={40} />} label="incubadora\" href="/incubadora" />
        <DesktopIcon icon={<FolderIcon size={40} />} label="parcerias\" href="/parcerias" />
        <DesktopIcon icon={<ExeIcon size={40} />} label="sobre.exe" href="/about" />
      </aside>

      <aside className="fixed right-3 top-3 z-[2] hidden flex-col gap-3 lg:flex">
        {CHANNELS.map((ch, i) => (
          <DesktopIcon
            key={ch.slug}
            icon={<MediaIcon size={40} />}
            label={`${ch.name.toLowerCase()}.mp4`}
            onClick={() => setActive(i)}
          />
        ))}
      </aside>

      <Window
        id="home-wmp"
        title={`${current.name.toLowerCase()}.mp4 — Windows Media Player`}
        iconKey="media"
        variant="wmp"
        x={260}
        y={40}
        width={820}
        bodyClassName="p-0"
        menubar={["Arquivo", "Exibir", "Reproduzir", "Ferramentas", "Ajuda"]}
        statusBar={
          <>
            <span style={{ color: "#aaa" }}>Pronto.</span>
            <span style={{ color: "#aaa" }}>30praum.com · 2016—{new Date().getFullYear()}</span>
          </>
        }
      >
        <VHSPlayer poster={current.poster} alt={current.name} label={current.tape} trackNo={current.trk} />

        <div className="bg-[#1c1c1c] p-3 text-[#d0d0d0]">
          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase">
            <WindowsButton onClick={() => setActive((a) => (a - 1 + CHANNELS.length) % CHANNELS.length)} className="min-w-[40px]">
              «
            </WindowsButton>
            <WindowsButton onClick={() => setActive((a) => (a + 1) % CHANNELS.length)} className="min-w-[40px]">
              »
            </WindowsButton>
            <div className="ml-2 flex-1 truncate">tocando agora · {current.name.toLowerCase()}</div>
            <WindowsButton href={`/${current.slug}`} className="min-w-[120px]" variant="primary">
              abrir pasta →
            </WindowsButton>
          </div>

          <div className="border border-[#444] bg-[#0a0a0a]">
            <div className="flex items-center justify-between border-b border-[#333] bg-[#181818] px-2 py-1 font-mono text-[10px] uppercase text-[#888]">
              <span>fita</span>
              <span>trk</span>
            </div>
            {CHANNELS.map((ch, i) => (
              <button
                key={ch.slug}
                type="button"
                onClick={() => setActive(i)}
                className={`flex w-full items-center justify-between px-2 py-1 text-left font-mono text-[11px] ${
                  i === active ? "bg-[#0a246a] text-white" : "text-[#cfcfcf] hover:bg-[#181818]"
                }`}
              >
                <span>{ch.tape}.mp4</span>
                <span className="opacity-70">{ch.trk}</span>
              </button>
            ))}
          </div>
        </div>
      </Window>

      <Window
        id="home-readme"
        title="leia-me.txt — Bloco de Notas"
        iconKey="exe"
        x={440}
        y={620}
        width={420}
      >
        <div className="font-mono text-[12px] leading-snug text-black">
          <p>30praum, fortaleza, ce. desde 2016.</p>
          <p>matuê, wiu, teto, brandão85.</p>
          <p>somos os melhores.</p>
        </div>
      </Window>
    </>
  );
}
