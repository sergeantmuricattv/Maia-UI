import { render, screen } from '@testing-library/react';
import Container from './Container';
import { Box } from './Box';
import { Stack } from './Stack';
import { Flex } from './Flex';
import { Section } from './Section';
import { AspectRatio } from './AspectRatio';

describe('Layout Components', () => {
    describe('Container', () => {
        it('renders with different sizes', () => {
            render(<Container size="sm" data-testid="container">Content</Container>);
            expect(screen.getByTestId('container')).toHaveClass('max-w-screen-sm');
        });

        it('applies padding variants', () => {
            render(<Container padding="lg" data-testid="container">Content</Container>);
            expect(screen.getByTestId('container')).toHaveClass('px-8');
        });
    });

    describe('Box', () => {
        it('applies padding correctly', () => {
            render(<Box padding="md" data-testid="box">Content</Box>);
            expect(screen.getByTestId('box')).toHaveClass('p-4');
        });

        it('applies border and shadow', () => {
            render(
                <Box border="default" shadow="md" data-testid="box">
                    Content
                </Box>
            );
            expect(screen.getByTestId('box')).toHaveClass('border', 'shadow-md');
        });
    });

    describe('Stack', () => {
        it('renders vertical stack by default', () => {
            render(<Stack data-testid="stack">Content</Stack>);
            expect(screen.getByTestId('stack')).toHaveClass('flex-col');
        });

        it('applies spacing correctly', () => {
            render(<Stack spacing="lg" data-testid="stack">Content</Stack>);
            expect(screen.getByTestId('stack')).toHaveClass('gap-6');
        });
    });

    describe('Flex', () => {
        it('applies flex properties', () => {
            render(
                <Flex
                    direction="row"
                    justify="center"
                    align="center"
                    data-testid="flex"
                >
                    Content
                </Flex>
            );
            const flex = screen.getByTestId('flex');
            expect(flex).toHaveClass('flex-row', 'justify-center', 'items-center');
        });

        it('handles inline flex', () => {
            render(<Flex inline data-testid="flex">Content</Flex>);
            expect(screen.getByTestId('flex')).toHaveClass('inline-flex');
        });
    });

    describe('Section', () => {
        it('applies spacing correctly', () => {
            render(<Section spacing="xl" data-testid="section">Content</Section>);
            expect(screen.getByTestId('section')).toHaveClass('py-16');
        });

        it('applies background variants', () => {
            render(
                <Section background="primary" data-testid="section">
                    Content
                </Section>
            );
            expect(screen.getByTestId('section')).toHaveClass('bg-primary');
        });
    });

    describe('AspectRatio', () => {
        it('calculates ratio correctly', () => {
            render(
                <AspectRatio ratio={16 / 9} data-testid="aspect">
                    Content
                </AspectRatio>
            );
            expect(screen.getByTestId('aspect')).toHaveStyle({
                paddingBottom: '56.25%',
            });
        });

        it('renders children in absolute container', () => {
            render(
                <AspectRatio data-testid="aspect">
                    <div data-testid="child">Content</div>
                </AspectRatio>
            );
            expect(screen.getByTestId('child').parentElement).toHaveClass(
                'absolute',
                'inset-0'
            );
        });
    });
});
