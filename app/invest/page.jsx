"use client"
import TotalTop from "@/components/investComponents/top-head/totalTop";
import styles from "./styles.module.scss"
import AssetHeaders from "@/components/investComponents/top-head/assetHeader";
import MainPool from "@/components/investComponents/pool";
import { useEffect, useState } from "react";
import { useSocket } from "@/components/socket/poolSocket";
import { strategies } from "@/components/constants/strategies";
import { useWeb3Modal } from "@web3modal/wagmi/react"

import UseStore from "@/store/UseStore";
import { useAccount } from "wagmi";
import DataServices from "@/components/utils/dataService/dataServices";
import UsePoolStore from "@/store/UsePoolStore";
const Invest = () => {
    const { currentWalletAddress, setCurrentWalletAddress , setChain , transactionsStatus} = UseStore()
    const {setPoolApiData, poolApiData} = UsePoolStore()
    const { address, chain, isConnected, isDisconnected } = useAccount()
    const { open, close } = useWeb3Modal()
    const socket = useSocket()

    const [togglePool, setTogglePool] = useState(strategies.map((pool) => false))

    const toggleStrategy = (state, poolIndex) => {
        let updatedPool = [...togglePool]
        updatedPool[poolIndex] = state
        setTogglePool(updatedPool)
    }
    const ADDRESS = address ? address : "0x0000000000000000000000000000000000000000"


    const fetchData = async (poolId) => {
        try {
            const { data, isLoading } = await DataServices(chain ? chain.id : 1, poolId, ADDRESS);
            return {data, isLoading}
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const results = {};
    const fetchAllData = async () => {

        for (const strategy of strategies) {
          const poolId = strategy.poolId;

          const {data, isLoading} = await fetchData(poolId);
            console.log("after deposit",{poolId,isLoading, data})
            setPoolApiData((prevState) => ({
                ...prevState,
                [poolId]: {
                  ...prevState[poolId],
                  ...data
                }
              }));
        }
    };

      useEffect(() => {
            fetchAllData()
      }, [strategies, chain, ADDRESS, isConnected, isDisconnected])

      useEffect(() => {
        if (Object.values(transactionsStatus).some(status => status === true)) {
            console.log({transactionsStatus})
            fetchAllData()
        }
      }, [transactionsStatus])


    useEffect(() => {
        if(chain && address){
            setChain(chain)
            setCurrentWalletAddress(address)
        }
    }, [chain, address])
    return (
        <div className={styles.home}>
            <TotalTop />
            <AssetHeaders />

            <div className="bg-poolMobile max-sm:p-2">
                {
                    strategies.map((pool, poolIndex) => (
                        <div className={`${poolIndex != 0 && "border-t border-dashed border-[#305A70]"}`} key={`strategy---${poolIndex}`}>
                            <MainPool togglePool={togglePool[poolIndex]}
                                setTogglePool={(state) => {
                                    toggleStrategy(state, poolIndex)
                                }}
                                poolData={pool} poolSocket={socket} poolIndex={poolIndex} />
                        </div>
                    ))
                }



            </div>
            {
                !currentWalletAddress && <div className="text-center mx-auto mt-16 text-white ">
                    <h1 className="font-bold text-2xl mb-3">Wallet Is Not Connected</h1>
                    <button className="connect w-[200px] bg-primarybg hover:bg-[#1c2439] px-6 py-3 rounded-full cursor-pointer max-sm:text-sm max-sm:px-2 max-sm:py-1" onClick={() => open()}>
                        Connect Wallet
                    </button>
                </div>
            }
        </div>
    );
}

export default Invest;