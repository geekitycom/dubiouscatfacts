'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface CatFactDisplayProps {
  initialFact: string
}

export default function CatFactDisplay({ initialFact }: CatFactDisplayProps) {
  const [fact, setFact] = useState<string>(initialFact)

  const fetchFact = useCallback(async () => {
    try {
      const response = await fetch('/api/catfact')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setFact(data.fact)
    } catch (error) {
      console.error('Error fetching cat fact:', error)
    }
  }, [])

  return (
    <>
      <Image
        src="/dubious_cat.svg?height=200&width=200"
        alt="Cartoon Cat"
        width={200}
        height={200}
        className="mb-4"
      />
      <p className="text-2xl mb-4 text-center max-w-md">{fact}</p>
      <button className="lined thick" onClick={fetchFact}>New Fact</button>
    </>
  )
}

