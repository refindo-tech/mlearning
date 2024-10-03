'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import AudioPlayer from "@/components/AudioPlayer"
import DisplayImageComponent from "@/components/DisplayImageComponent"
import YoutubeVideo from "@/components/YoutubeVideo"
import Footer from "@/components/Footer"
import { Button, Image, Input } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import ModalAddExam from "@/components/ModalAddExam"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { detailMateri, listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI.js"
import AddMateri from '@/components/AddMateri'
import AddDiskusi from '@/components/AddDiskusi'
import AddExam from '@/components/AddExam'
import Icons from "@/components/Icons"
import "quill/dist/quill.snow.css";
const CourseHomePage = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isLoad, setIsLoad] = useState(true)
    const [context, setContext] = useState({
        materi: true,
        discussion: false,
        exam: false
    })
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [isInputActive, setIsInputActive] = useState(true)
    const [detailMapel, setDetailMapel] = useState(null)
    const [stasiun, setStasiun] = useState(null)
    const handleIsLoad = ()=>{
        setIsLoad(true)
    }
    const { AddIcon } = Icons
    const handleUrl = (value) => {
        if (value) {
            return `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/${value.stasiun}`
        } else {
            return `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/result`
        }
    }
    const handleChevronRight = () => {
        setContext((prevData) => {
            if (prevData.materi) {
                return { ...prevData, materi: false, discussion: true, exam: false }
            }
            if (prevData.discussion) {
                return { ...prevData, materi: false, discussion: false, exam: true }
            }
            if (prevData.exam) {
                return { ...prevData, materi: true, discussion: false, exam: false }
            }
        })
    }
    const handleChevronLeft = () => {
        setContext((prevData) => {
            if (prevData.materi) {
                return { ...prevData, materi: true, discussion: false, exam: false }
            }
            if (prevData.discussion) {
                return { ...prevData, materi: true, discussion: false, exam: false }
            }
            if (prevData.exam) {
                return { ...prevData, materi: false, discussion: true, exam: false }
            }
        })
    }
    useEffect(() => {
        console.log(context)
    }, [context])
    const handleStasiun = (value) => {
        setStasiun(value)
    }
    const handleActiveInputTopic = () => {
        setIsInputActive(!isInputActive)
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
                // setIsLoadStasiun(false)
            }
        }
        fetchAPI()
    }, [idmapel, router])
    useEffect(() => {
        const fetchAPI = async () => {
            let payload = {
                idmapel: idmapel
            }
            if (stasiun) {
                payload = {
                    idmapel: idmapel,
                    stasiun: stasiun
                }
            }
            const responseDetailMateri = await detailMateri(payload)
            if (responseDetailMateri) {
                console.log(responseDetailMateri)
                setIsLoad(false)
                setDetailMapel(responseDetailMateri.data)
            }
        }
        fetchAPI()
    }, [idmapel, stasiun])
    const resetMapel = ()=>{
        setDetailMapel(null)
    }
    if (isLoad) {
        return (<Loading />)
    }
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row overflow-x-hidden">
                <aside className="w-[15%]">
                    <AsideTeacher
                        listStasiun={dataListStasiun}
                        manage={'true'}
                        handleStasiun={handleStasiun}
                    />
                </aside>
                {context.materi &&
                    <AddMateri
                        detailMapel={detailMapel}
                        resetMapel={resetMapel}
                        handleActiveInputTopic={handleActiveInputTopic}
                        reloadStasiun={handleIsLoad}
                        isInputActive={isInputActive}
                        stasiun={stasiun}
                        handleChevronLeft={handleChevronLeft}
                        handleChevronRight={handleChevronRight}
                    />
                }
                {context.discussion &&
                    <AddDiskusi
                        detailMapel={detailMapel}
                        handleActiveInputTopic={handleActiveInputTopic}
                        isInputActive={isInputActive}
                        stasiun={stasiun}
                        handleChevronLeft={handleChevronLeft}
                        handleChevronRight={handleChevronRight}
                    />
                }
                {context.exam &&
                    <AddExam
                        detailMapel={detailMapel}
                        handleActiveInputTopic={handleActiveInputTopic}
                        isInputActive={isInputActive}
                        stasiun={stasiun}
                        handleChevronLeft={handleChevronLeft}
                        handleChevronRight={handleChevronRight}
                        // activeModalAddExam={activeModalAddExam}
                    />
                }
            </div>
        </>
    )
}
export default CourseHomePage