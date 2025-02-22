import {Dispatch, PropsWithChildren, SetStateAction, useEffect, useState} from 'react';
import {Button} from '../ui/Button/Button.tsx';
import Separator from '../ui/Separator/Separator.tsx';
import Heading from '../ui/Heading/Heading.tsx';
import Text from '../ui/Text/Text.tsx';
import colors from '../../colors.ts';

/**
 * SunIcon - Represents the light mode icon.
 * Reference: React documentation (https://reactjs.org/docs/components-and-props.html)
 */
const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0C7.776 0 8 0.224 8 0.5V2.5C8 2.776 7.776 3 7.5 3C7.224 3 7 2.776 7 2.5V0.5C7 0.224 7.224 0 7.5 0ZM2.197 2.197C2.392 2.001 2.709 2.001 2.904 2.197L4.318 3.611C4.513 3.806 4.513 4.123 4.318 4.318C4.123 4.513 3.806 4.513 3.611 4.318L2.197 2.904C2.001 2.709 2.001 2.392 2.197 2.197ZM0.5 7C0.224 7 0 7.224 0 7.5C0 7.776 0.224 8 0.5 8H2.5C2.776 8 3 7.776 3 7.5C3 7.224 2.776 7 2.5 7H0.5ZM2.197 12.803C2.001 12.608 2.001 12.292 2.197 12.096L3.611 10.682C3.806 10.487 4.123 10.487 4.318 10.682C4.513 10.877 4.513 11.194 4.318 11.389L2.904 12.803C2.709 12.999 2.392 12.999 2.197 12.803ZM12.5 7C12.224 7 12 7.224 12 7.5C12 7.776 12.224 8 12.5 8H14.5C14.776 8 15 7.776 15 7.5C15 7.224 14.776 7 14.5 7H12.5ZM10.682 4.318C10.487 4.123 10.487 3.806 10.682 3.611L12.096 2.197C12.292 2.001 12.608 2.001 12.803 2.197C12.999 2.392 12.999 2.709 12.803 2.904L11.389 4.318C11.194 4.513 10.877 4.513 10.682 4.318ZM8 12.5C8 12.224 7.776 12 7.5 12C7.224 12 7 12.224 7 12.5V14.5C7 14.776 7.224 15 7.5 15C7.776 15 8 14.776 8 14.5V12.5ZM10.682 10.682C10.877 10.487 11.194 10.487 11.389 10.682L12.803 12.096C12.999 12.292 12.999 12.608 12.803 12.803C12.608 12.999 12.292 12.999 12.096 12.803L10.682 11.389C10.487 11.194 10.487 10.877 10.682 10.682ZM5.5 7.5C5.5 6.395 6.395 5.5 7.5 5.5C8.605 5.5 9.5 6.395 9.5 7.5C9.5 8.605 8.605 9.5 7.5 9.5C6.395 9.5 5.5 8.605 5.5 7.5ZM7.5 4.5C5.843 4.5 4.5 5.843 4.5 7.5C4.5 9.157 5.843 10.5 7.5 10.5C9.157 10.5 10.5 9.157 10.5 7.5C10.5 5.843 9.157 4.5 7.5 4.5Z" fill="currentColor"/>
    </svg>
);

/**
 * MoonIcon - Represents the dark mode icon.
 * Reference: React documentation (https://reactjs.org/docs/components-and-props.html)
 */
const MoonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.9 0.5c0-.22-.18-.4-.4-.4-.22 0-.4.18-.4.4v.6H1.5c-.22 0-.4.18-.4.4 0 .22.18.4.4.4h.6v.6c0 .22.18.4.4.4.22 0 .4-.18.4-.4v-.6h.6c.22 0 .4-.18.4-.4 0-.22-.18-.4-.4-.4H2.9V0.5zM5.9 3.5c0-.22-.18-.4-.4-.4-.22 0-.4.18-.4.4v.6H4.5c-.22 0-.4.18-.4.4 0 .22.18.4.4.4h.6v.6c0 .22.18.4.4.4.22 0 .4-.18.4-.4v-.6h.6c.22 0 .4-.18.4-.4 0-.22-.18-.4-.4-.4H5.9V3.5zM1.9 6.5c0-.22-.18-.4-.4-.4-.22 0-.4.18-.4.4v.6H.5c-.22 0-.4.18-.4.4 0 .22.18.4.4.4h.6v.6c0 .22.18.4.4.4.22 0 .4-.18.4-.4v-.6h.6c.22 0 .4-.18.4-.4 0-.22-.18-.4-.4-.4H1.9v-.6zM8.54.98l-.298-.04c-.213-.024-.34.223-.218.4.14.202.27.413.388.63.5.93.785 1.995.785 3.126 0 3.272-2.38 5.987-5.504 6.51-.242.04-.49.068-.74.08-.215.012-.333-.24-.183-.394.068-.07.138-.138.21-.204l.072-.067.26-.225.188-.149.121-.09.186-.13.176-.125.16-.112.078-.055.32-.232.32-.232.32-.233.26-.189.121-.09.12-.09c.13-.097.26-.195.39-.292l.243-.183.206-.156.194-.146.173-.133.16-.122.14-.107.118-.094.085-.067.074-.058.074-.057.064-.052.058-.048.04-.033.04-.033.032-.026.03-.025.026-.021.022-.019.017-.015.015-.013.013-.012.01-.01.01-.009.008-.007.007-.007" fill="currentColor"/>
    </svg>
);

