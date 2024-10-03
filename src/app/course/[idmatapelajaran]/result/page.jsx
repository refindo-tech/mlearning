'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import AsideCourse from "@/components/AsideCourse"
import { Button, Image, Link } from "@nextui-org/react"
import { listStasiun, getAbsensiByIdSiswa, getResultSiswa, getDetailProfile, detailMateri } from '@/backend/fetchAPI.js'
import { ChevronRight, ChevronLeft } from 'lucide-react'
const ResultCoursePage = () => {
    const path = usePathname()
    const router = useRouter()
    const [isLoaded, setIsLoad] = useState(true)
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState([])
    const [detailMapel, setDetailMapel] = useState(null)
    const [dataResult, setDataResult] = useState(null)
    const [detailSiswa, setDetailSiswa] = useState(null)
    useEffect(() => {
        const idmapel = path.split('/')[2]
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
            }
            const payload = {
                idmapel: idmapel
            }
            const responseResult = await getResultSiswa(payload)
            if (responseResult) {
                setDataResult(responseResult.data)
            }
            const responseAbsensi = await getAbsensiByIdSiswa(payload)
            if (responseAbsensi.status) {
                setDataAbsensi(responseAbsensi.data)
                setIsLoad(false)
            }else{
                router.push('/onboarding')
            }
            const responseDetailProfile = await getDetailProfile()
            if (responseDetailProfile.status) {
                if (responseDetailProfile.data.siswa) {
                    setDetailSiswa(responseDetailProfile.data.siswa)
                }
            }else{
                router.push('/onboarding')
            }
            const responseDetailMapel = await detailMateri(payload)
            if(responseDetailMapel){
                console.log(responseDetailMapel)
                setDetailMapel(responseDetailMapel.data.MataPelajaran)
            }
        }
        fetchAPI()
    }, [path, router])
    useEffect(()=>{
        console.log(detailMapel)
    },[detailMapel])
    if (isLoaded) {
        return (<Loading />)
    }
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex fllex-row">
                <aside className="hidden lg:block w-full lg:w-[15%]">
                    <AsideCourse
                        listStasiun={dataListStasiun}
                        absen={dataAbsensi}
                    />
                </aside>
                <div className="lg:w-[85%] w-full">
                    <div className="h-fit static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                            <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                                <button
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                            <div className="flex flex-row items-end justify-between">
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    {detailMapel&&detailMapel.name&&<h1 className="font-bold text-xl lg:text-3xl">{detailMapel.name}</h1>}
                                    {detailMapel&&detailMapel.kelas&&<h2 className=" text-xl">{detailMapel.kelas}</h2>}
                                </div>
                                <Image
                                    alt="icon-card"
                                    src="/assets/image/openedbooksm.png"
                                    className="block lg:hidden"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full min-h-screen flex flex-col gap-4 py-10">
                        <Background />
                        <div className='relative w-[90%] mx-auto flex flex-col gap-4 z-10'>
                            <h1 className='text-xl font-bold'>Tentang Akun</h1>
                            {detailSiswa &&
                                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                    <div className='h-[100px] lg:h-[300px] flex flex-row items-center pl-5 lg:pl-10 gap-5 lg:gap-10 rounded-lg border-2 border-gray-200'>
                                        <div className='h-[32px] w-[32px] lg:h-[100px] lg:w-[100px] flex items-center justify-center rounded-full bg-accent-orange'>
                                            <Image
                                                alt="avatar"
                                                src="/assets/image/avatar.png"
                                                className="block h-[32px] w-[32px] lg:h-[88px] lg:w-[88px]"
                                            />
                                        </div>
                                        {detailSiswa.name ? (
                                            <h3 className='text-lg lg:text-2xl font-bold'>{detailSiswa.name}</h3>
                                        ) : (
                                            <h3 className='text-lg lg:text-2xl font-bold'>-</h3>
                                        )}
                                    </div>
                                    <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                                        <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                            <h3 className='text-lg font-bold'>NISN</h3>
                                            {detailSiswa.nisn ? (
                                                <p className='text-lg font-bold text-accent-orange'>{detailSiswa.nisn}</p>
                                            ) : (
                                                <p className='text-lg font-bold text-accent-orange'>-</p>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                            <h3 className='text-lg font-bold'>Kelas</h3>
                                            {detailSiswa.kelas ? (
                                                <p className='text-lg font-bold text-accent-orange'>{detailSiswa.kelas}</p>
                                            ) : (
                                                <p className='text-lg font-bold text-accent-orange'>-</p>
                                            )}
                                        </div>
                                        <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                            <h3 className='text-lg font-bold'>Mata Pelajaran</h3>
                                            {dataResult ? (
                                                <p className='text-lg font-bold text-accent-orange'>{dataResult.mapel.name}</p>
                                            ) : (
                                                <p className='text-lg font-bold text-accent-orange'>-</p>
                                            )}
                                        </div>
                                    </div>
                                </div>}
                        </div>
                        <div className='relative w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 z-10'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-xl font-bold'>Status Belajar</h1>
                                <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    {dataResult && dataResult?.exam.map((item, index) => (
                                        <div
                                            key={index}
                                            className='flex flex-col gap-1 w-[90%] mx-auto'
                                        >
                                            <h3 className='text-lg font-bold'>Nilai {item.stasiun}</h3>
                                            <p className='text-lg font-bold text-accent-green'>{item.nilai}</p>
                                        </div>
                                    ))}
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Kehadiran</h3>
                                        {dataResult.absen ? (
                                            <p className='text-lg font-bold text-accent-green'>{dataResult.absen}</p>
                                        ) : (
                                            <p className='text-lg font-bold text-accent-green'>-</p>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h1 className='text-xl font-bold'>Rata-rata nilai</h1>
                                    <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                        <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                            {/* <h3 className='text-lg font-bold'>Nilai stasiun 1</h3> */}
                                            {dataResult ? (
                                                <p className='text-lg font-bold text-accent-green'>{dataResult.mean}</p>
                                            ) : (
                                                <p className='text-lg font-bold text-accent-green'>-</p>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-xl font-bold'>Informasi Lainnya</h1>
                                <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    <h3 className="text-accent-green font-semibold text-lg lg:text-2xl py-3 text-center">Selamat</h3>
                                    <div className='h-[100px] w-[100px] lg:h-[250px] lg:w-[250px] bg-accent-green mx-auto rounded-full flex justify-center items-end'>
                                        <Image
                                            alt="greeting ranking"
                                            src="/assets/image/greeting rank.png"
                                            className="block h-[100px] w-[100px] lg:h-[250px] lg:w-[250px] rounded-full"
                                        />
                                    </div>
                                    <p className="text-gray-500 font-semibold text-center text-lg lg:text-xl">Peringkat kamu dalam kelas ini</p>
                                    <p className="text-accent-green font-semibold text-center text-lg lg:text-xl">{dataResult.rank}</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Button
                                    as={Link}
                                    href="/dashboard"
                                    size="sm"
                                    className="bg-primer-500 text-white h-10 w-fit flex text-md items-center text-center rounded"
                                >
                                    Kembali ke Halaman Utama
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default ResultCoursePage