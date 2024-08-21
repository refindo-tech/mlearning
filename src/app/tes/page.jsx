import { Button, Image } from "@nextui-org/react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Aside from "@/components/Aside"

const Dashboard = () => {
    const subjects = [
        "Bahasa Indonesia", "Bahasa Inggris", "Matematika", "Biologi",
        "Fisika", "Kimia", "Sejarah", "Seni & Prakarya",
        "Kewarganegaraan", "Pendidikan Jasmani", "Agama & Budi Pekerti", "Pendidikan Kewirausahaan"
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex flex-row">
                <div className="relative flex flex-col w-full lg:w-3/4 border-r-2 border-gray-200">
                    <Background />
                    <div className="w-full p-10 z-10">
                        <div className="w-fit bg-gray-200 flex flex-row p-2 gap-x-2 rounded-2xl font-semibold mb-10">
                            <Button className="bg-white">Kelas 10</Button>
                            <Button className="bg-gray-200 text-gray-400">Kelas 11</Button>
                            <Button className="bg-gray-200 text-gray-400">Kelas 12</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {subjects.map((subject, index) => (
                                <SubjectCard key={index} subject={subject} />
                            ))}
                        </div>
                    </div>
                </div>
                <Aside className="hidden lg:block lg:w-1/4" />
            </div>
            <Footer className='mt-auto' />
        </div>
    )
}

const SubjectCard = ({ subject }) => (
    <Link href="/" className="flex flex-col p-2 gap-3 rounded-xl border-2 border-gray-200 bg-white">
        <div className="w-full h-[90px] flex items-center justify-end bg-primer-300 rounded">
            <Image
                alt="icon-card"
                src="/assets/image/iconcard.png"
                className="block h-[60px] w-[100px]"
            />
        </div>
        <div className="flex flex-col gap-2 h-[60px]">
            <h1 className="text-lg font-semibold">{subject}</h1>
            <h3 className="text-sm">Kelas 10</h3>
        </div>
    </Link>
)

const Background = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundImage src="/assets/image/ornamen/ornamen (1).png" className="absolute bottom-0 left-0 w-[200px] h-[200px]" />
        <BackgroundImage src="/assets/image/ornamen/ornamen (2).png" className="absolute top-0 left-0 w-[100px] h-[100px]" />
        <BackgroundImage src="/assets/image/ornamen/ornamen (3).png" className="absolute bottom-[20vh] right-[5vw] w-[100px] h-[100px]" />
        <BackgroundImage src="/assets/image/ornamen/ornamen (4).png" className="absolute top-[20vh] right-0 w-[100px] h-[100px]" />
    </div>
)

const BackgroundImage = ({ src, className }) => (
    <div className={className}>
        <Image alt="ornamen" src={src} />
    </div>
)

export default Dashboard