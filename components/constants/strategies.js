import { CAKEicon, POLYGONicon, SHIBAicon, SOLicon, USDTicon, UNISWAPicon } from "@/components/assets";

export const strategies = {
    1: [
        {
            id: 3,
            usdtStrategies: "pilot",
            tokenLogo: UNISWAPicon,
            poolId: 3,
            oneLogo: true,
            allowDeposit: false
        },
        {
            id: 2,
            usdtStrategies: "genesis",
            tokenLogo: UNISWAPicon,
            poolId: 4,
            oneLogo: true,
            allowDeposit: true
        },
    ],
    11155111: [
        {
            id: 3,
            usdtStrategies: "pilot",
            tokenLogo: UNISWAPicon,
            poolId: 3,
            oneLogo: true,
            allowDeposit: false
        },
        {
            id: 2,
            usdtStrategies: "genesis",
            tokenLogo: UNISWAPicon,
            poolId: 4,
            oneLogo: true,
            allowDeposit: true
        },
    ],
    42161: [
        {
            id: 0,
            usdtStrategies: "pilot",
            tokenLogo: UNISWAPicon,
            poolId: 0,
            oneLogo: true,
            allowDeposit: true
        },
        {
            id: 1,
            usdtStrategies: "genesis",
            tokenLogo: UNISWAPicon,
            poolId: 1,
            oneLogo: true,
            allowDeposit: true
        },
    ]

}
    // {
    //     id: 3,
    //     usdtStrategies: "MATIC-USDT V2",
    //     tokenLogo: POLYGONicon
    // },
    // {
    //     id: 4,
    //     usdtStrategies: "CAKE-USDT V2",
    //     tokenLogo: CAKEicon
    // },
    // {
    //     "uid": 0,
    //     "id": 3,
    //     "url": ["/icon_svg/shib.png"],
    //     "text": "Luna",
    //     "title": "ETH-SHIB V2",
    //     "isLegacy": false,
    //     "isTest": false,
    //     "tokenName": "USDT",
    //     "repTokenName": "XCIV",
    //     "guaranteeTokenName": "0NE",
    //     "tokenDecimal": 6,
    //     "guaranteeTokenDecimal": 18,
    //     "Price0TokenName": "ETH",
    //     "Price1TokenName": "USDT",
    //     "style": "width:36px; height:36px; border-radius:10px",
    //     "tokenContract": "0x9Cee90195e9334e3F1D970C7Ca72Fe13Fb80418a",
    //     "uniswapLink": "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x9Cee90195e9334e3F1D970C7Ca72Fe13Fb80418a&chain=mainnet"
    // }
