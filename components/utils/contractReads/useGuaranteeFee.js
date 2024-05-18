import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { VAULT_GETTER_CONTRACT } from "@/components/Address/contractAddress";
import { vaultGetterABI } from "@/contractABIs";
import { ethers } from "ethers";
import UseStore from "@/store/UseStore";
const useGuaranteeFee = (chain, poolId, depositAmount, decimals) => {
    const [guarantee, setGuarantee] = useState(0);
    const { setGuaranteeFee, tokenPrices } = UseStore()
    const getGuaranteeFee = () => {
        if (depositAmount && tokenPrices?.STONEprice) {
            const guaranteeFee = chain?.id != 1 ? (Number(depositAmount) / 100) :  (Number(depositAmount) * 0.01) / tokenPrices.STONEprice;
            // const guaranteeFee = (Number(depositAmount) * 0.1) / tokenPrices.STONEprice;
            setGuarantee(guaranteeFee);
            setGuaranteeFee(guaranteeFee)
        }
    };

    useEffect(() => {
        getGuaranteeFee();
    }, [depositAmount, tokenPrices?.STONEprice]);
    return guarantee;
};

export default useGuaranteeFee;