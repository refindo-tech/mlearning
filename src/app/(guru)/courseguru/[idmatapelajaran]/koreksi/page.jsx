'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Icons from "@/components/Icons"
import { Button, Image, Link } from "@nextui-org/react"
// import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { detailMateri, listStasiun, listExam, accessGuru } from "@/backend/fetchAPI.js"
import { Input } from "@nextui-org/react"
import SearchTable from '@/components/SearchTable'
const KoreksiTugas = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isLoad, setIsLoad] = useState(true)
    const [dataListStasiun, setDataListStasiun] = useState([])
    const [dataListExam, setDataListExam] = useState([])
    const [limit, setLimit] = useState(5)
    const handleLimit = (value) => {
        setLimit(value)
    }
    const [detailMapel, setDetailMapel] = useState(null)
    const [stasiun, setStasiun] = useState(null)
    const { EditIcon } = Icons
    const handleStasiun = (value) => {
        setStasiun(value)
    }
    useEffect(() => {
        const fetchAPI = async () => {
            const responseAccess = await accessGuru()
            if (!responseAccess) {
                router.push('/')
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
                setIsLoad(false)
                setDetailMapel(responseDetailMateri.data)
            }
        }
        fetchAPI()
    }, [idmapel, router])
    useEffect(() => {
        const fetchAPI = async () => {
            const payloadListExam = {
                idmapel: idmapel,
                stasiun: stasiun,
                limit: parseInt(limit)
            }
            if (stasiun) {
                const response = await listExam(payloadListExam)
                if (response) {
                    console.log(response)
                    setDataListExam(response.data)
                }
            }
        }
        fetchAPI()
    }, [stasiun, idmapel, limit])
    if (isLoad) {
        return (<Loading />)
    }
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row">
                <aside className="hidden lg:block lg:w-[15%]">
                    {dataListStasiun.length !== 0 &&
                        <AsideTeacher
                            listStasiun={dataListStasiun}
                            handleStasiun={handleStasiun}
                        />}
                </aside>
                <div className="w-full lg:w-[85%] border-l-2 border-gray-200">
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
                    <div className="relative w-full min-h-screen flex justify-center">
                        <Background />
                        {stasiun &&
                            <div className="py-10 flex flex-col gap-[30px] w-[90%] mx-auto z-10">
                                <h3 className="font-semibold text-lg">{`Koreksi exam siswa ${stasiun}`}</h3>
                                <div className="border-2 border-gray-300 rounded-xl">
                                    <div className="w-full h-[87px] bg-gray-200 rounded-t-xl flex items-center justify-center">
                                        <div className="w-[90%] flex justify-between items-center gap-3">
                                            <div className="flex gap-3 items-center text-sm">
                                                <p className="hidden lg:block">Tampilkan</p>
                                                <Input
                                                    variant="faded"
                                                    type="number"
                                                    min={1}
                                                    defaultValue={limit}
                                                    onValueChange={(e) => handleLimit(parseInt(e))}
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
                                            {dataListExam?.map((item, index) => (
                                                <tr className="h-[60px] align-center" key={index}>
                                                    <td className="text-center w-[50px]">{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    {item.nisn ? (
                                                        <td>{item.nisn}</td>
                                                    ) : (
                                                        <td>-</td>
                                                    )}
                                                    {item.kelas ? (
                                                        <td>{item.kelas}</td>
                                                    ) : (
                                                        <td>-</td>
                                                    )}
                                                    <td className="text-center">
                                                        <Action idsiswa={item.idsiswa} stasiun={stasiun} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default KoreksiTugas
const Action = ({ idsiswa, stasiun }) => {
    const { EditIcon } = Icons
    const router = useRouter()
    const path = usePathname()
    const handleCorrection = () => {
        router.push(`${path}/exam/${idsiswa}/${stasiun}`)
    }
    return (
        <Button
            isIconOnly={true}
            radius="sm"
            onPress={handleCorrection}
            className="bg-primer-500 w-fit lg:w-[90%] lg:mx-auto"
        >
            <div className="flex justify-center gap-3 text-white text-base">
                <EditIcon />
                <p className="hidden lg:block">Koreksi</p>
            </div>
        </Button>
    )
}