import { Image } from "@nextui-org/react"
const DisplayImageComponent = ({url})=>{
    return(
        <Image
            alt="materi,discussion,or exam image"
            src={url}
        />
    )
}
export default DisplayImageComponent