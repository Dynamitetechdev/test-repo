"use client"
import Image from "next/image";
import styles from "./styles.module.scss"
import { useEffect, useRef, useState } from "react";
import { ChervonDown, Lighting, POLYGONicon, ETHicon, StoneIcon, CivIcon, ARBicon } from "../assets";
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useAccount, useSwitchChain } from "wagmi";
import SwitchChain from "./switchChain";
import UseStore from "@/store/UseStore";
import tokenPricesFn from "../utils/dataService/tokenPrices";
import { formatFigures } from "../utils/web3FiguresHelpers";
import Link from "next/link";
import { motion } from "framer-motion";
import { chainIdToName } from "../constants/chainIdToName";
import { switchChainFunc } from "./comp/switchChain";
const AppHeader = () => {
    const { open, close } = useWeb3Modal()
    const [chainId, setChainId] = useState(null);
    const { address: walletAddr, status } = useAccount()
    const { chain } = useAccount()
    const { switchChain } = useSwitchChain()
    const { setCurrentWalletAddress, currentWalletAddress, setTokenPrices, setMessage,setChain,setArbNetwork, arbNetwork } = UseStore()
    const [tokenPrices, setTokenPrice] = useState({
        CIVprice: 0,
        STONEprice: 0
    })
    // console.log("token", tokenPrices)
    const [selectChainPopup, setselectChainPopup] = useState(false)
    const [haveMetaMask, setHaveMetaMask] = useState(null)
    const chainSelectionRef = useRef(null)

    const [selectedChain, setSelectedChain] = useState({
        logo: ETHicon,
        chain: "ethereum mainnet",
        chainId: 1
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
        const getChainId = async () => {
            if (window.ethereum) {
                try {
                    const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
                    const chainId = parseInt(chainIdHex, 16)
                    setChainId(chainId);  // Convert hex chainId to decimal
                    setHaveMetaMask(true)
                } catch (error) {
                    console.error("Error fetching chain ID: ", error);
                }
            } else {
                setHaveMetaMask(false)
                console.error("MetaMask is not installed");
            }
        };

        getChainId();
        const handleChainChanged = (chainId) => {
            setChainId(parseInt(chainId, 16));
        };

        if (window.ethereum) {
            window.ethereum.on('chainChanged', handleChainChanged);
        }
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    });
    const chainLogo = {
        1: ETHicon,
        11155111: ETHicon,
        42161: ARBicon
    }
    useEffect(() => {
        const supportedChains = [1, 5, 11155111, 42161]
        let chain = chainId ? chainId : 1
        if(haveMetaMask && chain && supportedChains.includes(chain)){
            setSelectedChain({
                logo: chainLogo[chainId],
                chain: chainIdToName[chainId],
                chainId
            })
        } else{
            setSelectedChain({
                logo: ETHicon,
                chain: "ethereum mainnet",
                chainId: 1
            })
        }
        setArbNetwork(chain === 42161 ? true : false)
        if (!supportedChains.includes(chain)) {
            setMessage('UNSUPPORTED CHAIN, SWITCH BACK TO ETHEREUM 000')
            switchChainFunc(1)
        }
    }, [chainId]);

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
                            {!arbNetwork &&
                            <>
                            <div className={styles.header__divider}></div>

                            <div className="flex items-center gap-1">
                                <Link href={'https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x73A83269b9bbAFC427E76Be0A2C1a1db2a26f4C2&chain=mainnet'} target="_blank">
                                    <Image src={StoneIcon} width={20} height={20} alt="token-img" className="cursor-pointer" />
                                </Link>
                                {/* <h2>0NE ${Math.max(Number(tokenPrices.STONEprice).toFixed(0), 1)} per Bn</h2> */}
                                <h2>0NE ${tokenPrices.STONEprice.toString().slice(0, 5)} per Bn</h2>
                            </div>
                            </>
                             }
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