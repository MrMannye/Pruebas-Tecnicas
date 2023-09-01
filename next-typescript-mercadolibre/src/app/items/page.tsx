'use client'
import React from 'react'
import ListProducts from '../components/list-products'
import { useSearchParams } from 'next/navigation'

export default function Items() {
  const router = useSearchParams();
  const searchParams = router.get('search');

  return (
    <ListProducts query={searchParams}/>
  )
}
