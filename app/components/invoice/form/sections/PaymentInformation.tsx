"use client";

import { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

// Components
import { FormInput, Subheading } from "@/app/components";

// ShadCn
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

// Types
import { InvoiceType } from "@/types";
import { splitBillForUpiQrs, UPI_QR_MAX_RUPEES } from "@/lib/upi";
import { formatRupees } from "@/lib/helpers";

const PaymentInformation = () => {
    const { _t } = useTranslationContext();
    const { control, setValue } = useFormContext<InvoiceType>();

    const upiEnabled = useWatch({
        control,
        name: "details.paymentInformation.upiEnabled",
    });
    const totalAmount = useWatch({ control, name: "details.totalAmount" });

    const qrParts = useMemo(
        () => splitBillForUpiQrs(totalAmount ?? 0),
        [totalAmount]
    );

    useEffect(() => {
        if (!upiEnabled) return;
        setValue("details.paymentInformation.qrParts", qrParts);
    }, [upiEnabled, qrParts, setValue]);

    return (
        <section>
            <Subheading>{_t("form.steps.paymentInfo.heading")}:</Subheading>

            {/* UPI Payment Toggle */}
            <div className="mt-5 flex items-center justify-between rounded-lg border border-border bg-white p-4">
                <div className="flex items-center space-x-3">
                    <div>
                        <Label htmlFor="upi-enabled" className="text-base font-semibold">
                            UPI payment
                        </Label>
                        <p className="text-sm text-muted-foreground">
                            Scan-to-pay QR codes. Bills over{" "}
                            {formatRupees(UPI_QR_MAX_RUPEES)} are split into
                            multiple payment QR codes. Turn off to enter bank
                            transfer details instead.
                        </p>
                    </div>
                </div>
                <Switch
                    id="upi-enabled"
                    checked={upiEnabled || false}
                    onCheckedChange={(checked) => {
                        setValue("details.paymentInformation.upiEnabled", checked);
                    }}
                />
            </div>

            {/* UPI Settings */}
            {upiEnabled && (
                <div className="mt-5 space-y-5 rounded-lg border border-border bg-white p-4">
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                            UPI on — split payment QR codes on the invoice
                        </Badge>
                    </div>

                    <FormInput
                        name="details.paymentInformation.upiId"
                        label="UPI ID / VPA"
                        placeholder="merchant@paytm"
                        vertical
                    />

                    <div className="rounded-md border border-border bg-white p-4">
                        <div className="text-sm font-semibold mb-2">
                            Bill payment QR codes
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>Total bill</span>
                                <span className="font-semibold">
                                    {formatRupees(totalAmount)}
                                </span>
                            </div>
                            {qrParts.map((part) => (
                                <div
                                    key={part.partNumber}
                                    className="flex justify-between"
                                >
                                    <span>QR {part.partNumber}</span>
                                    <span className="font-semibold">
                                        {formatRupees(part.amount)}
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border">
                                <span>Total</span>
                                <span>{formatRupees(totalAmount)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                {qrParts.length === 1
                                    ? "One UPI QR for the full bill."
                                    : `Split into ${qrParts.length} payment QR codes that add up to the total. Each QR is at most ${formatRupees(UPI_QR_MAX_RUPEES)}.`}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Bank transfer — only when UPI is off, so the default path stays UPI. */}
            {!upiEnabled && (
                <div className="mt-5 space-y-3">
                    <p className="text-sm text-muted-foreground">
                        Bank transfer details. Turn UPI back on for scan-to-pay QR
                        codes.
                    </p>
                    <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2">
                        <FormInput
                            name="details.paymentInformation.bankName"
                            label={_t("form.steps.paymentInfo.bankName")}
                            placeholder={_t("form.steps.paymentInfo.bankName")}
                            vertical
                        />
                        <FormInput
                            name="details.paymentInformation.accountName"
                            label={_t("form.steps.paymentInfo.accountName")}
                            placeholder={_t("form.steps.paymentInfo.accountName")}
                            vertical
                        />
                        <FormInput
                            name="details.paymentInformation.accountNumber"
                            label={_t("form.steps.paymentInfo.accountNumber")}
                            placeholder={_t("form.steps.paymentInfo.accountNumber")}
                            vertical
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default PaymentInformation;
