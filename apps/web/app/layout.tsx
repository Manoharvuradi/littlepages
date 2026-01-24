import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import AuthProvider from "./providers/AuthProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Little Pages",
  description: "Create photo books from your favorite images easily.",
};

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}