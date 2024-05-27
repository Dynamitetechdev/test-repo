import Link from "next/link";
import { useAccount } from "wagmi"
import { BeakerIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Spinner from "./spinner";
const ViewTX = ({ txHash, message, type }) => {
    const { address, chain } = useAccount()

    //error message for each chain
    const errorMessages = {
        1: {
        "User rejected the request": "You rejected the request",
        "ERR_V.24": "Epoch Has Expired",
        "ERR_V.19": "No funds available to withdraw",
        "ERR_V.36": "Nothing to claim",
        "ERR_V.37": "Wait for rebalancing to complete",
        "ERR_V.21": "Insufficient User balance",
        "ERR_V.1": "Strategy does not exist",
        "ERR_V.2": "Deposit paused",
        "ERR_V.3": "Treasury Address Length must be 2",
        "ERR_V.4": "Burn failed",
        "ERR_V.5": "Guarantee Token address cannot be null address",
        "ERR_V.6": "First Treasury address cannot be null address",
        "ERR_V.7": "Second Treasury address cannot be null address",
        "ERR_V.8": "Minting failed",
        "ERR_V.9": "Strategy already initialized",
        "ERR_V.10": "No epochs exist",
        "ERR_V.11": "Wait for the previous epoch to settle before requesting withdraw",
        "ERR_V.12": "Insufficient contract balance",
        "ERR_V.13": "Not enough amount to withdraw",
        "ERR_V.14": "Strategy address cannot be null address",
        "ERR_V.15": "Enable withdraw for the previous epoch",
        "ERR_V.16": "Distribute all shares for the previous epoch",
        "ERR_V.17": "Epoch does not exist",
        "ERR_V.18": "Epoch not yet expired",
        "ERR_V.20": "Amount can't be 0",
        "ERR_V.22": "No more users are allowed",
        "ERR_V.23": "Deposit amount exceeds epoch limit",
        "ERR_V.25": "Current balance not enough",
        "ERR_V.26": "Not enough total withdrawals",
        "ERR_V.27": "VPS not yet updated",
        "ERR_V.28": "Already started distribution",
        "ERR_V.29": "Not yet distributed",
        "ERR_V.30": "Already distributed",
        "ERR_V.31": "Fee duration not yet passed",
        "ERR_V.32": "Vault balance is not enough to pay fees",
        "ERR_V.33": "Transfer Failed",
        "ERR_V.34": "Withdraw Token cannot be deposit token",
        "ERR_V.35": "No pending Fees to distribute"
        },
        11155111: {
        "User rejected the request": "You rejected the request",
        "ERR_V.24": "Epoch Has Expired",
        "ERR_V.19": "No funds available to withdraw",
        "ERR_V.36": "Nothing to claim",
        "ERR_V.37": "Wait for rebalancing to complete",
        "ERR_V.21": "Insufficient User balance",
        "ERR_V.1": "Strategy does not exist",
        "ERR_V.2": "Deposit paused",
        "ERR_V.3": "Treasury Address Length must be 2",
        "ERR_V.4": "Burn failed",
        "ERR_V.5": "Guarantee Token address cannot be null address",
        "ERR_V.6": "First Treasury address cannot be null address",
        "ERR_V.7": "Second Treasury address cannot be null address",
        "ERR_V.8": "Minting failed",
        "ERR_V.9": "Strategy already initialized",
        "ERR_V.10": "No epochs exist",
        "ERR_V.11": "Wait for the previous epoch to settle before requesting withdraw",
        "ERR_V.12": "Insufficient contract balance",
        "ERR_V.13": "Not enough amount to withdraw",
        "ERR_V.14": "Strategy address cannot be null address",
        "ERR_V.15": "Enable withdraw for the previous epoch",
        "ERR_V.16": "Distribute all shares for the previous epoch",
        "ERR_V.17": "Epoch does not exist",
        "ERR_V.18": "Epoch not yet expired",
        "ERR_V.20": "Amount can't be 0",
        "ERR_V.22": "No more users are allowed",
        "ERR_V.23": "Deposit amount exceeds epoch limit",
        "ERR_V.25": "Current balance not enough",
        "ERR_V.26": "Not enough total withdrawals",
        "ERR_V.27": "VPS not yet updated",
        "ERR_V.28": "Already started distribution",
        "ERR_V.29": "Not yet distributed",
        "ERR_V.30": "Already distributed",
        "ERR_V.31": "Fee duration not yet passed",
        "ERR_V.32": "Vault balance is not enough to pay fees",
        "ERR_V.33": "Transfer Failed",
        "ERR_V.34": "Withdraw Token cannot be deposit token",
        "ERR_V.35": "No pending Fees to distribute"
        },
        42161: {
        "ERR_V.1" : "Strategy does not exist",
        'ERR_V.2' : "Deposit paused",
        'ERR_V.3' : "Treasury Address Length must be 2",
        'ERR_V.4' : "Burn failed",
        'ERR_V.5' : "Wait for rebalancing to complete",
        'ERR_V.6' : "First Treasury address cannot be null address",
        'ERR_V.7' : "Second Treasury address cannot be null address",
        'ERR_V.8' : "Minting failed",
        'ERR_V.9' : "Strategy already initialized",
        'ERR_V.10' : "No epochs exist",
        'ERR_V.11' : "Nothing to claim",
        'ERR_V.12' : "Insufficient contract balance",
        'ERR_V.13' : "Not enough amount to withdraw",
        'ERR_V.14' : "Strategy address cannot be null address",
        'ERR_V.15' : "No pending Fees to distribute",
        'ERR_V.16' : "Distribute all shares for previous epoch",
        'ERR_V.17' : "Epoch does not exist",
        'ERR_V.18' : "Epoch not yet expired",
        'ERR_V.19' : "Vault balance is not enough to pay fees",
        'ERR_V.20' : "Amount can't be 0",
        'ERR_V.21' : "Insufficient User balance",
        'ERR_V.22' : "No more users are allowed",
        'ERR_V.23' : "Deposit amount exceeds epoch limit",
        'ERR_V.24' : "Epoch expired",
        'ERR_V.25' : "Current balance not enough",
        'ERR_V.26' : "Not enough total withdrawals",
        'ERR_V.27' : "VPS not yet updated",
        'ERR_V.28' : "Already started distribution",
        'ERR_V.29' : "Not yet distributed",
        'ERR_V.30' : "Already distributed",
        'ERR_V.31' : "Fee duration not yet passed",
        'ERR_V.32' : "Withdraw Token cannot be deposit token",
        'ERR_V.33' : "Arrays must have same lenght!",
        'ERR_V.34' : "Entry fee too high!",
        'ERR_V.35' : "Not enough shares to distribute"
        }
    }

    const errorMessage = (message) => {
        if (message.includes('0xdAC17F958D2ee523a2206206994597C13D831ec7')) {
            return"Approval failed, in order to edit USDT allowance you need to first revoke and then approve a new USDT amount. Thus requires two transactions to be signed";
        } else if (message.includes('HTTP request failed')) {
            return 'Network Connection Error. Check Your Internet'
        } else if (message.includes('ERC20: insufficient allowance')) {
            return "Approve More USDT allowance. Click 'EDIT USDT ALLOWANCE' button "
        }else if (message.includes('User rejected the request')) {
            return 'You rejected the request'
        }
        const match = message.match(/ERR_V\.\d+/);
        const errorCode = match ? match[0] : null;
        return errorCode ? errorMessages[chain.id][errorCode] || message : message;
    };

    return ( 
        <>
            {
                type === "success" && (
                    <div className="bg-primary flex gap-x-4">
                        <div className="p-2 bg-[green] flex items-center">
                            <CheckCircleIcon width={25} />
                        </div>
                        <div className="">
                            <h1>{message}</h1>
                            {
                                chain.id == 42161 ? 
                                <Link className="underline" href={`https://arbiscan.io/tx/${txHash}`} target="_blank">View Transaction</Link> : 
                                <Link className="underline" href={`https://${chain?.id == 5 ? "goerli.": ""}etherscan.io/tx/${txHash}`} target="_blank">View Transaction</Link>
                            }
                        </div>

                    </div>
                )
            }
            {
                type === "error" && (
                    <div className="bg-primary flex gap-x-4">
                        <div className="p-2 bg-[red] flex items-center">
                            <XCircleIcon width={25} />
                        </div>
                        <div className="">
                            <h1 className="capitalize">{message ? errorMessage(message) : "Transaction was denied by EVM. Double check inputs and try again."}</h1>
                        </div>
                    </div>
                )
            }
            {
                type === "loading" && (
                    <div className="flex items-center gap-x-4">
                        <div className="p-2 bg-[#E083FF] flex items-center">
                            <Spinner/>
                        </div>
                        <div className="">
                            <h1>{message ? message : "Transaction sent to web3...."}</h1>
                        </div>
                    </div>
                )
            }
        </>
     );
}
 
export default ViewTX;