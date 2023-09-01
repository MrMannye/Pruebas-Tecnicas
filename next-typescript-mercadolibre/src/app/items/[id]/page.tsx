'use client'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Description } from "../../../../types";


export default function DetailProduct() {
  
    const [description, setDescription] = useState<Description | null>();
    const [product, setProduct] = useState();
    const router = useRouter();
    const id = router.query.id;
    
    useEffect(()=>{
        fetch("https://api.mercadolibre.com/items/" + id + "/description")
        .then(response => response.json())
        .then((response) => setDescription(response))
    },[])

    return (
    <div className='flex max-w-4xl w-full bg-white p-4 px-10 mb-2 items-start'>
      {/* <img src={product.thumbnail} className='w-[120px] h-[120px]' alt="Image Product" />
        <div className='flex flex-1 flex-col ml-4'>
          <span className='text-base mb-2 flex items-center'>$ {product.price} {index % 2 === 0 && <img src="/verified.png" className='w-4 h-4 ml-1' alt="verified" /> } </span>
          <span className='w-[400px] text-xs'>{product.title}</span>
        </div>
        <div className='text-sm text-slate-400'>{product.address.state_name}</div> */}
    </div>
  )
}
