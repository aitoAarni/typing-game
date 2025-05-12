import { useEffect, useState } from "react"

interface TypingBoxProps {
    text?: string
}
const TypingBox = ({text} : TypingBoxProps) => {
    const [letterList, setLetterList] = useState<string[]>([])
    useEffect(() => {
        if (text?.length) {
            setLetterList(text?.split(''))
        }
    }, [text])
    return (
        <div>
            {text} <br />
            {letterList.map((letter, index) => {
                return (
                    <span key={index} >
                        {letter}
                    </span>
                )
            })}
        </div>
    )
}



export default TypingBox