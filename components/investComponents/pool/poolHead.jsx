"use client"
import Image from "next/image";
import styles from "./styles.module.scss"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react";
import { ChervonUp } from "@/components/assets";
import { floatFigure, formatFigures } from "@/components/utils/web3FiguresHelpers";
import Spinner from "@/components/utils/spinner";
import { useAccount } from "wagmi"
import UseStore from "@/store/UseStore";
import { ethers } from "ethers"

export const useProcessedData = (data, setIsLoading, isLoading) => {
    const [apiData, setApiData] = useState({
        depositedPool: 0,
        depositedVault: 0,
    });

    useEffect(() => {
        if (!data) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
            setApiData({
                depositedPool: data.data?.depositedPool || 0,
                depositedVault: ethers.formatUnits(data.data?.depositedVault || 0, 6),
            });
        }
    }, [data]);

    const processedData = useMemo(() => ({
        isLoading,
        apiData,
    }), [isLoading, apiData]);

    return processedData;
};

const PoolHead = ({ togglePool, setTogglePool, poolData, poolDataFromSocket, data, poolLoading }) => {
    const { setMessage } = UseStore()
    // const [isEthChain, setIsEthChain] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const { chain } = useAccount()
    const [poolSocketData, setPoolSocketData] = useState({
        tvl: 0.00,
        apy: 0,
        roi: 0.00
    })

    const handleTogglePool = () => {
        // if (!isEthChain) {
        //     setMessage('Connect Your Wallet')
        // }
        // setTogglePool(isEthChain && !isLoading && !togglePool)
        if(notConnected) return false
        setTogglePool( !isLoading && !togglePool)

    }
    const {apiData} = useProcessedData(data, setIsLoading, isLoading)
    useEffect(() => {

        if (poolDataFromSocket[1]) {
            setPoolSocketData({
                ['tvl']: poolDataFromSocket[1].NAV,
                ['apy']: poolDataFromSocket[1].APY,
                ['roi']: poolDataFromSocket[1].ROI,
            })
        }

    }, [poolDataFromSocket])
    const [notConnected, setNotConnected] = useState(null)
    useEffect(() => {
        if (chain?.id !== 1 && chain?.id !== 5 && chain?.id !== 11155111) {
            // setIsEthChain(false)
            setTogglePool(false)
            setNotConnected(true)
            setMessage('Unsupported Chain, Switch To ETHEREUM MAINNET.')
        } else {
            // setIsEthChain(true)
            setIsLoading(false)
            setNotConnected(false)
        }
    }, [chain]);
    return (

        <div className="">
            <div className={styles.header}>
                <div className="pool_head_info flex items-center text-[white] w-full justify-between md:ml-8 text-right py-5 max-sm:px-3">
                    <div className="strategy_mobile hidden max-sm:flex flex-col">
                        <div className="asset_logo flex items-center">
                            <Image src={poolData.tokenLogo} width={25} height={25} alt="token-img" />
                            {
                                !poolData.oneLogo && <Image src={"/assets/tokens/tether.png"} width={25} height={25} alt="token-img" className="-ml-3 relative z-9" />
                            }
                        </div>
                        <div className="strategies mt-1 uppercase max-w-[100px] text-left">
                            <h1 className="text-[#AEAEAE] ">{poolData.usdtStrategies}</h1>
                        </div>
                    </div>
                    <div className="asset_logo flex items-center mx-5 max-sm:hidden">
                        <Image src={poolData.tokenLogo} width={37} height={37} alt="token-img" className={`${poolData.oneLogo && "ml-3"}`} />
                        {
                            !poolData.oneLogo && <Image src={"/assets/tokens/eth.png"} width={37} height={37} alt="token-img" className="-ml-4 relative z-9" />
                        }

                    </div>
                    <div className="strategies -ml-16 max-sm:hidden uppercase text-sm max-w-[50px] text-left">
                        <h1>{poolData.usdtStrategies}</h1>
                    </div>
                    <div className="pending-asset -ml-7 max-sm:hidden text-right">
                        <h1>${apiData && formatFigures(apiData.depositedVault, 2)}</h1>
                    </div>
                    <div className="deployed_assets md:-mr-1 max-sm:-ml-12">
                        <h1>${formatFigures(poolSocketData.tvl, 2)}</h1>
                    </div>
                    <div className="annual_percentage_yield md:mr-5 max-sm:mr-7">
                        <h1>{formatFigures(poolSocketData.apy, 2)}%</h1>
                    </div>
                </div>
                <motion.div className={`pool_toggle mx-10 cursor-pointer bg-primarybg  p-1 rounded max-sm:hidden ${isLoading || notConnected ? "opacity-50" : "hover:bg-[#E083FF]"}`} onClick={handleTogglePool} initial={false} animate={{ rotate: togglePool ? 180 : 0 }} transition={{ duration: 0.3 }} >
                    <Image src={ChervonUp} width={30} height={30} alt="token-img" />
                </motion.div>
                {/* <motion.div className={`pool_toggle mx-10 cursor-pointer bg-primarybg  p-1 rounded max-sm:hidden ${!isEthChain || isLoading ? "opacity-50" : "hover:bg-[#E083FF]"}`} onClick={handleTogglePool} initial={false} animate={{ rotate: togglePool ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <Image src={ChervonUp} width={30} height={30} alt="token-img" />
                </motion.div> */}
            </div>
        </div>

    );
}

export default PoolHead;