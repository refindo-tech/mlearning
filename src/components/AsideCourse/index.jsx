'use client'
import { usePathname, useRouter } from "next/navigation"
import Loading from '@/app/loading.jsx'
import { useState, useEffect } from "react"
import { listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI.js"
import { Button, Link } from "@nextui-org/react"
const AsideCourse = ({listStasiun, absen}) => {
    const router = useRouter()
    const [dataListStasiun, setDataListStasiun] = useState(null)
    const [dataAbsensi, setDataAbsensi] = useState(null)
    const [idMapel, setIdMapel] =useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const path = usePathname()
    const idmapel = path.split('/')[2]
    // setIdMapel(path.split('/')[2])
    // useEffect(()=>{
    //     setIsLoaded(true)
    // },[])
    const handleUrl = (stasiun)=>{
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}`
        return url+`/${stasiun}`
    }
    const handleResult = ()=>{
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/result`
        router.push(url)
    }
    const isStasiunCompleted = (stasiun) => {
        const absensi = dataAbsensi.find(item => item.stasiun === stasiun && item.status === "SUDAH")
        return absensi !== undefined
    }
    useEffect(() => {
        if (listStasiun && absen) {
            setDataListStasiun(listStasiun);
            setDataAbsensi(absen);
        } 
    }, [listStasiun, absen])
    return (
        <aside className="w-full py-10 flex flex-col items-center border-r-2 border-gray-200 gap-7">
            <h3 className="font-semibold text-xl text-center">Materi Belajar</h3>
            <div className="w-[90%] flex flex-col gap-3">
                {dataListStasiun && dataListStasiun.map((item, index) => (
                    <Button
                        as={Link}
                        href={handleUrl(item.stasiun)}
                        variant="bordered"
                        className={`rounded-lg h-12 font-semibold ${isStasiunCompleted(item.stasiun) ? 'bg-primer-500 text-yellow-500' : ''}`}
                        key={index}
                    >
                        {item.stasiun.toUpperCase()}
                    </Button>
                ))}
                {/* <Button
                    variant="bordered"
                    className="rounded-lg h-12"
                >
                    Stasiun 1
                </Button>
                <Button
                    variant="bordered"
                    className="rounded-lg h-12"
                >
                    Stasiun 1
                </Button> */}
                <Button
                    onPress={handleResult}
                    variant="bordered"
                    className="rounded-lg h-12 font-semibold"
                >
                    Hasil Akhir
                </Button>
            </div>
        </aside>
    )
}
export default AsideCourse