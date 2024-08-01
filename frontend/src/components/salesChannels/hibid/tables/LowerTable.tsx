import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, ValueFormatterParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../../../themes/ag-grid-theme-builder.css';
import 'ag-grid-enterprise';
import Item from '../../../../types/items';

interface LowerTableProps {
  selectedItems: Item[];
}

const LowerTable: React.FC<LowerTableProps> = ({ selectedItems }) => {
  const columnDefs: ColDef<Item>[] = useMemo(() => [
    { field: 'sku', headerName: 'SKU', sortable: true, filter: true, minWidth: 100 },
    { field: 'title', headerName: 'Title', sortable: true, filter: true, flex: 1, minWidth: 500 },
    { 
      field: 'value', 
      headerName: 'Value', 
      sortable: true, 
      filter: false, 
      valueFormatter: (params: ValueFormatterParams<Item>) => 
        params.value != null ? `$${(params.value as number).toFixed(2)}` : '', 
      minWidth: 100
    },
    { field: 'quantity', headerName: 'QTY', sortable: true, filter: false, minWidth: 100 },
    { field: 'year', headerName: 'Year', sortable: true, filter: true, minWidth: 140 },
    { field: 'mint_mark', headerName: 'Mint Mark', sortable: true, filter: true, minWidth: 140 },
    { field: 'denomination', headerName: 'Denomination', sortable: true, filter: true, minWidth: 160 },
    { field: 'series', headerName: 'Series', sortable: true, filter: true, minWidth: 160 },
    // Add more fields as needed
  ], []);

  const gridOptions: GridOptions<Item> = useMemo(() => ({
    autoSizeStrategy: {
      type: 'fitGridWidth',
      defaultMinWidth: 100,
    },
    enableAdvancedFilter: true,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50],
    groupDefaultExpanded: -1,
    groupIncludeFooter: false,
    groupIncludeTotalFooter: false,
    sortingOrder: ['asc', 'desc', null],
  }), []);

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Box className="ag-grid-theme-builder" sx={{ height: 400, width: '100%' }}>
        <AgGridReact<Item>
          rowData={selectedItems}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, minWidth: 100 }}
          gridOptions={gridOptions}
          domLayout="autoHeight"
          groupDisplayType="groupRows"
        />
      </Box>
    </Box>
  );
};

export default LowerTable;