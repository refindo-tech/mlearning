'use client'
import { RadioGroup, Radio } from "@nextui-org/react"
import { useState, useEffect } from "react"
const PGAnswer = ({ optionanswer, handleAnswerQuestion }) => {
    const [options, setOptions] = useState(null)
    useEffect(() => {
        if (optionanswer) {
            setOptions(optionanswer.split('/'))
        }
    }, [optionanswer])
    return (
            <RadioGroup
                onValueChange={(value)=>
                    handleAnswerQuestion(value)
                }
            >
                {options?.map((item, index) => (
                    <Radio value={item} key={index}>{item}</Radio>
                ))}
                {/* <Radio value="buenos-aires">Buenos Aires</Radio>
            <Radio value="sydney">Sydney</Radio>
            <Radio value="san-francisco">San Francisco</Radio>
            <Radio value="london">London</Radio>
            <Radio value="tokyo">Tokyo</Radio> */}
            </RadioGroup>
    )
}
export default PGAnswer