'use client'
import { Button, Image } from "@nextui-org/react"
import Loading from "../../loading"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
import Aside from "@/components/Aside"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { listClass } from "@/backend/fetchAPI.js"
const Search = () => {
    const router = useRouter()
    const path = usePathname()
    const mapel = path.split('/')[2]
    const [access, setAccess] = useState(null)
    const [dataListClass, setDataListClass] = useState([])
    useEffect(() => {
        const validateAccess = () => {
            const getToken = sessionStorage.getItem('tokensiswa')
            if (!getToken) {
                router.push('login/')
            }
        }
        validateAccess()
    }, [router])
    useEffect(() => {
        const payload = {
            name: decodeURIComponent(mapel)
        }
        const fetchData = async () => {
            const response = await listClass(payload)
            if (response) {
                console.log(response)
                setDataListClass(response.data)
                setAccess(true)
            }
        }
        fetchData()
    }, [mapel])
    if (access === null) {
        return (<Loading />)
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex flex-row">
                <div className="relative flex flex-col w-full lg:w-3/4 border-r-2 border-gray-200">
                    <Background />
                    <div className="w-full p-10 z-10">
                        {dataListClass.length !== 0 ? (
                            <div className="flex flex-col gap-4">
                                <h1
                                    className="font-semibold text-lg"
                                >
                                    {`Hasil dari pencarian "${mapel}"`}
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {dataListClass.map((item, index) => (
                                        <SubjectCard key={index} subject={item} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div
                                className="h-[80vh] lg:h-[90vh] flex flex-col items-center justify-center gap-10"
                            >
                                <Image
                                    alt="zoomglassicon"
                                    src="/assets/image/zoomglass.png"
                                    height={150}
                                    width={150}
                                />
                                <div
                                    className=" flex flex-col gap-4 lg:gap-6 items-center justify-center"
                                >
                                    <h1
                                        className="text-xl lg:text-3xl text-primer-500 font-semibold text-center"
                                    >
                                        Oops... hasil tidak ditemukan.
                                    </h1>
                                    <p
                                        className="text-base lg:text-lg text-gray-500 font-semibold text-center"
                                    >
                                        Pastikan kata kunci yang dicari telah sesuai
                                    </p>
                                </div>
                            </div>
                        )}
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
        <div className="flex flex-col justify-between flex-grow">
            <h1 className="text-lg font-semibold line-clamp-2">{subject.name}</h1>
            <h3 className="text-sm">{subject.kelas}</h3>
        </div>
    </Link>
)
export default Search 