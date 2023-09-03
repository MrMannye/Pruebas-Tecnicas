'use client'
import { useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Description } from "../../../../types";


export default function DetailProduct() {
  
    const [description, setDescription] = useState<Description | null>();
    const [product, setProduct] = useState<any>();
    const router = usePathname();
    const id = router.split('/');
    
    useEffect(()=>{
        fetch("https://api.mercadolibre.com/items/" + id[id.length-1] + "/description")
        .then(response => response.json())
        .then((response) => setDescription(response))
        fetch("https://api.mercadolibre.com/items/" + id[id.length-1])
        .then(response => response.json())
        .then((response) => {
          console.log(response)
          setProduct(response)
        })
    },[])

    return (
    <div className='max-w-2xl m-6 p-6 bg-white mx-auto'>
      <section className="flex bg-white items-start">
        <img src={product?.thumbnail} className="mx-auto w-80" alt="Image Product" />
        <div className="flex flex-col items-start w-1/3">
          <span className="text-xs">{product?.condition === "new" ? "Nuevo" : "Usado"} - {product?.sold_quantity} vendidos</span>
          <h1 className="font-semibold">{product?.title}</h1>
          <h2 className="text-2xl font-light mt-2 tracking-wide"><span className="font-semibold text-3xl">$</span> {product?.price}</h2>
          <button className="self-center text-xs mt-10 p-2 w-full rounded-md text-white bg-blue-500">Comprar</button>
        </div>
      </section>
      <section className="w-2/3">
        <h3 className="text-lg mt-6 mb-4">Descripcion del Producto</h3>
        <p className=" text-[10px] text-slate-400">{description?.plain_text.slice(0,300)}...</p>
      </section>
    </div>
  )
}
