import { GUARANTEE_CONTRACT, CIVINVEST_TOKEN, XCIV_CONTRACT, VAULT_CONTRACT } from "@/components/Address/contractAddress";
import UseStore from "@/store/UseStore";
import { useBalance, useReadContracts, useAccount, useReadContract } from "wagmi";
import { Ierc20Abi } from "@/contractABIs";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

export const TokenDecimals = (poolId) => {

    const { address, chain } = useAccount()
    // const _xCivContract = {
    //     address: XCIV_CONTRACT[chain?.id] ? XCIV_CONTRACT[chain?.id][poolId] : null,
    //     abi: Ierc20Abi,
    // }
    // const _guaranteeContract = {
    //     address: GUARANTEE_CONTRACT[chain?.id] ? GUARANTEE_CONTRACT[chain?.id][poolId] : null,
    //     abi: Ierc20Abi,
    // }
    const _civAssetContract = {
        address: CIVINVEST_TOKEN[chain?.id] ? CIVINVEST_TOKEN[chain?.id][poolId] : null,
        abi: Ierc20Abi,
    }

    const GUARANTEE_DECIMAL = 18
    const XCIV_DECIMAL = 18
    const INVEST_DECIMAL = 6
    // const { data: INVEST_DECIMAL } = useReadContract({
    //     ..._civAssetContract,
    //     functionName: "decimals",
    //     args: []
    // });

        return{INVEST_DECIMAL,GUARANTEE_DECIMAL,XCIV_DECIMAL }
}


export default TokenDecimals