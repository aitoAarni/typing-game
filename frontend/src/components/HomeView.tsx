import TypingBox from "./TypingBox"

const HomeView = () => {
    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
            }}
        >
            <TypingBox text="A little test text" />
        </div>
    )
}

export default HomeView
