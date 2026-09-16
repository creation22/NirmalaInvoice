/**
 * Original UPI-inspired marks — phone, QR grid, rupee, scan frame.
 * Not BHIM or NPCI wordmarks; line-and-module drawings only.
 */

const WORDMARK_SIZE = {
    hero: {
        hi: "text-[2.75rem] sm:text-[3.5rem] md:text-[4.15rem]",
        invoice: "text-[2.05rem] sm:text-[2.6rem] md:text-[3.05rem]",
    },
    compact: {
        hi: "text-2xl sm:text-3xl",
        invoice: "text-xl sm:text-2xl",
    },
    nav: {
        hi: "text-xl sm:text-2xl",
        invoice: "text-lg sm:text-xl",
    },
} as const;

/** Devanagari निर्मला + Latin Invoice as one mark. */
export function BrandWordmark({
    size = "nav",
    className,
}: {
    size?: keyof typeof WORDMARK_SIZE;
    className?: string;
}) {
    const scale = WORDMARK_SIZE[size];

    return (
        <span
            className={`inline-flex items-baseline whitespace-nowrap leading-none ${className ?? ""}`}
            aria-label="निर्मलाInvoice"
        >
            <span
                className={`font-devanagari font-semibold tracking-tight ${scale.hi}`}
            >
                निर्मला
            </span>
            <span className={`font-semibold tracking-tight ${scale.invoice}`}>
                Invoice
            </span>
        </span>
    );
}

type MarkProps = {
    className?: string;
};

export function QrGridMark({ className }: MarkProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={className}
            aria-hidden
            focusable="false"
        >
            <g fill="currentColor">
                <Finder x={2} y={2} />
                <Finder x={30} y={2} />
                <Finder x={2} y={30} />
                <rect x="22" y="6" width="3" height="3" />
                <rect x="22" y="12" width="3" height="3" />
                <rect x="6" y="22" width="3" height="3" />
                <rect x="12" y="22" width="3" height="3" />
                <rect x="22" y="22" width="7" height="7" />
                <rect x="32" y="22" width="3" height="3" />
                <rect x="38" y="22" width="3" height="3" />
                <rect x="22" y="32" width="3" height="3" />
                <rect x="28" y="32" width="3" height="3" />
                <rect x="34" y="30" width="3" height="3" />
                <rect x="40" y="32" width="3" height="3" />
                <rect x="22" y="38" width="3" height="3" />
                <rect x="30" y="38" width="3" height="3" />
                <rect x="36" y="40" width="3" height="3" />
                <rect x="42" y="38" width="3" height="3" />
                <rect x="42" y="44" width="3" height="3" />
            </g>
        </svg>
    );
}

function Finder({ x, y }: { x: number; y: number }) {
    return (
        <g transform={`translate(${x} ${y})`}>
            <path
                fillRule="evenodd"
                d="M0 0h16v16H0V0zm2.5 2.5h11v11h-11v-11zM5 5h6v6H5V5z"
            />
        </g>
    );
}

export function RupeeSealMark({ className }: MarkProps) {
    return (
        <svg
            viewBox="0 0 64 64"
            className={className}
            aria-hidden
            focusable="false"
            fill="none"
        >
            <circle
                cx="32"
                cy="32"
                r="29"
                stroke="currentColor"
                strokeWidth="1.2"
            />
            <circle
                cx="32"
                cy="32"
                r="24"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeDasharray="1.6 2.4"
            />
            <RupeeGlyph />
        </svg>
    );
}

function RupeeGlyph() {
    return (
        <g
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="square"
            strokeLinejoin="miter"
        >
            <path d="M20 18h24" />
            <path d="M20 26h24" />
            <path d="M24 18v30" />
            <path d="M24 26c12 0 16 5 14 14L26 50" />
        </g>
    );
}

