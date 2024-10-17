'use client'
import { usePathname, useRouter } from "next/navigation"
import Loading from '@/app/loading.jsx'
import { useState, useEffect } from "react"
import { ChevronsLeft } from "lucide-react"
// import { listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI.js"
import { Button, Link } from "@nextui-org/react"
const AsideCourse = ({ listStasiun, absen }) => {
    const [isShow, setIsShow] = useState(false)
    const handleButtonClick = () => {
        setIsShow(!isShow)
    }
    return (
        <>
            <button
                onClick={() => handleButtonClick()}
                className='fixed right-0 bottom-5 w-[50px] h-[50px] z-20 lg:hidden rounded-l-full bg-gray-200 flex justify-center items-center shadow-2xl text-gray-600'
            >
                <ChevronsLeft />
            </button>
            {isShow &&
                <div
                    className={`transition-transform duration-1000 ease-in-out transform ${isShow ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} z-20 w-full flex lg:hidden`}
                    style={{ position: 'fixed', right: 0, top: '80px', }}>
                    <div className='w-[50vw] bg-gray-500/50 h-screen' onClick={handleButtonClick}>
                    </div>
                    <div className='bg-white px-3 w-[50vw] h-screen overflow-y-scroll'>
                        <ParentStasiun
                            listStasiun={listStasiun}
                            absen={absen}
                        />
                    </div>
                </div>
            }
            <div className='hidden lg:block bg-white px-3 w-[15%]'>
                <ParentStasiun
                    listStasiun={listStasiun}
                    absen={absen}
                />
            </div>
        </>
    )
}
const ParentStasiun = ({ listStasiun, absen }) => {
    const router = useRouter()
    const [dataListStasiun, setDataListStasiun] = useState(null)
    const [dataAbsensi, setDataAbsensi] = useState(null)
    const [idMapel, setIdMapel] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const path = usePathname()
    const idmapel = path.split('/')[2]
    const handleUrl = (stasiun) => {
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}`
        return url + `/${stasiun}`
    }
    const handleResult = () => {
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
        <aside className="w-full py-10 flex flex-col items-center gap-7">
            <h3 className="font-semibold text-xl text-center">Materi Belajar</h3>
            <div className="w-[90%] flex flex-col gap-4">
                {dataListStasiun && dataListStasiun.map((item, index) => (
                    <Button
                        as={Link}
                        href={handleUrl(item.stasiun)}
                        variant="bordered"
                        className={`rounded-lg h-20 font-semibold shadow-lg border-0 hover:cursor-pointer ${isStasiunCompleted(item.stasiun) ? 'bg-primer-500 text-yellow-500' : 'bg-gray-100'}`}
                        key={index}
                    >
                        {item.stasiun.toUpperCase()}
                    </Button>
                ))}
                <Button
                    onPress={handleResult}
                    variant="bordered"
                    className="rounded-lg h-20 font-semibold shadow-lg border-0 bg-gray-100 hover:cursor-pointer mb-14"
                >
                    Hasil Akhir
                </Button>
            </div>
        </aside>
    )
}
export default AsideCourse