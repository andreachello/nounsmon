'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from "react";

const DynamicComponentWithNoSSR = dynamic(
  () => import('./game/GameComponent'),
  { ssr: false }
)

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
  }, []);

  return (
    <main>
      {loading ? <DynamicComponentWithNoSSR /> : null}
    </main>
  );
}
