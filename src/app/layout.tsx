import Footer from "@/components/footer/Footer"
import Navbar from "@/components/includes/Navbar"
import '../styles/globals.css';
import HighlightSection from "@/components/includes/HighlightSection";
import FooterLogin from "@/components/footer/FooterLogin";
import RootLayoutComponent from "@/components/layout/RootLayout";
import { Metadata } from "next";
// import GoogleAnalytics from "./GoogleAnalytics";



export const metadata: Metadata = {
  title: {
    default:"Adarc Computers",
    template:"%s - Adarc Computers"
  },
  description: "Your Trusted Source for High-End Gaming PCs & Components in UAE",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en" className="no-scrollbar">
            <head>
              <link rel="manifest" href="/manifest.json" />
              <meta name="theme-color" content="#0000ff" />
              <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
              <meta name="apple-mobile-web-app-status-bar" content="#0000ff" />
            </head>
            <body suppressHydrationWarning={true}>
            {/* <GoogleAnalytics /> */}
            {/* Layout UI */}
        <Navbar />
        {children}
        <RootLayoutComponent isDescription={false} />
      </body>
    </html>
  )
}