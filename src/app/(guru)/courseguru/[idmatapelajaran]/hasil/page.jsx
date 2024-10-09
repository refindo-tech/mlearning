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
import { detailMateri, listProfile, accessGuru} from "@/backend/fetchAPI.js"
import { Input } from "@nextui-org/react"
import SearchTable from '@/components/SearchTable'
import Icons from "@/components/Icons"
const ReportAbsen = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isLoad, setIsLoad] = useState(true)
    const [dataListProfile, setDataListProfile] = useState([])
    const [detailMapel, setDetailMapel] = useState(null)
    const [stasiun, setStasiun] = useState(null)
    const [inputSearch, setInputSearch] = useState(null)
    const {EditIcon} = Icons
    const handleStasiun = (value) => {
        setStasiun(value)
    }
    const [limit, setLimit] = useState(5)
    const handleLimit = (value) => {
        setLimit(value)
    }
    const handleInputSearch = (value) => {
        setInputSearch(value)
    }
    useEffect(() => {
        const fetchAPI = async () => {
            let req = {
                limit
            }
            if (inputSearch) {
                req = {
                    limit,
                    name: inputSearch
                }
            }
            const response = await listProfile(req)
            if (response) {
                setDataListProfile(response.data)
            }
        }
        fetchAPI()
    }, [limit, inputSearch])
    useEffect(() => {
        const fetchAPI = async () => {
            const responseAccess = await accessGuru()
            if (!responseAccess) {
                router.push('/')
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
                                    {detailMapel.MataPelajaran.name &&
                                        <h1 className="font-bold text-xl lg:text-3xl">{detailMapel.MataPelajaran.name}</h1>
                                    }
                                    {detailMapel.MataPelajaran.kelas &&
                                        <h3 className="font-normal text-xs lg:text-lg">{detailMapel.MataPelajaran.kelas}</h3>
                                    }
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
                    <div className="relative w-full min-h-screen flex justify-center">
                        <Background />
                        <div className="py-10 flex flex-col gap-[30px] w-[90%] mx-auto z-10">
                            <h3 className="font-semibold text-lg">Hasil Pembelajaran Siswa</h3>
                            <div className="border-2 border-gray-300 rounded-xl">
                                <div className="w-full h-[87px] bg-gray-200 rounded-t-xl flex items-center justify-center">
                                    <div className="w-[90%] flex justify-between items-center gap-3">
                                        <div className="flex gap-3 items-center text-sm">
                                            <p className="hidden lg:block">Tampilkan</p>
                                            <Input
                                                variant="flat"
                                                type="number"
                                                min={1}
                                                defaultValue={limit}
                                                onValueChange={(value) => handleLimit(parseInt(value))}
                                                className="w-[60px] h-10 rounded"
                                            />
                                            <p>baris</p>
                                        </div>
                                        <SearchTable value={inputSearch} handleValue={handleInputSearch} />
                                    </div>
                                </div>
                                <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="bg-gray-200 h-10 align-center text-left font-normal text-sm">
                                            <th className="w-[50px] text-center">No</th>
                                            <th>Nama</th>
                                            <th className="hidden lg:block">NISN</th>
                                            <th>Kelas</th>
                                            <th className="text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-base">
                                        {dataListProfile?.map((item, index) => (
                                            <tr className="h-[60px] align-center" key={index}>
                                                <td className="text-center w-[50px]">{index + 1}</td>
                                                <td>{item.name}</td>
                                                {item.nisn ?
                                                    (<td className="hidden lg:block">{item.nisn}</td>) :
                                                    (<td className="hidden lg:block">-</td>)
                                                }
                                                {item.kelas ?
                                                    (<td>{item.kelas}</td>) :
                                                    (<td>-</td>)
                                                }
                                                <td className="h-full flex justify-center items-center">
                                                    <Button
                                                        isIconOnly={true}
                                                        radius="sm"
                                                        className="w-fit lg:w-[90%] lg:mx-auto bg-primer-500"
                                                        onPress={()=>{
                                                            router.push(`${path}/${item.idsiswa}`)
                                                        }}
                                                    >
                                                        <div className="flex justify-center items-center gap-3 text-white text-base">
                                                            <EditIcon />
                                                            <p className="hidden lg:block">Detail</p>
                                                        </div>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default ReportAbsen