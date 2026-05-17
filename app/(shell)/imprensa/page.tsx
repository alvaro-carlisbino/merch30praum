import Image from "next/image";
import { Download } from "lucide-react";
import { getPressKit } from "@/lib/cms/press";
import { type PressAssetType } from "@/lib/press/registry";

export const metadata = {
  title: "Imprensa · 30praum",
  description:
    "Kit de imprensa oficial da 30praum — logos, fotos, bios e dados. Contatos diretos para A&R, booking, parcerias.",
};

const TYPE_LABEL: Record<PressAssetType, string> = {
  logo: "Logos",
  photo: "Fotos de imprensa",
  bio: "Biografias",
  document: "Documentos & Media Kit",
};

const TYPE_ORDER: PressAssetType[] = ["logo", "photo", "bio", "document"];

export default async function ImprensaPage() {
  const { contacts: PRESS_CONTACTS, assets: PRESS_KIT_ASSETS } = await getPressKit();
  const grouped = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABEL[type],
    items: PRESS_KIT_ASSETS.filter((a) => a.type === type),
  }));

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 pt-16 pb-10 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{
            fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Imprensa
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg/80 sm:text-base">
          Logos em alta, fotos autorizadas, biografias e media kit. Tudo aberto,
          sem intermediário.
        </p>
      </section>

      {/* Contatos */}
      <section className="border-t border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(PRESS_CONTACTS).map(([key, c]) => (
              <a
                key={key}
                href={`mailto:${c.email}`}
                className="rounded-2xl border p-5 transition-colors hover:bg-fg/5"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="text-sm opacity-65">{c.label}</p>
                <p
                  className="mt-2 font-display text-base sm:text-lg"
                  style={{ color: "var(--accent)" }}
                >
                  {c.email}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Press kit grouped */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 py-16 space-y-16">
        {grouped.map((group) => (
          <section key={group.type}>
            <div className="mb-6 flex items-baseline gap-4">
              <h2
                className="font-display uppercase leading-tight"
                style={{
                  fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                  letterSpacing: "0.01em",
                }}
              >
                {group.label}
              </h2>
              <span className="text-xs text-muted">
                {group.items.length}{" "}
                {group.items.length === 1 ? "item" : "itens"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {group.items.map((asset) => (
                <article
                  key={asset.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border"
                  style={{ borderColor: "var(--border)" }}
                >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={asset.thumbnail}
                        alt={asset.title}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: "brightness(0.85)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      <h3 className="font-display text-lg leading-tight">{asset.title}</h3>
                      <p className="text-sm text-fg/65 leading-relaxed flex-1">
                        {asset.description}
                      </p>
                      <div
                        className="mt-2 flex items-center justify-between border-t pt-3"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <span className="text-xs opacity-55">{asset.format}</span>
                        <a
                          href={asset.downloadUrl}
                          download
                          className="inline-flex items-center gap-2 text-sm hover:opacity-80"
                          style={{ color: "var(--accent)" }}
                          data-cursor="Download"
                        >
                          <Download size={14} strokeWidth={1.5} />
                          Baixar
                        </a>
                      </div>
                    </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Termos */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-8 py-16 text-sm text-fg/65 leading-relaxed">
          <p>
            <span className="font-medium text-fg/85">Termos de uso —</span> os materiais deste
            kit podem ser usados livremente em matérias editoriais, reportagens e divulgações de
            imprensa, desde que com crédito à 30praum. Não é permitido alterar logos, recortes
            ou aplicar filtros que descaracterizem a identidade. Para uso comercial ou parceria,
            escreva para parcerias@30praum.com.
          </p>
        </div>
      </section>
    </article>
  );
}
