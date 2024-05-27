import { VAULT_CONTRACT } from "@/components/Address/contractAddress"
import { StoneIcon, USDTicon } from "@/components/assets"
import Spinner from "@/components/utils/spinner"
import ViewTX from "@/components/utils/viewTX"
import { floatFigure, formatFigures } from "@/components/utils/web3FiguresHelpers"
import { ethers } from "ethers"
import Image from "next/image"
import { useEffect } from "react"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import styles from "./styles.module.scss"
import { vaultABI } from "@/contractABIs"
import UseStore from "@/store/UseStore"

const ClaimManagement = ({ poolId, fetchData, web3LoadingStates, setWeb3LoadingStates, chain, apiData, availableBalance }) => {
    const { setTransactionType, setMessage, currentWalletAddress, tokenDecimals,transactionsStatus,setTransactionsStatus,arbNetwork } = UseStore()
    const { data: dataClaimAssetsHash, writeContractAsync: writeClaimAseets } = useWriteContract()

    const { data: dataClaimGuaranteeHash, writeContractAsync: writeClaimGuarantee } = useWriteContract()

    /********* WAIT FOR Transactions **********/
    const { data: claimAssetTxData, isSuccess: claimAssetsIsSucess } = useWaitForTransactionReceipt({
        hash: dataClaimAssetsHash
    })
    const { data: claimGuaranteeTxData, isSuccess: claimGuaranteeIsSuccess } = useWaitForTransactionReceipt({
        hash: dataClaimGuaranteeHash
    })
 
    const handleClaim = async (action) => {
        if (action === 'assets') {
            setTransactionType("claim asset")
            setMessage(<ViewTX type={"loading"} message={'Claim asset (USDT) sent to web3...'} />);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, claimAsset: true }));
            try {
                await writeClaimAseets?.({
                    address: chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null,
                    abi: vaultABI,
                    functionName: 'claimWithdrawedTokens',
                    args: [poolId],
                    enabled: false,
                });
            } catch (error) {
                console.error('Error claiming assets:', error);
                setMessage(<ViewTX type={"error"} message={error.message} />);
            } finally {
                setWeb3LoadingStates(prevStates => ({ ...prevStates, claimAsset: false }));
            }
        } else if (action === 'guarantee') {
            setTransactionType("claim guarantee")
            setMessage(<ViewTX type={"loading"} message={'Claim Guarantee (0NE) sent to web3...'} />);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, claimableGuarantee: true }));
            try {
                await writeClaimGuarantee?.({
                    address: chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null,
                    abi: vaultABI,
                    functionName: 'claimGuaranteeToken',
                    args: [poolId],
                });
            } catch (error) {
                console.error('Error claiming guarantee:', error);
                setMessage(<ViewTX type={"error"} message={error.message} />);
            } finally {
                setWeb3LoadingStates(prevStates => ({ ...prevStates, claimableGuarantee: false }));
            }
        }
    };

    useEffect(() => {
        if (claimAssetsIsSucess) {
            setWeb3LoadingStates(prevStates => ({ ...prevStates, claimAsset: false }));
            setMessage(<ViewTX message={`Claimed assets (USDT) successfully`} txHash={claimAssetTxData?.transactionHash} type={"success"} />);
        }

        if (claimGuaranteeIsSuccess) {
            setWeb3LoadingStates(prevStates => ({ ...prevStates, claimableGuarantee: false }));
            setMessage(<ViewTX message={`Claimed guarantee (0NE) successfully`} txHash={claimGuaranteeTxData?.transactionHash} type={"success"} />);
        }
    }, [claimAssetsIsSucess, claimGuaranteeIsSuccess])

    useEffect(() => {
        // const updateUI = async () => {
        //     try {
        //         await fetchData();
        //     } catch (error) {
        //         console.error("Error updating UI:", error);
        //     }
        // };
        // updateUI();
        setTransactionsStatus({
            claimAssetsIsSucess, 
            claimGuaranteeIsSuccess})
    }, [claimGuaranteeIsSuccess, claimAssetsIsSucess]);
    return ( 

        <div className="bg-poolDarkBlue rounded-lg md:px-5 py-8 max-sm:px-3">
            <div className="total_aval_claim">
                <p className="text-[16px]">Total Available Claim</p>
                <div className="flex items-center mb-10">
                    <h1>{availableBalance.investDecimals > 0 && apiData ? formatFigures(ethers.formatUnits(apiData.claimableWithdraw, 6), 2) : "0.00"} USDT</h1>
                </div>

            </div>

            <div className={styles.pool_detail_performance__assets}>
                <div className={styles.pool_detail_performance__assets_asset}>
                    <Image src={USDTicon} width={36} height={36} alt="token-img" />
                    <div className="">
                    <h1>{availableBalance.investDecimals > 0 && apiData ? formatFigures(ethers.formatUnits(apiData.claimableWithdraw, 6), 2) : "0.00"} USDT</h1>
                        <p className="text-sm">Claimable USDT</p>
                        <button className={`text-white ${apiData.claimableWithdraw > 0 && !web3LoadingStates.claimAsset ? 'primary_button' : "gray_btn cursor-not-allowed"}`} onClick={() => handleClaim('assets')} disabled={apiData.claimableWithdraw <= 0 || web3LoadingStates.claimAsset}>
                            {web3LoadingStates.claimAsset ? <Spinner /> : "Claim assets"}
                        </button>
                    </div>
                </div>
                {
                    !arbNetwork &&  <div className={styles.pool_detail_performance__assets_asset}>
                    <Image src={StoneIcon} width={36} height={36} alt="token-img" />

                    <div className="">
                        <h1 className="">{formatFigures(ethers.formatEther(apiData.claimableGuaranteeAmount), 0)} 0NE</h1>
                        <p className="text-sm">Claimable Guarantee</p>
                        <button className={`text-white ${Number(floatFigure(ethers.formatEther(apiData.claimableGuaranteeAmount, 0))) > 0 && !web3LoadingStates.claimableGuarantee ? 'primary_button' : "gray_btn cursor-not-allowed"}`} onClick={() => handleClaim('guarantee')} disabled={apiData.claimableGuaranteeAmount <= 0 ||  web3LoadingStates.claimableGuarantee}>
                            {web3LoadingStates.claimableGuarantee ? <Spinner /> : "Claim guarantee"}
                        </button>
                    </div>
                </div>
                }
            </div>
        </div> 
     );
}
 
export default ClaimManagement;