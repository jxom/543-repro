import React, { useEffect, useState } from 'react';
import { createPublicClient, http, getContract } from 'viem'
import { mainnet } from 'viem/chains'

import { wagmiContract } from './contract'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

const contract = getContract({
  ...wagmiContract,
  publicClient
})

export default function App() {
  const [totalSupply, setTotalSupply] = useState<bigint | undefined>()

  useEffect(() => {
    (async () => {
      const totalSupply = await contract.read.totalSupply()
      setTotalSupply(totalSupply)
    })()
  }, [])

  return (
    <div>
      Total supply: {totalSupply?.toString()}
    </div>
  );
}
