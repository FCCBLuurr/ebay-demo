import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import buttonTheme from '../../themes/buttonTheme';

interface CustomButtonProps extends ButtonProps {
    isActive?: boolean;
    link?: string;
    themeOption?: 'primary' | 'secondary';
}

const StyledButton = styled(Button)<{ themeOption: 'primary' | 'secondary' }>(({ theme, themeOption }) => ({
    borderRadius: theme.shape.borderRadius, // Use theme's border radius
    textTransform: theme.typography.button.textTransform, // Use theme's text transform
    fontSize: theme.typography.button.fontSize, // Use theme's font size
    fontWeight: theme.typography.button.fontWeight, // Use theme's font weight
    padding: theme.spacing(1, 2), // Use theme's spacing
    color: theme.palette[themeOption].contrastText, // Always white text color
    backgroundColor: theme.palette[themeOption].main,

    '&:hover': {
        backgroundColor: theme.palette[themeOption].dark, // Darker background on hover
        color: theme.palette[themeOption].contrastText, // White text color on hover
    },
    '&.active': {
        backgroundColor: theme.palette.primary.dark, // Darker background for active state
        color: theme.palette.primary.contrastText, // White text color for active state
        '&::after': {
            content: '""',
            display: 'block',
            width: '50%',
            margin: '0 auto',
            borderBottom: `2px solid ${theme.palette.primary.contrastText}`, // White underline
        },
    },
}));

const CustomButton: React.FC<CustomButtonProps> = ({ isActive, link, themeOption = 'primary', ...props }) => {
    const buttonProps = link ? { component: RouterLink, to: link } : {};

    return (
        <ThemeProvider theme={buttonTheme}>
            <StyledButton
                {...buttonProps}
                {...props}
                themeOption={themeOption}
                className={isActive ? 'active' : ''}
            />
        </ThemeProvider>
    );
};

export default CustomButton;
