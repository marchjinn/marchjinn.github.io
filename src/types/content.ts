/**
 * Shared content types for the March Jinn platform.
 * Keep content classification separate from presentation and hosting metadata.
 */

export type PrimaryDomain =
  | "music"
  | "media"
  | "fashion"
  | "beauty"
  | "food-beverage"
  | "technology";

export type PublicationStatus =
  | "upcoming"
  | "active"
  | "sold-out"
  | "completed"
  | "archived"
  | "discontinued";

export interface BaseContentItem {
  id: string;
  slug: string;
  title: string;
  domain: PrimaryDomain;
  status: PublicationStatus;
  publishedAt?: string;
  updatedAt?: string;
  summary?: string;
  coverImage?: string;
  relatedContentIds?: string[];
}

export interface ExternalMediaSource {
  platform: string;
  url: string;
  availability: "available" | "unavailable" | "unknown";
}

export interface MediaItem extends BaseContentItem {
  domain: "media";
  mediaType:
    | "video"
    | "photo"
    | "audio"
    | "stream"
    | "publication";
  source?: ExternalMediaSource;
}
