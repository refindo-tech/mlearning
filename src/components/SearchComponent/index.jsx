'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@nextui-org/react"
import Loading from "@/app/loading"
const SearchComponent = () => {
    const router = useRouter()
    const [valueSearch, setValueSearch] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const handleSearch = () =>{
        setIsLoad(true)
        router.push(`/search/${valueSearch}`)
    }
    const handleValueSearch = (value)=>{
        setValueSearch(value)
    }
    if(isLoad){
        return(
            <div className="w-full h-full fixed top-0 left-0 z-50">
                <Loading/>
            </div>
    )}
    return (
            <Input
                type="text"
                placeholder="Cari materi"
                onChange={(e)=>{handleValueSearch(e.target.value)}}
                className="rounded-md shadow-md"
                endContent={
                    <button
                        aria-label="submit search"
                        className="focus:outline-none h-full flex flex-col items-center justify-center"
                        type="button"
                        onClick={handleSearch}
                    >
                        <Search size={20} />
                    </button>
                }
            />
    )
}
export default SearchComponent