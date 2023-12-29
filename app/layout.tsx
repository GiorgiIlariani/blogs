import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Blogs app",
  description: "create as many blogs as you want",
};

// local font
const Firago = localFont({
  src: [
    {
      path: "../public/assets/fonts/FiraGO_fonts/Roman/FiraGO-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/FiraGO_fonts/Roman/FiraGO-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/assets/fonts/FiraGO_fonts/Roman/FiraGO-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/assets/fonts/FiraGO_fonts/Roman/FiraGO-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-FiraGO",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${Firago.className} bg-[#F3F2FA]`}>{children}</body>
    </html>
  );
}
