'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import AsideCourse from '@/components/AsideCourse'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button, Image, Link } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { detailMateri, listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI.js"
const CourseHomePage = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [dataAbsensi, setDataAbsensi] = useState([])
    // const [selectedStasiun, setSelectedStasiun] = useState(null)
    const [detailMapel, setDetailMapel] = useState(null)
    // const handleNextLearn = () => {
    //     setSelectedStasiun()
    // }
    const findFirstIncompleteStasiun = () => {
        return dataListStasiun.find(stasiun =>
            !dataAbsensi.find(absen => absen.stasiun === stasiun.stasiun && absen.status === "SUDAH")
        )
    }
    const selectedStasiun = findFirstIncompleteStasiun()
    const handleUrl = (stasiun) => {
        return `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/${stasiun}`
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
                console.log(response)
            }
            const payload = {
                idmapel: idmapel
            }
            const responseAbsensi = await getAbsensiByIdSiswa(payload)
            if (responseAbsensi) {
                setDataAbsensi(responseAbsensi.data)
                console.log(responseAbsensi)
            }
            const responseDetailMateri = await detailMateri(payload)
            if (responseDetailMateri) {
                console.log(responseDetailMateri)
                if (!responseDetailMateri.data) {
                    router.push('/dashboard')
                }
                setDetailMapel(responseDetailMateri.data)
            }
        }
        fetchAPI()
    }, [idmapel, router])
    if (!detailMapel) {
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
                <div className="lg:w-[85%] w-full border-l-2 border-gray-200">
                    <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                            <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                                <button
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white/50 cursor-default"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <Link
                                    href={handleUrl(selectedStasiun.stasiun)}
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white text-black"
                                >
                                    <ChevronRight size={32} />
                                </Link>
                            </div>
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
                        </div>
                        <div className="hidden lg:block absolute bottom-0 right-0 h-[200px] w-[250px] bg-[url('/assets/image/openedbook.png')] bg-no-repeat bg-cover bg-center">
                        </div>
                    </div>
                    <div className="relative w-full hidden lg:block min-h-screen">
                        <Background />
                        <div className="relative top-0 w-[90%] hidden lg:flex flex-col gap-5 mx-auto py-10 z-10">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas saepe facilis ea ipsam quae unde, magni similique quaerat non. Fugiat distinctio obcaecati minima aliquam eius suscipit pariatur, neque fugit error!
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio cumque molestias eos ut, commodi officia veritatis et maxime repellat similique, aliquid laborum a officiis culpa quos dolorem voluptate natus nihil?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates hic aliquam, in sit omnis obcaecati expedita veritatis ipsam laboriosam aut recusandae iure rem delectus mollitia nostrum quos, ratione quam reiciendis.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, architecto. Aut illo tempora labore obcaecati dolores consectetur, blanditiis iusto odit qui quam quas! Laudantium impedit magni rerum id atque! Necessitatibus?
                            </p>
                            <div className="flex justify-end">
                                <Button
                                    as={Link}
                                    href={handleUrl(selectedStasiun.stasiun)}
                                    size="sm"
                                    className="bg-primer-500 text-white h-10 w-[200px] text-center rounded"
                                >
                                    Mulai Belajar
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full min-h-screen block lg:hidden">
                        <AsideCourse
                            listStasiun={dataListStasiun}
                            absen={dataAbsensi}
                        />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default CourseHomePage