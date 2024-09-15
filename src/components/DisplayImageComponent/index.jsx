import { Image } from "@nextui-org/react"
const DisplayImageComponent = ({url})=>{
    return(
        <Image
            alt="materi,discussion,or exam image"
            className=" rounded-none mt-3"
            src={url}
        />
    )
}
export default DisplayImageComponent