'use client'
import dynamic from "next/dynamic"
import { Button, Image } from "@nextui-org/react"
import Loading from "../loading"
import Link from "next/link"
// import Navbar from "@/components/Navbar"
const Navbar = dynamic(
    ()=>import('@/components/Navbar'),
    {ssr:false}
)
import Footer from "@/components/Footer"
import Background from "@/components/Background"
const Aside = dynamic(
    ()=>import('@/components/Aside'),
    {ssr:false}
)
// import Aside from "@/components/Aside"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {listClass} from "@/backend/fetchAPI.js"
const Dashboard = () => {
    const router = useRouter()
    const [access, setAccess] = useState(null)
    const [dataListClass, setDataListClass] = useState([])
    const [classButton, setClassButton] = useState({
        "kelas 10": true,
        "kelas 11": false,
        "kelas 12": false,
    })
    const handleClassButton = (kelas)=>{
        setClassButton({
            "kelas 10": kelas === "kelas 10",
            "kelas 11": kelas === "kelas 11",
            "kelas 12": kelas === "kelas 12",
        });
    }
    useEffect(()=>{
        const validateAccess = ()=>{
            if (typeof window !== "undefined") {
                const getToken=sessionStorage.getItem('tokensiswa')
                if(!getToken){
                    router.push('login/')
                }
            }
        }
        validateAccess()
    },[router])
    useEffect(()=>{
        const selectedClass = Object.keys(classButton).find(kelas => classButton[kelas]===true)
        if(selectedClass){
            const payload = {kelas:String(selectedClass)}
            const fetchData = async()=>{
                const response = await listClass(payload)
                if(response){
                    setDataListClass(response.data)
                    setAccess(true)
                }
            }
            fetchData()
        }
    },[classButton])
    if(access === null){
        return (<Loading/>)
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex flex-row">
                <div className="relative flex flex-col w-full lg:w-3/4 border-r-2 border-gray-200">
                    <Background />
                    <div className="w-full p-10 z-10">
                        <div className="w-fit bg-gray-200 flex flex-row p-1 gap-x-2 rounded-2xl font-semibold mb-10">
                            <Button
                                id="kelas 10"
                                className={`${
                                    classButton["kelas 10"] ? "bg-white" : "bg-gray-200 text-gray-400"
                                }`}
                                onPress={(e)=>handleClassButton(e.target.id)}
                            >
                                Kelas 10
                            </Button>
                            <Button
                                id="kelas 11"
                                className={`${
                                    classButton["kelas 11"] ? "bg-white" : "bg-gray-200 text-gray-400"
                                }`}
                                onPress={(e)=>handleClassButton(e.target.id)}
                            >
                                Kelas 11
                            </Button>
                            <Button
                                id="kelas 12"
                                className={`${
                                    classButton["kelas 12"] ? "bg-white" : "bg-gray-200 text-gray-400"
                                }`}
                                onPress={(e)=>handleClassButton(e.target.id)}
                            >
                                Kelas 12
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {dataListClass.map((item, index) => (
                                <SubjectCard key={index} subject={item} />
                            ))}
                        </div>
                    </div>
                </div>
                <Aside className="hidden lg:block lg:w-1/4" />
            </div>
            <Footer className='mt-auto' />
        </div>
    )
}

const SubjectCard = ({ subject }) => (
    <Link href={`course/${subject.id}`} className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200 bg-white h-[200px]">
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
    </Link>
)
export default Dashboard 