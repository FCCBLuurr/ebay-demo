import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import UpperTable from './tables/UpperTable';
import LowerTable from './tables/LowerTable';
import Item from '../../../types/items';
import AuctionEntry from '../AuctionEntry';

const SalesChannelHibid: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleSelectionChange = (items: Item[]) => {
    setSelectedItems(items);
  };

  return (
    <Box sx={{ width: '100%', padding: 0 }}>
      <Paper sx={{ backgroundColor: 'white' }}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, height: '30px' }}>Available Items</Typography>
        <UpperTable onSelectionChange={handleSelectionChange} />
      </Paper>
      <Paper sx={{ backgroundColor: 'white', marginTop: 1, }}>
        <Typography variant="h6" sx={{ margin: 0, paddingTop: 0, height: '15px' }}>Selected Items for Auction</Typography>
        <AuctionEntry sx={{ marginTop: 4, marginBottom: 0,}} />
        <LowerTable selectedItems={selectedItems} />
      </Paper>
    </Box>
  );
};

export default SalesChannelHibid;