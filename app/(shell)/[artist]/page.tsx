import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ARTISTS, isArtistSlug } from "@/lib/artists/registry";
import type { ArtistSlug } from "@/lib/artists/types";
import { Window } from "@/components/lanhouse/Window";
import { WindowsButton } from "@/components/lanhouse/WindowsButton";
import { VHSPlayer } from "@/components/lanhouse/VHSPlayer";
import {
  MediaIcon,
  FolderOpenIcon,
  CassetteIcon,
} from "@/components/lanhouse/PixelIcons";

interface Params {
  artist: string;
}

type AssetMap = {
  heroBg: string;
  albumCover: string;
  quote: { text: string; attribution: string };
  description: string;
  estreia: string;
  marcos: string;
  albumStats: { lancamento: string; duracao: string; ouvintes: string };
  tape: string;
  trk: string;
};

const ASSETS: Partial<Record<ArtistSlug, AssetMap>> = {
  matue: {
    heroBg: "/figma-home/hero-matue.jpg",
    albumCover: "/figma-artista/matue-album-xtranho.png",
    quote: { text: "Todo mundo quer ser estrela, mas não tem lugar no Sol.", attribution: "Kenny G · 2020" },
    description:
      "Co-fundador da 30praum. Nasceu em Fortaleza, viveu em Oakland, voltou cantando trap antes do trap virar trap no Brasil.",
    estreia: "2016 (cofundador)",
    marcos: "Recorde Spotify BR · Rock in Rio 2024",
    albumStats: { lancamento: "10/12/2025", duracao: "34min 26s", ouvintes: "125M" },
    tape: "MATUE_XTRANHO_CRU",
    trk: "04",
  },
  teto: {
    heroBg: "/figma-home/hero-teto.png",
    albumCover: "/figma-artista/colapso-global-cover.png",
    quote: { text: "Não é fim. É trilha.", attribution: "Colapso Global · 2026" },
    description:
      "Nasceu em Jacobina, Bahia. Compõe desde os 12. Gravou Vampira com Matuê e Wiu. Colapso Global mistura house, jazz, bossa e funk no mesmo disco.",
    estreia: "2020",
    marcos: "Vampira · Colapso Global · Carnaval Olinda 2025",
    albumStats: { lancamento: "27/01/2026", duracao: "33min", ouvintes: "92M" },
    tape: "TETO_TRILHA_RAW",
    trk: "01",
  },
  wiu: {
    heroBg: "/figma-home/hero-wiu.jpg",
    albumCover: "/figma-artista/colapso-global-cover.png",
    quote: { text: "Se a saudade matasse, eu já tinha morrido bonito.", attribution: "Manual de Como Amar Errado · 2022" },
    description:
      "Cearense, contemporâneo de Matuê. Antes de cantar era beatmaker — produziu 6 das 7 faixas de Máquina do Tempo. Último romântico do trap.",
    estreia: "2019",
    marcos: "Manual de Como Amar Errado · Colapso Global · Felina · Vampira",
    albumStats: { lancamento: "27/01/2026", duracao: "33min", ouvintes: "78M" },
    tape: "WIU_COLAPSO_BTKS",
    trk: "02",
  },
  brandao: {
    heroBg: "/figma-home/hero-brandao.jpg",
    albumCover: "/figma-artista/brandao-album-anjo.png",
    quote: { text: "Cresci copiando. Agora os outros copiam errado.", attribution: "85 · 2026" },
    description:
      "Cearense da Caponga. Entrou na 30praum em 2024 depois de saída amigável da Hash. Cocriou faixas do 333 do Matuê. CEO (2024), Isso é Trap Vol.2.",
    estreia: "Setembro 2024",
    marcos: "Hash 2018–2024 · Isso é Trap Vol. 02",
    albumStats: { lancamento: "15/04/2026", duracao: "37min 46s", ouvintes: "125M" },
    tape: "BRANDAO_XEROX_VHS",
    trk: "03",
  },
};

