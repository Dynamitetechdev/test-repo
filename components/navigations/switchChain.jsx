import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { POLYGONicon, ETHicon } from "../assets";
import UseStore from "../../store/UseStore";
const SwitchChain = ({ allChains, setselectChainPopup, setSelectedChain }) => {
    const chainSelectionRef = useRef(null)
    const { setMessage } = UseStore()
    const handleChainSelected = async (chain) => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain.chainId }],
            });

            setSelectedChain({
                logo: ETHicon,
                chain: chain.name,
            });

            localStorage.setItem("CurrentChain", JSON.stringify({
                logo: ETHicon,
                chain: chain.name,
            }))
            setselectChainPopup(false);

        } catch (error) {
            console.error('Error switching network:', error);
            setselectChainPopup(false);
            if (error.code === 4902) {
                setMessage('Please switch to the selected network manually in your wallet.')
            } else {
                setMessage('Failed to switch network. Please try again later.')
            }

        }
    };

    const outboxClose = (e) => {
        if (chainSelectionRef.current && !chainSelectionRef.current.contains(e.target)) {
            setselectChainPopup(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', outboxClose)

        return () => {
            document.removeEventListener('click', outboxClose)
        }
    })

    return (
        <>
            <div className="selectChain bg-[#1B2132] absolute w-44 right-40 max-sm:right-10 top-24 rounded-lg text-white z-[99] bg-[#1B2132] p-2 " ref={chainSelectionRef}>
                <ul className="flex flex-col gap-y-2">
                    {
                        allChains.map((chain, i) => (
                            <li key={`chain--${i}`} className="flex items-center pl-3 py-2 bg-primarybg rounded-lg cursor-pointer" onClick={() => handleChainSelected(chain)}>
                                <Image src={chain.tokenLogo} width={22} height={22} alt="lighting" />
                                <h2 className="ml-2 capitalize">{chain.name}</h2>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>

    );
}

export default SwitchChain;