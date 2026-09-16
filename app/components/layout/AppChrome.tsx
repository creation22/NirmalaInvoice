"use client";

import { usePathname } from "@/i18n/navigation";
import Script from "next/script";
import { BaseFooter, BaseNavbar } from "@/app/components";

export default function AppChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLanding = pathname === "/";

    if (isLanding) {
        return <>{children}</>;
    }

    return (
        <>
            <BaseNavbar />
            <div className="flex flex-col">{children}</div>
            <BaseFooter />
            <Script
                src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
                strategy="lazyOnload"
                data-name="BMC-Widget"
                data-cfasync="false"
                data-id="aliabb"
                data-description="Support me on Buy me a coffee!"
                data-message="Thank you for using निर्मलाUPI"
                data-color="#111111"
                data-position="Right"
                data-x_margin="18"
                data-y_margin="18"
            />
        </>
    );
}
