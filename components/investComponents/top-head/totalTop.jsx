import { USDTicon } from "@/components/assets";
import styles from "./styles.module.scss"
import Image from "next/image";
import UseStore from "@/store/UseStore";
import { formatFigures } from "@/components/utils/web3FiguresHelpers";
import { useEffect, useState } from "react";
const TotalTop = () => {
    const { socketData, totalNAV, highestNetAPY } = UseStore()
    const [poolSocketData, setPoolSocketData] = useState({
        tvl: 0.00,
        apy: 0,
        roi: 0.00
    })

    useEffect(() => {
        if (socketData[1]) {
            setPoolSocketData({
                ['tvl']: socketData[1].NAV,
                ['apy']: socketData[1].APY,
                ['roi']: socketData[1].ROI,
            })
        }
    }, [socketData])
    return (
        <div className={styles.totalTop}>
            <div className="flex items-center max-sm:flex-col max-sm:gap-2">
                <Image src={USDTicon} width={40} height={40} alt={''} />
                <h1 className="md:font-bold ml-2">USDT STRATEGIES</h1>
            </div>

            <div className="flex md:gap-20 gap-5">
                <div className="">
                    <h3>Total Value Locked</h3>
                    <h1 className="font-semibold text-1xl max-sm:text-[14px]">${formatFigures(totalNAV, 2)}</h1>
                </div>
                <div className="">
                    <h3>Highest Net APY</h3>
                    <h1 className="font-semibold text-1xl max-sm:text-[14px]">{formatFigures(highestNetAPY, 2)}%</h1>
                </div>
            </div>

        </div>
    );
}

export default TotalTop;