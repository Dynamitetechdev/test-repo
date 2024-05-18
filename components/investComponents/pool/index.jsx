import PoolDetail from "./poolDetail";
import PoolHead from "./poolHead";
import { AnimatePresence, motion } from "framer-motion"
import styles from "./styles.module.scss"
import { ChervonUp } from "@/components/assets";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useAccount } from "wagmi";
import DataServices from "@/components/utils/dataService/dataServices";
import Spinner from "@/components/utils/spinner";
import UseStore from "@/store/UseStore";
import LoadBalances from "@/components/utils/contractReads/loadBalances";
import TokenDecimals from "@/components/utils/tokenDecimals";
import UsePoolStore from "@/store/UsePoolStore";

const MainPool = ({ togglePool, setTogglePool, poolData, poolSocket, poolIndex }) => {
    const { setSocketData, setTotalNAV, setHighestNetAPY, transactionsStatus,setTokenDecimal, chain, currentWalletAddress: address} = UseStore()
    const { poolApiData} = UsePoolStore()
    const {INVEST_DECIMAL,GUARANTEE_DECIMAL,XCIV_DECIMAL} = TokenDecimals(poolData.poolId)
    const [poolDataFromSocket, setPoolDataFromSocket] = useState([])
    const [poolLoading, setPoolLoading] = useState(false)
    const { refetch } = LoadBalances(poolData.poolId)
    const containerVariants = {
        open: { y: 0, opacity: 1 },
        closed: { y: -50, opacity: 0 },
    };

    // const { address, chain } = useAccount()
    const [apiData, setApiData] = useState(null)

    const ADDRESS = address ? address : "0x0000000000000000000000000000000000000000"

    // not useful anymore, delete later
    const fetchData = async () => {
                try {
            const { data, isLoading } = await DataServices(chain ? chain.id : 1, poolData.poolId, ADDRESS);
                        setPoolLoading(isLoading)
                        // console.log(`PoolDetails-${poolData.poolId}`, data)
                setApiData({...data});
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useLayoutEffect(() => {
        setTokenDecimal({INVEST_DECIMAL,GUARANTEE_DECIMAL,XCIV_DECIMAL})
    },[])

    useEffect(() => {
        if (address && Object.values(transactionsStatus).some(status => status === true)) {
            refetch()
        }
    }, [transactionsStatus, chain, ADDRESS]);

    useEffect(() => {
        if (poolSocket) {
            poolSocket.emit('message', `strategies`)
            poolSocket.on(`strategies`, (message) => {
                setPoolDataFromSocket(message[poolIndex])
                setSocketData(message[poolIndex])
                // console.log(`poolSocketCheck: ${poolIndex}`, message)
                const netAPYs = message && message.map((el, index ) => el[1]?.APY)
                const highestNetAPY = Math.max(...netAPYs)
                setHighestNetAPY(highestNetAPY)
                const sumNAV = message.reduce((total, item) => total + (item[1]?.NAV || 0), 0);
                setTotalNAV(sumNAV);
            })
        }
    }, [poolSocket, address, chain]);
    return (
        <div >
            <PoolHead togglePool={togglePool} setTogglePool={setTogglePool} poolData={poolData} poolDataFromSocket={poolDataFromSocket ? poolDataFromSocket : []} data={poolApiData[poolData.poolId]} poolLoading={poolLoading} />
            <div className={`mobile_toggle  items-center justify-center text-white  mb-3 py-2 hidden max-sm:flex  ${styles.header_mobile_header} `}>
                <motion.div
                    className={`pool_toggle mr-5 cursor-pointer p-1 rounded md:hidden ${!poolLoading && togglePool ? "bg-lightBlue" : "bg-primarybg"}`}
                    onClick={() => {
                        if (poolDataFromSocket.length > 0) {
                            setTogglePool(!poolLoading && !togglePool);
                        }
                    }}
                    initial={false}
                    animate={{ rotate: togglePool ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {
                        poolLoading ? <Spinner /> : < Image src={ChervonUp} width={16} height={16} alt="token-img" />
                    }
                </motion.div>
                <p className="text-sm">{togglePool ? "Less Details" : "More details"}</p>
            </div>
            {
                togglePool &&
                <AnimatePresence>
                    <motion.div className="" initial="closed"
                        animate={togglePool ? "open" : "closed"}
                        exit="closed"
                        variants={containerVariants}
                    >
                        <PoolDetail poolDataFromSocket={poolDataFromSocket} data={poolApiData[poolData.poolId]} poolId={poolData.poolId} fetchData={fetchData} allowDeposit={poolData.allowDeposit} />
                    </motion.div>
                </AnimatePresence>
            }

        </div>
    );
}

export default MainPool;