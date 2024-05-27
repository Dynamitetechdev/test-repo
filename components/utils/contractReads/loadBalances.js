import { GUARANTEE_CONTRACT, CIVINVEST_TOKEN, XCIV_CONTRACT, VAULT_CONTRACT } from "@/components/Address/contractAddress";
import UseStore from "@/store/UseStore";
import { useBalance, useReadContracts, useAccount, useReadContract } from "wagmi";
import { Ierc20Abi } from "@/contractABIs";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

const LoadBalances = (poolId) => {
    const { address, chain } = useAccount()
    const {tokenDecimal} = UseStore()
    const _xCivContract = {
        address: XCIV_CONTRACT[chain?.id] ? XCIV_CONTRACT[chain?.id][poolId] : null,
        abi: Ierc20Abi,
    }
    const _guaranteeContract = {
        address: GUARANTEE_CONTRACT[chain?.id] ? GUARANTEE_CONTRACT[chain?.id][poolId] : null,
        abi: Ierc20Abi,
    }
    const _civAssetContract = {
        address: CIVINVEST_TOKEN[chain?.id] ? CIVINVEST_TOKEN[chain?.id][poolId] : null,
        abi: Ierc20Abi,
    }
    // 18 decimals
    const { data: guaranteeBalance } = useReadContract({
        ..._guaranteeContract,
        functionName: 'balanceOf',
        args: [address],
        account: address,
    });
    //6 decimals
    const { data: tokenBalance } = useReadContract({
        ..._civAssetContract,
        functionName: "balanceOf",
        args: [address]
    });
    //18 decimals
    const { data: XCIVBalance } = useReadContract({
        ..._xCivContract,
        functionName: "balanceOf",
        args: [address]
    });

    // const { data: tokenBalance } = useBalance({
    //     address: address ? address : null,
    //     token: CIVINVEST_TOKEN[chain?.id] ? CIVINVEST_TOKEN[chain?.id][poolId] : null
    // });

    // const { data: XCIVBalance } = useBalance({
    //     address: address ? address : null,
    //     token: XCIV_CONTRACT[chain?.id] ? XCIV_CONTRACT[chain?.id][poolId] : null
    // });


    const contracts =  [
        {
            ..._xCivContract,
            functionName: 'allowance',
            args: [address, VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null],
        },
        chain?.id != 42161 && {
            ..._guaranteeContract,
            functionName: 'allowance',
            args: [address, VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null],
        },
        {
            ..._civAssetContract,
            functionName: 'allowance',
            args: [address, VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null],
        },
    ].filter(Boolean)
    const { data: allowances, isRefetching, isLoading, isSuccess, refetch, isFetched } = useReadContracts({
        contracts
    })
    const memoizedBalances = useMemo(() => {
        if (!allowances) {
            return {
                guaranteeBalance: "0",
                tokenBalance: "0",
                XCIVBalance: "0",
                guaranteeAllowance: "0",
                civAssetAllowance: "0",
                xCivAllowance: "0",
            };
        }

        return {
            guaranteeBalance: guaranteeBalance ? ethers.formatUnits(guaranteeBalance, 18)
            : "0" ,
            tokenBalance: tokenBalance ? ethers.formatUnits(tokenBalance, 6)
            : "0" ,
            XCIVBalance: XCIVBalance ? ethers.formatUnits(XCIVBalance, 18)
            : "0" ,
            guaranteeAllowance: chain?.id == 42161 ? '0': allowances && allowances[1].status === "success"
            ? ethers.formatUnits(allowances[1].result, guaranteeBalance && 18)
            : "0",
            civAssetAllowance:
                allowances && allowances[chain?.id == 42161 ? 1: 2].status === "success"
                    ? ethers.formatUnits(allowances[chain?.id == 42161 ? 1: 2].result, tokenBalance && 6)
                    : "0",
            xCivAllowance:
                allowances && allowances[0].status === "success"
                    ? ethers.formatUnits(allowances[0].result, XCIVBalance && 18)
                    : "0",
        };
    }, [allowances, guaranteeBalance, tokenBalance, XCIVBalance, isRefetching, isLoading, isSuccess]);
    // console.log({memoizedBalances, chainId: chain?.id, poolId, tokenBalance,address: CIVINVEST_TOKEN[chain?.id] ? CIVINVEST_TOKEN[chain?.id][0] : null})
    return { memoizedBalances, refetch, isFetched };
}


export default LoadBalances