import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PublicEnvScript } from "next-runtime-env";
import type { ReactNode } from "react";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Verification • Kitsu",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <PublicEnvScript />
            </head>
            <body className={`${inter.className}`}>
                <TooltipProvider>
                    <div
                        vaul-drawer-wrapper=""
                        className="min-h-[100vh]"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' fill='none'%3E%3Cscript xmlns=''/%3E%3Cg opacity='.2' clip-path='url(%23E)'%3E%3Cpath d='M1466.4 1795.2c950.37 0 1720.8-627.52 1720.8-1401.6S2416.77-1008 1466.4-1008-254.4-380.482-254.4 393.6s770.428 1401.6 1720.8 1401.6z' fill='url(%23A)'/%3E%3Cpath d='M394.2 1815.6c746.58 0 1351.8-493.2 1351.8-1101.6S1140.78-387.6 394.2-387.6-957.6 105.603-957.6 714-352.38 1815.6 394.2 1815.6z' fill='url(%23B)'/%3E%3Cpath d='M1548.6 1885.2c631.92 0 1144.2-417.45 1144.2-932.4S2180.52 20.4 1548.6 20.4 404.4 437.85 404.4 952.8s512.276 932.4 1144.2 932.4z' fill='url(%23C)'/%3E%3Cpath d='M265.8 1215.6c690.246 0 1249.8-455.595 1249.8-1017.6S956.046-819.6 265.8-819.6-984-364.005-984 198-424.445 1215.6 265.8 1215.6z' fill='url(%23D)'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='A' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(1466.4 393.6) rotate(90) scale(1401.6 1720.8)'%3E%3Cstop stop-color='%23107c10'/%3E%3Cstop offset='1' stop-color='%23c4c4c4' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='B' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(394.2 714) rotate(90) scale(1101.6 1351.8)'%3E%3Cstop stop-color='%230078d4'/%3E%3Cstop offset='1' stop-color='%23c4c4c4' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='C' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(1548.6 952.8) rotate(90) scale(932.4 1144.2)'%3E%3Cstop stop-color='%23ffb900' stop-opacity='.75'/%3E%3Cstop offset='1' stop-color='%23c4c4c4' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='D' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(265.8 198) rotate(90) scale(1017.6 1249.8)'%3E%3Cstop stop-color='%23d83b01' stop-opacity='.75'/%3E%3Cstop offset='1' stop-color='%23c4c4c4' stop-opacity='0'/%3E%3C/radialGradient%3E%3CclipPath id='E'%3E%3Cpath fill='%23fff' d='M0 0h1920v1080H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3Cscript xmlns=''/%3E%3C/svg%3E\")",
                            backgroundSize: "cover",
                        }}
                    >
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem={true}
                            disableTransitionOnChange={true}
                        >
                            {children}
                        </ThemeProvider>
                    </div>
                </TooltipProvider>
            </body>
        </html>
    );
}
