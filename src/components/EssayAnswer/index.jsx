import { Textarea } from "@nextui-org/react"
const EssayAnswer = ({ handleAnswerQuestion, answeredQuestion }) => {
    return (
        <>{
            answeredQuestion ? (
                <Textarea
                    variant="bordered"
                    isDisabled={true}
                    value={`${answeredQuestion.answer}`}
                    maxRows={30}
                    placeholder="Tulis jawabanmu disini"
                    className="rounded-xl focus:outline-none border-primer-300 border-1 text-accent-orange"
                    onValueChange={(value) => {
                        handleAnswerQuestion(value)
                    }}
                />
            ) : (
                <Textarea
                    variant="bordered"
                    maxRows={30}
                    isDisabled={false}
                    placeholder="Tulis jawabanmu disini"
                    className="rounded-xl focus:outline-none border-primer-300 border-1 text-accent-orange"
                    onValueChange={(value) => {
                        handleAnswerQuestion(value)
                    }}
                />
            )
        }
        </>
    )
}
export default EssayAnswer