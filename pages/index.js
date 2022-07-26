import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/apply');
  });

  return (
    <div className="flex h-screen">
      <div className="m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className='animate-bounce text-white'>
          Redirecting..
        </div>
      </div>
    </div>
  )
}
