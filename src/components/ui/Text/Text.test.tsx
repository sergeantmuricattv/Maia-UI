import { render, screen } from '@testing-library/react';
import Text from './Text';

describe('Text component', () => {
    it('renders the provided text content', () => {
        render(<Text>This is a test text.</Text>);
        expect(screen.getByText('This is a test text.')).toBeInTheDocument();
    });
});
