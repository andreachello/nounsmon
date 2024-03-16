'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from "react";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const DynamicComponentWithNoSSR = dynamic(
  () => import('./game/GameComponent'),
  { ssr: false }
)

export default function Home() {
  const [loading, setLoading] = useState(false);
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setLoading(true)
  }, []);

  return (
    <main className=''>
      <div className='absolute flex flex-row justify-end w-full p-4'>
      <DynamicWidget />
      </div>

      {loading ? <DynamicComponentWithNoSSR /> : null}
    </main>
  );
}
