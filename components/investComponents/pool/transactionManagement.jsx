import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useWriteContract, useAccount, useWaitForTransactionReceipt,useSignMessage } from "wagmi"
import { CIVINVEST_TOKEN, VAULT_CONTRACT } from "@/components/Address/contractAddress"
import { usdtABI, vaultABI } from "@/contractABIs"
import { ethers } from "ethers"
import UseStore from "@/store/UseStore"
import { motion } from "framer-motion"
import { formatFigures } from "@/components/utils/web3FiguresHelpers"
import { Elephant } from "@/components/assets"
import Spinner from "@/components/utils/spinner"
import Image from "next/image"
import ViewTX from "@/components/utils/viewTX"
import { minNumber } from "@/components/utils/services/NumberServices"
const TransactionManagement = ({ apiData, availableBalance, poolId, fetchData, setModalType, web3LoadingStates, setWeb3LoadingStates, allowDeposit }) => {
    const { setTransactionType, setMessage, tokenDecimals,setTransactionsStatus,transactionsStatus,currentWalletAddress } = UseStore()
    const { address, chain } = useAccount()

    const { data: dataRevokeHash, writeContractAsync: writeRevoke } = useWriteContract()
    const { data: editDataHash, writeContractAsync: writeEdit } = useWriteContract()
    const { data: dataCancelDepositHash, writeContractAsync: writeCancelDeposit } = useWriteContract()

    const { data: dataCancelWithdrawHash, writeContractAsync: writeCancelWithdraw } = useWriteContract()
    const {signMessage} = useSignMessage()

    const { isSuccess: isSuccessRevoke } = useWaitForTransactionReceipt({
        hash: dataRevokeHash,
    })
    const { data: editTxData, isSuccess: isSuccessDataEdit } = useWaitForTransactionReceipt({
        hash: editDataHash,
    })

    const { data: cancelDepositTxData, isSuccess: cancelDepositIsSuccess } = useWaitForTransactionReceipt({
        hash: dataCancelDepositHash
    })
    const { data: cancelWithdrawTxData, isSuccess: cancelWithdrawIsSuccess } = useWaitForTransactionReceipt({
        hash: dataCancelWithdrawHash
    })
    const openModal = (type) => {
        setTransactionType(type)
        setModalType(type)
    }
    const handleApprove = async () => {
        setTransactionsStatus({
            editUSDTAllowance: false
        })
        !Number(availableBalance.civAssetAllowance) <= 0 && signMessage({message: "In order to edit USDT allowance you need to first revoke and then approve a new USDT amount. Thus requires two transactions to be signed"})
        setTransactionType("Edit Allowance")
        setMessage(<ViewTX type={"loading"} />);
        setWeb3LoadingStates(prevStates => ({ ...prevStates, editUsdtAllowance: true }));
        try {

            if(Number(availableBalance.civAssetAllowance) <= 0) {
                await performEdit()
            } else{
                            await writeRevoke?.({
                address: chain && CIVINVEST_TOKEN[chain?.id] ? CIVINVEST_TOKEN[chain?.id][poolId] : null,
                abi: usdtABI,
                functionName: 'approve',
                args: [chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null, ethers.parseEther('0')],
            });
            }
        } catch (error) {
            console.log('Error approving:', error.message);
            setMessage(<ViewTX type={"error"} message={error.message} />);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, editUsdtAllowance: false }));
        }
    };
    const performEdit = async () => {
        setWeb3LoadingStates(prevStates => ({ ...prevStates, editUsdtAllowance: true }));
        setMessage(<ViewTX type={"loading"} message={Number(availableBalance.civAssetAllowance) <= 0 ? 'Approving USDT Allowance...' : "Transaction 1/2 successful..."} />);
        try {
            await writeEdit?.({
                address: chain && CIVINVEST_TOKEN[chain?.id] ? CIVINVEST_TOKEN[chain?.id][poolId] : null,
                abi: usdtABI,
                functionName: 'approve',
                args: [chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null, availableBalance.usdt && tokenDecimals?.INVEST_DECIMAL > 0 ? ethers.parseUnits(availableBalance.usdt, tokenDecimals?.INVEST_DECIMAL) : "0"],
            });
        } catch (error) {
            console.log('Error editing:', error.message);
            setMessage(<ViewTX type={"error"} message={error.message} />);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, editUsdtAllowance: false }));
        }
    };

    const handleCancel = async (action) => {
        if (action === 'deposit') {
            setTransactionType("cancelDeposit")
            setMessage(<ViewTX type={"loading"} message={'Cancel Deposit sent to web3...'} />);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, cancelDeposit: true }));
            try {
                await writeCancelDeposit?.({
                    address: chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null,
                    abi: vaultABI,
                    functionName: 'cancelDeposit',
                    args: [poolId],
                });
            } catch (error) {
                console.error('Error canceling deposit:', error);
                setMessage(<ViewTX type={"error"} message={error.message} />)
                setWeb3LoadingStates(prevStates => ({ ...prevStates, cancelDeposit: false }));
            }
        } else if (action === 'withdraw') {
            setTransactionType("withdrawDeposit")
            setMessage(<ViewTX type={"loading"} message={'Cancel Withdraw sent to web3....'} />);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, cancelWithdrawal: true }));
            try {
                await writeCancelWithdraw?.({
                    address: chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null,
                    abi: vaultABI,
                    functionName: 'cancelWithdraw',
                    args: [poolId],
                });
            } catch (error) {
                setMessage(<ViewTX type={"error"} message={error.message} />)
                setWeb3LoadingStates(prevStates => ({ ...prevStates, cancelWithdrawal: false }));
            }
        }
    };

    const epochStartTimeParse = parseInt(apiData.epochStartTime)
    const epochStartTime = () => {
        const startDate = new Date(epochStartTimeParse * 1000)
        const date = startDate.toLocaleDateString()
        const time = startDate.toLocaleTimeString()
        return [time, date];
    }

    const epochTimeLeft = epochStartTimeParse + parseInt(apiData.epochDuration)
    const epochEndTime = () => {
        const endDate = new Date(epochTimeLeft * 1000);
        const date = endDate.toLocaleDateString()
        const time = endDate.toLocaleTimeString()

        return [time, date];
    }

    const calculatePercentage = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const timeElapsed = currentTime - epochStartTimeParse;
        const totalTime = epochTimeLeft - epochStartTimeParse;

        const percentage = (timeElapsed / totalTime) * 100;
        return Math.min(100, Math.max(0, percentage));
    };

    const [percentageRemaining, setPercentageRemaining] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setPercentageRemaining(calculatePercentage);
        }, 1000);

        return () => clearInterval(interval);
    }, [epochStartTime, epochEndTime]);

    useEffect(() => {
        if (isSuccessRevoke) {
            setWeb3LoadingStates(prevStates => ({ ...prevStates, editUsdtAllowance: false }));
            performEdit();
        }
    }, [isSuccessRevoke])
    useEffect(() => {
        if (isSuccessDataEdit) {
            setTransactionsStatus({
                editUSDTAllowance: true
            })
            setWeb3LoadingStates(prevStates => ({ ...prevStates, editUsdtAllowance: false }));
            setMessage(<ViewTX message={"Success"} txHash={editTxData?.transactionHash} type={"success"} />);

        }
    }, [isSuccessDataEdit])

    useEffect(() => {
        if (cancelDepositIsSuccess) {
            setWeb3LoadingStates(prevStates => ({ ...prevStates, cancelDeposit: false }));
            setMessage(<ViewTX message={`Deposit cancelled successfully`} txHash={cancelDepositTxData?.transactionHash} type={"success"} />);
        }

        if (cancelWithdrawIsSuccess) {
            setWeb3LoadingStates(prevStates => ({ ...prevStates, cancelWithdrawal: false }));
            setMessage(<ViewTX message={`Withdrawal cancelled successfully`} txHash={cancelWithdrawTxData?.transactionHash} type={"success"} />);
        }
    }, [cancelDepositIsSuccess, cancelWithdrawIsSuccess])

    useEffect(() => {
        setTransactionsStatus({
            isSuccessDataEdit, cancelDepositIsSuccess, cancelWithdrawIsSuccess})
    }, [isSuccessDataEdit, cancelDepositIsSuccess, cancelWithdrawIsSuccess]);

    
    const EnoughInvestableUsdt = minNumber(availableBalance.usdt, availableBalance.civAssetAllowance) > 0
    return (
        <div className={styles.pool_detail__epoch}>
            <div className="flex items-start justify-between relative">
                <div className="epoch_starts max-sm:mt-13 mt-16">
                    <h2 className="max-sm:leading-5">Epoch Starts</h2>
                    <h1 className="text-2xl max-sm:leading-5">{epochStartTime()[0]} {/*<span className="text-[12px] text-[#D47FF2]">AM</span>*/}</h1>
                    <p className="text-[12px] text-[#D47FF2] ">{epochStartTime()[1]}</p>
                </div>
                <div className="indicator mt-5">
                    <div className="absolute left-0 w-full">
                        <div className="flex items-center ">
                            <div className="dot w-[6px] h-[6px] bg-[#D57FF2] rounded">
                            </div>
                            <div className={`${styles.line} lineone w-full`}></div>
                            <div className="dot w-[6px] h-[6px] bg-[#D57FF2] rounded">
                            </div>
                        </div>
                        <div className=" w-full h-20 relative ">
                            <motion.div
                                initial={{ left: "0%" }}
                                animate={{
                                    left: percentageRemaining > 20 ? `calc(${percentageRemaining}% - 155px)` : `${(percentageRemaining / 100) * 100}%`,
                                }}
                                transition={{ duration: 1 }}
                                className={`absolute -top-[25px] max-sm:-top-[20px]`}>
                                <div className={styles.pool_detail__epoch__banner}>
                                    <h1>Epoch {apiData.curDepositEpoch}</h1>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className="epoch_starts max-sm:mt-13 mt-16 text-right">
                    <h2 className="max-sm:leading-5">Epoch Ends</h2>
                    <h1 className="text-2xl max-sm:leading-5">{epochEndTime()[0]} {/* <span className="text-[12px] text-[#D47FF2]">PM</span> */}</h1>
                    <p className="text-[12px] text-[#D47FF2]">{epochEndTime()[1]}</p>
                </div>
            </div>
            <div className={styles.pool_detail__epoch__progress_bar}>
                <motion.div
                    className="fill absolute max-sm:h-[47px] h-[57px] bg-[#20CECB]"
                    initial={{ width: "0%" }}
                    animate={{
                        width: `${Math.min((parseInt(ethers.formatUnits(apiData.depositedVault, 6)) / 100000) * 100, 100)}%`,
                    }}
                    transition={{ duration: 1 }}
                ></motion.div>
                <div className="flex justify-center items-center relative h-full">
                    <p className="text-white">
                        Deposited {formatFigures(ethers.formatUnits(apiData.depositedVault, 6), 2)} / {formatFigures(100000, 1)}
                        <span className="ml-2">{((parseInt(ethers.formatUnits(apiData.depositedVault, 6)) / 100000) * 100).toFixed(2)}%</span>
                    </p>
                </div>
            </div>
            <div className={styles.pool_detail__epoch__inprogress}>
                <div className={styles.text}>
                    <Image src={Elephant} width={20} height={20} alt="token-img" />
                    <h1 className="mt-1">
                        {apiData.epochHasExpired ?
                            "Epoch has expired. Please wait for the rebalancing process to complete before continuing operations." :
                            apiData.depositAmounts > 0 && apiData.withdrawAmounts > 0 ?
                                "Epoch is active and you have pending deposit and withdrawal, you can cancel anytime." :
                                apiData.depositAmounts > 0 ?
                                    "Epoch is active and you have pending deposit, you can cancel anytime." :
                                    apiData.withdrawAmounts > 0 ?
                                        "Epoch is active and you have pending withdrawal, you can cancel anytime." :
                                        "Epoch is active, you can deposit or withdraw."
                        }
                    </h1>
                </div>
                <div className="flex md:gap-x-3 gap-x-1">
                    <button
                        id="cancel-withdrawal" className={`text-white ${apiData.withdrawAmounts <= 0 || apiData.epochHasExpired || web3LoadingStates.cancelWithdrawal ? "gray_btn px-[16px] py-[6px] cursor-not-allowed" : 'primary_button'}`} onClick={() => handleCancel('withdraw')} disabled={apiData.withdrawAmounts > 0 ? apiData.epochHasExpired ? true : web3LoadingStates.cancelWithdrawal : true}>

                        {web3LoadingStates.cancelWithdrawal ? <div className="px-[26px]">
                            <Spinner />
                        </div> : "Cancel Withdrawal"}
                    </button>
                    <button
                        id="cancel-deposit" className={` text-white ${apiData.depositAmounts <= 0 || apiData.epochHasExpired || web3LoadingStates.cancelDeposit ? "gray_btn px-[16px] py-[6px] cursor-not-allowed" : 'primary_button'}`} onClick={() => handleCancel('deposit')} disabled={apiData.depositAmounts > 0 ? apiData.epochHasExpired ? true : web3LoadingStates.cancelDeposit : true}>
                        {web3LoadingStates.cancelDeposit ? <div className="px-[26px]">
                            <Spinner />
                        </div> : " Cancel Deposit"}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-between items-center max-sm:hidden text-sm">
            <button id="edit-usdt-allowance"
                    className={currentWalletAddress ? "primary_button text-white" : "gray_btn text-white cursor-not-allowed"} onClick={() => handleApprove()} disabled={web3LoadingStates.editUsdtAllowance || !currentWalletAddress}>

                    {web3LoadingStates.editUsdtAllowance ? <div className="px-[26px]">
                        <Spinner />
                    </div> : "Edit USDT Allowance"}
                </button>

                <div className="flex items-center gap-x-3">
                    <button id="book-usdt-deposit" className={` px-[16px] py-[6px] ${apiData.epochHasExpired || web3LoadingStates.BookUSDTDeposit || !allowDeposit || !EnoughInvestableUsdt ? "gray_btn text-white cursor-not-allowed" : 'green_button'}`} onClick={() => openModal('deposit')}
                        disabled={apiData.epochHasExpired ? true : web3LoadingStates.BookUSDTDeposit || !allowDeposit || !EnoughInvestableUsdt}
                    >
                        {web3LoadingStates.BookUSDTDeposit ? <div className="px-[26px]">
                            <Spinner />
                        </div> : "Book USDT Deposit"}
                    </button>
                    <button id="book-usdt-withdrawal"
                        className={`${apiData.epochHasExpired || web3LoadingStates.bookUSDTWithdrawal || !Number(availableBalance.XCIVshares) > 0 ? "gray_btn text-white cursor-not-allowed" : 'red_button'}`} onClick={() => openModal('withdraw')} disabled={apiData.epochHasExpired || !Number(availableBalance.XCIVshares) > 0 ? true : web3LoadingStates.bookUSDTWithdrawal}>

                        {web3LoadingStates.bookUSDTWithdrawal ? <div className="px-[26px]">
                            <Spinner />
                        </div> : " Book USDT Withdrawal"}
                    </button>
                </div>
            </div>

            <div className=" hidden max-sm:block">
                <div className="flex items-center justify-between mb-3 text-[13px] flex-col gap-2">
                <button className={ `text-white w-full ${currentWalletAddress ? `primary_button`:"gray_btn cursor-not-allowed"}`} onClick={() => handleApprove()} disabled={web3LoadingStates.bookUSDTWithdrawal || !currentWalletAddress}>
                        Edit USDT Allowance
                    </button>
                    <button className={`primary_button text-white w-full ${apiData.epochHasExpired || web3LoadingStates.bookUSDTWithdrawal || !Number(availableBalance.XCIVshares) > 0 ? "gray_btn text-white" : 'red_button'}`} onClick={() => openModal('withdraw')} disabled={apiData.epochHasExpired || !Number(availableBalance.XCIVshares) > 0 ? true : web3LoadingStates.bookUSDTWithdrawal}>
                        {web3LoadingStates.bookUSDTWithdrawal ? <Spinner /> : "Withdraw Shares"}
                    </button>
                </div>
                <button className={`px-[16px] text-white py-[6px] w-full text-[13px] ${apiData.epochHasExpired || web3LoadingStates.BookUSDTDeposit || !allowDeposit || !EnoughInvestableUsdt ? "gray_btn " : 'green_button'}`} onClick={() => openModal('deposit')} disabled={apiData.epochHasExpired ? true : web3LoadingStates.BookUSDTDeposit || !allowDeposit || !EnoughInvestableUsdt }>
                    {web3LoadingStates.BookUSDTDeposit ? <div className="px-[26px]">
                        <Spinner />
                    </div> : "Book USDT Deposit"}
                </button>
            </div>
        </div>
    );
}

export default TransactionManagement;