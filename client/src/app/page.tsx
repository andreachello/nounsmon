'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from "react";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useUserDataStore } from '../lib/stores/userData';

const DynamicComponentWithNoSSR = dynamic(
  () => import('./game/GameComponent'),
  { ssr: false }
)

export default function Home() {
  const [loading, setLoading] = useState(false);
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  useUserDataStore.setState({
    address: String(account.address)
  })



  useEffect(() => {
    setLoading(true)
  }, []);

  return (
    <main className=''>
      <div className='absolute flex flex-row justify-end w-full p-4'>
        <DynamicWidget />
      </div>
      {account.address ? (
        <>
          {loading ? <DynamicComponentWithNoSSR /> : null}
        </>
      ) : (
        <>
          <img src="assets/images/ui/Slide 16_9 - 1.png" alt="logo" />
        </>
      )}
    </main>
  );
}
