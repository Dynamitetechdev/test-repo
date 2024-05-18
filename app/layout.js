import AppHeader from '@/components/navigations/header'
import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { ContextProvider, Web3Modal } from '@/context/web3'
import { SocketProvider } from '@/components/socket/poolSocket'
import {GoogleAnalytics} from "@next/third-parties/google"
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import { headers } from "next/headers"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CivFund',
  description: "The world's first fully decentralized crypto hedge fund.",
}
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.cdnfonts.com/css/br-firma" rel="stylesheet " />
        <title>CIV</title>
      </Head>
      <body>
        <ContextProvider initialState={initialState}>
          <SocketProvider>
            <AppHeader />
            {children}
          </SocketProvider>
        </ContextProvider>
      </body>
      <GoogleAnalytics gaId='G-V7E8CHQJGP'/>
    </html>
  )
}
