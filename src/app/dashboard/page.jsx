import { Button, Image } from "@nextui-org/react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
import Aside from "@/components/Aside"

const Dashboard = () => {
    // lg:pl-[100px] lg:pr-5
    // const Date = 
    return (
        <>
            <Navbar/>
            <div className="flex flex-row min-h-screen mb-10">
                <div className="relative object-fill flex flex-col w-full lg:basis-3/4 border-r-2 border-gray-200 z-0">
                    <Background />
                    <div className="w-full absolute top-0 left-0 flex flex-col gap-10 py-10 z-10 lg:pl-[50px] lg:pr-5">
                        <div className="w-fit bg-gray-200 flex flex-row p-2 gap-x-2 rounded-2xl font-semibold">
                            <Button className="bg-white">Kelas 10</Button>
                            <Button className="bg-gray-200 text-gray-400">Kelas 11</Button>
                            <Button className="bg-gray-200 text-gray-400">Kelas 11</Button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                            <Link
                                href="/"
                                className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200"
                            >
                                <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
                                    <Image
                                        alt="icon-card"
                                        src="/assets/image/iconcard.png"
                                        className="block h-[60px] w-[100px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 h-[60px]">
                                    <h1 className="text-lg font-semibold">Bahasa Indonesia</h1>
                                    <h3 className="text-sm">Kelas 10</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <Aside/>
            </div>
            <Footer />
        </>
    )
}
export default Dashboard 