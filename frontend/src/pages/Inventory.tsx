import React, { useEffect, useState } from 'react';
import InventoryTable from '../components/inventory/InventoryTable';
import { Box, Typography, Divider } from '@mui/material';
import Item from '../types/items';

const Inventory: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/items')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched items:', data);
        setItems(data);
      })
      .catch(error => console.error('Error Fetching Items:', error));
  }, []);

  return (
    <>
      <Divider/>
      <Box sx={{ backgroundColor: 'black'}}>
        <Typography variant='h2' sx={{ color: 'white', padding: '0.5rem' }}>
          Inventory View
        </Typography>
        <InventoryTable items={items} />
      </Box>
    </>
  );
};

export default Inventory;
