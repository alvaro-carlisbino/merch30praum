export function longDate(iso: string) {
  return new Date(`${iso}T12:00:00-03:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function editionDate(edition: { date: string; dateAnnounced?: boolean }) {
  return edition.dateAnnounced === false ? "Data a anunciar" : longDate(edition.date);
}
