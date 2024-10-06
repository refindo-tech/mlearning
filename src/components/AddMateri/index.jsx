'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ModalAddMateri from '@/components/ModalAddMateri'
import AudioPlayer from "@/components/AudioPlayer"
import DisplayImageComponent from "@/components/DisplayImageComponent"
import YoutubeVideo from "@/components/YoutubeVideo"
import Footer from "@/components/Footer"
import { Button, Image, Input } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { createMateri, updateDeskripsi, deleteMateri } from "@/backend/fetchAPI"
import "quill/dist/quill.snow.css";
import Icons from '../Icons'
import DownloadMateri from '@/components/DownloadMateri'
const AddMateri = (
    {
        detailMapel,
        resetMapel,
        reloadStasiun,
        handleActiveInputTopic,
        isInputActive,
        stasiun,
        handleChevronRight,
        handleChevronLeft,
    }
) => {
    const { AddIcon } = Icons
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const idmateri = path.split('/')[4]
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [topic, setTopic] = useState('')
    const [detailmateri, setDetailmateri] = useState(null)
    const [urlAudio, setUrlAudio] = useState(null)
    const [isActiveSubmit, setIsActiveSubmit] = useState(false)
    const handleIsActiveModal = () => {
        setIsActiveModal(!isActiveModal)
    }
    const handletopic = (value) => {
        setTopic(value)
    }
    useEffect(() => {
        setTopic('')
        setDetailmateri(null)
        setUrlAudio(null)
    }, [stasiun])
    const saveMateri = (materi, audio) => {
        if (materi && audio) {
            setDetailmateri(materi)
            setUrlAudio(audio)
        }
        if (materi) {
            setDetailmateri(materi)
        }
    }
    const resetDetailMateri = () => {
        setDetailmateri(null)
    }
    const hapusMateri = () => {
        const fetchAPI = async () => {
            const payload = {
                idmateri: detailMapel.id
            }
            const response = await deleteMateri(payload)
            if (response) {
                setDetailmateri(null)
                setTopic(null)
                reloadStasiun()
                const newUrl = path.replace(`/${idmateri}/${stasiun}`, '')
                router.push(newUrl)
            }
        }
        fetchAPI()
    }
    const submit = () => {
        setIsActiveSubmit(true)
        let payload = {
            idmapel: parseInt(idmapel),
            stasiun: decodeURIComponent(stasiun),
            detailMateri: detailmateri,
            topic: topic
        }
        if (urlAudio) {
            payload = {
                idmapel: parseInt(idmapel),
                stasiun: decodeURIComponent(stasiun),
                detailMateri: detailmateri,
                topic: topic,
                urlaudio: urlAudio
            }
        }
        const fetchAPI = async () => {
            const response = await createMateri(payload)
            if (response) {
                setIsActiveSubmit(false)
                if (response.data) {
                    const newUrl = path.replace(`/add/${stasiun}`, `/${response.data.id}/${decodeURIComponent(stasiun)}`)
                    router.push(newUrl)
                }
            }
        }
        fetchAPI()
    }
    return (
        <div className=" w-[85%] border-l-2 border-gray-200">
            <ModalAddMateri active={isActiveModal} inActiveModalExam={handleIsActiveModal} saveMateri={saveMateri} />
            <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                    {stasiun &&
                        <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                            <button
                                onClick={handleChevronLeft}
                                className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                onClick={handleChevronRight}
                                className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </div>
                    }
                    <div className="flex flex-row items-end justify-between">
                        {detailMapel ?
                            (
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    <h1 className="font-bold text-xl lg:text-3xl">{detailMapel.topic}</h1>
                                    {/* <h3 className="font-normal text-xs lg:text-lg">{detailMapel.stasiun.toUpperCase()}</h3> */}
                                </div>
                            ) :
                            (
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    <div
                                        className="flex items-center gap-1 h-10 w-fit border-3 border-dashed border-white rounded-lg px-2"
                                    >
                                        <input
                                            // variant="bordered"
                                            placeholder="Tambah judul"
                                            value={topic || ''}
                                            disabled={isInputActive ? true : false}
                                            className="w-[105px] text-white placeholder:text-white bg-transparent focus:outline-none"
                                            onChange={(e) => handletopic(e.target.value)}
                                        />
                                        <Button
                                            isIconOnly={true}
                                            variant="bordered"
                                            onPress={handleActiveInputTopic}
                                            className="h-5 w-5 border-0"
                                        >
                                            <AddIcon />
                                        </Button>
                                    </div>
                                    <h3 className="font-normal text-xs lg:text-lg">{decodeURIComponent(stasiun.toUpperCase())}</h3>
                                </div>
                            )
                        }
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
            <div className="relative min-h-screen">
                <Background />
                {detailMapel ?
                    (
                        <div className="relative top-0 w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
                            <h3 className="font-semibold text-xl">Simak materi berikut ini!</h3>
                            <div className="flex flex-col gap-5">
                                {detailMapel &&
                                    <div className="bg-sekunder-300 p-2 lg:p-3 rounded-lg text-justify">
                                        <div id="quill-content" className="ql-editor" dangerouslySetInnerHTML={{ __html: detailMapel.detailmateri }} />
                                        <div className="flex flex-col justify-center items-center">
                                            {detailMapel.urlaudio && <AudioPlayer url={`${detailMapel.urlaudio}`} />}
                                            {detailMapel.urlimage && <DisplayImageComponent url={`${detailMapel.urlimage}`} />}
                                            {detailMapel.urlvideo && <YoutubeVideo urlvideo={detailMapel.urlvideo} />}
                                        </div>
                                    </div>
                                }
                                <div className="flex flex-col justify-end gap-5">
                                    <div className="flex justify-end z-10">
                                        <DownloadMateri />
                                    </div>
                                    <div className="flex justify-end z-10">
                                        <button
                                            className="text-end w-[260px] bg-transparent font-semibold text-primer-300 outline-none border-0"
                                            onClick={hapusMateri}
                                        >
                                            <h3 className="hover:underline hover:underline-offset-4 focus:text-primer-500">Hapus Materi</h3>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {detailmateri ?
                                (
                                    <div className="w-[90%] mx-auto py-10 flex flex-col gap-5 z-10">
                                        <div className=" w-full p-5 rounded-lg bg-yellow-500 text-wrap">
                                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: detailmateri }} />
                                        </div>
                                        <div className="flex justify-end gap-5">
                                            <Button
                                                variant="bordered"
                                                radius="sm"
                                                className="w-[260px] bg-transparent border-0 text-primer-300 font-semibold ring-0 z-10"
                                                onPress={resetDetailMateri}
                                            >
                                                <h3>Hapus Materi</h3>
                                            </Button>
                                            <Button
                                                radius="sm"
                                                className="w-[260px] bg-primer-500 text-white font-semibold z-10"
                                                isDisabled={detailmateri && topic ? false : true}
                                                onPress={submit}
                                            >
                                                {isActiveSubmit ?
                                                    (<div className="loader"></div>) :
                                                    (<h3>Simpan</h3>)
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className="w-[90%] mx-auto py-10 flex flex-col gap-10">
                                        <Button
                                            variant="bordered"
                                            className="h-20 border-3 border-dashed border-primer-500 flex-row justify-center items-center font-semibold"
                                            onPress={handleIsActiveModal}
                                        >
                                            <h3>Tambah materi</h3>
                                            <div className="h-5 w-5 flex items-center justify-center text-primer-500">
                                                <AddIcon fill={'#110B63'} />
                                            </div>
                                        </Button>
                                        <div className="flex justify-end z-10">
                                            <Button
                                                radius="sm"
                                                isDisabled={detailmateri ? false : true}
                                                className="w-[260px] bg-primer-500 text-white font-semibold"
                                            >
                                                {isActiveSubmit ?
                                                    (<div className="loader"></div>) :
                                                    (<h3>Simpan</h3>)
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}
export default AddMateri