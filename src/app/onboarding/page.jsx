'use client'
import { Image } from "@nextui-org/react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
import Link from "next/link"
import { listClass } from "@/backend/fetchAPI.js"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
const Homepage = () => {
    const [isTeacher, setIsTeacher] = useState(false)
    const [dataListClass, setDataListClass] = useState(null)
    useEffect(() => {
        const tokenguru = sessionStorage.getItem('tokenguru')
        if(tokenguru){
            setIsTeacher(true)
        }
        const fetchAPI = async () => {
            const payload = { limit: 8 }
            const response = await listClass(payload)
            if (response) {
                setDataListClass(response.data)
            }
        }
        fetchAPI()
    }, [])
    return (
        <>
            <Navbar />
            <div className="h-[50vh] w-full flex items-center bg-[url('/assets/image/heroonboarding.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto flex flex-col p-[30px] text-center bg-white gap-5 lg:gap-10 text-indigo-900">
                    <h1 className="text-base lg:text-[50px] font-sans font-bold lg:font-semibold">Selamat Datang di M-Learning</h1>
                    <h3 className='text-xs lg:text-2xl'>Portal belajar online interaktif siswa</h3>
                </div>
            </div>
            <div className="relative ">
                <Background />
                {dataListClass &&
                    <div className="w-full min-h-screen flex flex-col justify-between p-10 z-10">
                        <div className="flex flex-col gap-5 lg:gap-10">
                            <h1
                                className="text-center text-lg font-semibold"
                            >
                                Mata pelajaran yang tersedia
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {dataListClass.map((item, index) => (
                                    <SubjectCard key={index} subject={item} />
                                ))}
                            </div>
                        </div>
                        <Link
                            href={isTeacher?'dashboardguru':'/dashboard'}
                            className="text-center text-sm lg:text-lg font-semibold underline underline-offset-2"
                        >
                            Temukan lebih banyak mata pelajaran
                        </Link>
                    </div>}
            </div>
            <Footer />
        </>
    )
}
const SubjectCard = ({ subject }) => {
    const router = useRouter()
    const handleRouter = ()=>{
        const tokenguru = sessionStorage.getItem('tokenguru')
        if(tokenguru){
            router.push(`/courseguru/${subject.id}`)
        }else{
            router.push(`/course/${subject.id}`)
        }
    }
    return (
        <div 
            onClick={handleRouter}
            className="hover:cursor-pointer flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200 bg-white h-[200px]"
        >
            <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                <Image
                    alt="icon-card"
                    src="/assets/image/iconcard.png"
                    className="block h-[60px] w-[100px]"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold line-clamp-2">{subject.name}</h1>
                <h3 className="text-sm">{subject.kelas}</h3>
            </div>
        </div>
    )
}
export default Homepage