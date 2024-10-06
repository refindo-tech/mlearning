'use client'
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Image, Button, Link } from "@nextui-org/react"
import { X, Search } from "lucide-react"
import SearchComponent from '@/components/SearchComponent'
import PopoverUser from '@/components/PopoverUser'
import Icons from "@/components/Icons"
import Loading from "@/app/loading"
import { getDetailProfile, getProfileGuruNavbar } from "@/backend/fetchAPI"
const Navbar = () => {
    const router = useRouter()
    const [token, setToken] = useState(null)
    const [role, setRole] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const [isHide, setIsHide] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [profileSiswa, setProfileSiswa] = useState(null)
    const [profileGuru, setProfileGuru] = useState(null)
    const handleModal = () => {
        setIsModal(!isModal)
    }
    const { CircleElipsis } = Icons
    useEffect(() => {
        const verify = sessionStorage.getItem('tokensiswa') || sessionStorage.getItem('tokenguru')
        const siswa = sessionStorage.getItem('tokensiswa')
        const guru = sessionStorage.getItem('tokenguru')
        if (guru) {
            setRole('guru')
            setToken(verify)
        }else if (siswa) {
            setRole('siswa')
            setToken(verify)
        }else if (siswa && guru){
            setToken(null)
        }
        const detailProfile = async()=>{
            if(siswa){
                const responseProfileSiswa = await getDetailProfile()
                if(responseProfileSiswa){
                    if(responseProfileSiswa.data){
                        setProfileSiswa(responseProfileSiswa.data.siswa)
                    }
                }
            }
            if(guru){
                const responseProfileGuru = await getProfileGuruNavbar()
                if(responseProfileGuru){
                    setProfileGuru(responseProfileGuru.data)
                }
            }
        }
        detailProfile()
    }, [])
    const handleHide = () => {
        setIsHide(true)
    }
    const handleLogout = () => {
        setIsLoad(true)
        sessionStorage.removeItem('tokensiswa')
        sessionStorage.removeItem('tokenguru')
        setRole(null)
        setToken(null)
        router.push('/onboarding')
    }
    if(isLoad){
        return(
            <Loading/>
        )
    }
    return (
        <nav className="sticky top-0 w-full h-[80px] bg-white flex items-center shadow-xl z-20">
            <div className="w-[90%] lg:container mx-auto flex justify-between">
                <button
                    onClick={handleModal}
                    className="lg:hidden flex items-center"
                >
                    <CircleElipsis size={24} />
                </button>
                {isModal &&
                    <div className="absolute lg:hidden top-0 flex flex-col justify-between pt-[80px] left-0 w-[50vw] h-screen z-0 bg-white">
                        <div className="w-[90%] mx-auto">
                            <button
                                onClick={handleModal}
                                className="h-5 w-5 my-4 rounded flex items-center justify-center bg-black"
                            >
                                <X size={16} className="text-white" />
                            </button>
                            <ul className="flex flex-col justify-center gap-3 font-semibold  text-center">
                                {role === 'guru' ? (
                                    <>
                                        <li className="px-4 py-2">
                                            <a href="/dashboardguru">Kelola Kelas</a>
                                        </li>
                                        <li className="px-4 py-2">
                                            <a href="/profilesiswa">Kelola Siswa</a>
                                        </li>
                                        <li className="px-4 py-2">
                                            <a href="/about">Tentang M-Learning</a>
                                        </li>
                                        <li className="px-4 py-2">
                                            <a href="/profileguru">Kelola Guru</a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="px-4 py-2">
                                            <a href="/dashboard">Materi Belajar</a>
                                        </li>
                                        <li className="px-4 py-2">
                                            <a href="/about">Tentang M-Learning</a>
                                        </li>
                                        <li className="px-4 py-2">
                                            <a href="/help">Bantuan</a>
                                        </li>
                                        <li className="px-4 py-2">
                                            <a href="/dashboardguru">Portal Guru</a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        {token ? (
                            <div className="w-full flex flex-col p-4 gap-2">
                                <Button
                                    as={Link}
                                    href="/login"
                                    className="bg-white rounded border-2 border-gray-200 font-semibold text-sm"
                                >
                                    Tentang Akun
                                </Button>
                                <Button
                                    onPress={handleLogout}
                                    className="bg-white rounded text-accent-orange border-2 border-gray-200 font-semibold text-sm"
                                >
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col p-4 gap-2">
                                <Button
                                    as={Link}
                                    href="/login"
                                    className="bg-primer-500 rounded text-white font-semibold text-sm"
                                >
                                    Masuk
                                </Button>
                                <Button
                                    as={Link}
                                    href="/register"
                                    className="bg-white rounded text-accent-orange border-2 border-gray-200 font-semibold text-sm"
                                >
                                    Daftar
                                </Button>
                            </div>
                        )}
                    </div>
                }
                {!isHide ? (
                    <div className="flex flex-row items-center gap-2">
                        <Image
                            alt="icon-card"
                            src="/assets/image/logosma3.png"
                            className="block h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]"
                        />
                        <Image
                            alt="icon-card"
                            src="/assets/image/logologinpage.png"
                            className="block h-[40px] w-[124px] lg:h-[60px] lg:w-[233px]"
                        />
                    </div>
                ) : (
                    <div className="hidden lg:flex flex-row items-center gap-2">
                        <Image
                            alt="icon-card"
                            src="/assets/image/logosma3.png"
                            className="block h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]"
                        />
                        <Image
                            alt="icon-card"
                            src="/assets/image/logologinpage.png"
                            className="block h-[40px] w-[124px] lg:h-[60px] lg:w-[233px]"
                        />
                    </div>
                )
                }
                <ul className="hidden lg:flex flex-row items-center gap-5 font-semibold">
                    {role === 'guru' ? (
                        <>
                            <li className="px-4 py-2">
                                <a href="/dashboardguru">Kelola Kelas</a>
                            </li>
                            <li className="px-4 py-2">
                                <a href="/profilesiswa">Kelola Siswa</a>
                            </li>
                            <li className="px-4 py-2">
                                <a href="/about">Tentang M-Learning</a>
                            </li>
                            <li className="px-4 py-2">
                                <a href="/profileguru">Kelola Guru</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px-4 py-2">
                                <a href="/dashboard">Materi Belajar</a>
                            </li>
                            <li className="px-4 py-2">
                                <a href="/about">Tentang M-Learning</a>
                            </li>
                            <li className="px-4 py-2">
                                <a href="/help">Bantuan</a>
                            </li>
                            <li className="px-4 py-2">
                                <a href="/dashboardguru">Portal Guru</a>
                            </li>
                        </>
                    )}
                </ul>
                {token ? (
                    <div
                        className="hidden lg:flex flex-row items-center gap-2"
                    >
                        <SearchComponent />
                        <PopoverUser profileGuru={profileGuru} profileSiswa={profileSiswa} handleLogout={handleLogout}/>
                    </div>
                ) : (
                    <div className="hidden lg:flex flex-row items-center gap-2">
                        <Button
                            as={Link}
                            href="/login"
                            className="bg-primer-500 rounded w-32 text-white font-semibold text-sm"
                        >
                            Masuk
                        </Button>
                        <Button
                            as={Link}
                            href="/register"
                            className="bg-white rounded w-32 text-accent-orange border-2 border-gray-200 font-semibold text-sm"
                        >
                            Daftar
                        </Button>
                    </div>
                )}
                {!isHide ? (
                    <button
                        onClick={handleHide}
                        className="flex items-center lg:hidden"
                    >
                        <Search size={20} />
                    </button>
                ) : (
                    <div
                        className="block lg:hidden w-[80%]"
                    >
                        <SearchComponent />
                    </div>
                )}
            </div>
        </nav >
    )
}
export default Navbar