//import '../globals.css' 
import { Righteous } from 'next/font/google'

const MainFontFamily = Righteous({
  weight: ['400'],
  subsets: ['latin']
}); 

export const metadata = {
  title: 'Touch - Links',
  description: 'Quick access to all touch services and social media',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  }
}

export default function LinksLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="grow">
                {children}
            </main>
        </div>
    )
} 