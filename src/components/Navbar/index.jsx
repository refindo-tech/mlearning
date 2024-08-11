import { Image, Button, Link } from "@nextui-org/react"
const Navbar = () => {
    return (
        <nav className="sticky top-0 w-full h-[80px] bg-white flex items-center shadow-xl z-20">
            <div className="container mx-auto flex justify-between">
                <div className="flex flex-row gap-2">
                    <Image
                        alt="icon-card"
                        src="/assets/image/logosma3.png"
                        className="block h-[60px] w-[60px]"
                    />
                    <Image
                        alt="icon-card"
                        src="/assets/image/logologinpage.png"
                        className="block h-[60px] w-[233px]"
                    />
                </div>
                <ul className="flex flex-row items-center gap-5 font-semibold">
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
                <div className="flex flex-row items-center gap-2">
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
        </nav>
    )
}
export default Navbar