'use client'
import { useEffect, useState } from "react"
import { Button, Textarea, RadioGroup, Radio } from "@nextui-org/react"
import dynamic from "next/dynamic"
import TextEditor from "../Quill"
import Icons from "../Icons"
const ModalAddDiskusi = ({ active, inActiveModalExam, saveMateri, handleDiskusi }) => {
    const { AddIcon } = Icons
    const [option, setOption] = useState(null)
    const [listOptionAnswer, setListOptionAnswer] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState(null)
    useEffect(() => {
        if (option === 'essay') {
            setListOptionAnswer([])
        }
    }, [option])
    const handleValueOption = (index, value) => {
        setListOptionAnswer((prev) => {
            const option = [...prev]
            option[index] = value
            return option
        })
    }
    const createNewOption = () => {
        setListOptionAnswer((prev) => [...prev, ''])
    }
    const handleOption = (value) => {
        setOption(value)
    }
    const handleCorrectAnswer = (value) => {
        setCorrectAnswer(value)
    }
    const [input, setInput] = useState("")
    const [urlAudio, setUrlAudio] = useState(null)
    const handleUrlAudio = (value) => {
        setUrlAudio(value)
    }
    const handleInput = (e) => {
        setInput(e)
    }
    return (
        <>
            {active &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full py-10 flex items-center h-[100vh] bg-gray-500/30 z-[999]">
                    <div className="w-[90%] h-fit max-h-[90vh] mx-auto bg-white py-10 rounded-xl flex flex-col gap-5">
                        <div className="flex flex-col">
                            <div className="lg:hidden w-[90%] mx-auto flex justify-end">
                                <Button
                                    radius="sm"
                                    isIconOnly={true}
                                    className="bg-primer-500"
                                    onPress={inActiveModalExam}
                                >
                                    <div className="h-5 w-5 text-white font-semibold">x</div>
                                </Button>
                            </div>
                            <div className="w-[90%] mx-auto flex flex-row items-end justify-end text-primer-300 font-semibold">
                                <h1 className="w-full flex justify-center">Buat Materi</h1>
                                <div className="hidden lg:block ">
                                    <Button
                                        radius="sm"
                                        isIconOnly={true}
                                        className="bg-primer-500"
                                        onPress={inActiveModalExam}
                                    >
                                        <div className="h-5 w-5 text-white font-semibold">x</div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[90%] mx-auto flex flex-col gap-5 overflow-y-auto overflow-x-hidden px-2 justify-between">
                            <div className="flex flex-col gap-5">
                                <h3>Materi dalam bentuk teks atau video</h3>
                                <TextEditor value={input} handleValue={handleInput} />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    radius="sm"
                                    isDisabled={input === '' ? true : false}
                                    className="w-[260px] bg-primer-500 text-white"
                                    onPress={() => {
                                        handleDiskusi(input, urlAudio)
                                        inActiveModalExam()
                                    }}
                                >
                                    Tambahkan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}
export default ModalAddDiskusi