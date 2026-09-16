"use client";

import { useMemo, useState } from "react";

// Next
import Link from "next/link";

// ShadCn
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// Components
import {
    BaseButton,
    DevDebug,
    LanguageSelector,
} from "@/app/components";
import { BrandWordmark } from "@/app/components/layout/NirmalaUpiMarks";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Icons
import { Settings2 } from "lucide-react";

const BaseNavbar = () => {
    const devEnv = useMemo(() => {
        return process.env.NODE_ENV === "development";
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);

    const { _t } = useTranslationContext();

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white">
            <nav className="container flex h-16 items-center justify-between gap-4">
                <Link href="/" className="flex shrink-0 items-center">
                    <BrandWordmark size="nav" />
                </Link>

                {/* ? DEV Only */}
                {devEnv && (
                    <div className="hidden lg:block">
                        <DevDebug />
                    </div>
                )}

                {/* Desktop controls */}
                <div className="hidden items-center gap-2 sm:flex">
                    <LanguageSelector />
                </div>

                {/*
                 * Below sm the language select is wider than the space
                 * left beside the logo, so it moves into a sheet.
                 */}
                <div className="flex items-center gap-1 sm:hidden">
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger asChild>
                            <BaseButton
                                variant="ghost"
                                size="icon"
                                aria-label={_t("navbar.openSettings")}
                            >
                                <Settings2 className="h-5 w-5" />
                            </BaseButton>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85vw] max-w-sm">
                            <SheetHeader className="mb-6">
                                <SheetTitle>
                                    {_t("navbar.settings")}
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {_t("navbar.language")}
                                    </span>
                                    <LanguageSelector variant="block" />
                                </div>

                                {devEnv && <DevDebug />}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};

export default BaseNavbar;
