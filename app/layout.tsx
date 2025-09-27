import './globals.css'
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <TanstackProvider>
          <Header />
          {children}
          <Footer />
          <div id="sidebar-root" />
        </TanstackProvider>
      </body>
    </html>
  )
}