export function PhoneQrMark({ className }: MarkProps) {
    return (
        <svg
            viewBox="0 0 40 68"
            className={className}
            aria-hidden
            focusable="false"
            fill="none"
        >
            <rect
                x="3"
                y="2"
                width="34"
                height="64"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <rect x="16" y="6" width="8" height="2" rx="1" fill="currentColor" />
            <rect
                x="8"
                y="12"
                width="24"
                height="44"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.2"
            />
            <g fill="currentColor" transform="translate(12 20)">
                <path
                    fillRule="evenodd"
                    d="M0 0h7v7H0V0zm1.2 1.2h4.6v4.6H1.2V1.2zM2.4 2.4h2.2v2.2H2.4V2.4z"
                />
                <path
                    fillRule="evenodd"
                    d="M9 0h7v7H9V0zm1.2 1.2h4.6v4.6h-4.6V1.2zM12.4 2.4h2.2v2.2h-2.2V2.4z"
                />
                <path
                    fillRule="evenodd"
                    d="M0 9h7v7H0V9zm1.2 1.2h4.6v4.6H1.2v-4.6zM2.4 11.4h2.2v2.2H2.4v-2.2z"
                />
                <rect x="9" y="9" width="3" height="3" />
                <rect x="13" y="9" width="3" height="3" />
                <rect x="9" y="13" width="3" height="3" />
                <rect x="13" y="13" width="2" height="2" />
            </g>
            <rect x="16" y="60" width="8" height="2" rx="1" fill="currentColor" />
        </svg>
    );
}

export function ScanPayMark({ className }: MarkProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={className}
            aria-hidden
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
        >
            <path d="M14 6H6v8" />
            <path d="M34 6h8v8" />
            <path d="M14 42H6v-8" />
            <path d="M34 42h8v-8" />
            <g
                strokeWidth="1.6"
                transform="translate(14 13)"
            >
                <path d="M0 4h20" />
                <path d="M0 10h20" />
                <path d="M4 4v18" />
                <path d="M4 10c8 0 11 3.2 10 10L6 26" />
            </g>
        </svg>
    );
}

export function PayArrowsMark({ className }: MarkProps) {
    return (
        <svg
            viewBox="0 0 48 48"
            className={className}
            aria-hidden
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            strokeLinejoin="miter"
        >
            <circle cx="24" cy="24" r="20" strokeWidth="1.2" />
            <path d="M14 20h16l-5-5" />
            <path d="M34 28H18l5 5" />
        </svg>
    );
}

export function LandingDeco() {
    return (
        <div className="landing-deco pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <RupeeSealMark className="landing-watermark absolute left-1/2 top-[42%] h-[min(42vw,22rem)] w-[min(42vw,22rem)] -translate-x-1/2 -translate-y-1/2 text-[rgb(44_34_31_/_0.07)]" />
            <QrGridMark className="absolute right-[4%] top-[11%] hidden h-16 w-16 text-[rgb(44_34_31_/_0.18)] sm:block md:right-[7%] md:h-20 md:w-20" />
            <PhoneQrMark className="absolute bottom-[11%] left-[5%] hidden h-[4.5rem] w-[2.7rem] text-[rgb(44_34_31_/_0.16)] sm:block md:left-[8%]" />
            <ScanPayMark className="absolute bottom-[12%] right-[5%] hidden h-14 w-14 text-[rgb(44_34_31_/_0.16)] sm:block md:right-[8%] md:h-16 md:w-16" />
            <RupeeSealMark className="absolute left-[5%] top-[22%] hidden h-14 w-14 text-[rgb(44_34_31_/_0.14)] md:block md:left-[7%]" />
        </div>
    );
}

export function FooterMarks() {
    return (
        <ul
            className="landing-footer-marks mt-7 flex items-center justify-center gap-7 text-[rgb(44_34_31_/_0.55)] sm:gap-9"
            aria-hidden
        >
            <li>
                <QrGridMark className="h-8 w-8" />
            </li>
            <li>
                <RupeeSealMark className="h-9 w-9" />
            </li>
            <li>
                <PhoneQrMark className="h-10 w-6" />
            </li>
            <li>
                <ScanPayMark className="h-8 w-8" />
            </li>
            <li className="hidden sm:block">
                <PayArrowsMark className="h-8 w-8" />
            </li>
        </ul>
    );
}
