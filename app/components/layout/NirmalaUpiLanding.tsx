import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LandingDevelopedBy } from "@/app/components/layout/LandingDevelopedBy";
import {
    BrandWordmark,
    FooterMarks,
    LandingDeco,
} from "@/app/components/layout/NirmalaUpiMarks";

export default function NirmalaUpiLanding() {
    return (
        <main className="landing-page bg-white text-neutral-950">
            <section className="landing-hero relative flex min-h-dvh flex-col items-center justify-center px-3 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28">
                <header className="landing-mark absolute left-0 top-0 z-10 px-5 pt-5 sm:px-8 sm:pt-7">
                    <h1>
                        <BrandWordmark size="hero" />
                    </h1>
                </header>

                <LandingDeco />

                <div className="relative z-[1] flex w-full flex-col items-center">
                    <figure className="landing-poster m-0 flex max-h-[calc(100dvh-9.5rem)] w-full max-w-[920px] flex-col items-center">
                        <Image
                            src="/assets/img/tax-me-daddy.png"
                            alt="TAX ME DADDY. BELIEVE ME."
                            width={1200}
                            height={1200}
                            priority
                            sizes="(max-width: 640px) 96vw, (max-width: 1024px) 90vw, 920px"
                            className="h-auto max-h-[calc(100dvh-13.5rem)] w-auto max-w-full object-contain"
                        />
                    </figure>

                    <Link
                        href="/create"
                        className="landing-cta mt-7 inline-flex h-12 items-center justify-center bg-neutral-950 px-8 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-white sm:mt-8"
                    >
                        Create invoice
                    </Link>
                </div>
            </section>

            <footer className="landing-footer bg-white">
                <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center sm:py-16">
                    <p>
                        <BrandWordmark size="compact" />
                    </p>
                    <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed text-[rgb(44_34_31_/_0.72)]">
                        UPI invoices with split payment QR codes — made for
                        Indian businesses.
                    </p>
                    <FooterMarks />
                    <LandingDevelopedBy />
                </div>
            </footer>
        </main>
    );
}
