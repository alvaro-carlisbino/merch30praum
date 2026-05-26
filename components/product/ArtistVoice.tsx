import type { ArtistConfig } from "@/lib/artists/types";

interface ArtistVoiceProps {
  artist: ArtistConfig;
}

/**
 * Bloco "leia-me.txt" do artista — texto puro em fonte mono, sem decoração.
 */
export function ArtistVoice({ artist }: ArtistVoiceProps) {
  return (
    <section
      aria-label={`Voz do artista — ${artist.displayName}`}
      className="mx-auto max-w-[760px] px-4 pt-6 pb-2 sm:px-6"
    >
      <div className="border border-[#aca899] bg-white p-4 font-mono text-[12px] leading-snug text-black">
        <p className="text-[#666]">{`> ${artist.displayName.toLowerCase()}.txt`}</p>
        <p className="mt-2">{artist.voice.epigraph}</p>
        <p className="mt-3 text-[#666]">{`> processo:`}</p>
        <ol className="mt-1 list-decimal list-inside space-y-0.5">
          {artist.voice.process.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
