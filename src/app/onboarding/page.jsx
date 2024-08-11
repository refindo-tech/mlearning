import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
const Homepage = ()=>{
    return(
        <>
            <Navbar/>
            <div className="h-screen w-full flex items-center bg-[url('/assets/image/heroonboarding.png')] bg-cover bg-no-repeat bg-center">
                <div className="mx-auto flex flex-col p-[30px] text-center bg-white gap-5 text-indigo-900">
                    <h1 className="text-[50px] font-sans font-semibold">Selamat Datang di M-Learning</h1>
                    <h3 className='text-2xl'>Portal belajar online interaktif siswa</h3>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Homepage