// Strapi media files are served from a different origin than the API
const STRAPI_MEDIA_ORIGIN = (
  import.meta.env.VITE_STRAPI_MEDIA_URL as string
).replace(/\/$/, "");

/**
 * Converts a Strapi relative image path (e.g. "/uploads/file.jpg")
 * into a fully-qualified URL using the Strapi media server origin.
 */
export function getStrapiImageUrl(relativePath: string): string {
  return `${STRAPI_MEDIA_ORIGIN}${relativePath}`;
}
