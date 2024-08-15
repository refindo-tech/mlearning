import Background from "@/components/Background"
import AsideCourse from '@/components/AsideCourse'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button, Image } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
const Stasiun = () => {
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen flex flex-row">
                <aside className="hidden lg:block w-full lg:w-[15%]">
                    <AsideCourse />
                </aside>
                <div className="lg:w-[85%] w-full">
                    <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
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
                                    <h3 className="font-normal text-xs lg:text-lg">Materi Minggu 1</h3>
                                </div>
                                <Image
                                    alt="icon-card"
                                    src="/assets/image/openedbooksm.png"
                                    className="block lg:hidden"
                                />
                            </div>
                        </div>
                        <div className="hidden lg:block absolute bottom-0 right-0 h-[200px] w-[250px] bg-[url('/assets/image/openedbook.png')] bg-no-repeat bg-cover bg-center">
                        </div>
                    </div>
                    <div className="relative w-full min-h-screen">
                        <Background />
                        <div className="relative top-0 w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
                            <h3 className="font-semibold text-xl">Simak materi berikut ini!</h3>
                            <div className="flex flex-col gap-5">
                                <div className="bg-sekunder-300 p-2 lg:p-3 rounded-lg">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas saepe facilis ea ipsam quae unde, magni similique quaerat non. Fugiat distinctio obcaecati minima aliquam eius suscipit pariatur, neque fugit error!
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio cumque molestias eos ut, commodi officia veritatis et maxime repellat similique, aliquid laborum a officiis culpa quos dolorem voluptate natus nihil?
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates hic aliquam, in sit omnis obcaecati expedita veritatis ipsam laboriosam aut recusandae iure rem delectus mollitia nostrum quos, ratione quam reiciendis.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, architecto. Aut illo tempora labore obcaecati dolores consectetur, blanditiis iusto odit qui quam quas! Laudantium impedit magni rerum id atque! Necessitatibus?
                                </div>
                                <div className="flex flex-col gap-5 items-end">
                                    <h5 className="font-semibold">Unduh Materi</h5>
                                    <Button
                                        size="sm"
                                        className="bg-primer-500 text-white h-10 w-[200px] flex text-md items-center text-center rounded"
                                    >
                                        Lanjut Belajar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Stasiun