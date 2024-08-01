import React from 'react';
import { Box, Grid, TextField, Paper, SxProps, InputAdornment } from '@mui/material';
import Item from '../../types/items';
import CustomButton from '../blocks/CustomButton';

interface AuctionEntryProps {
    data?: string;
    itemsToUpdate?: Item[];
    sx?: SxProps;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface EntryBoxProps {
    label: string;
    id: string;
    variant: "filled" | "standard" | "outlined";
    InputAdornmentText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EntryBox: React.FC<EntryBoxProps> = ({
    label,
    id,
    variant,
    onChange,
    InputAdornmentText,
    ...rest
}) => {
    return (
        <TextField
            label={label}
            id={id}
            variant={variant}
            onChange={onChange}
            InputProps={{
                startAdornment:<InputAdornment position="start">{InputAdornmentText}</InputAdornment>
            }}
            sx={{
                marginBottom: 1,
                width: '100%',
            }}
            {...rest}
        />
    );
};
//ToDo: Add logic for creating/updating auctions/items
//CreateAuction button should create a new entry to the auction table using data from entry fields
//UpdateItems button should update the selected items with the auction_id from entry field
//For demo we'll just update the auction_id and auction_name to obt_inventory, for a full project build
//we'll build out a proper snowflake schema
const AuctionEntry: React.FC<AuctionEntryProps> = ({
    sx,
}) => {
    return (
        <Box sx={sx}>
            <Paper sx={{ padding: 2, backgroundColor: '#FCFCF8', margin: 2, }}>
                <Grid container spacing={1} marginBottom={0} sx={{ justifyContent: "flex-start" }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <EntryBox 
                            label="Auction Name"
                            id="auction_name"
                            variant="filled"
                            InputAdornmentText='Name of Auction on HiBid'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <EntryBox 
                            label="Auction ID"
                            id="auction_id"
                            variant="filled"
                            InputAdornmentText='Numbers Only'
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ justifyContent: "flex-start", marginTop: 1, marginLeft: 1 }}>
                    <Grid item xs={6} sm={6} md={4} lg={3}>
                        <CustomButton themeOption="primary" sx={{ marginRight: 2}}>
                            Create Auction
                        </CustomButton>
                        <CustomButton themeOption="primary">
                            Update Items
                        </CustomButton>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AuctionEntry;