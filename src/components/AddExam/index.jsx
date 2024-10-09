'use client'
import Background from "@/components/Background"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Loading from "@/app/loading.jsx"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import PGAnswer from '@/components/PGAnswer'
import EssayAnswer from '@/components/EssayAnswer'
import AudioPlayer from "@/components/AudioPlayer"
import DisplayImageComponent from "@/components/DisplayImageComponent"
import YoutubeVideo from "@/components/YoutubeVideo"
import ModalAddExam from "../ModalAddExam"
import Footer from "@/components/Footer"
import { Button, Image, Input } from "@nextui-org/react"
import { ChevronRight, ChevronLeft, Trash, Info } from 'lucide-react'
import { useState } from "react"
import Icons from '../Icons'
import { createExam, listQuestionTeacher, deleteExam } from "@/backend/fetchAPI"
const AddExam = (
    {
        detailMapel,
        // handleActiveInputTopic,
        // isInputActive,
        stasiun,
        handleChevronLeft,
        handleChevronRight
    }
) => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const { AddIcon } = Icons
    const [isLoad, setIsLoad] = useState(true)
    const [infoExam, setInfoExam] = useState(null)
    const [trashList, setTrashList] = useState(null)
    const [listQuestion, setListQuestion] = useState(null)
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
    const activeModalAddExam = (index) => {
        setActiveQuestionIndex(index); // Set index yang aktif
        setIsActiveModal(true)
    }
    const handleDeleteListQuestion = (index) => {
        setTrashList((prev)=>{
            let data
            if(prev){
                data = [...prev]
                data[index] = listQuestion[index]
            }else{
                data = [listQuestion[index]]
            }
            return data
        })
        setListQuestion((prev) => {
            const data = [...prev]
            data.splice(index, 1)
            return data
        })
    }
    const handleInActiveModalAddExam = () => {
        setIsActiveModal(false)
    }
    const handleEditListQuestion = (index, value) => {
        setListQuestion((prev) => {
            const data = [...prev]
            data[index] = value
            return data
        })
    }
    useEffect(()=>{
        const fetchAPI = async()=>{
            const payload = {
                idmapel:idmapel,
                stasiun:decodeURIComponent(stasiun)
            }
            const response = await listQuestionTeacher(payload)
            if(response){
                console.log(response)
                if(response.data){
                    setListQuestion(response.data.listQuestion)
                    setInfoExam(response.data.other)
                }else{
                    setListQuestion(null)
                }
            }
            setIsLoad(false)
        }
        fetchAPI()
    },[stasiun, idmapel])
    useEffect(() => {
        console.log(listQuestion)
    }, [listQuestion])
    const handleAddQuestion = () => {
        setListQuestion((prev) => {
            let data
            if(prev){
                    data = [...prev]
                    data[data.length] = {}
            }else{
                data = [{}]
            }
            return data
        })
    }
    const [topic, setTopic] = useState(null)
    const [isInputActive, setIsInputActive] = useState(true)
    const handletopic = (value) => {
        setTopic(value)
    }
    const handleActiveInputTopic = () => {
        setIsInputActive(!isInputActive)
    }
    const [submitActive, setSubmitActive] = useState(false)
    const submit = () => {
        setSubmitActive(true)
        let payload = {
            idmapel: parseInt(idmapel),
            stasiun: decodeURIComponent(stasiun),
            topic: topic,
            data: listQuestion
        }
        const fetchAPI = async () => {
            if(infoExam && trashList){
                const payload = {
                    idexam:infoExam.id
                }
                await deleteExam(payload)
            }
            if(listQuestion){
                const response = await createExam(payload)
                if (response) {
                    setSubmitActive(false)
                    window.location.reload()
                }
            }
        }
        fetchAPI()
    }
    if(isLoad){
        return(<div className="loader z-50"></div>)
    }
    return (
        <div className="w-full lg:w-[85%] border-l-2 border-gray-200">
            <div className="h-fit lg:h-[30vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
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
                    <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                        <div
                            className="flex items-center gap-1 h-10 w-fit border-3 border-dashed border-white rounded-lg px-2"
                        >
                            <input
                                // variant="bordered"
                                placeholder="Tambah judul"
                                defaultValue={infoExam?infoExam.topic : ''}
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
                </div>
            </div>
            <div className="relative min-h-screen">
                <Background />
                <div className="w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
                    {listQuestion?.map((item, index) => (
                        <div className="flex flex-col gap-3" key={index}>
                            <div className="w-full flex flex-row gap-2 items-center z-10">
                                <div className="h-[60px] w-[80px] aspect-square flex items-center justify-center text-xl font-bold text-white bg-primer-500 rounded-full">
                                    <h3>{index + 1}</h3>
                                </div>
                                <div className="w-full border-t-3 border-dashed border-primer-500"></div>
                                {item.text ?
                                    (
                                        <Button
                                            isIconOnly={true}
                                            radius="sm"
                                            className="bg-primer-500 w-[300px]"
                                            onPress={() => handleDeleteListQuestion(index)}
                                        >
                                            <div className="flex justify-center gap-2 text-white">
                                                <h3>Hapus Pertanyaan</h3>
                                                <div className="h-5 w-5 rounded bg-white flex justify-center items-center text-primer-500 font-semibold">
                                                    <p>-</p>
                                                </div>
                                            </div>
                                        </Button>
                                    ) :
                                    (
                                        <Button
                                            isIconOnly={true}
                                            radius="sm"
                                            className="bg-primer-500 w-[300px] p-4 lg:p-0"
                                            onPress={() => activeModalAddExam(index)}
                                        >
                                            <div className="flex items-center justify-center gap-2 text-white text-wrap">
                                                <h3>Tambah Pertanyaan</h3>
                                                <AddIcon />
                                            </div>
                                        </Button>
                                    )
                                }
                            </div>
                            {item.text &&
                                <div className="flex flex-col gap-5">
                                    <div className="bg-sekunder-300 text-justify p-3 rounded-lg">
                                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: item.text }} />
                                        <div className="flex flex-col justify-center items-center">
                                            {item.urlaudio && <AudioPlayer url={`${item.urlaudio}`} />}
                                            {item.urlimage && <DisplayImageComponent url={`${item.urlimage}`} />}
                                            {item.urlvideo && <YoutubeVideo urlvideo={item.urlvideo} />}
                                        </div>
                                    </div>
                                    {item.optionanswer ?
                                        (
                                            <PGAnswer optionanswer={item.optionanswer} />
                                        ) :
                                        (
                                            <EssayAnswer isDisabled={true} />
                                        )
                                    }
                                </div>
                            }
                            <ModalAddExam
                                index={activeQuestionIndex} // Pass the active index here
                                active={isActiveModal}
                                inActiveModalExam={handleInActiveModalAddExam}
                                handleAddListQuestion={handleEditListQuestion}
                            />
                        </div>
                    ))}
                    <div className="w-full py-10 flex flex-col gap-10">
                        <Button
                            variant="bordered"
                            className="h-20 border-3 border-dashed border-primer-500 flex-row justify-center items-center font-semibold z-10"
                            onPress={handleAddQuestion}
                        >
                            <h3>Tambah soal</h3>
                            <div className="h-5 w-5 flex items-center justify-center text-primer-500">
                                <AddIcon fill={'#110B63'} />
                            </div>
                        </Button>
                        <div className="flex justify-end">
                            <Button
                                radius="sm"
                                className="w-[260px] bg-primer-500 text-white font-semibold z-10"
                                onPress={submit}
                                isDisabled={submitActive ? true : false}
                            >
                                {submitActive ?
                                    (<div className="loader"></div>) :
                                    (<h3>Simpan</h3>)
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default AddExam