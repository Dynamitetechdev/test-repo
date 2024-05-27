import styles from "./styles.module.scss"
import { useEffect, useState } from "react";
import PerformanceChart from "../chart/performanceChart";
import Modal from "@/components/modals/modal";
import { useAccount } from "wagmi"
import { floatFigure, formatFigures } from "@/components/utils/web3FiguresHelpers";
import LoadBalances from "@/components/utils/contractReads/loadBalances";
import UseStore from "@/store/UseStore";
import useTransaction from "@/components/utils/useTransaction";
import { Tooltip } from "react-tooltip";
import TransactionManagement from "./transactionManagement";
import ShowBalanceManagement from "./showBalanceManagement";
import ClaimManagement from "./claimManagement";
import TokenDecimals from "@/components/utils/tokenDecimals";
import UsePoolStore from "@/store/UsePoolStore";
import { minNumber } from "@/components/utils/services/NumberServices";


const PoolDetail = ({ poolDataFromSocket, data: apiPoolData, poolId, fetchData, allowDeposit }) => {
    const { transactionType, currentWalletAddress,tokenDecimals } = UseStore()
    const { setInvestableUsdt} = UsePoolStore()
    const { address, chain } = useAccount()
    const [modalType, setModalType] = useState(null)

    const closeModal = () => {
        setModalType(null)
    }

    const [inputAmount, setInputAmount] = useState({
        withdrawAmount: '',
        depositAmount: '',
    })

    const [availableBalance, setAvailableBalance] = useState({
        usdt: "0",
        investDecimals: "0",
        XCIVshares: "0",
        guarantee: "0",
        guaranteeAllowance: "0",
        civAssetAllowance: "0",
        xCivAllowance: "0",
    });

    const [web3LoadingStates, setWeb3LoadingStates] = useState({
        cancelWithdrawal: false,
        cancelDeposit: false,
        editUsdtAllowance: false,
        claimAsset: false,
        claimableGuarantee: false,
        bookUSDTWithdrawal: false,
        BookUSDTDeposit: false,
        guaranteeApproveState:false
    })

    const [apiData, setApiData] = useState({
        epochStartTime: 0,
        curDepositEpoch: 0,
        epochDuration: 0,
        depositedVault: 0,
        claimableGuaranteeAmount: 0,
        claimableWithdraw: 0,
        depositAmounts: 0,
        withdrawAmounts: 0,
        epochHasExpired: false,
    })

    const { memoizedBalances: balances, refetch } = LoadBalances(poolId)
    const { handleApprove: handleTxApprove, handleDeposit, depositAmount } = useTransaction(transactionType, chain, poolId, inputAmount, availableBalance, setWeb3LoadingStates, fetchData)
    // console.log("balances", balances,tokenDecimals)
    useEffect(() => {
        if (apiPoolData?.data) {
            let epochHasExpired = false;
            const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
            epochHasExpired = currentTimestampInSeconds > Number(apiPoolData.data?.epochStartTime) + Number(apiPoolData.data?.epochDuration)

            setApiData({
                ['epochStartTime']: apiPoolData.data?.epochStartTime,
                ['epochDuration']: apiPoolData.data?.epochDuration,
                ['curDepositEpoch']: apiPoolData.data?.curDepositEpoch,
                ['depositedVault']: apiPoolData.data?.depositedVault,
                ['claimableGuaranteeAmount']: apiPoolData.data?.claimableGuaranteeAmount,
                ['claimableWithdraw']: apiPoolData.data?.claimableWithdraw,
                ['depositAmounts']: apiPoolData.data?.depositAmounts,
                ['withdrawAmounts']: apiPoolData.data?.withdrawAmounts,
                ['epochHasExpired']: epochHasExpired,
            });
        }
    }, [apiPoolData]);
    const [slippageApprove, setSlippageApprove] = useState(false)
    useEffect(() => {
        if (balances && tokenDecimals) {
            setAvailableBalance({
                ['usdt']: balances?.tokenBalance,
                ['investDecimals']: tokenDecimals?.INVEST_DECIMAL,
                ['XCIVshares']: balances?.XCIVBalance,
                ['guarantee']: balances?.guaranteeBalance,
                ['guaranteeAllowance']: balances?.guaranteeAllowance,
                ['civAssetAllowance']: balances?.civAssetAllowance,
                ['xCivAllowance']: balances?.xCivAllowance,
            })
            setInvestableUsdt(minNumber(balances?.tokenBalance, balances?.civAssetAllowance))
        }
    }, [balances, chain, currentWalletAddress, slippageApprove])

    // console.log({balances: availableBalance})
    const chartPercentage = () => {
        const num = poolDataFromSocket[0]?.fullHistory.length > 40 ? ((Number(poolDataFromSocket[0]?.fullHistory[poolDataFromSocket[0]?.fullHistory.length - 1][1]) - Number(poolDataFromSocket[0]?.fullHistory[poolDataFromSocket[0]?.fullHistory.length - 48][1])) / Number(poolDataFromSocket[0]?.fullHistory[poolDataFromSocket[0]?.fullHistory.length - 48][1])) * 100 : 0.00
        if(num > 0) {
            return <h3 className="bg-blurGreen text-[14px] rounded-full px-2 py-1 text-sharpGreen ml-2">+${floatFigure(Math.ceil(num * 100) / 100, 2)} % 24H</h3>
        } else{
            return <h3 className="bg-red-700 text-[14px] rounded-full px-2 py-1 text-white ml-2">${floatFigure(Math.floor(num * 100) / 100, 2)} % 24H</h3>
        }
    }
    return (
        <>
            <div className="pool-details-container">
                <div className={styles.pool_detail}>
                    <ShowBalanceManagement availableBalance={availableBalance} poolDataFromSocket={poolDataFromSocket} apiData={apiData} poolId={poolId} currentWalletAddress={currentWalletAddress}/>
                    <TransactionManagement apiData={apiData} availableBalance={availableBalance} poolId={poolId} fetchData={fetchData} setModalType={setModalType} web3LoadingStates={web3LoadingStates} setWeb3LoadingStates={setWeb3LoadingStates} allowDeposit={allowDeposit} currentWalletAddress={currentWalletAddress}/>
                </div>

                <div className={styles.pool_detail_performance}>
                    <ClaimManagement poolId={poolId} fetchData={fetchData} web3LoadingStates={web3LoadingStates} setWeb3LoadingStates={setWeb3LoadingStates} chain={ chain} apiData={apiData} availableBalance={availableBalance}/>
                    <div className=" w-full bg-poolDarkBlue h-[450px] rounded-lg px-5 py-8 max-sm:hidden">
                        <div className="total_aval_claim">
                            <p className="text-[16px]">Value Per Share (VPS)</p>
                            <div className="flex items-center mb-10">
                                <h1>{formatFigures(poolDataFromSocket[0]?.fullHistory[poolDataFromSocket[0]?.fullHistory.length - 1][1], 4)}</h1>
                                {
                                 chartPercentage()
                                }
                           
                            </div>

                            <div className="">
                                <PerformanceChart data={poolDataFromSocket[0] ? poolDataFromSocket[0].fullHistory : []} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                modalType && <Modal type={modalType} onClose={closeModal} poolId={poolId} availableBalance={availableBalance} inputAmount={inputAmount} setInputAmount={setInputAmount} handleApprove={handleTxApprove} decimals={tokenDecimals?.INVEST_DECIMAL} handleDeposit={handleDeposit} depositAmount={depositAmount} setWeb3LoadingStates={setWeb3LoadingStates} fetchData={fetchData} web3LoadingStates={web3LoadingStates} guaranteeAllowance={availableBalance.guaranteeAllowance} setSlippageApprove={setSlippageApprove} />
            }
            <div className="text-[13px] ">
                <Tooltip anchorSelect="#edit-usdt-allowance" content="Change the amount of approved usdt in your wallet that can interact with Dapp" className="max-w-[200px] text-center text-[10px]" />
                <Tooltip anchorSelect="#book-usdt-withdrawal" content="Request for withdrawal of funds from the strategy that will occur during the next rebalancing" className="max-w-[200px] text-center" />
                <Tooltip anchorSelect="#book-usdt-deposit" content="Request for deposit of funds in the strategy that will occur during the next rebalancing" className="max-w-[200px] text-center" />
                <Tooltip anchorSelect="#cancel-withdrawal" content="Use this action if you want to cancel the request to withdraw funds from the strategy that will occur during the next rebalancing." className="max-w-[200px] text-center" />
                <Tooltip anchorSelect="#cancel-deposit" content="Use this action if you want to cancel the request to deposit funds into the strategy that will occur during the next rebalancing." className="max-w-[200px] text-center" />
                <Tooltip anchorSelect="#min" content="Change the" className=" text-center text-[10px]" />
            </div>
        </>
    );
}

export default PoolDetail;