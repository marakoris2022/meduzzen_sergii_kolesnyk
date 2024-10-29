import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Box } from "@mui/material";
import { themeConstants } from "../constants/themeConstants";
import StoreProvider from "./components/StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meduzzen Intern project",
  description: "Small project made for education purpose.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <StoreProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <NextIntlClientProvider messages={messages}>
            <ThemeRegistry>
              <Header />
              <Box
                component="main"
                sx={{
                  minHeight: `calc(100vh - ${themeConstants.headerHeight} - ${themeConstants.footerHeight}
                - ${themeConstants.headerMarginTop})`,
                }}
              >
                {children}
              </Box>
              <Footer />
            </ThemeRegistry>
          </NextIntlClientProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
