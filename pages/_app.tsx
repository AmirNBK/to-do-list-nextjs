import MainProvider from '@/Context/Services/Procider/Provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Component {...pageProps} />
    </MainProvider>
  )
}
