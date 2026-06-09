import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "2t4bivs2", // <-- Paste your copied ID here!
  dataset: "production",
  apiVersion: "2024-01-01", // Leave this as today's date format
  useCdn: true, // This makes fetching super fast!
});

// This helps us easily render images uploaded by the client
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}