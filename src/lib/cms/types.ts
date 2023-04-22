import { z } from "zod";
import { catSchema, galleryItemSchema, timelineItemSchema } from "./schema";

export type Cat = z.infer<typeof catSchema>;
export type Timeline = z.infer<typeof timelineItemSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
