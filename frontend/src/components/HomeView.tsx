import TypingView from "./TypingView"

const HomeView = () => {
    return (
        <div
            data-testid="home-view"
            style={{
                display: "flex",
                flex: 1,
            
            }}
        >
        <TypingView />
        </div>
    )
}

export default HomeView
