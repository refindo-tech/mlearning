'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import Navbar from "@/components/Navbar"
import AsideCourse from "@/components/AsideCourse"
import Footer from "@/components/Footer"
import Comments from '@/components/Comments'
import AudioPlayer from "@/components/AudioPlayer"
import YoutubeVideo from "@/components/YoutubeVideo"
import DisplayImageComponent from '@/components/DisplayImageComponent'
import { Button, Image } from "@nextui-org/react"
import { detailDiskusi, listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
const Discussion = () => {
    const router = useRouter()
    const path = usePathname()
    const idmapel = path.split('/')[2]
    const stasiun = path.split('/')[3]
    const [dataDiskusi, setDataDiskusi] = useState(null)
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState([])
    // const handleStasiunDiskusi = (value) =>{
    //     setStasiunDiskusi(value)
    // }
    // useEffect(()=>{
    //     console.log(idmapel, stasiun)
    // },[idmapel, stasiun])
    useEffect(() => {
        const idmapel = path.split('/')[2]
        const stasiun = path.split('/')[3]
        const payloadDetailDiskusi = {
            idmapel: idmapel,
            stasiun: stasiun
        }
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
            }
            const payload = { idmapel: idmapel }
            const responseAbsensi = await getAbsensiByIdSiswa(payload)
            if (responseAbsensi.status) {
                setDataAbsensi(responseAbsensi.data)
            } else {
                router.push('/onboarding')
            }
            const responseDetailDiskusi = await detailDiskusi(payloadDetailDiskusi)
            if (!responseDetailDiskusi.data) {
                router.push('exam')
            }
            setDataDiskusi(responseDetailDiskusi.data)
        }
        fetchAPI()
    }, [path, router])
    if (!dataDiskusi) {
        return (<Loading />)
    }
    const handleNextStep = () => {
        router.push('exam')
    }
    const handlePreviousStep = () => {
        const newPath = path.replace('/discussion', '');
        router.push(newPath)
    }
    return (
        <>{dataDiskusi &&
            <>
                <Navbar />
                <div className="w-full min-h-screen flex fllex-row">
                    <aside className="hidden lg:block w-full lg:w-[15%]">
                        <AsideCourse
                            listStasiun={dataListStasiun}
                            absen={dataAbsensi}
                        />
                    </aside>
                    <div className="lg:w-[85%] w-full border-l-2 border-gray-200">
                        <div className="h-fit static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                            <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                                <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                                    <button
                                        onClick={handlePreviousStep}
                                        className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                    <button
                                        onClick={handleNextStep}
                                        className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                </div>
                                <div className="flex flex-row items-end justify-between">
                                    <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                        {dataDiskusi &&
                                            <h1 className="font-bold text-xl lg:text-3xl">{dataDiskusi.topic}</h1>
                                        }
                                    </div>
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/openedbooksm.png"
                                        className="block lg:hidden"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full min-h-screen">
                            <Background />
                            <div className="relative top-0 w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
                                <h3 className="font-semibold text-xl">Simak materi berikut ini!</h3>
                                <div className="flex flex-col gap-5">
                                    {dataDiskusi &&
                                        <div className="bg-sekunder-300 text-justify p-3 rounded-lg">
                                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: dataDiskusi.question }}></div>
                                            <div className="flex flex-col justify-center items-center">
                                                {dataDiskusi.urlaudio && <AudioPlayer url={`${dataDiskusi.urlaudio}`} />}
                                                {dataDiskusi.urlimage && <DisplayImageComponent url={`${dataDiskusi.urlimage}`} />}
                                                {dataDiskusi.urlvideo && <YoutubeVideo urlvideo={dataDiskusi.urlvideo} />}
                                            </div>
                                        </div>
                                    }
                                    <div className="flex justify-end">
                                        <Button
                                            onPress={handleNextStep}
                                            size="sm"
                                            className="bg-primer-500 text-white h-10 w-[200px] flex text-md items-center text-center rounded"
                                        >
                                            Lanjut Belajar
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full min-h-screen flex flex-col gap-4">
                                    <h3 className="font-semibold text-xl">Portal Diskusi</h3>
                                    {/* <div className="border-2 border-gray-200 rounded-lg flex-grow bg-white">
                                </div> */}
                                    <Comments idDiskusi={dataDiskusi.id} />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </>
        }
        </>
    )
}
export default Discussion