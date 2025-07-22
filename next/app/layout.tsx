import React from "react";
import type { Viewport } from "next";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { generateMetadataObject } from "@/lib/shared/metadata";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CartProvider } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import fetchContentType from "@/lib/strapi/fetchContentType";

import "./globals.css";

import { SlugProvider } from "./context/SlugContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

// Default Global SEO for pages without them
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    "global",
    {
      filters: { locale: "en" }, // Hardcoded to English
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageData = await fetchContentType(
    "global",
    { filters: { locale: "en" } },
    true
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <ViewTransitions>
        <CartProvider>
          <body
            className={cn(
              inter.className,
              "bg-charcoal antialiased h-full w-full"
            )}
            suppressHydrationWarning
          >
            <SlugProvider>
              <Navbar data={pageData.navbar} locale="en" />
              {children}
              <Footer data={pageData.footer} locale="en" />
            </SlugProvider>
          </body>
        </CartProvider>
      </ViewTransitions>
    </html>
  );
}
