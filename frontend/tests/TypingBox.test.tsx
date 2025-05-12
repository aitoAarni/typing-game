import {render} from '@testing-library/react';
import TypingBox from '../src/components/TypingBox';

describe('TypingBox component tests', () => {
    test("TypingBox renders correctly", () => {
        const { getByText, getAllByText } = render(<TypingBox text='A test'/>);
        expect(getByText("A")).toBeInTheDocument();
        expect(getAllByText("t")).toHaveLength(2);
        expect(getByText("e")).toBeInTheDocument();
        expect(getByText("s")).toBeInTheDocument();
    });
    
});