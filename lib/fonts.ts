// Next Google Fonts
import {
    Alex_Brush,
    Dancing_Script,
    Great_Vibes,
    Noto_Serif_Devanagari,
    Outfit,
    Parisienne,
} from "next/font/google";

// Default Fonts
export const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false,
});

export const notoSerifDevanagari = Noto_Serif_Devanagari({
    subsets: ["devanagari"],
    weight: ["400", "600", "700"],
    variable: "--font-devanagari",
    display: "swap",
});

// Signature fonts
export const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-dancing-script",
    preload: true,
    display: "swap",
});

export const parisienne = Parisienne({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-parisienne",
    preload: true,
    display: "swap",
});

export const greatVibes = Great_Vibes({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-great-vibes",
    preload: true,
    display: "swap",
});

export const alexBrush = Alex_Brush({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-alex-brush",
    preload: true,
    display: "swap",
});
