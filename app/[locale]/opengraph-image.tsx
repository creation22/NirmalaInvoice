import { ImageResponse } from "next/og";

import { getMessages } from "@/i18n/messages";

/**
 * Open Graph card, generated rather than committed.
 *
 * A static PNG would have to be redrawn by hand for every locale and would
 * drift the moment the wording changed. Generating it means the card always
 * says what the page says. The previous setup had no OG image at all — links
 * to the site unfurled as a bare URL — and `lib/seo.ts` pointed its JSON-LD
 * `image` at a hashed build artefact that 404s after any rebuild.
 */
export const alt = "निर्मलाUPI — UPI invoice generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadDevanagariFont() {
    try {
        const cssRes = await fetch(
            "https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@600&text=" +
                encodeURIComponent("निर्मला"),
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
            }
        );
        const css = await cssRes.text();
        const match = css.match(/src: url\(([^)]+)\)/);
        if (!match) return null;
        const fontRes = await fetch(match[1]);
        if (!fontRes.ok) return null;
        return await fontRes.arrayBuffer();
    } catch {
        return null;
    }
}

export default async function OpengraphImage(props: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await props.params;
    const messages = await getMessages(locale);
    const meta = (messages as Record<string, Record<string, string>>)?.meta ?? {};

    const title = meta.ogTitle ?? "Free invoice generator";
    const description =
        meta.ogDescription ??
        "Thirteen templates. Fill it in, download the PDF. No account.";
    const devanagari = await loadDevanagariFont();

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#ffffff",
                    padding: 72,
                    // Satori has no default font stack; system-ui resolves on
                    // the render host.
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <div
                        style={{
                            color: "#111111",
                            fontSize: 48,
                            fontWeight: 600,
                            lineHeight: 1,
                            fontFamily: "Noto Serif Devanagari",
                        }}
                    >
                        निर्मला
                    </div>
                    <div
                        style={{
                            color: "#111111",
                            fontSize: 36,
                            fontWeight: 600,
                            lineHeight: 1,
                        }}
                    >
                        UPI
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div
                        style={{
                            color: "#111111",
                            fontSize: 66,
                            fontWeight: 700,
                            lineHeight: 1.1,
                            maxWidth: 900,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            color: "#555555",
                            fontSize: 30,
                            lineHeight: 1.35,
                            maxWidth: 860,
                        }}
                    >
                        {description}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        color: "#6E7488",
                        fontSize: 24,
                    }}
                >
                    <span>invoify.vercel.app</span>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: devanagari
                ? [
                      {
                          name: "Noto Serif Devanagari",
                          data: devanagari,
                          weight: 600,
                          style: "normal",
                      },
                  ]
                : undefined,
        }
    );
}
