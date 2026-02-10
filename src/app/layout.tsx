import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Primevest | Luxury Real Estate Investment",
    description:
        "Primevest connects discerning investors with exclusive real estate opportunities. Premium assets. Expert guidance. Exceptional returns.",
    keywords: "real estate investment, luxury property, investment opportunities",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>{children}</body>
        </html>
    );
}
