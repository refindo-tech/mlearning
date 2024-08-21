import { Image } from "@nextui-org/react"
const Background = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BackgroundOrnamen src="/assets/image/ornamen/ornamen (1).png" className="absolute bottom-0 left-0 w-[200px] h-[200px]" />
        <BackgroundOrnamen src="/assets/image/ornamen/ornamen (2).png" className="absolute top-0 left-0 w-[100px] h-[100px]" />
        <BackgroundOrnamen src="/assets/image/ornamen/ornamen (3).png" className="absolute bottom-[20vh] right-[5vw] w-[100px] h-[100px]" />
        <BackgroundOrnamen src="/assets/image/ornamen/ornamen (4).png" className="absolute top-[20vh] right-0 w-[100px] h-[100px]" />
    </div>
)

const BackgroundOrnamen = ({ src, className }) => (
    <div className={className}>
        <Image alt="ornamen" src={src} />
    </div>
)
export default Background