"use client"
import Image from "next/image";
import styles from "./styles.module.scss"
import { useEffect, useRef, useState } from "react";
import { ChervonDown, Lighting, POLYGONicon, ETHicon, StoneIcon, CivIcon } from "../assets";
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount, useSwitchChain } from "wagmi";
import SwitchChain from "./switchChain";
import UseStore from "@/store/UseStore";
import tokenPricesFn from "../utils/dataService/tokenPrices";
import { formatFigures } from "../utils/web3FiguresHelpers";
import Link from "next/link";
import { motion } from "framer-motion";
const AppHeader = () => {
    const { open, close } = useWeb3Modal()
    const { address: walletAddr, status } = useAccount()
    const { chain } = useAccount()
    const { switchChain } = useSwitchChain()
    const { setCurrentWalletAddress, currentWalletAddress, setTokenPrices,setMessage } = UseStore()
    const [tokenPrices, setTokenPrice] = useState({
        CIVprice: 0,
        STONEprice: 0
    })
    // console.log("token", tokenPrices)
    const allChains = [
        {
            name: "ethereum",
            chainId: '0x1',
            tokenLogo: ETHicon
        },
        {
            name: "goerli",
            chainId: '0x5',
            tokenLogo: ETHicon
        },
        {
            name: "sepolia",
            chainId: '0x1115511',
            tokenLogo: ETHicon
        }
    ]
    const [selectChainPopup, setselectChainPopup] = useState(false)
    const chainSelectionRef = useRef(null)

    const [selectedChain, setSelectedChain] = useState({
        logo: ETHicon,
        chain: "ethereum"
    })


    const outboxClose = (e) => {
        if (chainSelectionRef.current && !chainSelectionRef.current.contains(e.target)) {
            setselectChainPopup(false)
        }
    }

    useEffect(() => {
        const currentChain = JSON.parse(localStorage.getItem('CurrentChain'));
        if (currentChain) setSelectedChain(currentChain);

        if (walletAddr) {
            setCurrentWalletAddress(walletAddr)
        } else {
            setCurrentWalletAddress(null)
        }

        document.addEventListener('click', outboxClose);

        return () => {
            document.removeEventListener('click', outboxClose);
        };
    }, [walletAddr]);



    useEffect(() => {
        const fetchData = async () => {
            const { data, isLoading } = await tokenPricesFn()
            try {
                if (data) {
                    let CIVprice = data.CIV[0].current_price
                    let STONEprice = data.STONE[0].current_price
                    setTokenPrice({
                        CIVprice,
                        STONEprice
                    })
                    setTokenPrices({
                        CIVprice,
                        STONEprice
                    })
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {

        if (chain?.id !== 1 && chain?.id !== 5 && chain?.id !== 11155111 && switchChain) {
            setMessage('UNSUPPORTED CHAIN, SWITCH BACK TO ETHEREUM')
            switchChain(1)
        }
        if (chain) {
            setSelectedChain({
                logo: ETHicon,
                chain: chain?.name
            })
        }
    }, [chain?.id]);

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 70);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
              <div 
        >
            <div className={`${styles.header} ${styles.header.desktop}`}>
                <div className="navs flex items-center">
                    <div className={styles.header__logo}>
                        <Image src={"/assets/pngs/civlogo.png"} layout="fill" alt="civ logo" className="w-[50px] h-[50px]" />
                    </div>
                    <div className="flex">
                        <h1 className="text-xl font-semibold ml-3 max-sm:hidden">CIVFUND</h1>
                        <p className="bg-blurGreen md:text-[13px] text-[10px] h-6 md:px-3 px-2 py-1 rounded-lg text-sharpGreen md:ml-2">BETA</p>
                    </div>

                </div>

                <div className="wallet_info flex items-center gap-2">
                    <div className="balances flex gap-1 items-center bg-primarybg hover:bg-[#1c2439] px-4 py-2 rounded-full cursor-pointer max-sm:px-2 max-sm:py-1">
                        <Link href={'https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x37fE0f067FA808fFBDd12891C0858532CFE7361d&chain=mainnet'} target="_blank">
                            <Image src={CivIcon} width={20} height={20} alt="token-img" className="cursor-pointer" />
                        </Link>
                        <div className="flex items-center max-md:hidden">
                            <h2 >CIV ${tokenPrices.CIVprice.toFixed(3)}</h2>
                            <div className={styles.header__divider}></div>

                            <div className="flex items-center gap-1">
                                <Link href={'https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x73A83269b9bbAFC427E76Be0A2C1a1db2a26f4C2&chain=mainnet'} target="_blank">
                                    <Image src={StoneIcon} width={20} height={20} alt="token-img" className="cursor-pointer" />
                                </Link>
                                {/* <h2>0NE ${Math.max(Number(tokenPrices.STONEprice).toFixed(0), 1)} per Bn</h2> */}
                                <h2>0NE ${tokenPrices.STONEprice.toString().slice(0, 5)} per Bn</h2>
                            </div>
                        </div>
                    </div>
                    {
                        selectedChain && <div className="chains bg-primarybg hover:bg-[#1c2439] px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer max-sm:px-2 max-sm:py-1" onClick={() => setselectChainPopup(!selectChainPopup)}>
                            <Image src={selectedChain.logo} width={20} height={20} alt="lighting" />
                            <h2 className="max-md:hidden capitalize">{selectedChain.chain}</h2>
                            {/* <Image src={ChervonDown} width={15} height={15} alt="lighting" /> */}
                        </div>
                    }

                    <div className="connect bg-primarybg hover:bg-[#1c2439] px-4 py-2 rounded-full cursor-pointer max-sm:text-sm max-sm:px-2 max-sm:py-1" onClick={() => open()}>
                        <h2>{currentWalletAddress && status === "connected" ? `${currentWalletAddress.substring(4, -1)}...${currentWalletAddress.substring(currentWalletAddress.length - 6)}` : "Connect"}</h2>
                    </div>
                </div>
            </div>

            {/* {
                selectChainPopup &&
                <SwitchChain allChains={allChains} selectedChain={selectedChain} setselectChainPopup={setselectChainPopup} setSelectedChain={setSelectedChain} />
            } */}
            </div>

    );
}

export default AppHeader;