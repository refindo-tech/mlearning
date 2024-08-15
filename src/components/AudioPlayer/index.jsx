const AudioPlayer = ({url}) => {
    return (
        <audio
            controls
            controlsList="nodownload"
            className="mx-auto my-3"
        >
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    )
}
export default AudioPlayer