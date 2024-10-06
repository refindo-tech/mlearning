'use client'
import { usePathname, useRouter } from "next/navigation"
import Loading from '@/app/loading.jsx'
import { useState, useEffect } from "react"
import { listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI.js"
import { Button, Link } from "@nextui-org/react"
import Icons from "../Icons"
const AsideTeacher = ({ listStasiun, handleStasiun,  manage }) => {
    const router = useRouter()
    const [totalStasiun, setTotalStasiun] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const path = usePathname()
    const { AddIcon } = Icons
    const idmapel = path.split('/')[2]
    const handleResult = () => {
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/courseguru/${idmapel}/hasil`
        router.push(url)
    }
    const createNewStasiun = ()=>{
        setTotalStasiun((prev)=>{
            const data = [...prev]
            const lastData = data[data.length - 1]
            return [...prev, lastData+1]
        })
    }
    const handleIsActive = ()=>{
        if(isActive){
            setIsActive(false)            
        }else{
            setIsActive(false)
        }
    }
    useEffect(() => {
        if (listStasiun) {
            setTotalStasiun(listStasiun.map((item)=>{
                const count = parseInt(item.stasiun.split(' ')[1])
                return count
            }))
            // setDataListStasiun(listStasiun);
        }
    }, [listStasiun])
    return (
        <aside className="w-full py-10 flex flex-col items-center gap-7">
            <h3 className="font-semibold text-xl text-center">Materi Belajar</h3>
            <div className="w-[90%] flex flex-col gap-4">
                {totalStasiun && totalStasiun.map((item, index) => (
                    <Button
                        onPress={()=>handleStasiun(`stasiun ${item}`)}
                        variant="bordered"
                        className={`rounded-lg h-20 font-semibold shadow-lg border-0 hover:cursor-pointer}`}
                        key={index}
                    >
                        {`Stasiun ${item}`}
                    </Button>
                ))}
                {manage && manage === 'true' &&
                    <Button
                        variant="bordered"
                        className="h-20 border-3 border-dashed border-primer-500 flex-row justify-center items-center font-semibold"
                        onPress={createNewStasiun}
                    >
                        <h3>Tambah stasiun</h3>
                        <div className="h-5 w-5 flex items-center justify-center text-primer-500">
                            <AddIcon fill={'#110B63'} />
                        </div>
                    </Button>
                }
                <Button
                    onPress={handleResult}
                    variant="bordered"
                    className="rounded-lg h-20 font-semibold shadow-lg border-0 bg-gray-100 hover:cursor-pointer"
                >
                    Hasil Akhir
                </Button>
            </div>
        </aside>
    )
}
export default AsideTeacher