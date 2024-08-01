import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UpperTable from './tables/UpperTable';
import LowerTable from './tables/LowerTable';
import Item from '../../../types/items';

const SalesChannelHibid: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleSelectionChange = (items: Item[]) => {
    setSelectedItems(items);
  };

  return (
    <Box sx={{ width: '100%', padding: 0 }}>
      <Typography variant="h6" sx={{ margin: 0, padding: 0, height: '30px' }}>Available Items</Typography>
      <UpperTable onSelectionChange={handleSelectionChange} />
      
      <Typography variant="h6" sx={{ margin: 0, paddingTop: 0, height: '15px' }}>Selected Items for Auction</Typography>
      <LowerTable selectedItems={selectedItems} />
    </Box>
  );
};

export default SalesChannelHibid;