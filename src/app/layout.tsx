import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/animate.min.css";
import "remixicon/fonts/remixicon.css";
import "swiper/css/bundle";
import "react-accessible-accordion/dist/fancy-example.css";
import "../../public/css/flaticon_astle.css";
import "../../public/css/navbar.css";
import "../../public/css/services-details.css";
import "../../public/css/portfolio-details.css";
import "../../public/css/blog-details.css";
import "../../public/css/footer.css";
import "../../public/css/cookie.css";
// Globals Styles
import "../../public/css/style.css";
// Globals Responsive Styles
import "../../public/css/responsive.css";

// Tailwind import
import "../app/global.css";

import AosAnimation from "@/components/Layout/AosAnimation";
import BackToTop from "@/components/Layout/BackToTop";

import type { Metadata } from "next";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kipras Group",
  description: "Tecrübemiz ve yenilikçi yaklaşımımızla, şehrin siluetini değiştirecek yeni projemizi sizlerle buluşturmak için gün sayıyoruz.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={jost.className}>
        {children}

        {/* AosAnimation */}
        <AosAnimation />

        {/* BackToTop */}
        <BackToTop />
      </body>
    </html>
  );
}
