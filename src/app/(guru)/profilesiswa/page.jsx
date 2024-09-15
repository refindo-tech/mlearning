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
const ProfilSiswa = () => {
    const path = usePathname()
    const router = useRouter()
    const idmapel = path.split('/')[2]
    const [isLoad, setIsLoad] = useState(true)
    const { EditIcon, AddIcon, TrashIcon } = Icons
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row">
                <div className=" w-full border-l-2 border-gray-200">
                    <div className="relative w-full min-h-screen flex justify-center">
                        <Background />
                        <div className="py-10 flex flex-col gap-[30px] w-[80%] mx-auto">
                            <h1 className="font-semibold text-3xl">Kelola Siswa</h1>
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
                                        <div className="flex gap-3">
                                            <Button
                                                radius="sm"
                                                className="bg-primer-300 w-[260px]"
                                            >
                                                <div className="flex gap-3 items-center justify-center text-white text-base">
                                                    <AddIcon />
                                                    <p>Tambah Siswa</p>
                                                </div>
                                            </Button>
                                            <SearchTable />
                                        </div>
                                    </div>
                                </div>
                                <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="bg-gray-200 h-10 align-center text-left font-normal">
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
                                                <ActionGroup/>
                                            </td>
                                        </tr>
                                        <tr className="h-[60px] align-center">
                                            <td className="text-center w-[50px]">1</td>
                                            <td>Zaky Maulana</td>
                                            <td>000000</td>
                                            <td>10</td>
                                            <td className="text-center">
                                                <ActionGroup/>
                                            </td>
                                        </tr>
                                        <tr className="h-[60px] align-center">
                                            <td className="text-center w-[50px]">1</td>
                                            <td>Zaky Maulana</td>
                                            <td>000000</td>
                                            <td>10</td>
                                            <td className="text-center">
                                                <ActionGroup/>
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
export default ProfilSiswa
const ActionGroup = () => {
    const router =  useRouter()
    const url = usePathname()
    const { EditIcon,TrashIcon } = Icons
    const handleDetailProfile = ()=>{
        router.push(`${url}/15`)
    }
    return (
        <div className="flex gap-3">
            <Button
                radius="sm"
                className="bg-primer-500"
                onPress={handleDetailProfile}
            >
                <div className="flex justify-center gap-3 text-white text-base">
                    <EditIcon />
                    <p>Detail</p>
                </div>
            </Button>
            <Button
                radius="sm"
                className="bg-accent-red"
            >
                <div className="flex justify-center gap-3 text-white text-base">
                    <TrashIcon />
                    <p>Hapus</p>
                </div>
            </Button>
        </div>
    )
}