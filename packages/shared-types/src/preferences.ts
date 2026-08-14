export type FeedPreferences = {
  boostTypes?: string[];
  muteTypes?: string[];
  hideTypes?: string[];
  boostTags?: string[];
  muteTags?: string[];
  boostCities?: string[];
  muteCities?: string[];
  /** 0 = pure editorial, 1 = pure Style DNA */
  personalisationWeight?: number;
  boostStrength?: number;
  muteStrength?: number;
};