'use client'
import dynamic from "next/dynamic"
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import Footer from "@/components/Footer"
import Comments from '@/components/Comments'
import AudioPlayer from "@/components/AudioPlayer"
import YoutubeVideo from "@/components/YoutubeVideo"
import DisplayImageComponent from '@/components/DisplayImageComponent'
import { Button, Image } from "@nextui-org/react"
import { detailDiskusi, listStasiun, getAbsensiByIdSiswa, detailMateri } from "@/backend/fetchAPI"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

// Dynamic imports for components
const AsideCourse = dynamic(() => import('@/components/AsideCourse'), { ssr: false })
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })

const Discussion = () => {
    const router = useRouter()
    const path = usePathname()
    const idmapel = path.split('/')[2]
    const stasiun = decodeURIComponent(path.split('/')[3])

    const [dataDiskusi, setDataDiskusi] = useState(null)
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState([])
    const [detailMapel, setDetailMapel] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                // Fetch list of stations
                const responseStasiun = await listStasiun({ idmatapelajaran: idmapel })
                setDataListStasiun(responseStasiun?.data || [])

                // Fetch attendance data
                const responseAbsensi = await getAbsensiByIdSiswa({ idmapel })
                if (responseAbsensi.status) {
                    setDataAbsensi(responseAbsensi.data)
                } else {
                    router.push('/onboarding')
                }

                // Fetch discussion details
                const responseDetailDiskusi = await detailDiskusi({ idmapel, stasiun })
                if (!responseDetailDiskusi?.data) {
                    router.push('/exam')
                } else {
                    setDataDiskusi(responseDetailDiskusi.data)
                }

                // Fetch material details
                const responseDetailMateri = await detailMateri({ idmapel: parseInt(idmapel), stasiun })
                setDetailMapel(responseDetailMateri?.data || null)

            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchAPI()
    }, [idmapel, stasiun, router])

    if (loading) return <Loading />

    const handleNextStep = () => router.push('exam')
    const handlePreviousStep = () => {
        const newPath = path.replace('/discussion', '')
        router.push(newPath)
    }

    return (
        <>
            {dataDiskusi && (
                <>
                    <Navbar />
                    <div className="w-full min-h-screen flex flex-row">
                        <AsideCourse listStasiun={dataListStasiun} absen={dataAbsensi} />
                        <div className="lg:w-[85%] w-full border-l-2 border-gray-200">
                            <div className="h-fit static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                                <div className="lg:w-[90%] w-full h-full lg:h-fit mx-auto flex flex-col gap-7">
                                    <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex justify-between">
                                        <button onClick={handlePreviousStep} className="h-10 w-10 flex items-center justify-center rounded-full bg-white">
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button onClick={handleNextStep} className="h-10 w-10 flex items-center justify-center rounded-full bg-white">
                                            <ChevronRight size={32} />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                            <h1 className="font-bold text-xl lg:text-3xl">{dataDiskusi.topic}</h1>
                                        </div>
                                        <Image alt="icon-card" src="/assets/image/openedbooksm.png" className="block lg:hidden" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative w-full min-h-screen">
                                <Background />
                                <div className="relative w-[90%] mx-auto py-10 z-10 flex flex-col gap-5">
                                    <h3 className="font-semibold text-xl">Simak materi berikut ini!</h3>
                                    <div className="bg-sekunder-300 p-3 rounded-lg text-justify">
                                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: dataDiskusi.question }}></div>
                                        <div className="flex flex-col items-center">
                                            {dataDiskusi.urlaudio && <AudioPlayer url={dataDiskusi.urlaudio} />}
                                            {dataDiskusi.urlimage && <DisplayImageComponent url={dataDiskusi.urlimage} />}
                                            {dataDiskusi.urlvideo && <YoutubeVideo urlvideo={dataDiskusi.urlvideo} />}
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button onPress={handleNextStep} size="sm" className="bg-primer-500 text-white h-10 w-[200px]">
                                            Lanjut Belajar
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h3 className="font-semibold text-xl">Portal Diskusi</h3>
                                        {detailMapel && <Comments idmapel={idmapel} stasiun={stasiun} idmateri={detailMapel.id} />}
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Discussion
