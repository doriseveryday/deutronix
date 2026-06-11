import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url'; 

export const client = createClient({
  projectId: "2t4bivs2", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, 
});

const builder = createImageUrlBuilder(client); 

export function urlFor(source: any) {
  return builder.image(source);
}