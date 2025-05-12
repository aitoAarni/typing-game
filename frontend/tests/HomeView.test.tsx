import { render } from '@testing-library/react';
import HomeView from '../src/components/HomeView';

describe('Input works', () => {
    test("HomeView renders correctly", () => {
        const { getByText } = render(<HomeView />)
        expect(getByText("Welcome to the Typing App")).toBeInTheDocument() 
    })
})