"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import HighlightSection from '../includes/HighlightSection';
import FooterLogin from '../footer/FooterLogin';
import Footer from '../footer/Footer';

function RootLayout({isDescription}:any) {
    const pathname = usePathname();

    return (
        <>
            {pathname?.includes("/login") || pathname?.includes("/signup") || pathname?.includes("/forgot-password") ? (
                <FooterLogin />
            ) : (
                <>
                    <HighlightSection isDescription={isDescription} />
                    <Footer />
                </>
            )}
        </>
    );
}

export default RootLayout;
