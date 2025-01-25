"use client";

import React from 'react'
import { useRouter } from 'next/navigation'

function page() {

  const router = useRouter();
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={
                () => {
                  router.push('/home')
                }
              }
      >
        to Home
      </button>
    </div>
  )
}

export default page