'use client'
import { useState } from "react"
import { Image, Button, Link } from "@nextui-org/react"
import { X, Search } from "lucide-react"
import Icons from "@/components/Icons"
const Navbar = () => {
    const [isModal, setIsModal] = useState(false)
    const handleModal = () => {
        setIsModal(!isModal)
    }
    const { CircleElipsis } = Icons
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
                    <div className="absolute top-0 flex flex-col justify-between pt-[80px] left-0 w-[50vw] h-screen z-0 bg-white">
                        <div className="w-[90%] mx-auto">
                            <button
                                onClick={handleModal}
                                className="h-5 w-5 my-4 rounded flex items-center justify-center bg-black"
                            >
                                <X size={16} className="text-white" />
                            </button>
                            <ul className="flex flex-col justify-center gap-3 font-semibold  text-center">
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
                                    <a href="/">Portal Guru</a>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center mx-auto pb-4 gap-2">
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
                    </div>
                }
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
                <ul className="hidden lg:flex flex-row items-center gap-5 font-semibold">
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
                        <a href="/">Portal Guru</a>
                    </li>
                </ul>
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
                <button
                    className="flex items-center lg:hidden"
                >
                    <Search size={20} />
                </button>
            </div>
        </nav>
    )
}
export default Navbar