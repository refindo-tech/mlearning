const YoutubeVideo = ({urlvideo}) => {
    const getId = (urlvideo)=>{
        if(urlvideo){
            const url = urlvideo
            if(url.includes('youtu.be')){
                const section = url.split('/')[3]
                const getId = section.split('?si=')[0]
                return `https://www.youtube.com/embed/${getId}`
            }
            else if(url.includes('youtube.com')){
                const getId = url.split('?v=')[1]
                return `https://www.youtube.com/embed/${getId}`
            }
        }
    }
    return (
        <iframe
            src={getId(urlvideo)}
            className="mx-auto my-3 w-[272px] h-[166px] lg:w-[90%] lg:h-[480px]"
        >
        </iframe>
    )
}
export default YoutubeVideo