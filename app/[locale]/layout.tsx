// Components
import AppChrome from "@/app/components/layout/AppChrome";
// ShadCn
import { Toaster } from "@/components/ui/toaster";
// Contexts
import Providers from "@/contexts/Providers";
// Fonts
import {
    alexBrush,
    dancingScript,
    greatVibes,
    notoSerifDevanagari,
    outfit,
    parisienne,
} from "@/lib/fonts";
// SEO
import {
    buildJsonLd,
    languageAlternates,
    localePath,
    ROOTKEYWORDS,
} from "@/lib/seo";
// Variables
import {
    AUTHOR_NAME,
    AUTHOR_WEBSITE,
    BASE_URL,
    dirForLocale,
    GOOGLE_SC_VERIFICATION,
    LOCALES,
} from "@/lib/variables";
// Vercel Analytics + Speed Insights
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
// Next Intl
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "@/i18n/messages";
import { notFound } from "next/navigation";

/**
 * Per-locale metadata.
 *
 * This was a single static object: one English title and description served to
 * all eighteen locales, no metadataBase, no Open Graph, no Twitter card, no
 * hreflang, and `canonical` hardcoded to the bare origin — which, since every
 * locale is path-prefixed, is a redirect rather than a page. Each locale was
 * telling search engines that the canonical version of itself was somewhere
 * else.
 */
export async function generateMetadata(props: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await props.params;
    const messages = await getMessages(locale);
    const meta = (messages as Record<string, Record<string, string>>)?.meta ?? {};

    const title = meta.title ?? "निर्मलाInvoice | UPI Invoice Generator with Split Payment QR Codes";
    const description =
        meta.description ??
        "Create invoices with UPI bill payment QR codes. Amounts over ₹1,999 are split into multiple QRs that add up to the full total. Made for Indian businesses.";

    return {
        metadataBase: new URL(BASE_URL),
        title,
        description,
        keywords: ROOTKEYWORDS,
        robots: { index: true, follow: true },
        alternates: {
            canonical: localePath(locale),
            languages: languageAlternates(),
        },
        openGraph: {
            type: "website",
            siteName: "निर्मलाInvoice",
            title,
            description,
            url: localePath(locale),
            locale,
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
        authors: {
            name: AUTHOR_NAME,
            url: AUTHOR_WEBSITE,
        },
        verification: {
            google: GOOGLE_SC_VERIFICATION,
        },
    };
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export function generateStaticParams() {
    // Next.js expects an array of objects: [{ locale: 'en' },
    // ...]
    const locales = LOCALES.map((locale) => ({ locale: locale.code }));
    return locales;
}

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;

    const { locale } = params;

    const { children } = props;

    let messages;
    try {
        // English-backed so a key missing from a translation renders readable
        // copy instead of an error. See i18n/messages.ts
        messages = await getMessages(locale);
    } catch {
        notFound();
    }

    return (
        /*
         * `dir` was missing entirely. Arabic has been in LOCALES since before
         * this branch and rendered right-to-left text inside a left-to-right
         * document the whole time.
         */
        <html
            lang={locale}
            dir={dirForLocale(locale)}
            suppressHydrationWarning
        >
            <head suppressHydrationWarning>
                <script
                    type="application/ld+json"
                    id="json-ld"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(buildJsonLd(locale)),
                    }}
                />
            </head>
            <body
                className={`${outfit.className} ${notoSerifDevanagari.variable} ${dancingScript.variable} ${parisienne.variable} ${greatVibes.variable} ${alexBrush.variable} antialiased min-h-dvh bg-white text-foreground`}
                suppressHydrationWarning
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Providers>
                        <AppChrome>{children}</AppChrome>
                        <Toaster />
                        <Analytics />
                        <SpeedInsights />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
