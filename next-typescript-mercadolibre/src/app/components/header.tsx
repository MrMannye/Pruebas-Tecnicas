'use client'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {

    const [query, setQuery] = useState<string>('');
    const router = useRouter();

    const hangleChangueQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
    const onToggleSearch = () => router.push("/items?search=" + query)
    
    return (
        <header className="bg-[#FFE600] flex items-center justify-center p-2">
            <div className="flex flex-[0.5]">
                <img src="/logo.png" alt="Logo" className="w-10 mr-2" />
                <input onChange={hangleChangueQuery} placeholder="Nunca dejes de buscar" className="p-1 text-xs w-full outline-none" />
                <img onClick={onToggleSearch} src="https://img.icons8.com/?size=512&id=132&format=png" className="w-6 h-6 p-1 bg-slate-200" alt="Busqueda" />
            </div>
        </header>
    )
}
