import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import CustomButton from '../blocks/CustomButton';

const TableHeaderBar: React.FC = () => {
    return (
        <AppBar position="static" elevation={0} sx={{ backgroundColor: '#808080' }} >
            <Toolbar>
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '1rem'}}>
                    <CustomButton themeOption="secondary">
                        Add Item
                    </CustomButton>
                    <CustomButton themeOption="primary" disabled>
                        Sort
                    </CustomButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TableHeaderBar;