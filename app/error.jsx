"use client"

import Link from "next/link";

const error = () => {
    return ( 
        <div className="text-center text-white">
        <h1 className="text-4xl mt-60">We are Working on Fund Server, we will be back up in few hours</h1>
        <Link href={'https://civfund.org/'} className="underline">https://civfund.org/</Link>
        </div>
      );
}
 
export default error;