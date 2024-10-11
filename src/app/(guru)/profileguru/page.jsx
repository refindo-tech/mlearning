'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Icons from "@/components/Icons"
import { Button } from "@nextui-org/react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { listProfileGuru, deleteProfileGuru, accessGuru } from "@/backend/fetchAPI.js"
import { Input } from "@nextui-org/react"
import SearchTable from '@/components/SearchTable'
import ModalAddGuru from '@/components/ModalAddGuru'
const ProfilGuru = () => {
    const [isLoad, setIsLoad] = useState(true)
    const [limitData, setLimitData] = useState(null)
    const [dataListProfile, setDataListProfile] = useState(null)
    const [inputSearch, setInputSearch] = useState(null)
    const [isActiveModal, setIsActiveModal] = useState(false)
    const handleSearch = (value) => {
        setInputSearch(value)
    }
    const { AddIcon } = Icons
    useEffect(() => {
        const fetchAPI = async () => {
            const responseAccess = await accessGuru()
            if (!responseAccess) {
                router.push('/')
            }
            let payload = {
                limit: limitData
            }
            if (inputSearch) {
                payload = {
                    limit: limitData,
                    name: inputSearch
                }
            }
            const response = await listProfileGuru(payload)
            if (response) {
                setIsLoad(false)
                setDataListProfile(response.data)
            }
        }
        fetchAPI()
    }, [limitData, inputSearch])
    const handleLimit = (value) => {
        setLimitData(value)
    }
    const handleIsActiveModal = () => {
        setIsActiveModal(!isActiveModal)
    }
    if (isLoad) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <Navbar />
            {isActiveModal ?
                (
                    <ModalAddGuru active={isActiveModal} handleModal={handleIsActiveModal} />
                ) :
                (
                    <div className="relative w-full min-h-screen flex justify-center">
                        <Background />
                        <div className="py-10 flex flex-col gap-[30px] w-[90%] mx-auto z-10">
                            <h1 className="font-bold text-3xl">Kelola Guru</h1>
                            <div className="border-2 border-gray-300 rounded-xl">
                                <div className="w-full h-[87px] bg-gray-200 rounded-t-xl flex items-center justify-center">
                                    <div className="w-[90%] flex justify-between items-center gap-3">
                                        <div className="flex gap-3 items-center text-sm">
                                            <p className="hidden lg:block">Tampilkan</p>
                                            <Input
                                                variant="faded"
                                                type="number"
                                                min={1}
                                                onValueChange={(value) => handleLimit(parseInt(value))}
                                                defaultValue={limitData}
                                                className="w-[60px] h-10 rounded"
                                            />
                                            <p>baris</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                isIconOnly={true}
                                                radius="sm"
                                                className="bg-primer-300 lg:w-[260px]"
                                                onPress={handleIsActiveModal}
                                            >
                                                <div className="flex gap-3 items-center justify-center text-white text-base">
                                                    <AddIcon />
                                                    <p className="hidden lg:block">Tambah Guru</p>
                                                </div>
                                            </Button>
                                            <SearchTable value={inputSearch} handleValue={handleSearch} />
                                        </div>
                                    </div>
                                </div>
                                <table className="table-fixed w-full">
                                    <thead>
                                        <tr className="bg-gray-200 h-10 align-center text-left font-normal">
                                            <th className="w-[50px] text-center">No</th>
                                            <th >Nama</th>
                                            <th className="text-center">NUPTK</th>
                                            {/* <th>Kelas</th> */}
                                            <th className="text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-base">
                                        {dataListProfile?.map((item, index) => (
                                            <tr className="h-[60px] align-center" key={index}>
                                                <td className="text-center w-[50px]">{index + 1}</td>
                                                <td>{item.name}</td>
                                                {item.nuptk ?
                                                    (<td className="text-center">{item.nuptk}</td>) :
                                                    (<td className="text-center">-</td>)
                                                }
                                                {/* {item.kelas ?
                                                            (<td>{item.kelas}</td>) :
                                                            (<td>-</td>)
                                                        } */}
                                                <td className="h-[60px] flex justify-center items-center text-center">
                                                    <ActionGroup idguru={item.idguru} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer />
        </>
    )
}
export default ProfilGuru
const ActionGroup = ({ idguru }) => {
    const router = useRouter()
    const url = usePathname()
    const { EditIcon, TrashIcon } = Icons
    const [isLoad, setIsLoad] = useState(false)
    const handleDetailProfile = () => {
        router.push(`${url}/${parseInt(idguru)}`)
    }
    const handleDeleteProfile = () => {
        const payload = {
            idguru: parseInt(idguru)
        }
        const fetchAPI = async () => {
            const response = await deleteProfileGuru(payload)
            if (response) {
                setIsLoad(false)
                window.location.reload()
            }
        }
        fetchAPI()
    }
    return (
        <div className="flex gap-3">
            <Button
                isIconOnly={true}
                radius="sm"
                className="bg-primer-500 lg:w-fit lg:px-3"
                onPress={handleDetailProfile}
            >
                <div className="flex justify-center gap-3 text-white text-base">
                    <EditIcon />
                    <p className="hidden lg:block">Detail</p>
                </div>
            </Button>
            <Button
                isIconOnly={true}
                isDisabled={isLoad ? true : false}
                radius="sm"
                className="bg-accent-red lg:w-fit lg:px-3"
                onPress={() => {
                    setIsLoad(true)
                    handleDeleteProfile()
                }}
            >
                <>{isLoad ? (
                    <div className="loader"></div>
                ) : (
                    <div className="flex justify-center gap-3 text-white text-base">
                        <TrashIcon />
                        <p className="hidden lg:block">Hapus</p>
                    </div>
                )}
                </>
            </Button>
        </div>
    )
}