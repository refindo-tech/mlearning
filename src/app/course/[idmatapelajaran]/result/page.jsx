import Background from "@/components/Background"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AsideCourse from "@/components/AsideCourse"
import { Button, Image } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
const ResultCoursePage = () => {
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex fllex-row">
                <aside className="hidden lg:block w-full lg:w-[15%]">
                    <AsideCourse />
                </aside>
                <div className="lg:w-[85%] w-full">
                    <div className="h-fit static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                        <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                            <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                                <button
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                            <div className="flex flex-row items-end justify-between">
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    <h1 className="font-bold text-xl lg:text-3xl">Paragraf Induktif dan Deduktif</h1>
                                </div>
                                <Image
                                    alt="icon-card"
                                    src="/assets/image/openedbooksm.png"
                                    className="block lg:hidden"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full min-h-screen flex flex-col gap-4 py-10">
                        <Background />
                        <div className='relative w-[90%] mx-auto flex flex-col gap-4 z-10'>
                            <h1 className='text-xl font-bold'>Tentang Akun</h1>
                            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                <div className='h-[300px] flex flex-row items-center pl-5 lg:pl-10 gap-10 rounded-lg border-2 border-gray-200'>
                                    <div className='h-[100px] w-[100px] flex items-center justify-center rounded-full bg-accent-orange'>
                                        <Image
                                            alt="avatar"
                                            src="/assets/image/avatar.png"
                                            className="block h-[88px] w-[88px]"
                                        />
                                    </div>
                                    <h3 className='text-2xl font-bold'>Michele Jordan</h3>
                                </div>
                                <div className='h-[300px] flex flex-col justify-center gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>NISN</h3>
                                        <p className='text-lg font-bold text-accent-orange'>0000456745674567</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Kelas</h3>
                                        <p className='text-lg font-bold text-accent-orange'>10 A</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Mata Pelajaran</h3>
                                        <p className='text-lg font-bold text-accent-orange'>Bahasa Indonesia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='relative w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 z-10'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-xl font-bold'>Status Belajar</h1>
                                <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Nilai stasiun 1</h3>
                                        <p className='text-lg font-bold text-accent-green'>90</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Nilai stasiun 2</h3>
                                        <p className='text-lg font-bold text-accent-green'>90</p>
                                    </div><div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Nilai stasiun 3</h3>
                                        <p className='text-lg font-bold text-accent-green'>90</p>
                                    </div><div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Nilai stasiun 4</h3>
                                        <p className='text-lg font-bold text-accent-green'>90</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-xl font-bold'>Informasi Lainnya</h1>
                                <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>Joko Kusumo</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Pekerjaan Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>Pegawai Swasta</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>No. Telepon Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>xxxxxxxxxxx</p>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        <h3 className='text-lg font-bold'>Alamat Orang Tua/Wali</h3>
                                        <p className='text-lg font-bold text-accent-orange'>Jl. Suko Mulyo No.11</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-xl font-bold'>Rata-rata nilai</h1>
                                <div className='flex flex-col py-4 gap-4 rounded-lg border-2 border-gray-200'>
                                    <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                                        {/* <h3 className='text-lg font-bold'>Nilai stasiun 1</h3> */}
                                        <p className='text-lg font-bold text-accent-green'>90</p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-primer-500 text-white h-10 w-[200px] flex text-md items-center text-center rounded"
                                >
                                    Kumpulkan
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default ResultCoursePage