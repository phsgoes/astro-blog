const MAX_CAPTION = 2200;

export function createInstagramCaption(
  html: string,
  url: string,
  title?: string
): string {
  // Remove HTML
  let text = html
    .replace(/<[^>]*>/g, " ")

    // Decodifica entidades HTML comuns
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

    // Normaliza espaços
    .replace(/\s+/g, " ")
    .trim();

  if (title) {
    text = `📖 ${title}\n\n${text}`;
  }

  const footer = `\n\nLeia o post completo em:\n${url}`;

  // Já cabe
  if (text.length + footer.length <= MAX_CAPTION) {
    return text + footer;
  }

  // Reserva espaço para ...
  const available = MAX_CAPTION - footer.length - 3;

  let truncated = text.slice(0, available);

  // Remove palavra incompleta
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 0) {
    truncated = truncated.slice(0, lastSpace);
  }

  return truncated.trim() + "..." + footer;
}