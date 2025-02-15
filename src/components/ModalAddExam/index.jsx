'use client'
import { useEffect, useState } from "react"
import { Button, Textarea, RadioGroup, Radio } from "@nextui-org/react"
import dynamic from "next/dynamic"
import TextEditor from "../Quill"
import Icons from "../Icons"
const ModalAddExam = ({
    active,
    inActiveModalExam ,
    index,
    handleAddListQuestion,
    }) => {
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
const arrayToString = ()=>{
            let result = ""
            for(let i=0; i<listOptionAnswer.length; i++){
                result += `${listOptionAnswer[i]}/`
            }
            return result
        }
    const [inputQuestion, setInputQuestion] = useState(null)
    const handleValueInputQuestion = (value) =>{
        setInputQuestion(value)
    }
    const resetStateInput=()=>{
        setInputQuestion(null)
    }
    const handleSave = ()=>{
        let payload = {
            text:inputQuestion,
            correctAnswer:correctAnswer
        }
        if(listOptionAnswer.length !== 0){
            payload={
            text:inputQuestion,
            optionanswer: arrayToString(),
            correctAnswer:correctAnswer
            }
        }
        handleAddListQuestion(index, payload)
    }
    return (
        <>
            {active &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full py-10 flex items-center h-[100vh] bg-gray-500/30 z-[999]">
                    <div className="w-[90%] h-[90vh] mx-auto bg-white py-10 rounded-xl flex flex-col gap-5">
                        <div className="flex flex-col">
                            <div className="lg:hidden w-[90%] mx-auto flex justify-end">
                                <Button
                                    radius="sm"
                                    isIconOnly={true}
                                    className="bg-primer-500"
                                    onPress={()=>{
                                        inActiveModalExam()
                                        resetStateInput()
                                    }}
                                >
                                    <div className="h-5 w-5 text-white font-semibold">x</div>
                                </Button>
                            </div>
                            <div className="w-[90%] mx-auto flex flex-row items-end justify-end text-primer-300 font-semibold">
                                <h1 className="w-full flex justify-center">Buat Exam</h1>
                                <div className="hidden lg:block ">
                                    <Button
                                        radius="sm"
                                        isIconOnly={true}
                                        className="bg-primer-500"
                                        onPress={()=>{
                                            inActiveModalExam()
                                            resetStateInput()
                                        }}
                                    >
                                        <div className="h-5 w-5 text-white font-semibold">x</div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-[90%] mx-auto flex flex-col gap-5 overflow-y-scroll overflow-x-hidden px-2">
                            <div className="flex flex-col gap-5">
                                <h3>Pertanyaan dalam bentuk teks</h3>
                                <TextEditor value={inputQuestion} handleValue={handleValueInputQuestion}/>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <h3>Pilih opsi jawaban</h3>
                                <RadioGroup
                                    orientation="horizontal"
                                    onValueChange={(value) => handleOption(value)}
                                >
                                    <Radio value='pg'>Pilihan Ganda</Radio>
                                    <Radio value='essay'>Essay</Radio>
                                </RadioGroup>
                            </div>
                            {option && option === 'essay' &&
                                <div className="flex flex-col gap-5 mb-16">
                                    <h3>Jawaban benar</h3>
                                    <Textarea
                                        variant="bordered"
                                        radius="sm"
                                        placeholder="Tambahkan text"
                                        minRows={4}
                                        onValueChange={(value)=>handleCorrectAnswer(value)}
                                    />
                                </div>
                            }
                            {option && option === 'pg' &&
                                <div>
                                    <h5 className="font-semibold">Buat jawaban</h5>
                                    {correctAnswer && <p>{correctAnswer}</p>}
                                    <RadioGroup
                                        color="success"
                                        onValueChange={(value) => handleCorrectAnswer(value)}
                                        className="pl-2"
                                    >
                                        {listOptionAnswer && listOptionAnswer?.map((value, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-2"
                                            >
                                                <Radio value={value}>
                                                </Radio>
                                                <input
                                                    type="text"
                                                    placeholder="Masukan nilai"
                                                    className="border-0 focus:outline-none"
                                                    onChange={(e) => handleValueOption(index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {listOptionAnswer.length < 4 && <Button
                                        variant="bordered"
                                        disableAnimation={true}
                                        className="border-0 border-white text-gray-700/50"
                                        onPress={createNewOption}
                                    >
                                        Tambah jawaban baru
                                    </Button>}
                                </div>
                            }
                            <div className="flex justify-end">
                                <Button
                                    radius="sm"
                                    className="w-[260px] bg-primer-500 text-white"
                                    onPress={()=>{
                                        handleSave()
                                        resetStateInput()
                                        inActiveModalExam()
                                    }}
                                >
                                    Simpan
                                </Button>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}
export default ModalAddExam