export default async function ArtistLanding({ params }: { params: Promise<Params> }) {
  const { artist } = await params;
  if (!isArtistSlug(artist)) notFound();
  const cfg = ARTISTS[artist];
  const a = ASSETS[artist];

  if (!a) {
    return (
      <section className="mx-auto max-w-[760px] px-4 py-12 sm:px-6">
        <div className="border border-[#aca899] bg-white p-4 font-mono text-[12px] text-black">
          <p>{cfg.displayName}</p>
          <p className="mt-2 text-[#666]">página em redesign — assets em breve.</p>
        </div>
      </section>
    );
  }

  const tracks = cfg.album.highlightedTracks.slice(0, 8);

  return (
    <article className="mx-auto max-w-[1100px] px-3 py-6 sm:px-6 sm:py-10">
      <Window
        title={`${cfg.slug}.mp4 — Windows Media Player`}
        icon={<MediaIcon size={14} />}
        className="win-wmp"
        menubar={["Arquivo", "Exibir", "Reproduzir", "Ferramentas", "Ajuda"]}
        bodyClassName="p-0"
        statusBar={
          <>
            <span style={{ color: "#aaa" }}>tocando · {cfg.slug}\{a.tape}.mp4</span>
            <span style={{ color: "#aaa" }}>30praum</span>
          </>
        }
      >
        {/* address bar */}
        <div className="flex items-center gap-2 border-b border-[#444] bg-[#1c1c1c] px-2 py-1">
          <div className="flex h-[20px] flex-1 items-center gap-1 border border-[#555] bg-[#0a0a0a] px-2 font-mono text-[11px]" style={{ color: "#d0d0d0" }}>
            <FolderOpenIcon size={14} />
            <Link href="/" className="underline" style={{ color: "#7baddc" }}>C:\30praum\</Link>
            <Link href="/artistas" className="underline" style={{ color: "#7baddc" }}>artistas\</Link>
            <span>{cfg.slug}\</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.4fr_0.9fr]">
          {/* Player principal */}
          <div className="bg-[#0a0a0a] p-3">
            <VHSPlayer poster={a.heroBg} alt={cfg.displayName} label={a.tape} trackNo={a.trk} />

            {/* controles transporte */}
            <div className="mt-3 flex items-center gap-1 border border-[#333] bg-[#1c1c1c] p-2">
              <button type="button" className="wmp-btn" aria-label="Anterior">◀◀</button>
              <button type="button" className="wmp-btn" aria-label="Play">▶</button>
              <button type="button" className="wmp-btn" aria-label="Pause">| |</button>
              <button type="button" className="wmp-btn" aria-label="Parar">■</button>
              <button type="button" className="wmp-btn" aria-label="Próximo">▶▶</button>
              <div className="ml-3 h-2 flex-1 border border-[#444] bg-black">
                <div className="h-full w-[36%]" style={{ background: "#1f6bff" }} />
              </div>
              <span className="ml-2 font-mono text-[10px]" style={{ color: "#aaa" }}>
                01:24 / {a.albumStats.duracao}
              </span>
            </div>
          </div>

          {/* Painel direito — playlist + bio */}
          <div className="bg-[#1c1c1c] p-3" style={{ color: "#d0d0d0" }}>
            {/* Capa do álbum + título */}
            <div className="flex items-start gap-3 border border-[#333] bg-[#0c0c0c] p-3">
              <div className="relative h-[80px] w-[80px] shrink-0 border border-[#444]">
                <Image src={a.albumCover} alt={cfg.album.title} fill sizes="80px" className="object-cover" unoptimized />
              </div>
              <div className="min-w-0 flex-1 font-mono text-[11px]">
                <p className="truncate font-bold text-white">{cfg.album.title}</p>
                <p className="truncate" style={{ color: "#aaa" }}>{cfg.displayName}</p>
                <p className="mt-1" style={{ color: "#888" }}>
                  {a.albumStats.lancamento} · {a.albumStats.duracao}
                </p>
                <p style={{ color: "#888" }}>{a.albumStats.ouvintes} ouvintes</p>
              </div>
            </div>

            {/* Playlist .m3u */}
            <div className="mt-3 border border-[#333]">
              <div className="flex items-center gap-2 border-b border-[#333] bg-[#181818] px-2 py-1 font-mono text-[10px] uppercase" style={{ color: "#888" }}>
                <CassetteIcon size={12} />
                <span>{cfg.slug}_playlist.m3u</span>
                <span className="ml-auto">{tracks.length} faixas</span>
              </div>
              <ol className="bg-[#0a0a0a] font-mono text-[11px]">
                {tracks.map((title, i) => (
                  <li
                    key={title}
                    className="flex items-center justify-between border-b border-[#1c1c1c] px-2 py-1"
                    style={{ color: i === 0 ? "#fff" : "#cfcfcf", background: i === 0 ? "#0a246a" : undefined }}
                  >
                    <span className="flex items-center gap-2">
                      <span style={{ color: "#888" }}>{String(i + 1).padStart(2, "0")}.</span>
                      <span>{title}</span>
                    </span>
                    <span style={{ color: "#888" }}>03:{20 + i * 5}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Streaming links como botões clássicos */}
            <div className="mt-3 grid grid-cols-2 gap-1">
              {cfg.socials?.spotify ? (
                <WindowsButton href={cfg.socials.spotify} className="min-w-0">Spotify</WindowsButton>
              ) : null}
              {cfg.socials?.youtube ? (
                <WindowsButton href={cfg.socials.youtube} className="min-w-0">YouTube</WindowsButton>
              ) : null}
              {cfg.socials?.appleMusic ? (
                <WindowsButton href={cfg.socials.appleMusic} className="min-w-0">Apple Music</WindowsButton>
              ) : null}
              {cfg.socials?.instagram ? (
                <WindowsButton href={cfg.socials.instagram} className="min-w-0">Instagram</WindowsButton>
              ) : null}
            </div>
          </div>
        </div>
      </Window>

      {/* Bio em janelinha properties.txt */}
      <div className="mt-6">
        <Window
          title={`${cfg.slug}_bio.txt — Bloco de Notas`}
          icon={<MediaIcon size={14} />}
          className="max-w-[760px]"
        >
          <div className="font-mono text-[12px] leading-snug text-black">
            <p style={{ color: "#666" }}>{`> ${cfg.slug}_bio.txt`}</p>
            <p className="mt-2"><strong>nome:</strong> {cfg.realName}</p>
            <p><strong>origem:</strong> {cfg.origin}</p>
            <p><strong>estreia 30praum:</strong> {a.estreia}</p>
            <p><strong>marcos:</strong> {a.marcos}</p>
            <p className="mt-3">{a.description}</p>
            <p className="mt-3" style={{ color: "#666" }}>{`— ${a.quote.text}`}</p>
            <p style={{ color: "#888" }}>{`  ${a.quote.attribution}`}</p>
          </div>
        </Window>
      </div>

      <div className="mt-6 flex justify-center">
        <WindowsButton href="/loja" className="min-w-[160px]">
          ver merch de {cfg.slug}\
        </WindowsButton>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return Object.keys(ARTISTS).map((slug) => ({ artist: slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { artist } = await params;
  if (!isArtistSlug(artist)) return {};
  const cfg = ARTISTS[artist];
  return {
    title: cfg.displayName,
    description: cfg.tagline,
  };
}
