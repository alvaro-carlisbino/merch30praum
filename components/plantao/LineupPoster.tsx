import type { LineupArtist } from "@/lib/plantao/registry";

interface Props {
  lineup: LineupArtist[];
  accent: string;
}

/** Pôster tipográfico: hierarquia por peso do nome no line-up, como cartaz de festival. */
export function LineupPoster({ lineup, accent }: Props) {
  const headliners = lineup.filter((a) => a.isHeadliner);
  const specials = lineup.filter((a) => a.isSpecial);
  // artistas da casa que não são headliner nem show especial sobem um degrau
  const house = lineup.filter((a) => !a.isHeadliner && !a.isSpecial && a.artistSlug);
  const featured = lineup.filter((a) => !a.isHeadliner && !a.isSpecial && !a.artistSlug && /especial/i.test(a.highlightLabel ?? ""));
  const rest = lineup.filter(
    (a) => !a.isHeadliner && !a.isSpecial && !a.artistSlug && !/especial/i.test(a.highlightLabel ?? ""),
  );

  const specialNames = specials.map((a) => a.displayName);
  const specialLine = specialNames.length > 1 ? [specialNames.join(" & ")] : specialNames;

  const tiers = [
    { names: headliners.map((a) => a.displayName), size: "clamp(3rem, 11vw, 9rem)", opacity: 1, color: "#ffffff" },
    { names: specialLine, size: "clamp(2rem, 6.5vw, 5rem)", opacity: 1, color: accent },
    {
      names: [...house, ...featured].map((a) => a.displayName),
      size: "clamp(1.5rem, 4.2vw, 3.2rem)",
      opacity: 0.95,
      color: "#ffffff",
    },
    { names: rest.map((a) => a.displayName), size: "clamp(0.95rem, 2.4vw, 1.8rem)", opacity: 0.68, color: "#ffffff" },
  ].filter((t) => t.names.length > 0);

  return (
    <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
      {tiers.map((tier, i) => (
        <p
          key={i}
          className="font-display uppercase leading-[0.9]"
          style={{ fontSize: tier.size, letterSpacing: "-0.02em", color: tier.color, opacity: tier.opacity }}
        >
          {tier.names.map((name, j) => (
            <span key={name}>
              {j > 0 && (
                <span aria-hidden className="mx-3 align-middle sm:mx-5" style={{ color: accent, opacity: 0.8 }}>
                  ·
                </span>
              )}
              {name}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
