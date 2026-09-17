"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

// Next Intl
import { Link } from "@/i18n/navigation";

// Variables
import { AUTHOR_NAME, AUTHOR_SOCIAL, HIRE_ME_URL } from "@/lib/variables";

const BaseFooter = () => {
    const { _t } = useTranslationContext();

    return (
        // pb clears the sticky MobileActionBar, which only renders below xl
        <footer className="border-t border-border bg-white">
            <div className="container flex flex-col items-center justify-between gap-2 py-6 pb-28 text-sm text-muted-foreground sm:flex-row xl:pb-6">
                <div className="flex flex-col items-center gap-1 sm:items-start">
                    <p>
                        {_t("footer.developedBy")}{" "}
                        <a
                            href={AUTHOR_SOCIAL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                        >
                            {AUTHOR_NAME}
                        </a>
                    </p>
                    <a
                        href={HIRE_ME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                    >
                        {_t("footer.hireMe")}
                    </a>
                </div>

                <nav>
                    <Link
                        href="/guide"
                        className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                    >
                        {_t("footer.guide")}
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default BaseFooter;
