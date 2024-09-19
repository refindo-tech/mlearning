'use client'
import Background from "@/components/Background"
import Loading from "@/app/loading.jsx"
import AsideTeacher from '@/components/AsideTeacher'
import Navbar from "@/components/Navbar"
import AudioPlayer from "@/components/AudioPlayer"
import DisplayImageComponent from "@/components/DisplayImageComponent"
import YoutubeVideo from "@/components/YoutubeVideo"
import Footer from "@/components/Footer"
import { Button, Image, Input } from "@nextui-org/react"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import Icons from '../Icons'
const AddMateri = ({ detailMapel, handleActiveInputTopic, isInputActive, stasiun, handleChevronRight, handleChevronLeft }) => {
    const { AddIcon } = Icons
    return (
        <div className=" w-[85%] border-l-2 border-gray-200">
            <div className="h-fit lg:h-[50vh] static lg:relative py-5 lg:py-10 bg-primer-400 border-b-5 border-sekunder-300">
                <div className="lg:w-[90%] w-full h-full lg:h-fit justify-between lg:justify-start mx-auto flex flex-col gap-7">
                    <div className="w-[90%] lg:w-full mx-auto lg:mx-0 flex flex-row justify-between">
                        <button
                            // onClick={handleBack}
                            onClick={handleChevronLeft}
                            className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            // onClick={handleNextStep}
                            onClick={handleChevronRight}
                            className="h-10 w-10 flex  items-center justify-center rounded-full bg-white"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                    <div className="flex flex-row items-end justify-between">
                        {detailMapel ?
                            (
                                <>{detailMapel.id ?
                                    (
                                        <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                            <h1 className="font-bold text-xl lg:text-3xl">{detailMapel.topic}</h1>
                                            <h3 className="font-normal text-xs lg:text-lg">{detailMapel.stasiun}</h3>
                                        </div>
                                    ) :
                                    (
                                        <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                            {detailMapel.MataPelajaran.name && <h1 className="font-bold text-xl lg:text-3xl">{detailMapel.MataPelajaran.name}</h1>}
                                            {detailMapel.MataPelajaran.kelas && <h3 className="font-normal text-xs lg:text-lg">{detailMapel.MataPelajaran.kelas}</h3>}
                                        </div>
                                    )
                                }
                                </>
                            ) :
                            (
                                <div className="flex flex-col gap-1 lg:gap-3 text-white pl-[5vw] pb-2 lg:pb-0 lg:pl-0">
                                    <div
                                        className="flex items-center gap-1 h-10 w-fit border-3 border-dashed border-white rounded-lg px-2"
                                    >
                                        <input
                                            // variant="bordered"
                                            placeholder="Tambah judul"
                                            disabled={isInputActive ? true : false}
                                            className="w-[105px] text-white placeholder:text-white bg-transparent focus:outline-none"
                                        />
                                        <Button
                                            isIconOnly={true}
                                            variant="bordered"
                                            onPress={handleActiveInputTopic}
                                            className="h-5 w-5 border-0"
                                        >
                                            <AddIcon />
                                        </Button>
                                    </div>
                                    <h3 className="font-normal text-xs lg:text-lg">{stasiun.toUpperCase()}</h3>
                                </div>
                            )
                        }
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
            <div className="relative min-h-screen">
                <Background />
                {detailMapel ?
                    (
                        <>{detailMapel.id ?
                            (
                                <div className="relative top-0 w-[90%] flex flex-col gap-5 mx-auto py-10 z-10">
                                    <h3 className="font-semibold text-xl">Simak materi berikut ini!</h3>
                                    <div className="flex flex-col gap-5">
                                        {detailMapel &&
                                            <div className="bg-sekunder-300 p-2 lg:p-3 rounded-lg text-justify">
                                                <div className="indent-3" dangerouslySetInnerHTML={{ __html: detailMapel.detailmateri }} />
                                                <div className="flex flex-col justify-center items-center">
                                                    {detailMapel.urlaudio && <AudioPlayer url={`${detailMapel.urlaudio}`} />}
                                                    {detailMapel.urlimage && <DisplayImageComponent url={`${detailMapel.urlimage}`} />}
                                                    {detailMapel.urlvideo && <YoutubeVideo urlvideo={detailMapel.urlvideo} />}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ) :
                            (
                                <>{detailMapel.MataPelajaran.description ?
                                    (
                                        <div className="p-10 indent-8 text-justify z-10" dangerouslySetInnerHTML={{ __html: detailMapel.MataPelajaran.description }} />
                                    ) :
                                    (
                                        <div className="w-[90%] mx-auto py-10 flex flex-col gap-10">
                                            <Button
                                                variant="bordered"
                                                className="h-20 border-3 border-dashed border-primer-500 flex-row justify-center items-center font-semibold"
                                            >
                                                <h3>Tambah materi pengenalan mata pelajaran</h3>
                                                <div className="h-5 w-5 flex items-center justify-center text-primer-500">
                                                    <AddIcon fill={'#110B63'} />
                                                </div>
                                            </Button>
                                            <div className="flex justify-end z-10">
                                                <Button
                                                    radius="sm"
                                                    className="w-[260px] bg-primer-500 text-white font-semibold"
                                                >
                                                    <h3>Simpan</h3>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )
                        }
                        </>
                    ) : (
                        <div className="w-[90%] mx-auto py-10 flex flex-col gap-10">
                            <Button
                                variant="bordered"
                                className="h-20 border-3 border-dashed border-primer-500 flex-row justify-center items-center font-semibold"
                            >
                                <h3>Tambah materi</h3>
                                <div className="h-5 w-5 flex items-center justify-center text-primer-500">
                                    <AddIcon fill={'#110B63'} />
                                </div>
                            </Button>
                            <div className="flex justify-end z-10">
                                <Button
                                    radius="sm"
                                    className="w-[260px] bg-primer-500 text-white font-semibold"
                                >
                                    <h3>Simpan</h3>
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}
export default AddMateri