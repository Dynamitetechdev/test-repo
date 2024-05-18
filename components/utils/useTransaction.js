import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { GUARANTEE_CONTRACT, VAULT_CONTRACT, XCIV_CONTRACT } from '../Address/contractAddress';
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { vaultABI, stoneAbi } from "@/contractABIs";
import UseStore from "@/store/UseStore";
import ViewTX from './viewTX';
import { trimStringNumberToDecimals } from './services/NumberServices';

const useTransaction = (type, chain, poolId, inputAmount, availableBalance, setWeb3LoadingStates, fetchData) => {
    const { setMessage, guaranteeFee,transactionsStatus,setTransactionsStatus } = UseStore()
    const typeCapitalized = type && type != "" ? type.charAt(0).toUpperCase() + type.slice(1) : null;

    const address = type === 'withdraw' ? (chain && XCIV_CONTRACT[chain?.id] ? XCIV_CONTRACT[chain?.id][poolId] : null) : (chain && GUARANTEE_CONTRACT[chain?.id] ? GUARANTEE_CONTRACT[chain?.id][0] : null);
    const vaultContractAddress = chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null;
    const withdrawAmount = type === 'withdraw' && inputAmount.withdrawAmount !== null && inputAmount.withdrawAmount !== '' ? ethers.parseUnits(inputAmount.withdrawAmount, 18) : "0";
    const roundedGuaranteeFee = parseFloat(guaranteeFee.toFixed(6));

    const [depositAmount, setDepositAmount] = useState(0)
    useEffect(() => {
        setDepositAmount(type === 'deposit' && Number(inputAmount.depositAmount) > 0 ? ethers.parseUnits(trimStringNumberToDecimals(inputAmount.depositAmount, 6), 6) : null)
    })
    const { data: dataApproveHash, writeContractAsync: writeApprove} = useWriteContract({
        address: address,
        abi: stoneAbi,
        functionName: 'approve',
        args: [vaultContractAddress, type === 'withdraw' ? withdrawAmount : depositAmount],
    });
    // First TX hash
    const { isLoading, isSuccess} = useWaitForTransactionReceipt({
        hash: dataApproveHash,
    });
    //Only Have Deposit Loading State here
    const functionName = type === 'withdraw' ? 'withdraw' : 'deposit';
    //Payment with USDT - 6 decimals
    const { writeContractAsync: writeVault,data:dataContractWriteHash } = useWriteContract();

    //Second TXhash
    const {  isSuccess: txSucess, data: TxData } = useWaitForTransactionReceipt({
        hash: dataContractWriteHash,
    });

    const handleApprove = async () => {
        setMessage(<ViewTX type={"loading"} />);

        if (type === 'withdraw') {
            setWeb3LoadingStates(prevStates => ({ ...prevStates, bookUSDTWithdrawal: true }));
        }

        try {
            if (parseFloat(availableBalance.xCivAllowance) >= parseFloat(inputAmount.withdrawAmount)) {
                await writeVault?.({
                    address: chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null,
                    abi: vaultABI,
                    functionName: functionName,
                    args: [poolId, type === 'withdraw' ? withdrawAmount : depositAmount],
                    enabled: isSuccess,
                });
            } else {
                await writeApprove({
                    address: address,
                    abi: stoneAbi,
                    functionName: 'approve',
                    args: [vaultContractAddress, type === 'withdraw' ? withdrawAmount : depositAmount],
                });
            }
        } catch (error) {
            console.error('Error approving:', error);
            setMessage(<ViewTX type={"error"} message={error.message}/>);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, bookUSDTWithdrawal: false}));
        }
    };

    const handleDeposit = async () => {
        setMessage(<ViewTX type={"loading"} message={`Transaction Approved. ${typeCapitalized}ing....`} />);
        type === 'deposit' && setWeb3LoadingStates(prevStates => ({ ...prevStates, BookUSDTDeposit: true }));
        type === 'withdraw' && setWeb3LoadingStates(prevStates => ({ ...prevStates, bookUSDTWithdrawal: true }));
        try {
            await writeVault?.({
                address: chain && VAULT_CONTRACT[chain?.id] ? VAULT_CONTRACT[chain?.id][0] : null,
                abi: vaultABI,
                functionName: functionName,
                args: [poolId, type === 'withdraw' ? withdrawAmount : depositAmount],
                enabled: isSuccess,
            });
        } catch (error) {
            console.error('Error depositing:', error);
            setWeb3LoadingStates(prevStates => ({ ...prevStates, bookUSDTWithdrawal: false, BookUSDTDeposit: false }));
            setMessage(<ViewTX type={"error"} message={error.message}/>);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleDeposit();
        }
    }, [isSuccess, isLoading]);

    useEffect(() => {
        if (txSucess) {
            setMessage(<ViewTX chain={chain.id} txHash={TxData?.transactionHash} type={'success'} message={`${typeCapitalized} successful`} />);
            type === 'deposit' && setWeb3LoadingStates(prevStates => ({ ...prevStates, BookUSDTDeposit: false }));
            type === 'withdraw' && setWeb3LoadingStates(prevStates => ({ ...prevStates, bookUSDTWithdrawal: false }));
        }
    }, [txSucess]);
    useEffect(() => {
        setTransactionsStatus({
            [`${type}`]: txSucess ?? txSucess
        })
    }, [txSucess]);

    return { handleApprove, handleDeposit, isLoading, depositAmount };
};

export default useTransaction;