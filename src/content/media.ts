
export type MediaFormat = "square" | "wide" | "portrait";

export interface MediaCategory {
  slug: string;
  title: string;
  section: string;
  format: MediaFormat;
}

interface MediaCategoryDefinition {
  slug: string;
  title: string;
}

interface MediaSectionDefinition {
  title: string;
  format: MediaFormat;
  categories: MediaCategoryDefinition[];
}

export interface MediaItem {
  id: string;
  category: string;
  title: string;
  sourceUrl: string;
  status: "draft" | "published";
  thumbnail?: string;
  publishedAt?: string;
  description?: string;
}

export interface MediaCatalogCard {
  title: string;
  href: string;
  image?: string;
}

export interface MediaCatalogCollection {
  title: string;
  format: MediaFormat;
  items: MediaCatalogCard[];
}

export const mediaSections: MediaSectionDefinition[] = [
  {
    title: "Videos",
    format: "wide",
    categories: [
      { slug: "music-videos", title: "Music Videos" },
      { slug: "films", title: "Films" },
      { slug: "vlogs", title: "Vlogs" },
      { slug: "interviews", title: "Interviews" },
      { slug: "shows", title: "Shows" },
      { slug: "performances", title: "Performances" }
    ]
  },
  {
    title: "Photos",
    format: "portrait",
    categories: [
      { slug: "portraits", title: "Portraits" },
      { slug: "editorials", title: "Editorials" },
      { slug: "campaigns", title: "Campaigns" },
      { slug: "photo-performances", title: "Performances" },
      { slug: "events", title: "Events" },
      { slug: "lifestyle", title: "Lifestyle" }
    ]
  },
  {
    title: "Audios",
    format: "square",
    categories: [
      { slug: "podcasts", title: "Podcasts" },
      { slug: "audio-interviews", title: "Interviews" },
      { slug: "broadcasts", title: "Broadcasts" }
    ]
  },
  {
    title: "Streams",
    format: "wide",
    categories: [
      { slug: "screen-streams", title: "Screen Streams" },
      { slug: "irl-streams", title: "IRL Streams" },
      { slug: "stream-performances", title: "Performances" },
      { slug: "stream-shows", title: "Shows" },
      { slug: "stream-specials", title: "Specials" }
    ]
  },
  {
    title: "Publications",
    format: "portrait",
    categories: [
      { slug: "posts", title: "Posts" },
      { slug: "articles", title: "Articles" },
      { slug: "news", title: "News" },
      { slug: "reviews", title: "Reviews" },
      { slug: "publication-interviews", title: "Interviews" },
      { slug: "features", title: "Features" }
    ]
  }
];

export const mediaCategories: MediaCategory[] =
  mediaSections.flatMap((section) =>
    section.categories.map((category) => ({
      ...category,
      section: section.title,
      format: section.format
    }))
  );

/**
 * Media records.
 * Only items with status "published" appear in public catalogs.
 */
export const mediaItems: MediaItem[] = [];

/**
 * Returns the newest published item in a category.
 */
export function getLatestMediaItem(
  categorySlug: string
): MediaItem | undefined {
  return mediaItems
    .filter(
      (item) =>
        item.category === categorySlug &&
        item.status === "published"
    )
    .sort((a, b) => {
      const dateA = a.publishedAt
        ? new Date(a.publishedAt).getTime()
        : 0;

      const dateB = b.publishedAt
        ? new Date(b.publishedAt).getTime()
        : 0;

      return dateB - dateA;
    })[0];
}

/**
 * Creates the category-card shelves for the Media landing page.
 * Every category remains visible, even when it has no published items.
 * The category cover comes from its newest published item.
 */
export function getMediaCatalogCollections(): MediaCatalogCollection[] {
  return mediaSections.map((section) => ({
    title: section.title,
    format: section.format,
    items: section.categories.map((category) => {
      const latestItem = getLatestMediaItem(category.slug);

      return {
        title: category.title,
        href: `/${category.slug}/`,
        image: latestItem?.thumbnail
      };
    })
  }));
}

/**
 * Converts supported original source URLs into provider-specific embed URLs.
 * Unsupported providers retain their original direct links.
 */
export function getMediaEmbedUrl(
  sourceUrl: string
): string | undefined {
  try {
    const url = new URL(sourceUrl);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    // YouTube
    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be"
    ) {
      let videoId = "";

      if (host === "youtu.be") {
        videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
      } else {
        videoId =
          url.searchParams.get("v") ??
          url.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/)?.[1] ??
          "";
      }

      if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
      }
    }

    // Vimeo
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const videoId =
        url.pathname.match(/\/(?:video\/)?(\d+)/)?.[1];

      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
    }

    // Spotify
    if (host === "open.spotify.com") {
      const match = url.pathname.match(
        /^\/(album|track|episode|show|playlist)\/([a-zA-Z0-9]+)/
      );

      if (match) {
        return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
      }
    }

    // Twitch videos and channels
    if (host === "twitch.tv") {
      const videoId = url.pathname.match(/^\/videos\/(\d+)/)?.[1];

      if (videoId) {
        const embed = new URL("https://player.twitch.tv/");
        embed.searchParams.set("video", `v${videoId}`);
        embed.searchParams.set("parent", "marchjinn.com");
        embed.searchParams.set("autoplay", "true");
        embed.searchParams.set("muted", "true");

        return embed.toString();
      }

      const channel = url.pathname.match(/^\/([a-zA-Z0-9_]+)\/?$/)?.[1];

      if (channel) {
        const embed = new URL("https://player.twitch.tv/");
        embed.searchParams.set("channel", channel);
        embed.searchParams.set("parent", "marchjinn.com");
        embed.searchParams.set("autoplay", "true");
        embed.searchParams.set("muted", "true");

        return embed.toString();
      }
    }
  } catch {
    return undefined;
  }

  return undefined;
}
