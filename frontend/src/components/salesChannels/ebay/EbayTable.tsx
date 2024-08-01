import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import UpperTable from '../hibid/tables/UpperTable';
import LowerTable from '../hibid/tables/LowerTable';
import Item from '../../../types/items';

const EbayTable: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleSelectionChange = (items: Item[]) => {
    setSelectedItems(items);
  };

  return (
    <Box sx={{ width: '100%', padding: 0 }}>
      <Paper sx={{ backgroundColor: 'white' }}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, height: '30px' }}>
          Available Items
        </Typography>
        <UpperTable onSelectionChange={handleSelectionChange} />
      </Paper>
      <Paper sx={{ backgroundColor: 'white', marginTop: 1, }}>
        <Typography variant="h6" sx={{ margin: 0, paddingTop: 0, height: '15px' }}>
          Selected Items for eBay
        </Typography>
        <LowerTable selectedItems={selectedItems} />
      </Paper>
    </Box>
  );
};

export default EbayTable;