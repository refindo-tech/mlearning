const YoutubeVideo = ({idvideo}) => {
    return (
        <iframe
            src={`https://www.youtube.com/embed/${idvideo}`}
            className="mx-auto my-3 w-[272px] h-[166px] lg:w-[90%] lg:h-[480px]"
        >
        </iframe>
    )
}
export default YoutubeVideo