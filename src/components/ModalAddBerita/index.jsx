'use client'
import { useEffect, useState } from "react"
import { Button, Textarea, RadioGroup, Radio } from "@nextui-org/react"
import dynamic from "next/dynamic"
import TextEditor from "../Quill"
import { addNews } from "@/backend/fetchAPI"
import Icons from "../Icons"
const ModalAddBerita = ({ active, inActiveModalBerita }) => {
    const { AddIcon } = Icons
    const [isLoadSubmit, setIsLoadSubmit] = useState(false)
    const [textNews, setTextNews] = useState("")
    const [urlAudio, setUrlAudio] = useState(null)
    const handleUrlAudio = (value) => {
        setUrlAudio(value)
    }
    const handleTextNews = (value)=>{
        setTextNews(value)
    }
    const handleAddNews = ()=>{
        const payload = {
            text:textNews
        }
        const fetchAPI = async()=>{
            const response = await addNews(payload)
            if(response){
                window.location.reload()
            }
        }
        fetchAPI()
    }
    const handleIsLoadSubmit = ()=>{
        setIsLoadSubmit(true)
    }
    return (
        <>
            {active &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full py-10 flex items-center h-[100vh] bg-gray-500/30 z-[999]">
                    <div className="w-[90%] h-fit max-h-[90vh] mx-auto bg-white py-10 rounded-xl flex flex-col gap-5">
                        <div className="w-[90%] mx-auto flex flex-row items-center justify-end gap-[40%] text-primer-300 font-semibold">
                            <h1>Buat Berita</h1>
                            <Button
                                radius="sm"
                                isIconOnly={true}
                                className="bg-primer-500"
                                onPress={()=>{
                                    setTextNews(null)
                                    inActiveModalBerita()
                                }}
                            >
                                <div className="h-5 w-5 text-white font-semibold">x</div>
                            </Button>
                        </div>
                        <div className="w-[90%] mx-auto flex flex-col gap-5 overflow-y-auto overflow-x-hidden px-2 justify-between">
                            <div className="flex flex-col gap-5">
                                <h3>Materi dalam bentuk teks atau video</h3>
                                <TextEditor value={textNews} handleValue={handleTextNews} />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    radius="sm"
                                    isDisabled={textNews === '' || isLoadSubmit ? true : false}
                                    className="w-[260px] bg-primer-500 text-white"
                                    onPress={() => {
                                        handleIsLoadSubmit()
                                        handleAddNews(textNews)
                                    }}
                                >
                                    {isLoadSubmit?
                                        (
                                            <div className="loader"></div>
                                        ):
                                        (
                                            <p>Tambahkan</p>
                                        )
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}
export default ModalAddBerita