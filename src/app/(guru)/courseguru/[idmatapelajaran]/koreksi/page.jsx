'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import AsideCourse from '@/components/AsideCourse'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Icons from "@/components/Icons"
import { Button, Image, Link } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { detailMateri, listStasiun, getAbsensiByIdSiswa } from "@/backend/fetchAPI.js"
import { Input } from "@nextui-org/react"
import SearchTable from '@/components/SearchTable'
const KoreksiTugas = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isLoad, setIsLoad] = useState(true)
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [detailMapel, setDetailMapel] = useState(null)
    const { EditIcon } = Icons
    const handleUrl = (value) => {
        if (value) {
            return `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/${value.stasiun}`
        } else {
            return `${process.env.NEXT_PUBLIC_BASE_API}/course/${idmapel}/result`
        }
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const req = { idmatapelajaran: idmapel }
            const response = await listStasiun(req)
            if (response) {
                setDataListStasiun(response.data)
            }
            const payload = {
                idmapel: idmapel
            }
            // const responseAbsensi = await getAbsensiByIdSiswa(payload)
            // if (responseAbsensi.status) {
            //     setDataAbsensi(responseAbsensi.data)
            // } else {
            //     router.push('/onboarding')
            // }
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
                    {/* <div className="h-[100px] flex items-center justify-center border-b-2 border-gray-300">
                        <h1 className="font-semibold text-2xl">Atur dan sesuaikan mata pelajaran</h1>
                    </div> */}
                    <div className="relative w-full min-h-screen flex justify-center">
                        <Background />
                        <div className="py-10 flex flex-col gap-[30px] w-[80%] mx-auto">
                            <h3 className="font-semibold text-lg">Koreksi exam siswa stasiun 1</h3>
                            <div className="border-2 border-gray-300 rounded-xl">
                                <div className="w-full h-[87px] bg-gray-200 rounded-t-xl flex items-center justify-center">
                                    <div className="w-[90%] flex justify-between items-center">
                                        <div className="flex gap-3 items-center text-sm">
                                            <p>Tampilkan</p>
                                            <Input
                                                variant="faded"
                                                type="number"
                                                min={1}
                                                defaultValue={10}
                                                className="w-[60px] h-10 rounded"
                                            />
                                            <p>baris</p>
                                        </div>
                                        <SearchTable />
                                    </div>
                                </div>
                                <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="bg-gray-200 h-10 align-center text-left font-normal text-sm">
                                            <th className="w-[50px] text-center">No</th>
                                            <th>Nama</th>
                                            <th>NISN</th>
                                            <th>Kelas</th>
                                            <th className="text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-base">
                                        <tr className="h-[60px] align-center">
                                            <td className="text-center w-[50px]">1</td>
                                            <td>Zaky Maulana</td>
                                            <td>000000</td>
                                            <td>10</td>
                                            <td className="text-center">
                                                <Action/>
                                            </td>
                                        </tr>
                                        <tr className="h-[60px] align-center">
                                            <td className="text-center w-[50px]">1</td>
                                            <td>Zaky Maulana</td>
                                            <td>000000</td>
                                            <td>10</td>
                                            <td className="text-center">
                                                <Action/>
                                            </td>
                                        </tr>
                                        <tr className="h-[60px] align-center">
                                            <td className="text-center w-[50px]">1</td>
                                            <td>Zaky Maulana</td>
                                            <td>000000</td>
                                            <td>10</td>
                                            <td className="text-center">
                                                <Action/>
                                            </td>
                                        </tr>
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
export default KoreksiTugas
const Action = () => {
    const {EditIcon} = Icons
    const router = useRouter()
    const path = usePathname()
    const handleCorrection = () =>{
        router.push(`${path}/exam`)
    }
    return (
        <Button
            radius="sm"
            onPress={handleCorrection}
            className="bg-primer-500 w-[90%] mx-auto"
        >
            <div className="flex justify-center gap-3 text-white text-base">
                <EditIcon />
                <p>Koreksi</p>
            </div>
        </Button>
    )
}