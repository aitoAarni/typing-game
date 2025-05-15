import { render, screen, fireEvent, act } from "@testing-library/react"
import TypingBox from "../src/components/TypingBox"

const sampleText = "hello world"

describe("TypingBox component tests", () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })
    test("renders empty container if no text", () => {
        render(<TypingBox />)
        const container = screen.getByTestId("typing-container")
        expect(container).toBeInTheDocument()
    })

    test("renders text as split characters", () => {
        render(<TypingBox text={sampleText} />)
        const allChars = sampleText.replace(/\s/g, "").split("")
        allChars.forEach(char => {
            expect(screen.getAllByText(char)[0]).toBeInTheDocument()
        })
    })

    test("shows untyped characters initially", () => {
        render(<TypingBox text={sampleText} />)
        const grayChars = screen.getAllByTestId("char-untyped")

        // Each char + 1 space between "hello" and "world"
        expect(grayChars.length).toBe(sampleText.length)
    })

    test("typing correct characters updates style to correct", () => {
        render(<TypingBox text="a" />)
        act(() => {
            fireEvent.keyDown(window, { key: "a" })
        })
        expect(screen.getByTestId("char-correct")).toBeInTheDocument()
    })

    test("typing incorrect characters updates style to red", () => {
        render(<TypingBox text="a" />)
        act(() => {
            fireEvent.keyDown(window, { key: "b" })
        })
        expect(screen.getByTestId("char-incorrect")).toBeInTheDocument()
    })

    test("backspace undoes last typed character", () => {
        render(<TypingBox text="a" />)
        act(() => {
            fireEvent.keyDown(window, { key: "b" })
            fireEvent.keyDown(window, { key: "Backspace" })
        })
        expect(screen.getByTestId("char-untyped")).toBeInTheDocument()
    })


    test.only("caret moves with each typed character", () => {
        render(<TypingBox text="abc" />)
        const getCaretIndex = () =>
            screen
                .getAllByTestId(/^(caret|no-caret)$/)
                .findIndex(el => el.dataset.testid === "caret")

        const initialIndex = getCaretIndex()
        expect(initialIndex).toEqual(0)
        act(() => fireEvent.keyDown(window, { key: "a" }))
        const afterFirstKey = getCaretIndex()
        expect(afterFirstKey).toEqual(initialIndex + 1)
        
        act(() => fireEvent.keyDown(window, { key: "b" }))
        const afterSecondKey = getCaretIndex()
        expect(afterSecondKey).toEqual(initialIndex + 2)
    })

    test("scrollOffset is updated when caret moves too low", () => {
        const longText = Array(50).fill("word").join(" ")
        render(<TypingBox text={longText} />)

        // Simulate pressing a bunch of correct keys to move caret down multiple lines
        act(() => {
            for (let i = 0; i < 40; i++) {
                fireEvent.keyDown(window, { key: "w" })
                fireEvent.keyDown(window, { key: "o" })
                fireEvent.keyDown(window, { key: "r" })
                fireEvent.keyDown(window, { key: "d" })
                fireEvent.keyDown(window, { key: " " })
            }
        })

        // Let transitions complete
        act(() => {
            jest.runAllTimers()
        })

        const container = document.querySelector(`.container`)
        const inner = container?.querySelector(`.inner`)
        expect(inner?.getAttribute("style")).toMatch(
            /transform: translateY\(-\d+px\)/
        )
    })
})
