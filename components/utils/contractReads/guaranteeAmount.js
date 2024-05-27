import { VAULT_GETTER_CONTRACT } from "@/components/Address/contractAddress";
import { useReadContract, useAccount } from "wagmi";
import { vaultGetterABI } from "@/contractABIs";
import { ethers } from "ethers";

const useGuarantee = (poolId, amount) => {
    const { address, chain } = useAccount()

    const { data } = useReadContract({
        address: VAULT_GETTER_CONTRACT[chain?.id] ? VAULT_GETTER_CONTRACT[chain?.id][0] : null,
        abi: vaultGetterABI,
        functionName: 'getDepositGuarantee',
        args: [poolId, amount],
    })
    console.log({adresssssss: VAULT_GETTER_CONTRACT[chain?.id] ? VAULT_GETTER_CONTRACT[chain?.id][0] : null})

    if (!data) {
        return "0"
    }

    return ethers.formatEther(data.toString())
}

export default useGuarantee;