'use client'
import {useEffect, useState} from 'react'
import Product from './product'

interface Props {
  query: string | null
}

function ListProducts({query}: Props) {
  
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + query + "&limit=10")
    .then(response => response.json())
    .then(response => { console.log(response.results); setProducts(response.results)})
  },[query])
  
  return (
    <section className="flex flex-col items-center p-6 bg-slate-200">
      {products.map((product,index) => {
        return(
          <Product key={product.id} index={index} product={product}/>
        )
      })}
    </section>
  )
}

export default ListProducts