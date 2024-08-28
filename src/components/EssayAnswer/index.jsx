import { Textarea } from "@nextui-org/react"
const EssayAnswer = ({handleAnswerQuestion}) => {
    return (
        <Textarea
            variant="bordered"
            size="sm"
            minRows={1}
            maxRows={30}
            placeholder="Tulis jawabanmu disini"
            className="rounded-lg focus:outline-none border-primer-300 border-1 text-accent-orange"
            onValueChange={(value)=>{
                handleAnswerQuestion(value)
            }}
        />
    )
}
export default EssayAnswer