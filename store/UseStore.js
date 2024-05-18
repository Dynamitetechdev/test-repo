import { create } from 'zustand'

const UseStore = create((set) => ({
    message: null,
    currentWalletAddress: null,
    chain: null,
    transactionType: '',
    guaranteeFee: 0,
    socketData: {},
    depositWithdrawTxState: false,
    tokenPrices: {},
    totalNAV: 0,
    highestNetAPY: 0,
    transactionsStatus: {},
    tokenDecimals: {},
    setChain: (chain) => set(() => ({chain})),
    setMessage: (message) => set(() => ({ message: message })),
    setCurrentWalletAddress: (address) => set(() => ({ currentWalletAddress: address })),
    setTransactionType: (type) => set(() => ({ transactionType: type })),
    setGuaranteeFee: (fee) => set(() => ({ guaranteeFee: fee })),
    setSocketData: (data) => set(() => ({ socketData: data })),
    setWeb3TXState: (data) => set(() => ({ depositWithdrawTxState: data })),
    setTokenPrices: (data) => set(() => ({ tokenPrices: data })),
    setTotalNAV: (data) => set(() => ({ totalNAV: data })),
    setHighestNetAPY: (data) => set(() => ({ highestNetAPY : data})),
    setTransactionsStatus: (data) => set(() => ({transactionsStatus: data})),
    setTokenDecimal: (data) => set(() => ({tokenDecimals: data}))
}))

export default UseStore