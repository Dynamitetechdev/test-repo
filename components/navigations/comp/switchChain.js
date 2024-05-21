export const switchChainFunc = async (chainId) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error) {
      console.error("Error checking or switching chain: ", error);
    }
  } else {
    console.error("MetaMask is not installed");
  }
};
