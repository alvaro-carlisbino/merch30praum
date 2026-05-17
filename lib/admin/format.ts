const PT_BR_MONTHS_LONG = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function fmtTodayLong(now: Date = new Date()): string {
  const day = now.getDate();
  const month = PT_BR_MONTHS_LONG[now.getMonth()];
  const year = now.getFullYear();
  return `${day} de ${month} · ${year}`;
}

export function fmtDayMonth(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  })
    .format(typeof date === "string" ? new Date(date) : date)
    .replace(".", "");
}

export function fmtDateLong(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}

/** Devolve uma data deslocada `daysAgo` dias do hoje em ISO YYYY-MM-DD. */
export function daysAgo(days: number, now: Date = new Date()): string {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}
