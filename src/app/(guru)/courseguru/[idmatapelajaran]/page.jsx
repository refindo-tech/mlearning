'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button, Image, Link } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { detailMateri, listStasiun, accessGuru } from "@/backend/fetchAPI.js"
const CourseHomePage = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isLoad, setIsLoad] = useState(true)
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [detailMapel, setDetailMapel] = useState(null)
    useEffect(() => {
        const fetchAPI = async () => {
            const responseAccess = await accessGuru()
            if (!responseAccess) {
                router.push('/loginguru')
            }
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
            }
            const payload = {
                idmapel: idmapel
            }
            const responseDetailMateri = await detailMateri(payload)
            if (responseDetailMateri) {
                if (!responseDetailMateri.data) {
                    router.push('/dashboard')
                }
                console.log(responseDetailMateri.data)
                setIsLoad(false)
                setDetailMapel(responseDetailMateri.data)
            }
        }
        fetchAPI()
    }, [idmapel, router])
    if (isLoad) {
        return (<Loading />)
    }
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row">
                <div className=" w-full border-l-2 border-gray-200">
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
                        </div>
                        <div className="hidden lg:block absolute bottom-0 right-0 h-[200px] w-[250px] bg-[url('/assets/image/openedbook.png')] bg-no-repeat bg-cover bg-center">
                        </div>
                    </div>
                    <div className="h-[100px] flex items-center justify-center border-b-2 border-gray-300">
                        <h1 className="font-semibold text-2xl text-center">Atur dan sesuaikan mata pelajaran</h1>
                    </div>
                    <div className="relative w-full min-h-screen">
                        <Background />
                        <div className="flex justify-center py-10">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                            <CardFeature path={'/assets/image/bagpack.png'} text={'Stasiun Belajar'} href={'/manage'}/>
                            <CardFeature path={'/assets/image/red clock.png'} text={'Absensi Siswa'} href={'/absen'}/>
                            <CardFeature path={'/assets/image/bookfeatureteacher.png'} text={'Koreksi Tugas'} href={'/koreksi'}/>
                            <CardFeature path={'/assets/image/mikroskop.png'} text={'Hasil Akhir'} href={'/hasil'}/>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
const CardFeature = ({path, text, href}) => {
    const router = useRouter()
    const url = usePathname()
    const idmapel = url.split('/')[2] 
    const routePage = ()=>{
        if(href){
            router.push(`${idmapel}/${href}`)
        }
    }
    return (
    <Button
        isIconOnly={true}
        onPress={routePage}
        className="h-[200px] w-[255px] bg-primer-400 flex items-center rounded-xl z-10"
    >
        <div className="flex items-center gap-6 w-[80%] mx-auto font-semibold text-white text-wrap text-left text-lg">
            <Image
                alt="class-feature"
                // src="/assets/image/iconcard.png"
                src={path}
                className="block h-[100px] w-[100px]"
            />
            <div>{text}</div>
        </div>
    </Button>
)}
export default CourseHomePage