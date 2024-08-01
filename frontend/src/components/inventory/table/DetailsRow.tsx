import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface DetailsRowProps {
  description: string | null;
  // photos: string | null;
  photos?: { urls: string } | null;
  notes?: string | null;
  item_id?: string | null;
  shelf_number?: string | null;
  box_number?: string | null;
  location_code?: string | null;
  consignor_id?: string | null;
  consignor_sku?: string | null;
  year: string | null;
  mint_mark: string | null;
  denomination: string | null;
  series: string | null;
  grade_company: string | null;
  grade: string | null;
  strike_type: string | null;
  circulated_uncirculated: string | null;
  listing_type: string | null;
  starting_price: number | string | null;
  reserve_price: number | string | null;
  sales_channel?: string | null;
  date_listed?: string | null;
  date_sold?: string | null;
  entry_created?: string | null;
  status?: string | null;
}

const DetailsRow: React.FC<DetailsRowProps> = ({
  description,
  photos,
  notes,
  item_id,
  shelf_number,
  box_number,
  location_code,
  consignor_id,
  consignor_sku,
  year,
  mint_mark,
  denomination,
  series,
  grade_company,
  grade,
  strike_type,
  circulated_uncirculated,
  listing_type,
  starting_price,
  reserve_price,
  sales_channel,
  date_listed,
  date_sold,
  entry_created,
  status
}) => {
  return (
    <Box>
      <Typography variant="h6">Notes & Description</Typography>
      <Typography variant="body1">{notes}</Typography>
      <Typography variant="body1">{description}</Typography>
      <Divider />
      
      <Typography variant="h6">Location & IDs</Typography>
      <Typography variant="body1">Item ID: {item_id}</Typography>
      <Typography variant="body1">Shelf Number: {shelf_number}</Typography>
      <Typography variant="body1">Box Number: {box_number}</Typography>
      <Typography variant="body1">Location Code: {location_code}</Typography>
      <Typography variant="body1">Consignor ID: {consignor_id}</Typography>
      <Typography variant="body1">Consignor SKU: {consignor_sku}</Typography>
      <Divider />
      
      <Typography variant="h6">Item Specifics</Typography>
      <Typography variant="body1">Year: {year}</Typography>
      <Typography variant="body1">Mint Mark: {mint_mark}</Typography>
      <Typography variant="body1">Denomination: {denomination}</Typography>
      <Typography variant="body1">Series: {series}</Typography>
      <Typography variant="body1">Grade Company: {grade_company}</Typography>
      <Typography variant="body1">Grade: {grade}</Typography>
      <Typography variant="body1">Strike Type: {strike_type}</Typography>
      <Typography variant="body1">Circulated/Uncirculated: {circulated_uncirculated}</Typography>
      <Divider />
      
      <Typography variant="h6">Listing Details</Typography>
      <Typography variant="body1">Listing Type: {listing_type}</Typography>
      <Typography variant="body1">Starting Price: ${starting_price}</Typography>
      <Typography variant="body1">Reserve Price: ${reserve_price}</Typography>
      <Typography variant="body1">Sales Channel: {sales_channel}</Typography>
      <Typography variant="body1">Date Listed: {date_listed}</Typography>
      <Typography variant="body1">Date Sold: {date_sold}</Typography>
      <Typography variant="body1">Entry Created: {entry_created}</Typography>
      <Typography variant="body1">Status: {status}</Typography>
    </Box>
  );
};

export default DetailsRow;
