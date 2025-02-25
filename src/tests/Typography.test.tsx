import { render, screen } from '@testing-library/react';
import { Heading } from '../components/typography/Heading.tsx';
import { Text } from '../components/typography/Text.tsx';
import { Code } from '../components/typography/Code.tsx';
import { Quote } from '../components/typography/Quote.tsx';
import { Keyboard } from '../components/typography/Keyboard.tsx';

describe('typography Components', () => {
    describe('Heading', () => {
        it('renders different heading levels', () => {
            render(
                <>
                    <Heading level="h1">H1</Heading>
                    <Heading level="h2">H2</Heading>
                </>
            );
            expect(screen.getByText('H1').tagName).toBe('H1');
            expect(screen.getByText('H2').tagName).toBe('H2');
        });

        it('applies variants correctly', () => {
            render(<Heading variant="primary">Primary</Heading>);
            expect(screen.getByText('Primary')).toHaveClass('text-primary');
        });
    });

    describe('Text', () => {
        it('renders with different variants', () => {
            render(
                <Text variant="muted" data-testid="text">
                    Muted text
                </Text>
            );
            expect(screen.getByTestId('text')).toHaveClass('text-muted-foreground');
        });

        it('applies size classes', () => {
            render(
                <Text size="xl" data-testid="text">
                    Large text
                </Text>
            );
            expect(screen.getByTestId('text')).toHaveClass('text-xl');
        });
    });

    describe('Code', () => {
        it('renders inline code by default', () => {
            render(<Code>npm install</Code>);
            expect(screen.getByText('npm install').tagName).toBe('CODE');
        });

        it('renders block code when specified', () => {
            render(<Code block>const x = 1;</Code>);
            expect(screen.getByText('const x = 1;').tagName).toBe('PRE');
        });
    });

    describe('Quote', () => {
        it('renders quote with author', () => {
            render(
                <Quote author="Test Author">Test quote</Quote>
            );
            expect(screen.getByText('Test quote')).toBeInTheDocument();
            expect(screen.getByText('— Test Author')).toBeInTheDocument();
        });

        it('applies variant styles', () => {
            render(
                <Quote variant="primary" data-testid="quote">
                    Primary quote
                </Quote>
            );
            expect(screen.getByTestId('quote')).toHaveClass('border-primary');
        });
    });

    describe('Keyboard', () => {
        it('renders keyboard shortcut', () => {
            render(<Keyboard>Ctrl</Keyboard>);
            expect(screen.getByText('Ctrl').tagName).toBe('KBD');
        });

        it('applies combo styles when specified', () => {
            render(<Keyboard combo>C</Keyboard>);
            expect(screen.getByText('C')).toHaveClass('mx-0.5');
        });
    });
});