/**
 * CustomLogo - A placeholder logo component for ThemeEditor.
 * Customize this SVG as needed.
 */
const CustomLogo = () => (
    <svg width="50" height="40" viewBox="0 0 211 109" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.047 77H4.172C3.922 77 3.797 76.844 3.797 76.531L3.984 10.578C3.984 10.328 4.109 10.203 4.359 10.203H23.766C27.234 10.203 30.422 11.047 33.328 12.734 36.234 14.422 38.547 16.688 40.266 19.531 42.016 22.375 42.891 25.594 42.891 29.188 42.891 31.531 42.531 33.656 41.812 35.563 41.094 37.469 40.25 39.078 39.281 40.391 38.344 41.703 37.484 42.672 36.703 43.297 40.172 47.141 41.906 51.656 41.906 56.844L42 76.531C42 76.844 41.844 77 41.531 77H30.656C30.406 77 30.281 76.906 30.281 76.719V56.844C30.281 54.531 29.469 52.531 27.844 50.844 26.219 49.156 24.219 48.312 21.844 48.312H15.515l-.094-27.219C15.421 20.156 15.297 20 15.047 20zM23.766 21.687H15.515v15.094h8.25c2.03 0 3.78-.734 5.312-2.203 1.563-1.375 2.344-3.172 2.344-5.297 0-2.031-.65-3.781-2.15-5.312-1.5-1.531-3.28-2.25-5.312-2.25z" fill="currentColor"/>
    </svg>
);

type ColorSelectProps = {
    color: typeof colors[keyof typeof colors];
    colorName: string;
    changeAccentColor: Dispatch<SetStateAction<keyof typeof colors>>;
};

/**
 * ColorSelect - Renders an accessible color swatch button.
 * WCAG note: Ensure sufficient color contrast per https://www.w3.org/TR/WCAG21/
 */
const ColorSelect = ({ color, colorName, changeAccentColor }: ColorSelectProps) => {
    const dimensions = 32;
    return (
        <button
            onClick={() => changeAccentColor(colorName as keyof typeof colors)}
            aria-label={`Change accent color to ${colorName}`}
            className="cursor-pointer rounded-full border hover:border-gray-700"
            style={{ width: dimensions, height: dimensions, backgroundColor: color.light['900'] }}
        />
    );
};

export type ThemeEditorProps = { className?: string } & PropsWithChildren;

/**
 * ThemeEditor - A customizable theme editor for Maia UI components.
 *
 * Features:
 * - Toggle between light and dark mode.
 * - Select from predefined accent colors.
 * - Accessible controls and clear visual feedback.
 *
 * References:
 * - React: https://reactjs.org/docs/getting-started.html
 * - TypeScript: https://www.typescriptlang.org/docs/
 * - TailwindCSS: https://tailwindcss.com/docs/configuration
 * - WCAG: https://www.w3.org/TR/WCAG21/
 */
const ThemeEditor = ({ children, className }: ThemeEditorProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    type AvailableColors = keyof typeof colors;
    const [colorName, setColorName] = useState<AvailableColors>('plum');

    useEffect(() => {
        // Any additional side effects can be handled here
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <div
            data-accent-color={colorName}
            className={`p-4 shadow-sm text-gray-900 h-screen border border-gray-300 bg-gray-50 ${
                isDarkMode ? 'maia-ui-dark-theme' : ''
            }`}
        >
            <div className="mb-4">
                <div className="flex items-center space-x-4">
                    <div className="text-gray-1000">
                        <CustomLogo />
                    </div>
                    <Separator orientation="vertical" />
                    <Button aria-label="Toggle dark mode" variant="outline" onClick={toggleDarkMode}>
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                    </Button>
                </div>
                <Separator />
                <div>
                    <div className="flex items-center space-x-4">
                        <Heading as="h1" className="text-gray-1000">
                            Theme Editor
                        </Heading>
                        <Separator orientation="vertical" />
                        <Text className="font-normal text-gray-950">
                            Customize the accent color and theme mode of Maia UI components.
                        </Text>
                    </div>
                    <Separator />
                    <div className="flex space-x-2 my-1">
                        {Object.keys(colors).map((key) => {
                            const currentColor = key as AvailableColors;
                            return (
                                <ColorSelect
                                    key={currentColor}
                                    colorName={currentColor}
                                    color={colors[currentColor]}
                                    changeAccentColor={setColorName}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <Separator />
            <div className={className}>{children}</div>
        </div>
    );
};

export default ThemeEditor;
