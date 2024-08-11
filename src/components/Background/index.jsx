import { Image } from "@nextui-org/react"
const Background = () => {
    return (
        <div className="relative min-h-screen w-full bg-white">
            <div
                className="block absolute bottom-0 left-0 w-[200px] h-[200px]"
            >
                <Image
                    alt="ornamen1"
                    src="/assets/image/ornamen/ornamen (1).png"
                />
            </div>
            <div
                className="block absolute top-0 left-0 w-[100px] h-[100px]"
            >
                <Image
                    alt="ornamen2"
                    src="/assets/image/ornamen/ornamen (2).png"
                />
            </div>
            <div
                className="block absolute bottom-[20vh] lg:bottom-[10vh] right-[5vw] lg:right-[10vw] w-[100px] h-[100px]"
            >
                <Image
                    alt="ornamen3"
                    src="/assets/image/ornamen/ornamen (3).png"
                />
            </div>
            <div
                className="block absolute top-[20vh] right-0 w-[100px] h-[100px]"
            >
                <Image
                    alt="ornamen4"
                    src="/assets/image/ornamen/ornamen (4).png"
                />
            </div>
        </div>
    )
}
export default Background