import ClientWrapper from "./components/ClientWrapper";
import "./globals.css";

export const metadata = {
  title: "Creator Tools by Usama | Premium Digital Subscriptions Pakistan",
  description:
    "Get verified Canva Pro, YouTube Premium, Adobe CC, Gemini Pro & more at Pakistan's lowest prices. Instant delivery, 100% verified.",
  keywords:
    "Canva Pro Pakistan, YouTube Premium, Adobe Creative Cloud, digital subscriptions Pakistan",
  authors: [{ name: "Usama" }],
  themeColor: "#ED1C24",
  openGraph: {
    title: "Creator Tools by Usama",
    description: "Premium digital subscriptions at Pakistan's lowest prices.",
    url: "https://yourwebsite.com",
    siteName: "Creator Tools by Usama",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="min-h-full flex flex-col">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
