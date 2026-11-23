import Image from "next/image";
import { Download } from "lucide-react";
import { getPressKit } from "@/lib/cms/press";
import { type PressAssetType } from "@/lib/press/registry";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Imprensa",
  description: "Contatos de imprensa da 30praum e ficha rápida da gravadora para matérias e entrevistas.",
};

const TYPE_LABEL: Record<PressAssetType, string> = {
  logo: "Logos",
  photo: "Fotos",
  bio: "Biografias",
  document: "Documentos",
};

const TYPE_ORDER: PressAssetType[] = ["logo", "photo", "bio", "document"];

const FACTS = [
  { label: "Fundação", value: "2016, em Fortaleza (CE)" },
  { label: "Fundadores", value: "Matuê e Clara Mendes, CEO" },
  { label: "Artistas", value: "Matuê, Wiu, Teto e Brandão85" },
  { label: "Distribuição", value: "Independente desde 2024, depois de cinco anos com a Sony Music" },
  { label: "Festival", value: "Plantão, no Marina Park, em Fortaleza, desde 2023" },
  { label: "Lançamentos recentes", value: "XTRANHO (2025), Colapso Global (2026), Isso É Trap Vol. 2 (2026)" },
];

export default async function ImprensaPage() {
  const { contacts, assets } = await getPressKit();
  const contactList = Object.entries(contacts).filter(([, c]) => c.email);
  const groups = TYPE_ORDER.map((type) => ({
    type,
    label: TYPE_LABEL[type],
    items: assets.filter((a) => a.type === type && a.downloadUrl && a.downloadUrl !== "#"),
  })).filter((g) => g.items.length > 0);

  return (
    <article>
      <section className="mx-auto max-w-screen-2xl px-4 pb-10 pt-16 sm:px-8 sm:pt-20">
        <h1
          className="font-display uppercase leading-[0.92]"
          style={{ fontSize: "clamp(2.4rem, 5.8vw, 4.8rem)", letterSpacing: "-0.02em" }}
        >
          Imprensa
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg/80 sm:text-base">
          Fotos em alta, logos e biografias são enviados por e-mail, com os créditos certos. Escreve
          pra gente dizendo o veículo e a pauta.
        </p>
      </section>

      <section className="border-y" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {contactList.map(([key, c]) => (
            <a
              key={key}
              href={`mailto:${c.email}`}
              className="rounded-2xl border p-5 transition-colors hover:bg-fg/5"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm text-muted">{c.label}</p>
              <p className="mt-2 font-display text-base sm:text-lg" style={{ color: "var(--accent)" }}>
                {c.email}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-8">
        <h2 className="font-display text-2xl uppercase sm:text-3xl">Ficha rápida</h2>
        <dl className="mt-8 max-w-3xl">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="grid gap-1 border-t py-4 sm:grid-cols-[200px_1fr] sm:gap-6"
              style={{ borderColor: "var(--border)" }}
            >
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="text-sm leading-relaxed">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {groups.length > 0 && (
        <div className="mx-auto max-w-screen-2xl space-y-16 px-4 pb-16 sm:px-8">
          {groups.map((group) => (
            <section key={group.type}>
              <h2 className="mb-6 font-display text-2xl uppercase sm:text-3xl">{group.label}</h2>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {group.items.map((asset) => (
                  <article
                    key={asset.slug}
                    className="flex flex-col overflow-hidden rounded-2xl border"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={asset.thumbnail}
                        alt={asset.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="font-display text-lg leading-tight">{asset.title}</h3>
                      <p className="flex-1 text-sm leading-relaxed text-fg/65">{asset.description}</p>
                      <a
                        href={asset.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 border-t pt-3 text-sm hover:opacity-80"
                        style={{ borderColor: "var(--border)", color: "var(--accent)" }}
                      >
                        <Download size={14} strokeWidth={1.5} />
                        Baixar · {asset.format}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <p className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-fg/65 sm:px-8">
          Material enviado pela 30praum pode ser usado em matérias e divulgação editorial, com
          crédito. Para uso comercial, escreve para {CONTACT.parcerias}.
        </p>
      </section>
    </article>
  );
}
