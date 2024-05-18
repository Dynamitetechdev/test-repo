
import { GUARANTEE_CONTRACT, XCIV_CONTRACT } from "@/components/Address/contractAddress";



const AddTokenToWallet = async (token, chain, poolId) => {
    const chainId = chain?.id;
    let tokenSymbol = (token === 'stone' && chainId === 1) ? '0NE' : (token === 'stone' && chainId !== 1) ? 'CIVUSD' : 'XCIV';
    try {
        const tokenAddress = token === 'stone' ? GUARANTEE_CONTRACT[chainId] ? GUARANTEE_CONTRACT[chainId][poolId] : null : XCIV_CONTRACT[chainId] ? XCIV_CONTRACT[chainId][poolId] : null;
        if (!tokenAddress) {
            throw new Error(`Token address not found for chain ID ${chainId} and token ${token}`);
        }
        
        const tokenDecimals = 18;

       await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokenAddress,
                    symbol: tokenSymbol,
                    decimals: tokenDecimals,
                    image: '',
                },
            },
        });
            } catch (error) {
        console.error(`Error adding ${tokenSymbol} to your wallet:`, error);
    }
};


export default AddTokenToWallet