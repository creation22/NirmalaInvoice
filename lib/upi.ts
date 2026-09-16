import { create as createQr } from "qrcode/lib/core/qrcode";

/** UPI QR amounts must not exceed ₹1,999. This is a per-QR cap, not installments. */
export const UPI_QR_MAX_RUPEES = 1999;
export const UPI_QR_MAX_PAISE = UPI_QR_MAX_RUPEES * 100; // 199900

export type UpiQrPart = {
    partNumber: number;
    amount: number;
};

/**
 * Split a bill into the minimum number of UPI QR amounts, each ≤ ₹1,999.
 * Uses paise-safe integer math so the parts sum to the original total.
 *
 * ₹5500 → ₹1999 + ₹1999 + ₹1502
 */
export function splitBillForUpiQrs(totalAmount: number): UpiQrPart[] {
    const totalPaise = Math.round((Number(totalAmount) || 0) * 100);
    if (totalPaise <= 0) return [{ partNumber: 1, amount: 0 }];
    if (totalPaise <= UPI_QR_MAX_PAISE) {
        return [{ partNumber: 1, amount: totalPaise / 100 }];
    }
    const parts: UpiQrPart[] = [];
    let remaining = totalPaise;
    let n = 1;
    while (remaining > 0) {
        const chunk = Math.min(UPI_QR_MAX_PAISE, remaining);
        parts.push({ partNumber: n++, amount: chunk / 100 });
        remaining -= chunk;
    }
    return parts;
}

export function buildUpiUri(options: {
    upiId: string;
    payeeName: string;
    amount: number;
    note: string;
}): string {
    const params = new URLSearchParams({
        pa: options.upiId.trim(),
        pn: options.payeeName.trim() || "Merchant",
        am: options.amount.toFixed(2),
        cu: "INR",
        tn: options.note,
    });
    return `upi://pay?${params.toString()}`;
}

/**
 * Sync QR as an SVG data URL so the live preview and the PDF can both
 * embed it with no network request.
 */
export function qrDataUrl(text: string, pixelSize = 128): string {
    const qr = createQr(text, { errorCorrectionLevel: "M" });
    const modules = qr.modules;
    const count = modules.size;
    const quiet = 4;
    const dim = count + quiet * 2;
    const cell = pixelSize / dim;

    let path = "";
    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
            if (modules.get(row, col)) {
                const px = (col + quiet) * cell;
                const py = (row + quiet) * cell;
                path += `M${px.toFixed(3)} ${py.toFixed(3)}h${cell.toFixed(3)}v${cell.toFixed(3)}h-${cell.toFixed(3)}z`;
            }
        }
    }

    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pixelSize} ${pixelSize}" width="${pixelSize}" height="${pixelSize}" shape-rendering="crispEdges">` +
        `<rect width="100%" height="100%" fill="#fff"/>` +
        `<path fill="#000" d="${path}"/>` +
        `</svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Always recompute QR parts from the invoice total. Never trust a stored split. */
export function resolveUpiQrParts(options: {
    upiEnabled?: boolean;
    totalAmount: number;
}): UpiQrPart[] {
    if (!options.upiEnabled) return [];
    return splitBillForUpiQrs(options.totalAmount);
}
