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
import { detailMateri, listStasiun, accessGuru } from "@/backend/fetchAPI.js"
import AddMateri from '@/components/AddMateri'
import AddDiskusi from '@/components/AddDiskusi'
import AddExam from '@/components/AddExam'
import ShowStasiunTeacher from '@/components/ShowStasiunTeacher'
import Icons from "@/components/Icons"
import "quill/dist/quill.snow.css";
const CourseHomePage = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const idmateri = path.split('/')[4]
    const [isLoad, setIsLoad] = useState(true)
    const [context, setContext] = useState({
        materi: true,
        discussion: false,
        exam: false
    })
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [isInputActive, setIsInputActive] = useState(true)
    const [detailMapel, setDetailMapel] = useState(null)
    const [stasiun, setStasiun] = useState(path.split('/')[5])
    const handleIsLoad = () => {
        setIsLoad(true)
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
        if (context.materi) {
            setIsLoad(true)
            router.push(`/courseguru/${idmapel}/manage`)
        }
        setContext((prevData) => {
            if (prevData.discussion) {
                return { ...prevData, materi: true, discussion: false, exam: false }
            }
            if (prevData.exam) {
                return { ...prevData, materi: false, discussion: true, exam: false }
            }
        })
    }
    const handleStasiun = (value) => {
        setIsLoad(true)
        const payload = {
            idmapel: idmapel,
            stasiun: value
        }
        const fetchAPI = async () => {
            const response = await detailMateri(payload)
            if (response) {
                if (response.data) {
                    const newUrl = path.replace(`/${idmateri}/${stasiun}`, `/${response.data.id}/${value}`)
                    router.push(newUrl)
                } else {
                    const newUrl = path.replace(`/${idmateri}/${stasiun}`, `/add/${value}`)
                    router.push(newUrl)
                }
            }
        }
        fetchAPI()
    }
    const handleActiveInputTopic = () => {
        setIsInputActive(!isInputActive)
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const responseVerify = await accessGuru()
            if (!responseVerify) {
                router.push('/onboarding')
            }
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
                if (responseDetailMateri.data.id !== parseInt(idmateri)) {
                    router.push('/onboarding')
                }
                setIsLoad(false)
                setDetailMapel(responseDetailMateri.data)
            }
        }
        fetchAPI()
    }, [idmapel, stasiun, idmateri, router])
    const resetMapel = () => {
        setDetailMapel(null)
    }
    const onShowStations = () => {
        console.log('ini stasiun')
    }
    if (isLoad) {
        return (<Loading />)
    }
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row overflow-x-hidden">
                <aside className="hidden lg:block lg:w-[15%]">
                    <AsideTeacher
                        listStasiun={dataListStasiun}
                        manage={'true'}
                        handleStasiun={handleStasiun}
                    />
                </aside>
                <ShowStasiunTeacher onShowStations={onShowStations} listStasiun={dataListStasiun} handleStasiun={handleStasiun} manage={'true'} />
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