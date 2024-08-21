import { Spinner } from "@nextui-org/react"
const Loading = ()=>{
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center gap-5 bg-white">
            <Spinner size="md" color="primer-300" className="primer-300"/>
            <h3 className="text-lg text-center text-primer-300 font-semibold">Loading...</h3>
        </div>
    )
}
export default Loading