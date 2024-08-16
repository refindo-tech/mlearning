'use client'
import { Button, Image } from "@nextui-org/react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
import Aside from "@/components/Aside"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
const Dashboard = () => {
    const router = useRouter()
    const [access, setAccess] = useState(null)
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
    const subjects = [
        "Bahasa Indonesia", "Bahasa Inggris", "Matematika", "Biologi",
        "Fisika", "Kimia", "Sejarah", "Seni & Prakarya",
        "Kewarganegaraan", "Pendidikan Jasmani", "Agama & Budi Pekerti", "Pendidikan Kewirausahaan "
    ];
    useEffect(()=>{
        const validateAccess = ()=>{
            const getToken=sessionStorage.getItem('tokensiswa')
            if(getToken){
                setAccess(true)
            }else{
                setAccess(false)
                router.push('login/')
            }
        }
        validateAccess()
    },[router])
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
                            {subjects.map((subject, index) => (
                                <SubjectCard key={index} subject={subject} />
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
    <Link href="/" className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200 bg-white h-[200px]">
        <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
            <Image
                alt="icon-card"
                src="/assets/image/iconcard.png"
                className="block h-[60px] w-[100px]"
            />
        </div>
        <div className="flex flex-col justify-between flex-grow">
            <h1 className="text-lg font-semibold line-clamp-2">{subject}</h1>
            <h3 className="text-sm">Kelas 10</h3>
        </div>
    </Link>
)
export default Dashboard 