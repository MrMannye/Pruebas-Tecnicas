'use client'
import {useEffect, useMemo, useState} from 'react'
import Product from './product'

interface Props {
  query: string | null
}

function ListProducts({query}: Props) {
  
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + query + "&limit=10")
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setFilters(response.filters[0]?.values[0]?.path_from_root)
      setProducts(response.results)
    })
  },[query])
  
  return (
    <section className="flex flex-col max-w-4xl mx-auto p-6 bg-slate-200">
      <span className='text-slate-400 text-xs my-2'>{filters?.map(filter => (filter.name + " > "))}</span>
      {products?.map((product,index) => {
        return(
          <Product key={product.id} index={index} product={product}/>
        )
      })}
    </section>
  )
}

export default ListProducts