
import Background from "@/components/Background"
import AsideCourse from '@/components/AsideCourse'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import YoutubeVideo from  '@/components/YoutubeVideo'
import AudioPlayer from '@/components/AudioPlayer'
import PGAnswer from '@/components/PGAnswer'
import EssayAnswer from '@/components/EssayAnswer'
import { Button, Image, Checkbox } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
const Exam = () => {
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
                    <div className="relative w-full min-h-screen">
                        <Background />
                        <div className="relative top-0 w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
                            <div className="flex flex-col gap-3">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    <div className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] flex items-center justify-center text-xl text-center font-bold text-white bg-primer-500 rounded-full">
                                        <h3>1</h3>
                                    </div>
                                    <div className="w-full border-t-5 border-dashed border-primer-500"></div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="bg-sekunder-300 text-justify p-3 rounded-lg">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas saepe facilis ea ipsam quae unde, magni similique quaerat non. Fugiat distinctio obcaecati minima aliquam eius suscipit pariatur, neque fugit error!
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio cumque molestias eos ut, commodi officia veritatis et maxime repellat similique, aliquid laborum a officiis culpa quos dolorem voluptate natus nihil?
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates hic aliquam, in sit omnis obcaecati expedita veritatis ipsam laboriosam aut recusandae iure rem delectus mollitia nostrum quos, ratione quam reiciendis.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, architecto. Aut illo tempora labore obcaecati dolores consectetur, blanditiis iusto odit qui quam quas! Laudantium impedit magni rerum id atque! Necessitatibus?
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Checkbox radius="md">Option</Checkbox>
                                    <Checkbox radius="md">Option</Checkbox>
                                    <Checkbox radius="md">Option</Checkbox>
                                    <Checkbox radius="md">Option</Checkbox>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    <div className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] flex items-center justify-center text-xl text-center font-bold text-white bg-primer-500 rounded-full">
                                        <h3>2</h3>
                                    </div>
                                    <div className="w-full border-t-5 border-dashed border-primer-500"></div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="bg-sekunder-300 text-justify p-3 rounded-lg">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas saepe facilis ea ipsam quae unde, magni similique quaerat non. Fugiat distinctio obcaecati minima aliquam eius suscipit pariatur, neque fugit error!
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio cumque molestias eos ut, commodi officia veritatis et maxime repellat similique, aliquid laborum a officiis culpa quos dolorem voluptate natus nihil?
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates hic aliquam, in sit omnis obcaecati expedita veritatis ipsam laboriosam aut recusandae iure rem delectus mollitia nostrum quos, ratione quam reiciendis.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, architecto. Aut illo tempora labore obcaecati dolores consectetur, blanditiis iusto odit qui quam quas! Laudantium impedit magni rerum id atque! Necessitatibus?
                                        <AudioPlayer url={'/assets/tes.mp3'}/>
                                    </div>
                                </div>
                                <PGAnswer/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="w-full flex flex-row gap-2 items-center">
                                    <div className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] flex items-center justify-center text-xl text-center font-bold text-white bg-primer-500 rounded-full">
                                        <h3>3</h3>
                                    </div>
                                    <div className="w-full border-t-5 border-dashed border-primer-500"></div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="bg-sekunder-300 text-justify p-3 rounded-lg">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas saepe facilis ea ipsam quae unde, magni similique quaerat non. Fugiat distinctio obcaecati minima aliquam eius suscipit pariatur, neque fugit error!
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio cumque molestias eos ut, commodi officia veritatis et maxime repellat similique, aliquid laborum a officiis culpa quos dolorem voluptate natus nihil?
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates hic aliquam, in sit omnis obcaecati expedita veritatis ipsam laboriosam aut recusandae iure rem delectus mollitia nostrum quos, ratione quam reiciendis.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, architecto. Aut illo tempora labore obcaecati dolores consectetur, blanditiis iusto odit qui quam quas! Laudantium impedit magni rerum id atque! Necessitatibus?
                                        <YoutubeVideo idvideo={'tgbNymZ7vqY'}/>
                                    </div>
                                </div>
                                <EssayAnswer/>
                            </div>
                            <div className="flex justify-end">
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
export default Exam