export const vaultGetterABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_civVaultAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "NULL_ADDRESS",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PERIOD",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "UNISWAP_FACTORY",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "WETH_ADDRESS",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_epochDuration",
                "type": "uint256"
            }
        ],
        "name": "addTimeOracle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_token0",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_token1",
                "type": "address"
            }
        ],
        "name": "addUniPair",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "civVault",
        "outputs": [
            {
                "internalType": "contract ICivVault",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getAllowedDeposit",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getClaimableGuaranteeToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getCurrentPeriod",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "currentPeriodStartTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "getDepositGuarantee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getGuaranteeTokenInfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "decimals",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newVPS",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_epochId",
                "type": "uint256"
            }
        ],
        "name": "getNetValues",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amountIn",
                "type": "uint256"
            }
        ],
        "name": "getPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amountIn",
                "type": "uint256"
            }
        ],
        "name": "getReversePrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUnclaimedTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserBalances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "guaranteeBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "representTokenBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "assetTokenBalance",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "guaranteeAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "representTokenAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "assetTokenAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "pairInfo",
        "outputs": [
            {
                "internalType": "contract IUniswapV2Pair",
                "name": "pair",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "price0CumulativeLast",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price1CumulativeLast",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint224",
                        "name": "_x",
                        "type": "uint224"
                    }
                ],
                "internalType": "struct FixedPoint.uq112x112",
                "name": "price0Average",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint224",
                        "name": "_x",
                        "type": "uint224"
                    }
                ],
                "internalType": "struct FixedPoint.uq112x112",
                "name": "price1Average",
                "type": "tuple"
            },
            {
                "internalType": "uint32",
                "name": "blockTimestampLast",
                "type": "uint32"
            },
            {
                "internalType": "address",
                "name": "token0",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "token1",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newEpochDuration",
                "type": "uint256"
            }
        ],
        "name": "setEpochDuration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "timeOracle",
        "outputs": [
            {
                "internalType": "contract TimeOracle",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "update",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "updateAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const vaultABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "maxDeposit",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "minDeposit",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "paused",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "withdrawAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "assetToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "guaranteeToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "lockPeriod",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "feeDuration",
                "type": "uint256"
            }
        ],
        "name": "AddStrategy",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CancelDeposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CancelWithdraw",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "guaranteeAmount",
                "type": "uint256"
            }
        ],
        "name": "ClaimGuarantee",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "epoch",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "assetAmount",
                "type": "uint256"
            }
        ],
        "name": "ClaimWithdrawedToken",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "InitializeStrategy",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "treasuryAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "feeAmount",
                "type": "uint256"
            }
        ],
        "name": "SendFeeWithOwner",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldDuration",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newDuration",
                "type": "uint256"
            }
        ],
        "name": "SetEpochDuration",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldFee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newFee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldDuration",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newDuration",
                "type": "uint256"
            }
        ],
        "name": "SetFee",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "gasBuffer",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newGasBuffer",
                "type": "uint256"
            }
        ],
        "name": "SetGasBuffer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldFee",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newFee",
                "type": "uint256"
            }
        ],
        "name": "SetGuaranteeFee",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldLocktime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newLockTime",
                "type": "uint256"
            }
        ],
        "name": "SetGuaranteeLockTime",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "oldAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "SetInvestAddress",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldMaxAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newMaxAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldMinAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newMinAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "oldMaxUsers",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newMaxUsers",
                "type": "uint256"
            }
        ],
        "name": "SetLimits",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "paused",
                "type": "bool"
            }
        ],
        "name": "SetPaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "oldAddress",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "newAddress",
                "type": "address[]"
            }
        ],
        "name": "SetWithdrawAddress",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "Update",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "lastEpoch",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "VPS",
                "type": "uint256"
            }
        ],
        "name": "UpdateVPS",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdraw",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "assetAmount",
                "type": "uint256"
            }
        ],
        "name": "WithdrawedToken",
        "type": "event"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "contract IERC20",
                        "name": "_assetToken",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IERC20",
                        "name": "_guaranteeToken",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_maxDeposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_maxUsers",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_minAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_fee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_guaranteeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_epochDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_lockPeriod",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_feeDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_investAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address[]",
                        "name": "_withdrawAddresses",
                        "type": "address[]"
                    },
                    {
                        "internalType": "bool",
                        "name": "_paused",
                        "type": "bool"
                    }
                ],
                "internalType": "struct AddStrategyParam",
                "name": "addStrategyParam",
                "type": "tuple"
            }
        ],
        "name": "addStrategy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "cancelDeposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "cancelWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "claimGuaranteeToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "claimWithdrawedTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "continueDistributingShares",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeBase",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fundShareFactory",
        "outputs": [
            {
                "internalType": "contract CIVFundShareFactory",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gasBuffer",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getCurrentEpoch",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_epoch",
                "type": "uint256"
            }
        ],
        "name": "getDepositors",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "users",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getEpochInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "totDepositors",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totDepositedAssets",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totWithdrawnShares",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "VPS",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "newShares",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentWithdrawAssets",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "epochStartTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastDepositorProcessed",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct EpochInfo",
                "name": "epoch",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getGuaranteeInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "lockStartTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lockAmount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct GuaranteeInfo",
                "name": "userGuarantee",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getStrategyInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "contract IERC20",
                        "name": "assetToken",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IERC20",
                        "name": "guaranteeToken",
                        "type": "address"
                    },
                    {
                        "internalType": "contract ICivFundRT",
                        "name": "fundRepresentToken",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "guaranteeFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "maxDeposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "maxUsers",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minDeposit",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "epochDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lockPeriod",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "feeDuration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastFeeDistribution",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastProcessedEpoch",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "watermark",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pendingFees",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address[]",
                        "name": "withdrawAddress",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address",
                        "name": "investAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "initialized",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "paused",
                        "type": "bool"
                    }
                ],
                "internalType": "struct StrategyInfo",
                "name": "strategy",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getUserInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "lastEpoch",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startingIndexGuarantee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "numberOfLocks",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct UserInfo",
                "name": "user",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            }
        ],
        "name": "getUserInfoEpoch",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "depositInfo",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawInfo",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "depositIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "epochGuaranteeIndex",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "hasDeposited",
                        "type": "bool"
                    }
                ],
                "internalType": "struct UserInfoEpoch",
                "name": "userEpochStruct",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "initializeStrategy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "processDeposits",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newVPS",
                "type": "uint256"
            }
        ],
        "name": "rebalancing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "sendPendingFees",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newDuration",
                "type": "uint256"
            }
        ],
        "name": "setEpochDuration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newMaxDeposit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newMinDeposit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newMaxUsers",
                "type": "uint256"
            }
        ],
        "name": "setEpochLimits",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newDuration",
                "type": "uint256"
            }
        ],
        "name": "setFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_gasBuffer",
                "type": "uint256"
            }
        ],
        "name": "setGasBuffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_newAddress",
                "type": "address"
            }
        ],
        "name": "setInvestAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_paused",
                "type": "bool"
            }
        ],
        "name": "setPaused",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_lockTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newFee",
                "type": "uint256"
            }
        ],
        "name": "setStrategyGuarantee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "_newAddress",
                "type": "address[]"
            }
        ],
        "name": "setWithdrawAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "strategiesCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "vaultGetter",
        "outputs": [
            {
                "internalType": "contract ICivVaultGetter",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_tokenContract",
                "type": "address"
            }
        ],
        "name": "withdrawERC20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
