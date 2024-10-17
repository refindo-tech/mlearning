'use client'
import Background from "@/components/Background"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Loading from "@/app/loading.jsx"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import AudioPlayer from "@/components/AudioPlayer"
import DisplayImageComponent from "@/components/DisplayImageComponent"
import YoutubeVideo from "@/components/YoutubeVideo"
import Footer from "@/components/Footer"
import { Button, Image, Input } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Icons from '../Icons'
import ModalAddDiskusi from '@/components/ModalAddDiskusi'
import { createDiskusi, detailDiskusi } from "@/backend/fetchAPI"
import "quill/dist/quill.snow.css";
import Comments from "@/components/Comments"
const AddDiskusi = (
    {
        detailMapel,
        // handleActiveInputTopic,
        // isInputActive
        stasiun,
        handleChevronLeft,
        handleChevronRight
    }) => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const idmateri = path.split('/')[4]
    const { AddIcon } = Icons
    const [dataDiskusi, setDataDiskusi] = useState(null)
    const [contentIsLoad, setContentIsLoad] = useState(true)
    useEffect(() => {
        const payload = {
            idmapel: parseInt(idmapel),
            stasiun: decodeURIComponent(stasiun)
        }
        const fetchAPI = async () => {
            const response = await detailDiskusi(payload)
            if (response) {
                setContentIsLoad(false)
                setDataDiskusi(response.data)
            }
        }
        fetchAPI()
    }, [idmapel, stasiun])
    const [topic, setTopic] = useState(null)
    const [isInputActive, setIsInputActive] = useState(true)
    const handletopic = (value) => {
        setTopic(value)
    }
    const handleActiveInputTopic = () => {
        setIsInputActive(!isInputActive)
    }
    const [isActiveModal, setIsActiveModal] = useState(false)
    const handleIsActiveModal = () => {
        setIsActiveModal(!isActiveModal)
    }
    const [tempDiskusi, setTempDiskusi] = useState(null)
    const resetDiskusi = () => {
        setTempDiskusi(dataDiskusi)
        setDataDiskusi(null)
    }
    const [isDiskusi, setIsDiskusi] = useState(null)
    const [urlAudio, setUrlAudio] = useState(null)
    const handleDiskusi = (value, url) => {
        setIsDiskusi(value),
            setUrlAudio(url)
    }
    const [isSubmit, setIsSubmit] = useState(false)
    const submitDiskusi = () => {
        setIsSubmit(true)
        const payload = {
            stasiun: decodeURIComponent(stasiun),
            idmapel: parseInt(idmapel),
            question: isDiskusi,
            topic: topic
        }
        const fetchAPI = async () => {
            const response = await createDiskusi(payload)
            if (response) {
                setIsSubmit(false)
                window.location.reload()
            }
        }
        fetchAPI()
    }
    if (contentIsLoad) {
        return (<div className="loader"></div>)
    }
    return (
        <div className="w-full lg:w-[85%] border-l-2 border-gray-200">
            <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
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
                    <div className="flex flex-row items-end justify-between">
                        {dataDiskusi ?
                            (
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    <h1 className="font-bold text-3xl">{dataDiskusi.topic}</h1>
                                    <h3 className="font-normal text-lg">{decodeURIComponent(stasiun.toUpperCase())}</h3>
                                </div>
                            ) :
                            (
                                <div className="flex flex-col gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    <div
                                        className="flex items-center gap-1 h-10 w-fit border-3 border-dashed border-white rounded-lg px-2"
                                    >
                                        <input
                                            placeholder="Tambah judul"
                                            disabled={isInputActive ? true : false}
                                            onChange={(e) => handletopic(e.target.value)}
                                            className="w-[105px] text-white placeholder:text-white bg-transparent focus:outline-none"
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
            <div className="relative min-h-screen py-10">
                <Background />
                {dataDiskusi ?
                    (
                        <div className="flex flex-col gap-5 z-10">
                            <div className="w-[90%] mx-auto flex flex-col gap-5 z-10">
                                <h3 className="font-semibold text-lg">Simak materi berikut ini!</h3>
                                <div className=" rounded-lg bg-yellow-500">
                                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: dataDiskusi.question }} />
                                </div>
                                <div className="flex justify-end gap-5">
                                    <Button
                                        variant="bordered"
                                        radius="sm"
                                        onPress={resetDiskusi}
                                        className="w-[260px] text-primer-300 font-semibold border-0 outline-none"
                                    >
                                        Hapus
                                    </Button>
                                    <Button
                                        radius="sm"
                                        className="w-[260px] bg-primer-500 text-white font-semibold"
                                        // isDisabled={isDiskusi ? false : true}
                                        onPress={submitDiskusi}
                                    >
                                        <h3>Simpan</h3>
                                    </Button>
                                </div>
                                <h3 className="font-semibold text-lg">Portal Diskusi</h3>
                                {detailMapel && <Comments idmapel={idmapel} stasiun={decodeURIComponent(stasiun)} idmateri={idmateri} />}
                            </div>
                        </div>
                    ) :
                    (
                        <>
                            {isDiskusi ?
                                (
                                    <div className="flex flex-col gap-5">
                                        <h3 className="font-semibold text-lg w-[90%] mx-auto">Simak materi berikut ini!</h3>
                                        <div className="w-[90%] mx-auto rounded-lg bg-yellow-500 z-10">
                                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: isDiskusi }}></div>
                                        </div>
                                        <div className="flex justify-end w-[90%] mx-auto z-10">
                                            <Button
                                                radius="sm"
                                                className="w-[260px] bg-primer-500 text-white font-semibold"
                                                isDisabled={topic && isDiskusi ? false : true}
                                                onPress={submitDiskusi}
                                            >
                                                {isSubmit ?
                                                    (
                                                        <div className="loader"></div>
                                                    ) :
                                                    (
                                                        <h3>Simpan</h3>
                                                    )
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
                                                className="w-[260px] bg-primer-500 text-white font-semibold"
                                                // isDisabled={isDiskusi ? false : true}
                                                onPress={submitDiskusi}
                                            >
                                                <h3>Simpan</h3>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )
                }
                <ModalAddDiskusi active={isActiveModal} inActiveModalExam={handleIsActiveModal} handleDiskusi={handleDiskusi} />
            </div>
            <Footer />
        </div>
    )
}
export default AddDiskusi
