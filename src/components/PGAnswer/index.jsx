'use client'
import { RadioGroup, Radio } from "@nextui-org/react"
import { useState, useEffect } from "react"
const PGAnswer = ({ optionanswer, handleAnswerQuestion, answeredQuestion }) => {
    const [options, setOptions] = useState(null)
    useEffect(() => {
        if (optionanswer) {
            setOptions(optionanswer.split('/'))
        }
    }, [optionanswer])
    return (
        <>
            {answeredQuestion ? (
                <RadioGroup
                    onValueChange={(value) =>
                        handleAnswerQuestion(value)
                    }
                    isDisabled={true}
                    value={`${answeredQuestion.answer}`}
                >
                    {options?.map((item, index) => (
                        <Radio value={item} key={index}>{item}</Radio>
                    ))}
                </RadioGroup>
            ) : (
                <RadioGroup
                    onValueChange={(value) =>
                        handleAnswerQuestion(value)
                    }
                >
                    {options?.map((item, index) => (
                        <Radio value={item} key={index}>{item}</Radio>
                    ))}
                </RadioGroup>
            )
            }
        </>
    )
}
export default PGAnswer