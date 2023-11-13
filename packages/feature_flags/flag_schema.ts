/**
 * The list of feature flags which can be enabled/disabled.
 */
export type FlagList = Record<string, FlagSettings>;

/**
 * If true/false, the flag is enabled or disabled globally. If a
 * FlagSettingsObject, the flag is enabled or disabled according to the
 * configuration in the object.
 */
export type FlagSettings = boolean | FlagSettingsObject;

export interface FlagSettingsObject {
   userToggle: boolean;
}
