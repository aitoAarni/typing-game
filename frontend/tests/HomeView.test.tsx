import { render } from '@testing-library/react';
import HomeView from '../src/components/HomeView';

describe('HomeView page tets', () => {
    test("HomeView renders correctly", () => {
        const { getByText } = render(<HomeView />)
        expect(getByText("Welcome to the Typing App")).toBeInTheDocument() 
    })
    test("HomeView has a typing box", () => {
        const { getByTestId } = render(<HomeView />)
        expect(getByTestId("typing-box")).toBeInTheDocument()
    })
})
