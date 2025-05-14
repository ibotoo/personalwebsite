import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Schema from './components/Schema'

export const metadata: Metadata = {
    title: 'İbrahim Can Sancar | Girişimci',
    description: 'İbrahim Can Sancar - Girişimci ve Sosyal Medya Uzmanı. Web geliştirme, mobil uygulama ve yazılım çözümleri.',
    keywords: ['İbrahim Sancar', 'sosyal medya uzmanı', 'İbrahim Can Sancar', 'Girişimci', 'Yazılım Mühendisi', 'Web Geliştirme'],
    authors: [{ name: 'İbrahim Can Sancar' }],
    openGraph: {
        title: 'İbrahim Can Sancar | Girişimci',
        description: 'İbrahim Can Sancar - Girişimci',
        url: 'https://ibrahimcansancar.com',
        siteName: 'İbrahim Can Sancar',
        locale: 'tr_TR',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
            <head>
                <Schema />
            </head>
            <body>
                {children}
                <SpeedInsights />
            </body>
        </html>
    )
} 