import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage, http } from 'wagmi'
import { mainnet, goerli, sepolia, arbitrum } from 'wagmi/chains'

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_W3PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
    name: 'CivFund',
    description: "The world's first fully decentralized crypto hedge fund.",
    url: 'https://fund.civfund.org/',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
export const config = defaultWagmiConfig({
    chains: [mainnet,sepolia, arbitrum], // required
    projectId, // required
    metadata, // required
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    enableWalletConnect: true, // Optional - true by default
    enableInjected: true, // Optional - true by default
    enableEIP6963: true, // Optional - true by default
    enableCoinbase: true, // Optional - true by default
    transports: {
        [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/cnF4veV0S7_dN_y0s3ygYlEE0ox-E_f5'),
        [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/Bzg0RGsBZsLA0r7hnsohUiuXl-8h2NgF'),
        [arbitrum.id]:http('https://arb-mainnet.g.alchemy.com/v2/5erVWOjM_OIkeIaLUC819AMIfBDXgGan')
    }
})