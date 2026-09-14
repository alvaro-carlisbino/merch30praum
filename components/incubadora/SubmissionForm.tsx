"use client";
import { useActionState } from "react";
import Link from "next/link";
import { submitDemo, type SubmitState } from "@/lib/incubadora/actions";
const INITIAL: SubmitState = { status: "idle" };
export function SubmissionForm() {
  const [state, formAction, pending] = useActionState(submitDemo, INITIAL);
  const error = state.status === "invalid" || state.status === "unavailable" ? state.message ?? null : null;
  if (state.status === "ok") {
    return (
      <div
        className="border p-8 sm:p-12 incubadora-scan"
        style={{
          borderColor: "var(--accent)",
          background: "color-mix(in srgb, var(--accent) 4%, transparent)",
        }}
      >
        <h2
          className="font-display uppercase leading-[0.9]"
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            letterSpacing: "-0.03em",
            color: "var(--fg)",
          }}
        >
          Recebemos. <br /> A gente escuta.
        </h2>
        <p className="mt-6 max-w-xl text-fg/80 leading-relaxed">
          Recebemos teu material. O A&R da casa lê tudo. Não vai chegar mensagem automática.
          Se fizer sentido, te procuramos pelo email ou Instagram que você deixou. Sem prazo,
          sem fila por ordem de chegada.
        </p>
        <Link
          href="/incubadora/submeter"
          className="mt-8 inline-flex items-center gap-2 px-5 py-3 text-sm border transition-colors hover:bg-fg/5"
          style={{ borderColor: "var(--border)", color: "var(--fg)" }}
        >
          Submeter outro projeto
        </Link>
      </div>
    );
  }
  const inputClass =
    "w-full bg-transparent border-0 border-b py-3 text-base sm:text-lg outline-none transition-colors focus:border-fg placeholder:text-fg/30";
  const labelClass = "text-sm opacity-65";
  return (
    <form action={formAction} className="grid gap-8 sm:gap-10" noValidate>
      <div className="grid gap-2">
        <label htmlFor="artistName" className={labelClass}>
          Nome artístico *
        </label>
        <input
          id="artistName"
          name="artistName"
          required
          maxLength={80}
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
          placeholder="Como você assina"
        />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
            placeholder="seu@email.com"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="instagram" className={labelClass}>
            Instagram
          </label>
          <input
            id="instagram"
            name="instagram"
            maxLength={60}
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
            placeholder="@seuperfil"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="spotifyUrl" className={labelClass}>
          URL Spotify * (artista, álbum ou faixa)
        </label>
        <input
          id="spotifyUrl"
          name="spotifyUrl"
          type="url"
          required
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
          placeholder="https://open.spotify.com/artist/..."
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="soundcloudUrl" className={labelClass}>
          URL SoundCloud (opcional)
        </label>
        <input
          id="soundcloudUrl"
          name="soundcloudUrl"
          type="url"
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
          placeholder="https://soundcloud.com/seunome"
        />
      </div>
      <div className="grid gap-8 sm:grid-cols-[1fr_1fr_auto]">
        <div className="grid gap-2">
          <label htmlFor="genre" className={labelClass}>
            Gênero *
          </label>
          <select
            id="genre"
            name="genre"
            required
            defaultValue=""
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="trap">Trap</option>
            <option value="rap">Rap</option>
            <option value="hiphop">Hip-hop</option>
            <option value="funk">Funk</option>
            <option value="drill">Drill</option>
            <option value="rnb">R&B</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="origin" className={labelClass}>
            Origem (Cidade · UF)
          </label>
          <input
            id="origin"
            name="origin"
            maxLength={60}
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
            placeholder="Fortaleza · CE"
          />
        </div>
        <div className="grid gap-2 max-w-[8rem]">
          <label htmlFor="age" className={labelClass}>
            Idade
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min={14}
            max={99}
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
            placeholder="23"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="story" className={labelClass}>
          História curta * (máx 500 caracteres, sem currículo, direto)
        </label>
        <textarea
          id="story"
          name="story"
          required
          maxLength={500}
          rows={5}
          className="w-full bg-transparent border py-4 px-4 text-base sm:text-lg outline-none transition-colors focus:border-fg placeholder:text-fg/30 leading-relaxed"
          style={{ borderColor: "var(--border)" }}
          placeholder="De onde você é, há quanto tempo faz som, e o que você quer que a 30praum entenda sobre seu projeto."
        />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <label className="flex items-start gap-3 text-sm text-fg/80 leading-relaxed">
        <input type="checkbox" name="terms" required className="mt-1.5" />
        <span>
          Aceito que a 30praum receba e armazene esses dados para fins de A&R. Não há promessa
          de retorno. Os dados não serão compartilhados com terceiros.
        </span>
      </label>
      {error && (
        <div
          className="border p-4 text-sm"
          style={{
            borderColor: "var(--accent)",
            background: "color-mix(in srgb, var(--accent) 8%, transparent)",
            color: "var(--accent)",
          }}
        >
          {error}
        </div>
      )}
      <div>
        <button
          type="submit"
          disabled={pending}
          data-cursor="Enviar"
          className="inline-flex items-center gap-3 px-8 py-5 text-xs uppercase tracking-[0.2em] font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          style={{
            background: "var(--accent)",
            color: "var(--bg)",
            boxShadow: "0 0 28px rgba(46,240,124,0.22)",
          }}
        >
          {pending ? "Enviando..." : "Submeter demo →"}
        </button>
      </div>
    </form>
  );
}
