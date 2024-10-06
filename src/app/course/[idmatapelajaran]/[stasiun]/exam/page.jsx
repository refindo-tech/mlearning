'use client'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Loading from "@/app/loading.jsx"
import Background from "@/components/Background"
import AsideCourse from '@/components/AsideCourse'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import YoutubeVideo from '@/components/YoutubeVideo'
import AudioPlayer from '@/components/AudioPlayer'
import PGAnswer from '@/components/PGAnswer'
import EssayAnswer from '@/components/EssayAnswer'
import DisplayImageComponent from "@/components/DisplayImageComponent"
import { Button, Image, Checkbox } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { listQuestion, listExamAnswer, listStasiun, getAbsensiByIdSiswa, postAnswerQuestion } from "@/backend/fetchAPI.js"
import { useRouter } from "next/navigation"
const Exam = () => {
    const router = useRouter()
    const path = usePathname()
    const [topic, setTopic] = useState(null)
    const [otherData, setOtherData] = useState(null)
    const [isLoad,setIsLoad] = useState(false)
    const [listQuestionExam, setListQuestionExam] = useState(null)
    const [isHasAnswer, setIsHasAnswer] = useState(null)
    const [answerQuestion, setAnswerQuestion] = useState([])
    const [answeredQuestion, setAnsweredQuestion] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState(null)
    const [dataListStasiun, setDataListStasiun] = useState([])
    useEffect(() => {
        const idmapel = path.split('/')[2]
        const stasiun = path.split('/')[3]
        const payloadListQuestion = {
            idmapel: idmapel,
            stasiun: decodeURIComponent(stasiun)
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
            const responseListQuestion = await listQuestion(payloadListQuestion)
            if (responseListQuestion) {
                console.log(responseListQuestion)
                if (responseListQuestion.message === 'Not Any Exam Relevant') {
                    const newPath = path.replace('/exam', '')
                    router.push(newPath)
                }
                if (responseListQuestion.data) {
                    if (responseListQuestion.data.listQuestion.length === 0) {
                        const newPath = path.replace('/exam', '')
                        router.push(newPath)
                    } else {
                        setListQuestionExam(responseListQuestion.data.listQuestion)
                    }
                    setTopic(responseListQuestion.data.other.topic)
                    setOtherData(responseListQuestion.data.other)
                }
            }
        }
        fetchAPI()
    }, [path, router])
    const nextStep = () => {
        const newPath = path.replace('/exam', '')
        router.push(newPath)
    }
    const backStep = () => {
        const newPath = path.replace('/exam', '/discussion')
        router.push(newPath)
    }
    useEffect(() => {
        const verify = async () => {
            const payload = {
                idexam: otherData.id,
                idmapel: otherData.idmapel,
                stasiun: otherData.stasiun
            }
            const response = await listExamAnswer(payload)
            if (response) {
                if (response.data.length !== 0) {
                    console.log(response)
                    setAnsweredQuestion(response.data)
                    setIsHasAnswer(true)
                }
            }
        }
        if (otherData) {
            verify()
        }
    }, [otherData])
    const handleSetAnswerQuestion = (index, value) => {
        setAnswerQuestion(prevAnswerQuestion => {
            const updatedAnswers = [...prevAnswerQuestion];
            updatedAnswers[index] = value; // Ganti jawaban pada indeks soal dengan jawaban baru
            return updatedAnswers;
        })
    
    }
    const submitAnswer = async () => {
        setIsLoad(true)
        const payload = {
            idexam: otherData.id,
            idmapel: otherData.idmapel,
            stasiun: otherData.stasiun,
            answer: answerQuestion
        }
        const postData = await postAnswerQuestion(payload)
        if (postData) {
            setIsLoad(false)
            const newPath = path.replace('/exam', '')
            router.push(newPath)
        }
    }
    if (!listQuestionExam) {
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
                <div className="lg:w-[85%] w-full lg:border-l-2 lg:border-gray-200">
                    <div className="h-fit static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                            <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                                <button
                                    onClick={backStep}
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white cursor-pointer"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    onClick={nextStep}
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white hover:cursor-pointer"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                            <div className="flex flex-row items-end justify-between">
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    {topic && <h1 className="font-bold text-xl lg:text-3xl">{topic}</h1>}
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
                            {listQuestionExam?.map((item, index) => (
                                <div className="flex flex-col gap-3" key={index}>
                                    <div className="w-full flex flex-row gap-2 items-center">
                                        <div className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] flex items-center justify-center text-xl text-center font-bold text-white bg-primer-500 rounded-full">
                                            <h3>{index + 1}</h3>
                                        </div>
                                        <div className="w-full border-t-5 border-dashed border-primer-500"></div>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div className="bg-sekunder-300 text-justify p-3 rounded-lg">
                                            {/* {item.text} */}
                                            <div className="indent-8" dangerouslySetInnerHTML={{ __html: item.text }} />
                                            <div className="flex flex-col justify-center items-center">
                                                {item.urlaudio && <AudioPlayer url={`${item.urlaudio}`} />}
                                                {item.urlimage && <DisplayImageComponent url={`${item.urlimage}`} />}
                                                {item.urlvideo && <YoutubeVideo urlvideo={item.urlvideo} />}
                                            </div>
                                        </div>
                                    </div>
                                    {item.optionanswer ?
                                        (
                                            <>{answeredQuestion.length !== 0 ? (
                                                <PGAnswer
                                                    answeredQuestion={answeredQuestion[index]}
                                                    optionanswer={item.optionanswer}
                                                    handleAnswerQuestion={(value) => handleSetAnswerQuestion(index, value)}
                                                />
                                            ) : (
                                                <PGAnswer
                                                    optionanswer={item.optionanswer}
                                                    handleAnswerQuestion={(value) => handleSetAnswerQuestion(index, value)}
                                                />
                                            )}
                                            </>
                                        ) : (
                                            <>{answeredQuestion.length !== 0 ? (
                                                <EssayAnswer
                                                    answeredQuestion={answeredQuestion[index]}
                                                    handleAnswerQuestion={(value) => handleSetAnswerQuestion(index, value)}
                                                />
                                            ) : (
                                                <EssayAnswer
                                                    handleAnswerQuestion={(value) => handleSetAnswerQuestion(index, value)} />
                                            )}
                                            </>
                                        )
                                    }
                                </div>
                            ))}
                            <div className="flex justify-end">
                                {!isHasAnswer &&
                                    <Button
                                        size="sm"
                                        onPress={submitAnswer}
                                        isDisabled={isLoad?true:false}
                                        className="bg-primer-500 text-white h-10 w-[200px] flex text-md items-center text-center rounded"
                                    >
                                        {isLoad?
                                            (<div className="loader"></div>):
                                            (<p>Kumpulkan</p>)
                                        }
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Exam