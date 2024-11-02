'use client'
import dynamic from "next/dynamic"
import Loading from "@/app/loading.jsx"
// import Navbar from "@/components/Navbar"
const Navbar = dynamic(
    ()=>import('@/components/Navbar'),
    {ssr:false}
)
import Footer from "@/components/Footer"
import Background from "@/components/Background"
import { Button, Image, Link } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { detailMateri, listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI.js"
import "quill/dist/quill.snow.css";

// Lazy load AsideCourse only for large screens
const AsideCourse = dynamic(() => import('@/components/AsideCourse'), { ssr: false })

const CourseHomePage = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isLoad, setIsLoad] = useState(true)
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState([])
    const [detailMapel, setDetailMapel] = useState(null)

    useEffect(() => {
        const tokensiswa = sessionStorage.getItem('tokensiswa')
        if (!tokensiswa) {
            router.push('/login')
        }
    }, [router])

    const findFirstIncompleteStasiun = () => {
        return dataListStasiun.find(stasiun =>
            !dataAbsensi.find(absen => absen.stasiun === stasiun.stasiun && absen.status === "SUDAH")
        )
    }
    
    const selectedStasiun = findFirstIncompleteStasiun()
    
    const handleUrl = (value) => {
        return value 
            ? `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/${value.stasiun}`
            : `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/result`
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoad(true)

                // Fetch list stasiun
                const listResponse = await listStasiun({ idmatapelajaran: idmapel })
                if (listResponse) {
                    setDataListStasiun(listResponse.data)
                }

                // Fetch absensi
                const absensiResponse = await getAbsensiByIdSiswa({ idmapel })
                if (absensiResponse.status) {
                    setDataAbsensi(absensiResponse.data)
                } else {
                    router.push('/onboarding')
                }

                // Fetch detail materi
                const detailResponse = await detailMateri({ idmapel })
                if (detailResponse) {
                    if (!detailResponse.data) {
                        router.push('/dashboard')
                    }
                    setDetailMapel(detailResponse.data)
                }

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setIsLoad(false)
            }
        }

        fetchData()
    }, [idmapel, router])

    if (isLoad) {
        return (<Loading />)
    }

    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row">
                {dataListStasiun.length > 0 && (
                    <AsideCourse
                        listStasiun={dataListStasiun}
                        absen={dataAbsensi}
                    />
                )}
                <div className="lg:w-[85%] w-full border-l-2 border-gray-200">
                    <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                            <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                                <button
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/50 cursor-default text-black/50"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <Link
                                    href={handleUrl(selectedStasiun)}
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-black"
                                >
                                    <ChevronRight size={32} />
                                </Link>
                            </div>
                            <div className="flex flex-row items-end justify-between">
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    {detailMapel.MataPelajaran?.name && <h1 className="font-bold text-xl lg:text-3xl">{detailMapel.MataPelajaran.name}</h1>}
                                    {detailMapel.MataPelajaran?.kelas && <h3 className="font-normal text-xs lg:text-lg">{detailMapel.MataPelajaran.kelas}</h3>}
                                </div>
                                <Image
                                    alt="icon-card"
                                    src="/assets/image/openedbooksm.png"
                                    className="block lg:hidden"
                                />
                            </div>
                        </div>
                        <div className="hidden lg:block absolute bottom-0 right-0 h-[200px] w-[250px] bg-[url('/assets/image/openedbook.png')] bg-no-repeat bg-cover bg-center">
                        </div>
                    </div>
                    <div className="relative w-full hidden lg:block min-h-screen">
                        <Background />
                        <div className="relative top-0 w-[90%] hidden lg:flex flex-col gap-5 mx-auto py-10 z-10">
                            {detailMapel?.MataPelajaran?.description &&
                                (<div className="ql-editor" dangerouslySetInnerHTML={{__html: detailMapel.MataPelajaran.description}}/>)}
                            <div className="flex justify-end">
                                <Button
                                    as={Link}
                                    href={handleUrl(selectedStasiun)}
                                    size="sm"
                                    className="bg-primer-500 text-white h-10 w-[200px] text-center rounded"
                                >
                                    Mulai Belajar
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full min-h-screen block lg:hidden">
                        <div className="ql-editor" dangerouslySetInnerHTML={{__html: detailMapel?.MataPelajaran?.description}} />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default CourseHomePage
