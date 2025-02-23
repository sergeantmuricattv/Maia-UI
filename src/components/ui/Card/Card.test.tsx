import { render, screen } from '@testing-library/react';
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from './Card';

describe('Card', () => {
    it('renders card with all its parts', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle subtitle="Subtitle">Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        );

        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Subtitle')).toBeInTheDocument();
        expect(screen.getByText('Card Description')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
        render(
            <Card variant="elevated" data-testid="card">
                <CardContent>Content</CardContent>
            </Card>
        );

        const card = screen.getByTestId('card');
        expect(card).toHaveClass('shadow-lg');
    });

    it('shows loading spinner when loading prop is true', () => {
        render(
            <Card loading data-testid="card">
                <CardContent>Content</CardContent>
            </Card>
        );

        expect(screen.getByTestId('card')).toContainElement(
            screen.getByRole('status')
        );
    });

    it('renders footer with divider when divider prop is true', () => {
        render(
            <Card>
                <CardFooter divider data-testid="footer">
                    Footer Content
                </CardFooter>
            </Card>
        );

        const footer = screen.getByTestId('footer');
        expect(footer).toHaveClass('border-t');
    });
});