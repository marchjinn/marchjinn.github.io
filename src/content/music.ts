
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
  | "amazon-music"
  | "soundcloud"
  | "tidal"
  | "deezer"
  | "bandcamp"
  | "audiomack";

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
    ],

    // Temporary embed tests using the same reference album.
    playerSources: [
      {
        provider: "apple-music",
        url: "https://embed.music.apple.com/us/album/stop-staring-at-the-shadows/1551171660"
      },
      {
        provider: "spotify",
        url: "https://open.spotify.com/embed/album/7rKmLxCFlmtIxGpX4HYgs4"
      },
      {
        provider: "amazon-music",
        url: "https://music.amazon.com/embed/B08V9H6MT3"
      },
      {
        provider: "soundcloud",
        url: "https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fg59%2Fsets%2Fstopstaringattheshadows&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
      },
      {
        provider: "tidal",
        url: "https://embed.tidal.com/albums/171430481"
      },
      {
        provider: "deezer",
        url: "https://widget.deezer.com/widget/dark/album/203484852"
      },
      {
        provider: "audiomack",
        url: "https://audiomack.com/embed/album/suicide-boys/stop-staring-at-the-shadows"
      }
    ],

    // Separate YouTube Album Player test.
    youtubePlaylistUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_m_YN4jRxFY1FrpJtDBF6kOewAz6G9tTqY",

    // External listening destinations.
    externalLinks: [
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/stop-staring-at-the-shadows/1551171660"
      },
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/7rKmLxCFlmtIxGpX4HYgs4"
      },
      {
        platform: "Amazon Music",
        url: "https://music.amazon.com/albums/B08V9H6MT3"
      },
      {
        platform: "SoundCloud",
        url: "https://soundcloud.com/g59/sets/stopstaringattheshadows"
      },
      {
        platform: "TIDAL",
        url: "https://tidal.com/album/171430481"
      },
      {
        platform: "Deezer",
        url: "https://www.deezer.com/album/203484852"
      },
      {
        platform: "Audiomack",
        url: "https://audiomack.com/suicide-boys/album/stop-staring-at-the-shadows"
      },
      {
        platform: "YouTube Music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_m_YN4jRxFY1FrpJtDBF6kOewAz6G9tTqY"
      }
    ]
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
