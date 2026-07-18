import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import FloatingActions from "./components/FloatingActions";

export const metadata = {
  title: {
    default: "EYEG | Early Years Education Group",
    template: "%s | EYEG"
  },
  description: "Quality care and early years education for children aged 2 to 6 in Dubai.",
  icons: { icon: "/api/media/assets/logo_ii.png" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingActions />
        <Analytics />
      </body>
    </html>
  );
}
