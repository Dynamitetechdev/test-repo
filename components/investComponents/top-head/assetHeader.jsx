import styles from "./styles.module.scss"
import { Tooltip } from "react-tooltip";
const AssetHeaders = () => {
    let strategyTooltip = "It involves actively managing the portfolio, buying and selling assets in an attempt to outperform the market in every condition"
    let pendingAssetsToolTip = "Assets deposited by the user within the vault and which are waiting to be invested in the strategy as of the epoch following the current one"
    let deployedAssetsToolTip = "Assets invested by the user within the strategy"
    return (
        <>
            <div className={styles.assetHeader}>
                <div className="">
                    <h3>Assets</h3>
                </div>
                <div className="" id="strategy">
                    <h3>Pool</h3>
                </div>
                <div className="max-sm:hidden" id="pendingAssets">
                    <h3>Pending Assets</h3>
                </div>
                <div className="max-sm:hidden" id="deployedAssets">
                    <h3>Deployed Assets</h3>
                </div>
                <div className="">
                    <h3>Net APY</h3>
                </div>
            </div>
            <div className={styles.assetHeadermobile}>
                <div className="">
                    <h3>Pool</h3>
                </div>
                <div className="">
                    <h3>Deployed Assets</h3>
                </div>
                <div className="">
                    <h3>Net APY(%)</h3>
                </div>
            </div>

            <div className="text-[13px] ">
                <Tooltip anchorSelect="#strategy" content={strategyTooltip} className="max-w-[200px] text-center" />
                <Tooltip anchorSelect="#pendingAssets" content={pendingAssetsToolTip} className="max-w-[200px] text-center" />
                <Tooltip anchorSelect="#deployedAssets" content={deployedAssetsToolTip} className="max-w-[200px] text-center" />
            </div>
        </>

    );
}

export default AssetHeaders;