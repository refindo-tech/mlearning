import { Image } from "@nextui-org/react"
const Footer = () => {
    return (
        <footer className="bg-primer-300">
            <div className="h-[202px] lg:h-[600px] w-[90%] mx-auto flex flex-row items-center justify-center my-auto gap-[60px]">
                <Image
                    alt="logofooter"
                    src={'/assets/image/logosma3.png'}
                    className="block h-[40px] w-[40px] lg:h-[120px] lg:w-[120px]"
                />
                <Image
                    alt="logofooter"
                    src={'/assets/image/logofooter.png'}
                    className="block h-[26px] w-[66px] lg:h-[134px] lg:w-[330px]"
                />
                <div className="flex flex-col text-xs lg:text-lg gap-2 lg:gap-10 text-white">
                    <a href="/">Materi Belajar</a>
                    <a href="/">Tentang M-Learning</a>
                    <a href="/">Bantuan</a>
                    <a href="/">Portal Guru</a>
                </div>
            </div>
            <div className="h-20 flex flex-row items-center justify-between mx-auto px-4 bg-white text-xs lg:tex-lg">
                <Image
                    alt="logofooter"
                    src={'/assets/image/bottomfooter.png'}
                    className="block h-[24px] w-[58px] lg:h-[60px] lg:w-[233px]"
                />
                <p className="text-black/50 text-center">
                    @2024 M-Learning v.1.0
                </p>
            </div>
        </footer>
    )
}
export default Footer