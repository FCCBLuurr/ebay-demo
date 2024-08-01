import React from 'react';
import { Toolbar, TextField, Box, SxProps } from '@mui/material';
//Maybe not even necessary to have this component
//Pass to dataEntryTable and DataEntry
interface DataEntryAltProps { 
    onUpdateDescription: (value: string) => void;
    //add more here
    sx?: SxProps;
}

const DataEntryAlt: React.FC<DataEntryAltProps> = ({
    onUpdateDescription,
    //add more here
    sx
}) => {
    return (
        <Box sx={{...sx}}>
            <Toolbar>
                <TextField
                    label="Description"
                    variant="outlined"
                    onChange={(e) => onUpdateDescription(e.target.value)}
                    style={{}}
                />
            </Toolbar>
        </Box>
    );
};

export default DataEntryAlt;