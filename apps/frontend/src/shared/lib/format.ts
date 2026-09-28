const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export function formatDate(value: string | Date): string {
  return dateFormat.format(new Date(value));
}

export function formatSignedNumber(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}
