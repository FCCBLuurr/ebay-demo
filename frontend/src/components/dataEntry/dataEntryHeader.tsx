import React from 'react';
import { Toolbar, TextField, Box, SxProps } from '@mui/material';
import CustomButton from '../blocks/CustomButton';

interface DataEntryHeaderProps {
    onAddRow: () => void;
    onSave: () => void;
    onUpdateLocationCode: (value: string) => void;
    onUpdateShelfNumber: (value: string) => void;
    onUpdateBoxNumber: (value: string) => void;
    onClearTable: () => void;
    onPhotoUploadComplete: (urls: string[]) => void;
    sku: string;
    sx?: SxProps;
}

const DataEntryHeader: React.FC<DataEntryHeaderProps> = ({
    onAddRow,
    onSave,
    onUpdateLocationCode,
    onUpdateShelfNumber,
    onUpdateBoxNumber,
    onClearTable,
    sku,
    sx
}) => {

    return (
        <Box sx={{ ...sx, backgroundColor: '#808080' }}>
            <Toolbar>
                <Box>
                    <CustomButton variant="contained" onClick={onAddRow}>Add Row</CustomButton>
                    <CustomButton variant="contained" onClick={onSave} sx={{ marginLeft: 2 }}>Save</CustomButton>
                    <CustomButton variant="contained" onClick={onClearTable} sx={{ marginLeft: 2 }} themeOption='secondary'>Clear Table</CustomButton>
                </Box>
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                    <TextField
                        label="Location Code"
                        variant="filled"
                        onChange={(e) => onUpdateLocationCode(e.target.value)}
                        sx={{ textFieldStyle }}
                    />
                    <TextField
                        label="Shelf Number"
                        variant="filled"
                        onChange={(e) => onUpdateShelfNumber(e.target.value)}
                        sx={{ textFieldStyle }}
                    />
                    <TextField
                        label="Box Number"
                        variant="filled"
                        onChange={(e) => onUpdateBoxNumber(e.target.value)}
                        sx={{ textFieldStyle }}
                    />
                </Box>
            </Toolbar>
        </Box>
    );
};

const textFieldStyle = {
    borderRadius: '4px',
    backgroundColor: 'white',
    '& .MuiFilledInput-root': {
        '& fieldset': {
            borderColor: 'black',
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'blue',
        },
    },
    '& .MuiInputBase-input': {
        color: 'black',
    },
    '& .MuiInputLabel-root': {
        color: 'black',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'blue',
    },
};

export default DataEntryHeader;
