import type { Metadata, Viewport } from "next";
import { Kalam, Caveat, Nunito, Merriweather, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SW Notes | Your Notebook. Smarter.",
  description: "A cognitive-psychology-driven learning platform.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SW Notes",
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F6F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kalam.variable} ${caveat.variable} ${nunito.variable} ${merriweather.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
