"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";
import { AUTHOR_NAME, AUTHOR_SOCIAL } from "@/lib/variables";

export function LandingDevelopedBy() {
    const { _t } = useTranslationContext();

    return (
        <p className="mt-8 text-[0.8rem] text-[rgb(44_34_31_/_0.55)]">
            {_t("footer.developedBy")}{" "}
            <a
                href={AUTHOR_SOCIAL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[rgb(44_34_31_/_0.72)] underline underline-offset-4 transition-colors hover:text-neutral-950"
            >
                {AUTHOR_NAME}
            </a>
        </p>
    );
}
