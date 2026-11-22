
const websiteUrl = "https://marchjinn.com";

export const identity = {
  name: "March Jinn",
  username: "@marchjinn",

  website: {
    url: websiteUrl,
    seoTitle: "March Jinn",
    metaDescription: "March Jinn Official Website",
  },

  /**
   * Permanent machine-readable entity identifiers.
   * These IDs must remain stable across the entire website.
   */
  entities: {
    website: `${websiteUrl}/#website`,
    person: `${websiteUrl}/#person`,
    brand: `${websiteUrl}/#brand`,
  },

  classification: {
    primary: "Artist & Brand",
    brandCategory: "Artist Brand",
    artistCategory: "Multidisciplinary Artist",
    professionalCategories: [
      "Artist",
      "Music Producer",
      "Creative Director",
    ],
  },

  creativeFields: {
    core: [
      "Music",
      "Fashion",
      "Design",
      "Creative Direction",
    ],
    extended: [
      "Film & Video",
      "Photography",
      "Technology",
      "Gaming",
      "Publishing",
      "Food & Beverage",
      "Entertainment",
    ],
  },

  music: {
    primaryRole: "Recording Artist",
    additionalRoles: [
      "Music Producer",
      "Composer",
      "Lyricist",
      "Songwriter",
      "Vocalist",
      "Recording Engineer",
      "Sound Designer",
      "Mixing Engineer",
      "Mastering Engineer",
    ],
    genre: "Hip-Hop/Rap",
    subgenre: "Minimalist Psychedelic Trap",
    releaseLanguages: ["English"],
  },

  geography: {
    countryOfBirth: "Azerbaijan",
    residence: null,
    geographicBase: "Location Independent",
  },

  language: {
    official: "English",
    variant: "US English",
    accessibility: "International English",
  },

  contact: {
    general: "contact@marchjinn.com",
    business: "business@marchjinn.com",
    creative: "creative@marchjinn.com",
    music: "music@marchjinn.com",
    booking: "booking@marchjinn.com",
    press: "press@marchjinn.com",
    support: "support@marchjinn.com",
    legal: "legal@marchjinn.com",
    management: "management@marchjinn.com",
    careers: "careers@marchjinn.com",
  },

  /**
   * Only verified official public profile URLs belong here.
   * Never populate this list with guessed or unconfirmed URLs.
   */
  officialProfiles: [] as string[],
} as const;
