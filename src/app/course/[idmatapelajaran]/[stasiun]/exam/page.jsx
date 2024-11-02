"use client"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Loading from "@/app/loading.jsx"
import Background from "@/components/Background"

const AsideCourse = dynamic(() => import('@/components/AsideCourse'), { ssr: false })
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })
import Footer from "@/components/Footer"
import YoutubeVideo from '@/components/YoutubeVideo'
import AudioPlayer from '@/components/AudioPlayer'
import PGAnswer from '@/components/PGAnswer'
import EssayAnswer from '@/components/EssayAnswer'
import DisplayImageComponent from "@/components/DisplayImageComponent"
import { Button, Image } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { listQuestion, listExamAnswer, listStasiun, getAbsensiByIdSiswa, postAnswerQuestion } from "@/backend/fetchAPI.js"

const Exam = () => {
    const router = useRouter()
    const path = usePathname()
    const [topic, setTopic] = useState(null)
    const [otherData, setOtherData] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const [listQuestionExam, setListQuestionExam] = useState(null)
    const [isHasAnswer, setIsHasAnswer] = useState(false)
    const [answerQuestion, setAnswerQuestion] = useState([])
    const [answeredQuestion, setAnsweredQuestion] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState(null)
    const [dataListStasiun, setDataListStasiun] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const idmapel = path.split('/')[2]
            const stasiun = decodeURIComponent(path.split('/')[3])

            try {
                const response = await listStasiun({ idmatapelajaran: idmapel })
                if (response) setDataListStasiun(response.data)

                const responseAbsensi = await getAbsensiByIdSiswa({ idmapel })
                if (responseAbsensi.status) {
                    setDataAbsensi(responseAbsensi.data)
                } else {
                    router.push('/onboarding')
                    return
                }

                const responseListQuestion = await listQuestion({ idmapel, stasiun })
                if (responseListQuestion) {
                    if (responseListQuestion.message === 'Not Any Exam Relevant' || responseListQuestion.data?.listQuestion.length === 0) {
                        router.push(path.replace('/exam', ''))
                        return
                    }
                    setListQuestionExam(responseListQuestion.data.listQuestion)
                    setTopic(responseListQuestion.data.other.topic)
                    setOtherData(responseListQuestion.data.other)
                }
            } catch (error) {
                console.error("Failed to fetch data:", error)
            }
        }
        fetchAPI()
    }, [path, router])

    useEffect(() => {
        const verifyAnswers = async () => {
            if (otherData) {
                const { id, idmapel, stasiun } = otherData
                const response = await listExamAnswer({ idexam: id, idmapel, stasiun })
                if (response?.data.length) {
                    setAnsweredQuestion(response.data)
                    setIsHasAnswer(true)
                }
            }
        }
        verifyAnswers()
    }, [otherData])

    const handleSetAnswerQuestion = (index, value) => {
        setAnswerQuestion(prev => {
            const updatedAnswers = [...prev]
            updatedAnswers[index] = value
            return updatedAnswers
        })
    }

    const submitAnswer = async () => {
        setIsLoad(true)
        try {
            const { id, idmapel, stasiun } = otherData
            const response = await postAnswerQuestion({
                idexam: id,
                idmapel,
                stasiun,
                answer: answerQuestion
            })
            if (response) router.push(path.replace('/exam', ''))
        } catch (error) {
            console.error("Failed to submit answer:", error)
        } finally {
            setIsLoad(false)
        }
    }

    if (!listQuestionExam) return <Loading />

    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row">
                <AsideCourse listStasiun={dataListStasiun} absen={dataAbsensi} />
                <div className="lg:w-[85%] w-full lg:border-l-2 lg:border-gray-200">
                    <header className="py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] mx-auto flex flex-col gap-7">
                            <div className="flex justify-between">
                                <button onClick={() => router.push(path.replace('/exam', '/discussion'))} className="h-10 w-10 flex items-center justify-center rounded-full bg-white cursor-pointer">
                                    <ChevronLeft size={32} />
                                </button>
                                <button onClick={() => router.push(path.replace('/exam', ''))} className="h-10 w-10 flex items-center justify-center rounded-full bg-white hover:cursor-pointer">
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="text-white pl-[5vw] pb-2 lg:pl-0">
                                    {topic && <h1 className="font-bold text-xl lg:text-3xl">{topic}</h1>}
                                </div>
                                <Image alt="icon-card" src="/assets/image/openedbooksm.png" className="block lg:hidden" />
                            </div>
                        </div>
                    </header>
                    <main className="relative w-full min-h-screen">
                        <Background />
                        <section className="w-[90%] mx-auto py-10 z-10">
                            {listQuestionExam.map((item, index) => (
                                <div key={index} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] flex items-center justify-center text-xl font-bold text-white bg-primer-500 rounded-full">
                                            <h3>{index + 1}</h3>
                                        </div>
                                        <div className="w-full border-t-5 border-dashed border-primer-500"></div>
                                    </div>
                                    <div className="bg-sekunder-300 p-3 rounded-lg">
                                        <div className="indent-8" dangerouslySetInnerHTML={{ __html: item.text }} />
                                        <div className="flex justify-center items-center">
                                            {item.urlaudio && <AudioPlayer url={item.urlaudio} />}
                                            {item.urlimage && <DisplayImageComponent url={item.urlimage} />}
                                            {item.urlvideo && <YoutubeVideo urlvideo={item.urlvideo} />}
                                        </div>
                                    </div>
                                    {item.optionanswer ? (
                                        <PGAnswer
                                            answeredQuestion={answeredQuestion[index]}
                                            optionanswer={item.optionanswer}
                                            handleAnswerQuestion={(value) => handleSetAnswerQuestion(index, value)}
                                        />
                                    ) : (
                                        <EssayAnswer
                                            answeredQuestion={answeredQuestion[index]}
                                            handleAnswerQuestion={(value) => handleSetAnswerQuestion(index, value)}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end mt-4">
                                {!isHasAnswer &&
                                    <Button size="sm" onPress={submitAnswer} isDisabled={isLoad} className="bg-primer-500 text-white h-10 w-[200px]">
                                        {isLoad ? <div className="loader"></div> : <p>Kumpulkan</p>}
                                    </Button>
                                }
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Exam
