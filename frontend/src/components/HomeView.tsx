import TypingBox from "./TypingBox"

const testText = `This is 
a   test, `
const HomeView = () => {
    return (
        <div
            data-testid="home-view"
            style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                padding: 200
            
            }}
        >
            <TypingBox text={testText} />
        </div>
    )
}

export default HomeView
