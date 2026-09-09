import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource-variable/fraunces/standard.css";
import "@fontsource-variable/fraunces/standard-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "../styles/globals.css";
import MotionProvider from "@/components/ui/MotionProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";

const SITE_URL = "https://cryptolegalcommunity.id";
const TITLE = "Crypto Legal Community — Law, Digital Economy & Crypto";
const DESCRIPTION =
  "Crypto Legal Community is an educational community exploring law, cryptocurrency, investment, and the digital economy in Indonesia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Crypto Legal Community",
  },
  description: DESCRIPTION,
  keywords: [
    "Crypto Legal Community",
    "hukum cryptocurrency Indonesia",
    "regulasi aset digital",
    "digital economy law",
    "komunitas hukum digital",
    "literasi investasi digital",
  ],
  authors: [{ name: "Crypto Legal Community" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Crypto Legal Community",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#080b10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-void font-sans text-paper antialiased">
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
