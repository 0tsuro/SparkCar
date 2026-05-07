import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lavage auto à domicile à Saint-Omer | Spark’Car",
  description:
    "Spark’Car propose le lavage et detailing automobile à domicile à Saint-Omer et dans les Hauts-de-France. Nettoyage intérieur et extérieur professionnel.",
  metadataBase: new URL("https://www.sparkcar.fr"),
  alternates: { canonical: "/" },
  keywords: [
    "lavage auto domicile Saint-Omer",
    "nettoyage voiture domicile",
    "detailing automobile Hauts-de-France",
    "lavage auto Pas-de-Calais",
    "nettoyage intérieur voiture",
    "lavage extérieur voiture",
  ],
  openGraph: {
    title: "Lavage auto à domicile à Saint-Omer | Spark’Car",
    description:
      "Lavage et detailing automobile à domicile à Saint-Omer et dans les Hauts-de-France. Réservez en ligne.",
    url: "https://www.sparkcar.fr",
    siteName: "Spark’Car",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavage auto à domicile à Saint-Omer | Spark’Car",
    description:
      "Lavage et detailing automobile à domicile à Saint-Omer et dans les Hauts-de-France.",
  },
  robots: { index: true, follow: true },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Spark'Car",
              description:
                "Lavage et detailing automobile à domicile à Saint-Omer et dans les Hauts-de-France.",
              url: "https://www.sparkcar.fr",
              telephone: "+33648349752",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Saint-Omer",
                addressRegion: "Hauts-de-France",
                addressCountry: "FR",
              },
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 50.7481,
                  longitude: 2.2529,
                },
                geoRadius: "30000",
              },
              priceRange: "€€",
              makesOffer: {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Lavage automobile à domicile sur rendez-vous",
                },
              },
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
