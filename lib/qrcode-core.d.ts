declare module "qrcode/lib/core/qrcode" {
    export function create(
        text: string,
        options?: { errorCorrectionLevel?: string }
    ): {
        modules: {
            size: number;
            get: (row: number, col: number) => number;
        };
    };
}
