import Image from "next/image"
const Footer = () => {
    return (
        <footer className="bg-primer-300">
            <div className="h-[600px] flex flex-row items-center justify-center my-auto gap-[60px]">
                <Image
                    alt="logofooter"
                    height={120}
                    width={120}
                    src={'/assets/image/logosma3.png'}
                />
                <Image
                    alt="logofooter"
                    height={134}
                    width={330}
                    src={'/assets/image/logofooter.png'}
                />
                <div className="flex flex-col gap-10 text-white">
                    <a href="/">Materi Belajar</a>
                    <a href="/">Tentang M-Learning</a>
                    <a href="/">Bantuan</a>
                    <a href="/">Portal Guru</a>
                </div>
            </div>
            <div className="h-20 flex flex-row px-[100px] items-center justify-between bg-white">
                <Image
                    alt="logofooter"
                    height={60}
                    width={233}
                    src={'/assets/image/bottomfooter.png'}
                />
                <p className="text-black/50 text-center">
                    @2024 M Learning Website M Versi 1.0 <br />
                    Designed by team. Icons by Icons8
                </p>
            </div>
        </footer>
    )
}
export default Footer