import React from 'react';
import { Container, Typography } from '@mui/material';
import CustomButton from '../components/blocks/CustomButton';

const Home: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h3" component="h1" gutterBottom>
                Hello World
            </Typography>
            <CustomButton variant="contained" themeOption="primary" sx={{ marginRight: 2 }}>
                Primary Button
            </CustomButton>
            <CustomButton variant="contained" themeOption="secondary">
                Secondary Button
            </CustomButton>
        </Container>
    );
};

export default Home;
