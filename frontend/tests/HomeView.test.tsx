import { render } from '@testing-library/react';
import HomeView from '../src/components/HomeView';

describe('HomeView page tets', () => {
    test("HomeView renders correctly", () => {
        const { getByTestId } = render(<HomeView />)
        expect(getByTestId("home-view")).toBeInTheDocument() 
    })
})
