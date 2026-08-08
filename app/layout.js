import { Analytics } from "@vercel/analytics/next";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.earlyyearsedugrp.com"),
  title: {
    default: "New Dubai Nursery | Early Learning Center",
    template: "%s | New Dubai Nursery"
  },
  description:
    "New Dubai Nursery Early Learning Center offers joyful, play-led early years education for children ages 2 to 6 in Al Hudaiba, Dubai.",
  openGraph: {
    title: "New Dubai Nursery Early Learning Center",
    description: "A joyful beginning. A confident future.",
    images: ["/images/Admissions11.jpg"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
