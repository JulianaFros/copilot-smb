import '../styles/globals.scss'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Copilot для бизнеса',
    description: 'Минималистичный чат-ассистент для малого бизнеса',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body>{children}</body>
        </html>
    )
}