'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import { Button, Image, Input } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { detailMateri, listStasiun, updateDeskripsi } from "@/backend/fetchAPI.js"
import ModalAddDescription from "@/components/ModalAddDescription"
import Icons from "@/components/Icons"
import "quill/dist/quill.snow.css";
const CourseHomePage = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isActiveDesc, setIsActiveDesc] = useState(false)
    const [isSubmitDesc, setIsSubmitDesc] = useState(false)
    const [isLoad, setIsLoad] = useState(true)
    const [context, setContext] = useState({
        materi: true,
        discussion: false,
        exam: false
    })
    const saveDesc = (materi, audio) => {
        if (materi && audio) {
            setDescMapel(materi)
            setUrlAudio(audio)
            setIsHasUpdateDesc(true)
        }
        if (materi) {
            setIsHasUpdateDesc(true)
            setDescMapel(materi)
        }
    }
    const submitDesc = () => {
        setIsSubmitDesc(true)
        const payload = {
            idmapel: parseInt(idmapel),
            description: descMapel
        }
        const fetchAPI = async () => {
            const response = await updateDeskripsi(payload)
            if (response) {
                setIsHasUpdateDesc(false)
                setIsSubmitDesc(false)
                window.location.reload()
            }
        }
        fetchAPI()
    }
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [detailMapel, setDetailMapel] = useState(null)
    const [stasiun, setStasiun] = useState(null)
    const { AddIcon } = Icons
    useEffect(() => {
        console.log(context)
    }, [context])
    const handleStasiun = (value) => {
        const payload = {
            idmapel: idmapel,
            stasiun: value
        }
        const fetchAPI = async () => {
            const response = await detailMateri(payload)
            if (response) {
                if (response.data) {
                    router.push(`${path}/${response.data.id}/${value}`)
                }else{
                    router.push(`${path}/add/${value}`)
                }
            }
        }
        fetchAPI()
    }
    const handleModalDescription = () => {
        setIsActiveDesc(!isActiveDesc)
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
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


    const [descMapel, setDescMapel] = useState(null)
    const [isHasUpdateDesc, setIsHasUpdateDesc] = useState(false)
    useEffect(() => {
        if (detailMapel) {
            setDescMapel(detailMapel.MataPelajaran.description)
        }
    }, [detailMapel])
    const resetDescMapel = () => {
        setIsHasUpdateDesc(true)
        setDescMapel(null)
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
                <div className=" w-[85%] border-l-2 border-gray-200">
                    <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                            <div className="flex flex-row items-end justify-between">
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    {detailMapel.MataPelajaran.name && <h1 className="font-bold text-xl lg:text-3xl">{detailMapel.MataPelajaran.name}</h1>}
                                    {detailMapel.MataPelajaran.kelas && <h3 className="font-normal text-xs lg:text-lg">{detailMapel.MataPelajaran.kelas}</h3>}
                                </div>
                                <Image
                                    alt="icon-card"
                                    src="/assets/image/openedbooksm.png"
                                    className="block lg:hidden"
                                />
                            </div>
                            <div className="hidden lg:block absolute bottom-0 right-0 h-[200px] w-[250px] bg-[url('/assets/image/openedbook.png')] bg-no-repeat bg-cover bg-center">
                            </div>
                        </div>
                    </div>
                    <div className="relative min-h-screen">
                        <Background />
                        <div className="w-[90%] mx-auto py-10 flex flex-col gap-10">
                            <ModalAddDescription active={isActiveDesc} handleModal={handleModalDescription} saveDesc={saveDesc} />
                            <div className="w-full flex flex-col gap-10">
                                {descMapel ?
                                    (
                                        <div className="ql-editor z-10" dangerouslySetInnerHTML={{ __html: descMapel }} />
                                    ) :
                                    (
                                        <Button
                                            variant="bordered"
                                            className="h-20 border-3 border-dashed border-primer-500 flex-row justify-center items-center font-semibold"
                                            onPress={handleModalDescription}
                                        >
                                            <h3>Tambah materi pengenalan mata pelajaran</h3>
                                            <div className="h-5 w-5 flex items-center justify-center text-primer-500">
                                                <AddIcon fill={'#110B63'} />
                                            </div>
                                        </Button>
                                    )
                                }
                                <div className="flex justify-end z-10 gap-5">
                                    {descMapel !== null &&
                                        <Button
                                            variant="bordered"
                                            radius="sm"
                                            className="w-[260px] bg-transparent font-semibold text-primer-300 outline-none border-0"
                                            onPress={resetDescMapel}
                                        >
                                            <h3>Hapus Materi</h3>
                                        </Button>
                                    }
                                    {isHasUpdateDesc &&
                                        <Button
                                            radius="sm"
                                            // isDisabled={descMapel ? false : true}
                                            isDisabled={isSubmitDesc ? true : false}
                                            className="w-[260px] bg-primer-500 text-white font-semibold"
                                            onPress={submitDesc}
                                        >
                                            {isSubmitDesc ?
                                                (
                                                    <div className="loader"></div>
                                                ) :
                                                (
                                                    <h3>Simpan</h3>
                                                )
                                            }
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CourseHomePage