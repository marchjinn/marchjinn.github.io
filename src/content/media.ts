export interface MediaCategory {
  slug: string;
  title: string;
  section: string;
  format: "square" | "wide" | "portrait";
}

export interface MediaItem {
  id: string;
  category: string;
  title: string;
  sourceUrl: string;
  thumbnail?: string;
  publishedAt?: string;
  description?: string;
}

export const mediaSections = [
  {
    title: "Videos",
    categories: [
      { slug: "music-videos", title: "Music Videos", format: "wide" },
      { slug: "films", title: "Films", format: "wide" },
      { slug: "vlogs", title: "Vlogs", format: "wide" },
      { slug: "interviews", title: "Interviews", format: "wide" },
      { slug: "shows", title: "Shows", format: "wide" },
      { slug: "performances", title: "Performances", format: "wide" }
    ]
  },
  {
    title: "Photos",
    categories: [
      { slug: "portraits", title: "Portraits", format: "portrait" },
      { slug: "editorials", title: "Editorials", format: "portrait" },
      { slug: "campaigns", title: "Campaigns", format: "portrait" },
      { slug: "photo-performances", title: "Performances", format: "portrait" },
      { slug: "events", title: "Events", format: "portrait" },
      { slug: "lifestyle", title: "Lifestyle", format: "portrait" }
    ]
  },
  {
    title: "Audios",
    categories: [
      { slug: "podcasts", title: "Podcasts", format: "square" },
      { slug: "audio-interviews", title: "Interviews", format: "square" },
      { slug: "broadcasts", title: "Broadcasts", format: "square" }
    ]
  },
  {
    title: "Streams",
    categories: [
      { slug: "screen-streams", title: "Screen Streams", format: "wide" },
      { slug: "irl-streams", title: "IRL Streams", format: "wide" },
      { slug: "stream-performances", title: "Performances", format: "wide" },
      { slug: "stream-shows", title: "Shows", format: "wide" },
      { slug: "stream-specials", title: "Specials", format: "wide" }
    ]
  },
  {
    title: "Publications",
    categories: [
      { slug: "posts", title: "Posts", format: "portrait" },
      { slug: "articles", title: "Articles", format: "portrait" },
      { slug: "news", title: "News", format: "portrait" },
      { slug: "reviews", title: "Reviews", format: "portrait" },
      { slug: "publication-interviews", title: "Interviews", format: "portrait" },
      { slug: "features", title: "Features", format: "portrait" }
    ]
  }
] satisfies {
  title: string;
  categories: MediaCategory[];
}[];

export const mediaCategories: MediaCategory[] =
  mediaSections.flatMap((section) =>
    section.categories.map((category) => ({
      ...category,
      section: section.title
    }))
  );

/**
 * Media records will be added here.
 * No placeholder or fictional content is published.
 */
export const mediaItems: MediaItem[] = [];

/**
 * Converts supported original source URLs into provider-specific embed URLs.
 * Unsupported providers retain their original direct links.
 */
export function getMediaEmbedUrl(sourceUrl: string): string | undefined {
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