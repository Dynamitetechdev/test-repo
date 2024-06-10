import { formatFigures } from "@/components/utils/web3FiguresHelpers";
import styles from "./styles.module.scss"
import { ethers } from "ethers";
import { ChervonRight, CivIcon, MetaMaskIcon, StoneIcon } from "@/components/assets";
import Image from "next/image";
import Link from "next/link";
import AddTokenToWallet from "@/components/utils/addXICVSTONEtoWallet";
import { useAccount } from "wagmi";
import UseStore from "@/store/UseStore";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import UsePoolStore from "@/store/UsePoolStore";
const ShowBalanceManagement = ({ availableBalance, poolDataFromSocket, apiData, poolId, currentWalletAddress }) => {
     const { open, close } = useWeb3Modal()
    const { address, chain } = useAccount()
    const {tokenDecimals, tokenPrices, arbNetwork} = UseStore()
    const {investableUsdt} = UsePoolStore()
    const buyGuaranteeLink = "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x73A83269b9bbAFC427E76Be0A2C1a1db2a26f4C2&chain=mainnet"
    const handleAddToken = async (token) => {
        try {
            await AddTokenToWallet(token, chain, poolId);
        } catch (error) {
            console.error(error);
        }
    };
// console.log("balances", availableBalance)
    return (
        <div className="bg-poolDarkBlue rounded-lg text-[white] p-[20px] md:mr-2 max-sm:mb-2 max-sm:px-[10px]">
            {!currentWalletAddress && <div className="flex items-center justify-center flex-col my-5">
                <h1 className="md:text-3xl text-2xl text-center">Connect Wallet to interact</h1>
                <button className="connect w-[200px] bg-[#D57FF2] px-6 py-3 rounded-full cursor-pointer max-sm:text-sm max-sm:px-2 max-sm:py-1 mt-3" onClick={() => open()}>Connect Wallet</button>
            </div>}
            <ul>
                <li>
                    <div className={styles.pool_detail__flex}>
                        <h2>USDT Balance</h2>
                        <div className="">
                            <h1>{availableBalance.usdt ? formatFigures(availableBalance.usdt, 2) : '0.00'} USDT <small className="text-dimGray">(${availableBalance.usdt ? formatFigures(availableBalance.usdt, 2) : '0.00'})</small></h1>
                        </div>
                    </div>
                    {
                        !arbNetwork && <div className={styles.pool_detail__flex}>
                        <h2>Guarantee Balance</h2>
                        <div className="flex items-center">
                            <Link href={buyGuaranteeLink} target="_blank">
                                <button className="text-[12px] px-[8px] py-[6px] primary_button mr-1 md:mr-4 whitespace-nowrap">Buy Guarantee</button></Link>
                            <h1>{availableBalance.guarantee ? formatFigures(availableBalance.guarantee, 0) : '0'} 0NE <small className="text-dimGray">(${availableBalance.guarantee ? formatFigures((Number(availableBalance.guarantee) * Number(tokenPrices?.STONEprice)), 2) : '0'})</small></h1>
                        </div>
                    </div>
                    }
                    <div className={styles.pool_detail__flex}>
                        <h2>Investable USDT</h2>
                        <h1>{ availableBalance.usdt ? formatFigures(investableUsdt,2): '0.00'} USDT <small className="text-dimGray">(${ availableBalance.usdt ? formatFigures(investableUsdt, 2): '0.00'})</small></h1>
                    </div>
                    <div className={styles.pool_detail__flex}>
                        <h2>My Current Position</h2>
                        <p className="text-sharpGreen">${availableBalance.XCIVshares && poolDataFromSocket[0]?.fullHistory ?  formatFigures((availableBalance.XCIVshares * poolDataFromSocket[0]?.fullHistory[poolDataFromSocket[0].fullHistory.length - 1][1]).toString(), 2): "0.00"}</p>
                    </div>
                    <div className={styles.pool_detail__flex}>
                        <h2>My Shares</h2>
                        <h1>{availableBalance.XCIVshares ? formatFigures(availableBalance.XCIVshares, 2): "0.00"} XCIV</h1>
                    </div>
                    <div className={styles.pool_detail__flex}>
                        <h2>My Pending Deposit</h2>
                        <h1>{
                            tokenDecimals?.INVEST_DECIMAL > 0 ?
                                formatFigures(ethers.formatUnits(apiData.depositAmounts, tokenDecimals?.INVEST_DECIMAL), 2) :
                                "0.00"
                        } USDT
                            <small
                                className="text-dimGray"
                            >
                                {" "}(${
                                    tokenDecimals?.INVEST_DECIMAL > 0 ?
                                        formatFigures(ethers.formatUnits(apiData.depositAmounts, tokenDecimals?.INVEST_DECIMAL), 2) :
                                        "0.00"
                                })
                            </small>
                        </h1>
                    </div>
                    <div className={styles.pool_detail__flex}>
                        <h2>My Pending Withdraw</h2>
                        <h1 className="">{apiData.withdrawAmounts ? formatFigures(ethers.formatEther(apiData.withdrawAmounts), 2): "0.00"} XCIV <small className="text-dimGray">(${formatFigures((ethers.formatEther(apiData.withdrawAmounts) * (poolDataFromSocket[0]?.fullHistory[poolDataFromSocket[0].fullHistory.length - 1][1])).toString(), 2)})</small></h1>
                    </div>
                </li>
            </ul>

            {!arbNetwork &&
            <div className='flex items-center justify-between pt-4'>
                <h1 className="text-[12px]">Add STONE & XCIV to your wallet</h1>
                <div className="flex items-center">
                    <div className="civ_token flex relative" >
                        <Image src={StoneIcon} width={36} height={36} alt="token-img" className="civ_token_bg cursor-pointer" onClick={() => handleAddToken('stone')} />
                        {
                            !arbNetwork && <Image src={CivIcon} width={36} height={36} alt="token-img" className="civ_token_bg cursor-pointer" onClick={() => handleAddToken('xciv')} />
                        }
                    </div>
                    <div className="to max-sm:z-[99]">
                        <Image src={ChervonRight} width={24} height={24} alt="to" className="bg-[#7AAEE5] rounded" />
                    </div>
                    <div className="metamask">
                        <Image src={MetaMaskIcon} width={36} height={36} alt="token-img" className="civ_token_bg" />
                    </div>
                </div>
            </div>}

            <div className="mt-5 text-[12px]">
            {!arbNetwork ? <p className="mb-1">The strategy is built by leveraging liquidity pools on uniswap v2 across the major pairs available. The pools it goes between are as follows:</p> : <p className="mb-1 mt-10">The strategy is built by leveraging liquidity pools on uniswap v2 and GMX across the major pairs available. The pools it goes between are as follows:</p>}

                <div className="capitalize">
                    <ul className="flex flex-wrap gap-2">
                        <li className="flex bg-primarybg py-1 px-2 rounded uppercase">
                            <p>eth-usdt</p>
                        </li>
                        <li className="flex bg-primarybg py-1 px-2 rounded uppercase">
                            <p>eth-usdc</p>
                        </li>
                        <li className="flex bg-primarybg py-1 px-2 rounded uppercase">
                            <p>eth-shib</p>
                        </li>
                        <li className="flex bg-primarybg py-1 px-2 rounded uppercase">
                            <p>eth-pepe</p>
                        </li>
                        <li className="flex bg-primarybg py-1 px-2 rounded uppercase">
                            <p>eth-rndr</p>
                        </li>
                        <li className="flex bg-primarybg py-1 px-2 rounded uppercase">
                            <p> <span className="lowercase">st</span>ETH-ETH</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ShowBalanceManagement;