import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Background from "@/components/Background"
const HelpPage = () => {
    return (
        <>
            <Navbar />
            <div className="h-[50vh] w-full flex items-center bg-[url('/assets/image/heroonboarding.png')] bg-cover bg-no-repeat bg-center">
            </div>
            <div className="h-[100px] flex items-center text-center justify-center border-b-2 border-gray-200">
                <h3 className="font-bold text-[32px]">Pusat Bantuan</h3>
            </div>
            <div className="relative min-h-screen">
                <Background />
                <div className=" w-full z-10">
                    <div className="container mx-auto py-10 text-center text-base font-semibold">
                        <p>
                            Layanan Bantuan:  mlearning.help@gmail.com
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default HelpPage