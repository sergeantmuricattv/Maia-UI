import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading component', () => {
    it('renders the correct heading level and text', () => {
        render(<Heading as="h2">Test Heading</Heading>);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Test Heading');
    });
});
