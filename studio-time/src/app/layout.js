import { Inter ,Montserrat} from 'next/font/google'
import './globals.css'
import Nav from './components/Nav/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Choose what you need
  variable: '--font-montserrat', // Optional: useful for Tailwind
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable}`}>
        <Nav/>
        {children}
        </body>
    </html>
  )
}
