import "/styles/globals.css";

import { NextProvider, NextLayout } from "./provider"

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Next-Map',
  description: 'Next.js applied Next-Map',
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <NextProvider>
                    <NextLayout>
                        {children}
                    </NextLayout>
                </NextProvider>

            </body>
        </html>
    )
}