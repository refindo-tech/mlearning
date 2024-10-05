'use client'
import { useRouter } from "next/navigation"
import Loading from "@/app/loading"
import Background from "@/components/Background"
import AsideCourse from '@/components/AsideCourse'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AudioPlayer from "@/components/AudioPlayer"
import YoutubeVideo from "@/components/YoutubeVideo"
import DisplayImageComponent from "@/components/DisplayImageComponent"
import { Button, Image, RadioGroup, Radio } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { detailMateri, listStasiun, getAbsensiByIdSiswa, addAbsen } from "@/backend/fetchAPI"
import { usePathname } from "next/navigation"
import "quill/dist/quill.snow.css";
const Stasiun = () => {
    const router = useRouter()
    const path = usePathname()
    const [hasAbsen, setHasAbsen] = useState(false)
    const [dataListStasiun, setDataListStasiun] = useState(null)
    const [dataAbsensi, setDataAbsensi] = useState(null)
    const [dataMateri, setDataMateri] = useState(null)
    const stasiun = path.split('/')[3]
    useEffect(() => {
        const isCompleted = () => {
            if (dataAbsensi) {
                // Pencocokan stasiun dengan decodeURIComponent dan status 'SUDAH'
                const data = dataAbsensi.find(item => item.stasiun === decodeURIComponent(stasiun) && item.status === 'SUDAH');
                if (data) {
                    setHasAbsen(true);
                }
            }
        };
        isCompleted();
    }, [dataAbsensi, stasiun]);
    useEffect(() => {
        const idmapel = path.split('/')[2]
        const stasiun = path.split('/')[3]
        const payloadDetailMateri = {
            idmapel: idmapel,
            stasiun: stasiun
        }
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
            }
            const payload = {
                idmapel: idmapel
            }
            const responseAbsensi = await getAbsensiByIdSiswa(payload)
            if (responseAbsensi.status) {
                setDataAbsensi(responseAbsensi.data)
            } else {
                router.push('/onboarding')
            }
            const responseDetailMateri = await detailMateri(payloadDetailMateri)
            if (responseDetailMateri) {
                if (!responseDetailMateri.data) {
                    const newPath = path.replace(`${stasiun}`, '')
                    router.push(`${newPath}`)
                }
                setDataMateri(responseDetailMateri.data)
            }
        }
        fetchAPI()
    }, [path, router])
    const handleNextStep = () => {
        router.push(`${path}/discussion`)
    }
    const handleBack = () => {
        const newPath = path.replace(`${stasiun}`, '')
        router.push(newPath)
    }
    const submitAbsen = async () => {
        const idmapel = path.split('/')[2]
        const stasiun = path.split('/')[3]
        const payload = {
            idmapel,
            stasiun,
            idmateri:parseInt(dataMateri.id)
        }
        const response = await addAbsen(payload)
        if (response) {
            setHasAbsen(true)
        }
    }
    if (!dataMateri) {
        return (<Loading />)
    }
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row">
                <aside className="hidden lg:block w-full lg:w-[15%]">
                    <AsideCourse
                        listStasiun={dataListStasiun}
                        absen={dataAbsensi}
                    />
                </aside>
                <div className="lg:w-[85%] w-full lg:border-l-2 lg:border-gray-200">
                    <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                            <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                                <button
                                    onClick={handleBack}
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
                                    {dataMateri &&
                                        <h1 className="font-bold text-xl lg:text-3xl">{dataMateri.topic}</h1>
                                    }
                                    {dataMateri &&
                                        <h3 className="font-normal text-xs lg:text-lg">{`Materi ${dataMateri.stasiun}`}</h3>
                                    }
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
                    <div className="relative w-full min-h-screen">
                        <Background />
                        <div className="relative top-0 w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
                            <h3 className="font-semibold text-xl">Simak materi berikut ini!</h3>
                            <div className="flex flex-col gap-5">
                                {dataMateri &&
                                    <div className="bg-sekunder-300 p-2 lg:p-3 rounded-lg text-justify">
                                        <div className="ql-editor" dangerouslySetInnerHTML={{__html:dataMateri.detailmateri}}/>
                                        <div className="flex flex-col justify-center items-center">
                                            {dataMateri.urlaudio && <AudioPlayer url={`${dataMateri.urlaudio}`} />}
                                            {dataMateri.urlimage && <DisplayImageComponent url={`${dataMateri.urlimage}`} />}
                                            {dataMateri.urlvideo && <YoutubeVideo urlvideo={dataMateri.urlvideo} />}
                                        </div>
                                    </div>
                                }
                                <div className="flex flex-col gap-5 items-end">
                                    {/* <h5 className="font-semibold">Unduh Materi</h5> */}
                                    <Button
                                        onPress={() => {
                                            if (hasAbsen) {
                                                handleNextStep()
                                            } else {
                                                submitAbsen()
                                            }
                                        }}
                                        size="sm"
                                        className="bg-primer-500 text-white h-10 w-[200px] flex text-md items-center text-center rounded"
                                    >
                                        Lanjut Belajar
                                    </Button>
                                    <RadioGroup
                                        color="success"
                                        value={`${hasAbsen}`}
                                        isDisabled={hasAbsen ? true : false}
                                        isReadOnly
                                    >
                                        <Radio value="true">Sudah Selesai</Radio>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Stasiun