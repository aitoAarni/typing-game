import {render} from '@testing-library/react';
import TypingBox from '../src/components/TypingBox';

describe('TypingBox component tests', () => {
    test.only("TypingBox renders correctly", () => {
        const { getByText } = render(<TypingBox text='A little test text'/>);
        expect(getByText("A little test text")).toBeInTheDocument();
    });
});