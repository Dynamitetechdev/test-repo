import Image from "next/image";
import { Close, Stack } from "../assets";
import styles from "./styles.module.scss"
import { useEffect, useState } from "react";
import { formatFigures } from "@/components/utils/web3FiguresHelpers";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import useGuaranteeFee from "../utils/contractReads/useGuaranteeFee";
import { ChevronDownIcon, Cog6ToothIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import LoadBalances from "../utils/contractReads/loadBalances";
import UseStore from "@/store/UseStore";
import { ethers } from "ethers";
import ViewTX from "../utils/viewTX";
import { GUARANTEE_CONTRACT, VAULT_CONTRACT } from "../Address/contractAddress";
import { stoneAbi } from "@/contractABIs";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import Spinner from "../utils/spinner";
import BigNumber from "bignumber.js";
import { trimStringNumberToDecimals } from "../utils/services/NumberServices";
import UsePoolStore from "@/store/UsePoolStore";
const Modal = ({ type, onClose, availableBalance, inputAmount, setInputAmount, poolId, handleDeposit, setWeb3LoadingStates, fetchData, web3LoadingStates, handleApprove, guaranteeAllowance }) => {
    const { address, chain } = useAccount()
    const { setGuaranteeFee, tokenPrices, setMessage, transactionsStatus, setTransactionsStatus, arbNetwork } = UseStore()
    const {investableUsdt} = UsePoolStore()
    const percentage = [10, 25, 35, 50, 75, 100]
    const guaranteeFee = useGuaranteeFee(chain, poolId, inputAmount?.depositAmount)
    const [hasEnoughBlance, setHasEnoughBalance] = useState(true)
    const { memoizedBalances, refetch, isFetched: refetchSuccess } = LoadBalances(poolId)
    const { guaranteeBalance } = memoizedBalances
    const [investableGua, setInvestableGua] = useState(0)
    const [newGuaranteeFee, setNewGuaranteeFee] = useState(0)
    const [sendApproval, setSendApproval] = useState(false)
    const [sendApprovalMsg, setSendApprovalMsg] = useState(undefined)
    const [slippages, setSlippages] = useState({ '5%': false, '10%': false, '30%': false })
    const slippagePercentages = { '5%': 0.05, '10%': 0.10, '30%': 0.30 };
    //Contracts 
    const vaultContractAddress = chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null;

    const calculatePercentage = (percentage, type) => {
        if (type === "withdraw") {
            const availableBalanceXCIVshares = new BigNumber(availableBalance.XCIVshares);
            const percentageCal = new BigNumber(percentage);
            const result = percentageCal.dividedBy(100).times(availableBalanceXCIVshares);
            const resultString = trimStringNumberToDecimals(result.toString(), 18);

            setInputAmount((prev) => ({
                ...prev,
                ['withdrawAmount']: resultString,
            }))
        } else if (type === "deposit") {
            const cal = (percentage / 100) * investableUsdt
            setInputAmount((prev) => ({
                ...prev,
                ['depositAmount']: cal.toFixed(6),
            }))
        }
    }

    const hasEnoughBalanceFn = () => {
        const amountToCheck = type === 'withdraw' ? inputAmount.withdrawAmount : inputAmount.depositAmount;
        const availableBalances = type === 'withdraw' ? availableBalance.XCIVshares : investableUsdt;

        if (Number(amountToCheck) > Number(availableBalances)) {
            setHasEnoughBalance(false);
        } else {
            setHasEnoughBalance(true);
        }
    };

    const handleCustomAmount = (event) => {
        setInputAmount((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const calculateSlippageAmount = (percentage, depositAmount) => {
        const guaranteeFee = chain?.id != 1? (Number(depositAmount) / 100) : (Number(depositAmount) * 0.01) / tokenPrices.STONEprice;
        const slippageAmt = guaranteeFee + (guaranteeFee * percentage)
        return slippageAmt
    }

    const handleSlippage = (slippage) => {
        const slippageAmt = calculateSlippageAmount(slippagePercentages[slippage], inputAmount.depositAmount);
        setNewGuaranteeFee(slippageAmt)
        if (Number(guaranteeAllowance) >= slippageAmt.toFixed(6)) {
            setSlippages((prev) => ({
                ...prev,
                [slippage]: true
            }));
            setGuaranteeFee(slippageAmt)
            setSendApproval(false)
        } else if (slippageAmt > Number(guaranteeAllowance) && slippageAmt < Number(guaranteeBalance.formatted)) {
            setSendApproval(true)
        } else {
            setSendApproval(false)
            setMessage(<ViewTX type={"error"} message={"You don't have enough 0ne, buy more on Uniswap."} />);
            setSlippages((prev) => ({
                ...prev,
                [slippage]: false
            }));
        }
    }

    const disableDepositBtn = () => {
        if(arbNetwork) return true
        if (slippages["10%"] || slippages["30%"] || slippages["5%"]) {
            return true
        } else {
            return false
        }
    }

    const autoFilledSlippage = () => {
        const setSlippage = (percentage) => {
            const slippageAmt = calculateSlippageAmount(slippagePercentages[percentage], inputAmount.depositAmount);
            if (Number(guaranteeAllowance) >= slippageAmt.toFixed(6) && !Number(inputAmount.depositAmount) <= 0) {
                setSlippages((prev) => ({
                    ...prev,
                    [percentage]: true
                }));
            } else {
                setSlippages((prev) => ({
                    ...prev,
                    [percentage]: false
                }));
            }
        }
        //5%
        setSlippage('5%')
        //10%
        setSlippage('10%')
        //30%
        setSlippage('30%')
    }

    const fiveSlippageBtns = () => {
        if (slippages["5%"] && !slippages['10%'] && !slippages['30%']) {
            return "bg-[blue] cursor-pointer "
        } else if (slippages["5%"] && slippages['10%'] || slippages['30%']) {
            return "bg-[#2f3954] opacity-70 cursor-not-allowed"
        } else {
            return 'bg-[#1B2132] cursor-pointer '
        }
    }

    const tenSlippageBtns = () => {
        if (slippages['10%'] && !slippages['30%']) {
            return "bg-[blue] cursor-pointer "
        } else if (slippages['10%'] || slippages['30%']) {
            return "bg-[#2f3954] opacity-70 cursor-not-allowed"
        } else {
            return 'bg-[#1B2132] cursor-pointer '
        }
    }

    // const hasEnoughGuaranteeFee = () => {
    //     if (Number(guaranteeBalance.formatted) > (Number(inputAmount.depositAmount) * 0.1) / tokenPrices?.STONEprice) return true
    //     else return false
    // }

    // APPROVE SLIPPAGE
    const roundedGuaranteeFee = parseFloat(newGuaranteeFee.toFixed(6));
    const { data: dataApproveHash, writeContractAsync: writeApprove } = useWriteContract();


    const handleSlippageApprove = async () => {

        setMessage(<ViewTX type={"loading"} />);
        setWeb3LoadingStates(prevStates => ({ ...prevStates, guaranteeApproveState: true }));
        try {
            await writeApprove({
                address: chain && GUARANTEE_CONTRACT[chain?.id] ? GUARANTEE_CONTRACT[chain?.id][poolId] : null,
                abi: stoneAbi,
                functionName: 'approve',
                args: [vaultContractAddress, guaranteeFee ? ethers.parseUnits(roundedGuaranteeFee.toString(), 18) : null],
            });
        } catch (error) {
            console.error('Error approving:', error);
            setMessage(<ViewTX type={"error"} message={error.message} />);
            setSendApprovalMsg(false)
            setWeb3LoadingStates(prevStates => ({ ...prevStates, guaranteeApproveState: false }));
        }
    };

    // First TX hash
    const { isLoading, isSuccess, TxData } = useWaitForTransactionReceipt({
        hash: dataApproveHash,
    });


    /************ USEEFFECTS **********/

    useEffect(() => {
        hasEnoughBalanceFn()
    }, [inputAmount])

    useEffect(() => {
        setSlippages({
            '5%': false,
            '10%': false,
            '30%': false
        })
    }, [inputAmount.depositAmount])

    useEffect(() => {
        if (sendApprovalMsg === false) {
            setSendApproval(false)
        }
    }, [sendApprovalMsg])

    useEffect(() => {
        if (!arbNetwork && sendApproval) {
            handleSlippageApprove()
        }
    }, [sendApproval])

    useEffect(() => {
        if (isSuccess) {
            setMessage(<ViewTX chain={chain.id} txHash={TxData?.transactionHash} type={'success'} message={`Guarantee Approved successful`} />);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, guaranteeApproveState: false }));
        }
        setSendApproval(null)
    }, [isSuccess, isLoading]);

    useEffect(() => {
        setTransactionsStatus({
            guaranteeAproveSuccess: isSuccess
        })
    }, [isSuccess])

    useEffect(() => {
        autoFilledSlippage()
    }, [inputAmount.depositAmount, guaranteeAllowance, isSuccess])

    useEffect(() => {
        setInvestableGua(Math.min(Number(availableBalance.guarantee), Number(guaranteeAllowance)))
    }, [guaranteeAllowance, availableBalance.guarantee])

    return (
        <>

            <div className={`fixed modal-container z-[999] w-full md:p-4 top-0 left-0 h-full flex items-center max-sm:items-end justify-center ${styles.modal}`}>
                <div className=" w-full mx-auto flex items-center justify-center ">

                    <div className="relative w-[480px] max-sm:w-full pb-5 rounded-lg text-[white] border-2 border-borderColor bg-[#1B2132]">
                        {
                            type === 'withdraw' &&
                            <>
                                <div className="header flex items-center justify-between bg-primarybg py-5 px-5 text-white rounded-t-lg">
                                    <div className="flex items-center">
                                        <div className="p-2 border border-borderColor rounded-lg mr-2 bg-[#1B2132]">
                                            <Image src={Stack} width={24} height={24} alt="stack" className="" />
                                        </div>
                                        <h1 className="font-semibold text-[18px] capitalize">
                                            {type} XCIV
                                        </h1>
                                    </div>
                                    <div className="close cursor-pointer" onClick={onClose}>
                                        <Image src={Close} width={40} height={40} alt="stack" className="" />
                                    </div>
                                </div>

                                <div className="px-5 mt-8">
                                    <div className="amount">
                                        <p className="text-1xl text-[#A2A8BA] mb-3">Available Shares: {formatFigures(availableBalance.XCIVshares, 6)} XCIV </p>
                                        <div className={`input border-2  rounded-lg flex items-center justify-between ${hasEnoughBlance ? "border-borderColor" : "border-[red]"}`}>
                                            <h1 className="px-4 font-semibold">XCIV</h1>
                                            <input type="number" id="success" className="bg-primarybg outline-none rounded-r-lg  block w-full py-3 text-[20px] px-3" placeholder={formatFigures(availableBalance.XCIVshares, 0)} name="withdrawAmount" onChange={handleCustomAmount} value={inputAmount.withdrawAmount} />
                                        </div>

                                        {
                                            !hasEnoughBlance && <p className="text-[red] mt-2 text-sm">
                                                Not Enough XCIV balance
                                            </p>
                                        }
                                        <div className="range">
                                            <ul className="flex items-center justify-end mt-5 flex-wrap">
                                                {
                                                    percentage.map((x, i) => (
                                                        <li key={`percentages--${i}`} className="text-sm mb-2 py-2 px-3.5 border border-borderColor rounded-lg ml-2 bg-[#1B2132] cursor-pointer" onClick={() => calculatePercentage(x, type)}>{x}%</li>
                                                    ))
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                    <hr className="my-8 mt-10 h-[1px] border-t-0 bg-borderColor opacity-100 dark:opacity-50" />

                                    <div className="flex justify-between pb-10">
                                        <button className="capitalize px-16 max-sm:px-10 py-[12px] bg-[red] rounded-md border-2 border-[#FF9696]" onClick={onClose}>
                                            cancel
                                        </button>
                                        <button className={`capitalize px-16 max-sm:px-10 ${hasEnoughBlance ? "green_button" : "gray_btn text-[gray]"}`} disabled={!hasEnoughBlance} onClick={() => { handleApprove(), onClose() }}>
                                            Withdraw
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            type === 'deposit' &&
                            <>
                                <div className="header flex items-center justify-between bg-primarybg py-3 px-5 text-white rounded-t-lg">
                                    <div className="flex items-center">
                                        <div className="p-2 border border-borderColor rounded-lg mr-2 bg-[#1B2132]">
                                            <Image src={Stack} width={24} height={24} alt="stack" className="" />
                                        </div>
                                        <h1 className="font-semibold text-[18px] capitalize">
                                            {type} USDT
                                        </h1>
                                    </div>
                                    <div className="close cursor-pointer" onClick={onClose}>
                                        <Image src={Close} width={40} height={40} alt="stack" className="" />
                                    </div>
                                </div>

                                <div className="px-5 mt-4">
                                    <div className="amount">
                                        <p className="text-1xl mb-3">Investable amount: <br /> <span className="text-[#A2A8BA]">{formatFigures(investableUsdt, 2)} USDT</span></p>
                                        <div className={`input border-2  rounded-lg flex items-center justify-between ${hasEnoughBlance ? "border-borderColor" : "border-[red]"}`}>
                                            <h1 className="px-4 font-semibold">USDT</h1>
                                            <input type="number" id="success" className="bg-primarybg outline-none rounded-r-lg  block w-full py-3 text-[20px] px-3" placeholder={formatFigures(investableUsdt, 2)} name="depositAmount" value={inputAmount.depositAmount} onChange={handleCustomAmount} />
                                        </div>
                                        {
                                            !hasEnoughBlance && <p className="text-[red] mt-2 text-sm">
                                                Not Enough USDT balance
                                            </p>
                                        }

                                        <div className="range">
                                            <ul className="flex items-center justify-end mt-5 flex-wrap">
                                                {
                                                    percentage.map((x, i) => (
                                                        <li key={`percentages--${i}`} className="text-sm mb-2 py-2 px-3.5 border border-borderColor rounded-lg ml-2 bg-[#1B2132] cursor-pointer hover:bg-[blue]" onClick={() => calculatePercentage(x, type)}>{x}%</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                       {
                                        !arbNetwork && <div className="mt-3 mb-5 text-sm">
                                        {/* <p>Current Depositing Guarantee: {(Number(depositAmount))}</p>*/}
                                        {/* <p>New + Plus slippage Depositing Guarantee: {(Number(newGuaranteeFee))}/ {guaranteeFee}</p>  */}
                                        {/* <p>Guarantee Allowance: {formatFigures(guaranteeAllowance, 2)}</p> */}
                                        <p className="text-dimGray border-b border-dashed border-[#305A70] pb-2 ">Guarantee required: <span className="text-white text-[15px]">{!inputAmount.depositAmount ? "0.00" : formatFigures(guaranteeFee, 2)} 0NE</span></p>
                                        <p className="text-dimGray pt-2 ">Investable guarantee: <span className="text-sharpGreen text-[15px]"> {formatFigures(investableGua, 2)} 0NE</span></p>
                                        {/* <p>{hasEnoughGuaranteeFee() ? "Enough": "Not Enough"}</p> */}
                                    </div>
                                       } 
                                       {
                                            !arbNetwork &&  <div
                                            className="mb-3 bg-primarybg py-5 px-3 rounded-lg" >
                                            <p className="flex items-center gap-2 text-sm" id="mainslippage">Guarantee slippage:</p>
                                            <div className="flex items-center">
                                                <ul className={`flex items-center text-[12px] mt-3 flex-wrap ${web3LoadingStates.guaranteeApproveState ? 'opacity-70 cursor-not-allowed' : ""}`} id='min' >
                                                    <li >
                                                        <button className={` mb-2 py-2 px-3.5 border border-borderColor rounded-lg flex gap-2 items-center hover:bg-[blue] ${fiveSlippageBtns()}`} id="fiveslippage" onClick={() => handleSlippage('5%')} disabled={slippages['10%'] && slippages['30%'] || !Number(inputAmount.depositAmount) > 0}>
                                                            Minimum
                                                            <span><InformationCircleIcon width={15} /></span>
                                                        </button>
                                                    </li>
                                                    <li id="tenslippage" >
                                                        <button className={` mb-2 py-2 px-3.5 border border-borderColor rounded-lg ml-2 flex gap-2 items-center hover:bg-[blue] ${tenSlippageBtns()}`} onClick={() => handleSlippage('10%')} disabled={slippages['30%'] || !Number(inputAmount.depositAmount) > 0}>
                                                            Medium
                                                            <span><InformationCircleIcon width={15} /></span>
                                                        </button>
                                                    </li>
                                                    <li id="thirtyslippage" >
                                                        <button className={` mb-2 py-2 px-3.5 border border-borderColor rounded-lg ml-2 cursor-pointer flex gap-2 items-center hover:bg-[blue] ${slippages["30%"] ? "bg-[blue]" : 'bg-[#1B2132]'}`} onClick={() => handleSlippage('30%')} disabled={!Number(inputAmount.depositAmount) > 0}>
                                                            Maximum
                                                            <span><InformationCircleIcon width={15} /></span>
                                                        </button>
                                                    </li>
                                                </ul>
                                                {web3LoadingStates.guaranteeApproveState && <div className="px-[15px] w-[15px]">
                                                    <Spinner />
                                                </div>}
                                            </div>
                                            <div className="text-[#A2A8BA] text-[12px] mt-2">
                                                {inputAmount.depositAmount && guaranteeFee > Number(guaranteeBalance.formatted) && <p className="text-[red] font-bold text-[14px]"> 🚫 You don't have enough 0NE for this deposit, buy more at the link below.</p>}
                                                {!inputAmount.depositAmount && <p>Enter USDT amount to deposit</p>}
                                                {Number(guaranteeBalance.formatted) > guaranteeFee && !slippages['5%'] && inputAmount.depositAmount && <p className="text-[red] font-bold text-[14px]"> 🚫 No requirements met; set a sufficiently high slippage or the transaction will fail.</p>}
                                                {slippages['5%'] && !slippages['10%'] && !slippages['30%'] && <p>Minimum requirements satisfied; however, please be aware that your transaction could still fail.</p>}
                                                {slippages['10%'] && !slippages['30%'] && <p>Medium requirements achieved; your transaction is likely to succeed.</p>}
                                                {slippages['30%'] && <p> ✅ Maximum requirements met; expect your transaction to proceed smoothly with minimal risk of failure.</p>}
                                            </div>
                                            {/* <p className="text-[#A2A8BA] text-sm">{txStatus}</p> */}
                                        </div>
                                       }
                                       
                                       <div className={arbNetwork &&`mt-10`}>
                                       <Link href={"https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x73A83269b9bbAFC427E76Be0A2C1a1db2a26f4C2&chain=mainnet"} target="_blank" className="text-sm md:w-8/12 underline cursor-pointer">Buy More 0ne (STONE) on Uniswap</Link>
                                        <hr className="mb-8 mt-5 h-[1px] border-t-0 bg-borderColor opacity-100 dark:opacity-50" />
                                        </div> 

                                    </div>

                                    <div className="flex justify-between">
                                        <button className="capitalize px-16 max-sm:px-10 py-[12px] bg-[red] rounded-md border-2 border-[#FF9696]" onClick={onClose}>
                                            cancel
                                        </button>
                                        <button className={`capitalize px-16 max-sm:px-10 ${disableDepositBtn() && hasEnoughBlance ? "green_button" : "gray_btn text-[gray] cursor-not-allowed"}`} disabled={!hasEnoughBlance || !disableDepositBtn() || Number(inputAmount.depositAmount) <= 0} onClick={() => { handleDeposit(), onClose() }}>
                                            deposit
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            <div className="text-[13px] ">
                <Tooltip anchorSelect="#fiveslippage" content={`Wallet has approved and holds at least 5% more ONE than the minimum required for this transaction.`} className=" text-center text-[10px] z-[9999] max-w-[200px]" />
                <Tooltip anchorSelect="#tenslippage" content={`Wallet has approved and holds at least 10% more ONE than the minimum required for this transaction.`} className=" text-center text-[10px] z-[9999] max-w-[200px]" />
                <Tooltip anchorSelect="#thirtyslippage" content={`Wallet has approved and holds at least 30% more ONE than the minimum required for this transaction.`} className=" text-center text-[10px] z-[9999] max-w-[200px]" />
                <Tooltip anchorSelect="#mainslippage" content={`Refers to the max amount of 0NE you've allowed to be used as guarantee. Smartcontract will always take the minimum required amount of 0NE needed regardless of slippage.`} className=" text-[10px] z-[9999] max-w-[300px]" />
            </div>
        </>

    );
}

export default Modal;
