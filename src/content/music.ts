
export type MusicSection = "Releases" | "Lives" | "Credits";

export type MusicCategory =
  | "Albums"
  | "Singles"
  | "Appears On"
  | "Tours"
  | "Festivals"
  | "Specials"
  | "Artist"
  | "Producer"
  | "Other";

export type MusicStatus = "draft" | "published";

export type MusicReleaseStatus = "upcoming" | "available";

export type MusicPlayerProvider =
  | "apple-music"
  | "spotify"
  | "tidal";

export interface MusicPlacement {
  section: MusicSection;
  category: MusicCategory;
}

export interface MusicExternalLink {
  platform: string;
  url: string;
}

export interface MusicPlayerSource {
  provider: MusicPlayerProvider;
  url: string;
}

export interface MusicTrack {
  title: string;
  duration?: string;
  featuredArtists?: string[];
}

export interface MusicEvent {
  date?: string;
  endDate?: string;
  venue?: string;
  city?: string;
  country?: string;
}

export interface MusicCredit {
  name: string;
  role: string;
}

export interface MusicItem {
  id: string;
  slug: string;
  title: string;

  status: MusicStatus;
  placements: MusicPlacement[];

  releaseStatus?: MusicReleaseStatus;

  image?: string;
  date?: string;
  description?: string;

  subtitle?: string;
  format?: string;
  releaseType?: string;

  artists?: string[];
  credits?: MusicCredit[];
  tracks?: MusicTrack[];

  playerSources?: MusicPlayerSource[];

  youtubePlaylistUrl?: string;
  youtubePlaylistThumbnail?: string;

  events?: MusicEvent[];

  externalLinks?: MusicExternalLink[];

  featured?: boolean;
}

export interface MusicCatalogCard {
  id: string;
  title: string;
  href: string;
  image?: string;
  year?: string;
}

export interface MusicCatalogCollection {
  title: MusicCategory;
  items: MusicCatalogCard[];
}

export interface MusicSectionDefinition {
  title: MusicSection;
  categories: MusicCategory[];
}

/**
 * Official Music catalog structure.
 *
 * All three sections use the same content model
 * and the same standalone-page principles.
 */
export const musicSections: MusicSectionDefinition[] = [
  {
    title: "Releases",
    categories: [
      "Albums",
      "Singles",
      "Appears On"
    ]
  },
  {
    title: "Lives",
    categories: [
      "Tours",
      "Festivals",
      "Specials"
    ]
  },
  {
    title: "Credits",
    categories: [
      "Artist",
      "Producer",
      "Other"
    ]
  }
];

/**
 * Canonical Music records.
 *
 * Each standalone object has one unique ID and one slug.
 * The same object can appear in multiple catalog categories
 * through its placements without duplicating the record.
 *
 * Only published records appear in public catalogs.
 */
export const musicItems: MusicItem[] = [
  {
    id: "zillion",
    slug: "zillion",
    title: "Zillion",

    status: "published",
    releaseStatus: "upcoming",

    placements: [
      {
        section: "Releases",
        category: "Albums"
      }
    ]

    // Add release information and platform URLs here
    // when they become available.
  }
];

/**
 * Returns all published items assigned to a section and category.
 */
export function getMusicItems(
  section: MusicSection,
  category: MusicCategory
): MusicItem[] {
  return musicItems
    .filter(
      (item) =>
        item.status === "published" &&
        item.placements.some(
          (placement) =>
            placement.section === section &&
            placement.category === category
        )
    )
    .sort((a, b) => {
      const dateA = a.date ? Date.parse(a.date) : 0;
      const dateB = b.date ? Date.parse(b.date) : 0;

      const timestampA = Number.isFinite(dateA) ? dateA : 0;
      const timestampB = Number.isFinite(dateB) ? dateB : 0;

      return timestampB - timestampA;
    });
}

/**
 * Finds a canonical Music record by its URL slug.
 */
export function getMusicItemBySlug(
  slug: string
): MusicItem | undefined {
  return musicItems.find(
    (item) =>
      item.slug === slug &&
      item.status === "published"
  );
}

/**
 * Creates the horizontal category collections
 * for a Music section.
 *
 * Every card links to the standalone page
 * of its corresponding Music object.
 */
export function getMusicCatalogCollections(
  section: MusicSection
): MusicCatalogCollection[] {
  const sectionDefinition = musicSections.find(
    (item) => item.title === section
  );

  if (!sectionDefinition) return [];

  return sectionDefinition.categories.map((category) => ({
    title: category,
    items: getMusicItems(section, category).map((item) => ({
      id: item.id,
      title: item.title,
      href: `/${item.slug}/`,
      image: item.image,
      year: item.date
        ? String(new Date(item.date).getFullYear())
        : undefined
    }))
  }));
}
