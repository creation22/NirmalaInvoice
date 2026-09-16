import { InvoiceMain } from "@/app/components";
import { WizardProvider } from "@/contexts/WizardContext";

export default function CreateInvoicePage() {
    return (
        <main className="container py-6 pb-28 md:py-10 xl:pb-10 shell:max-w-none shell:px-0 shell:py-0 shell:pb-0">
            <WizardProvider>
                <InvoiceMain />
            </WizardProvider>
        </main>
    );
}
