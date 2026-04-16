/**
 * Converts markdown-like text to plain text for compact previews.
 */
export function markdownToPlainText(input: string): string {
  return input
    .replace(/!\[[^\]]*\]\(([^)]+)\)/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_~`>#]+/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[:]+/g, ".")
    .trim();
}

/**
 * Produces a clean short preview string from markdown content.
 */
export function toCardPreviewText(input: string, maxLength = 220): string {
  const plain = markdownToPlainText(input);
  if (plain.length <= maxLength) {
    return plain;
  }

  return `${plain.slice(0, maxLength).trimEnd()}...`;
}
