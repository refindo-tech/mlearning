'use client'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Loading from "@/app/loading.jsx"
import Background from "@/components/Background"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import YoutubeVideo from '@/components/YoutubeVideo'
import AudioPlayer from '@/components/AudioPlayer'
import PGAnswer from '@/components/PGAnswer'
import EssayAnswer from '@/components/EssayAnswer'
import DisplayImageComponent from "@/components/DisplayImageComponent"
import { Button, Image, Checkbox, Input } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { listQuestionTeacher, listExamAnswerKoreksi, listStasiun, postCorrectionExam } from "@/backend/fetchAPI.js"
import { useRouter } from "next/navigation"
const CorrectionExam = () => {
    const router = useRouter()
    const path = usePathname()
    const idmapel = path.split('/')[2]
    const stasiunFromPath = decodeURIComponent(path.split('/')[6])
    const idSiswaFromPath = parseInt(path.split('/')[5])
    const [error, setError] = useState(null)
    const [isLoad, setIsLoad] = useState(true)
    const [topic, setTopic] = useState(null)
    const [otherData, setOtherData] = useState(null)
    const [nilai, setNilai] = useState([])
    const [listQuestionExam, setListQuestionExam] = useState(null)
    const [answeredQuestion, setAnsweredQuestion] = useState([])
    const [dataListStasiun, setDataListStasiun] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
            let payloadListQuestion = {
                idmapel: idmapel,
                stasiun: stasiunFromPath
            }
            const responseListQuestion = await listQuestionTeacher(payloadListQuestion)
            if (responseListQuestion) {
                if (responseListQuestion.message === 'Not Any Exam Relevant') {
                    setError(`Not any exam in ${stasiunFromPath}`)
                }
                if (responseListQuestion.data) {
                    if (responseListQuestion.data.listQuestion.length !== 0) {
                        setListQuestionExam(responseListQuestion.data.listQuestion)
                    }
                    setTopic(responseListQuestion.data.other.MataPelajaran.Materi[0].topic)
                    setOtherData(responseListQuestion.data.other)
                }
            }
        }
        fetchAPI()
    }, [idmapel, stasiunFromPath, path, router])
    useEffect(() => {
        const idmapel = path.split('/')[2]
        // const stasiun = "stasiun 2"
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setIsLoad(false)
                setDataListStasiun(response.data)
            }
        }
        fetchAPI()
    }, [path])
    const handleStasiun = (value) => {
        const currentUrlSegment = `/${idSiswaFromPath}/${encodeURI(stasiunFromPath)}`;
        const newUrlSegment = `/${idSiswaFromPath}/${value}`;
        const newUrl = path.replace(`${currentUrlSegment}`, `${newUrlSegment}`)
        router.push(`${newUrl}`)
    }
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
            let payload = {
                idmapel: parseInt(idmapel),
                idsiswa: parseInt(idSiswaFromPath),
                stasiun: stasiunFromPath
            }
            const response = await listExamAnswerKoreksi(payload)
            if (response) {
                if (response.data.length !== 0) {
                    setAnsweredQuestion(response.data)
                }
            }
        }
        if (otherData) {
            verify()
        }
    }, [otherData, idmapel, idSiswaFromPath, stasiunFromPath])
    const handleSetNilai = (index, value) => {
        setNilai(prevNilai => {
            const updateNilai = [...prevNilai];
            updateNilai[index] = value; // Ganti jawaban pada indeks soal dengan jawaban baru
            return updateNilai;
        })
    }
    const submitNilai = async () => {
        const payload = {
            idmapel: parseInt(idmapel),
            idsiswa: idSiswaFromPath,
            stasiun: stasiunFromPath,
            nilai: nilai
        }
        const postData = await postCorrectionExam(payload)
        if (postData) {
            const nowUrlSegment = `/${idSiswaFromPath}/${encodeURI(stasiunFromPath)}`
            const newPath = path.replace(`${nowUrlSegment}`, '')
            router.push(newPath)
        }
    }
    if (isLoad) {
        return (<Loading />)
    }
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex fllex-row">
                <aside className="hidden lg:block w-full lg:w-[15%]">
                    {dataListStasiun.length !== 0 &&
                        <AsideTeacher
                            listStasiun={dataListStasiun}
                            handleStasiun={handleStasiun}
                        />
                    }
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
                    <div className="relative w-full">
                        <Background />
                        {error ? (
                            <div className="w-full min-h-[50vh] flex items-center justify-center font-semibold text-lg">
                                <h1>{error}</h1>
                            </div>
                        )
                            : (<div className="relative top-0 w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
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
                                                <div className="flex flex-row gap-3 justify-between">
                                                    {answeredQuestion ? (
                                                        < PGAnswer
                                                            answeredQuestion={answeredQuestion[index]}
                                                            optionanswer={item.optionanswer}
                                                        />
                                                    ) : (
                                                        < PGAnswer
                                                            optionanswer={item.optionanswer}
                                                        />
                                                    )}
                                                    <ValueColumn handleSetNilai={(value) => handleSetNilai(index, value)} />
                                                </div>
                                            ) :
                                            (
                                                <div className="flex flex-row gap-3 justify-between">
                                                    {answeredQuestion ? (
                                                        <EssayAnswer
                                                            answeredQuestion={answeredQuestion[index]}
                                                        />
                                                    ) : (
                                                        <EssayAnswer
                                                        />
                                                    )}
                                                    <ValueColumn handleSetNilai={(value) => handleSetNilai(index, value)} />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    {listQuestionExam &&
                                        <Button
                                            size="sm"
                                            onPress={submitNilai}
                                            className="bg-primer-500 text-white h-10 w-[200px] flex text-md items-center text-center rounded"
                                        >
                                            Simpan
                                        </Button>
                                    }
                                </div>
                            </div>)}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default CorrectionExam
const ValueColumn = ({ handleSetNilai }) => {
    return (
        <div className="flex flex-col gap-3 items-end">
            <h3 className="font-semibold text-base">Beri nilai</h3>
            <Input
                radius="sm"
                variant="bordered"
                placeholder="Masukkan nilai"
                onValueChange={(value) => {
                    handleSetNilai(parseInt(value))
                }}
                type="number"
            />
        </div>
    )
}