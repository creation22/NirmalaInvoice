import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALE_CODES } from "./locale-config";

export const routing = defineRouting({
    locales: [...LOCALE_CODES],
    defaultLocale: DEFAULT_LOCALE,
});
