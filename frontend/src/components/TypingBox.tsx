
interface TypingBoxProps {
    text?: string
}
const TypingBox = ({text} : TypingBoxProps) => {
    return (
        <div>
            {text}
        </div>
    )
}

export default TypingBox