/**
 * Locale list shared by next-intl routing (Edge middleware) and the app.
 * Keep this file free of imports from @/lib or @/types so middleware stays Edge-safe.
 */

const LOCALE_CATALOGUE = [
    { code: "en", name: "English" },
    { code: "az", name: "Azərbaycanca" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "es", name: "Español" },
    { code: "ca", name: "Català" },
    { code: "fr", name: "Français" },
    { code: "ar", name: "العربية" },
    { code: "pl", name: "Polish" },
    { code: "pt-BR", name: "Português (Brasil)" },
    { code: "tr", name: "Türkçe" },
    { code: "zh-CN", name: "简体中文" },
    { code: "ja", name: "日本語" },
    { code: "nb-NO", name: "Norwegian (bokmål)" },
    { code: "nn-NO", name: "Norwegian (nynorsk)" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "sr", name: "Српски" },
    { code: "he", name: "עברית" },
] as const;

const PINNED_LOCALES = ["en", "az"] as const;

const localeCollator = new Intl.Collator("en", { sensitivity: "base" });

export const LOCALES = [
    ...PINNED_LOCALES.map(
        (code) => LOCALE_CATALOGUE.find((locale) => locale.code === code)!
    ),
    ...LOCALE_CATALOGUE.filter(
        (locale) => !(PINNED_LOCALES as readonly string[]).includes(locale.code)
    ).sort((a, b) => localeCollator.compare(a.name, b.name)),
];

export const LOCALE_CODES = LOCALES.map(({ code }) => code);

export const DEFAULT_LOCALE = LOCALES[0].code;

export const RTL_LOCALES = new Set(["ar", "he"]);

export const dirForLocale = (locale: string): "rtl" | "ltr" =>
    RTL_LOCALES.has(locale) ? "rtl" : "ltr";
