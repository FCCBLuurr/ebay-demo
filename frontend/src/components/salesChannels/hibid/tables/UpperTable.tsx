import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Box, Toolbar, Typography, Switch, Button, TextField } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, ValueFormatterParams, SelectionChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../../../themes/ag-grid-theme-builder.css';
import 'ag-grid-enterprise';
import Item from '../../../../types/items';
import CheckboxCellRenderer from './CheckboxCellRenderer';

interface UpperTableProps {
  onSelectionChange: (selectedItems: Item[]) => void;
  onInput?: any;
}

const UpperTable: React.FC<UpperTableProps> = ({ onSelectionChange }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isRedbookSortEnabled, setIsRedbookSortEnabled] = useState<boolean>(false);
  const gridRef = useRef<AgGridReact<Item>>(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/items')
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched items:', data);
        setItems(data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const deselectAll = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.deselectAll();
    }
  }, []);

  const columnDefs = useMemo<ColDef<Item>[]>(() => [
    { 
      field: '__selection__' as keyof Item,
      headerName: '', 
      width: 10, 
      checkboxSelection: false, 
      headerCheckboxSelection: false,
      cellRenderer: CheckboxCellRenderer,
      suppressMenu: true,
      suppressMovable: true
    },
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
  ] as ColDef<Item>[], []);

  const gridOptions: GridOptions<Item> = useMemo(() => ({
    autoSizeStrategy: {
      type: 'fitGridWidth',
      defaultMinWidth: 100,
    },
    enableAdvancedFilter: false,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 25, 50, 100, 200, 500, 1000],
    groupDefaultExpanded: -1,
    groupIncludeFooter: false,
    groupIncludeTotalFooter: false,
    sortingOrder: ['asc', 'desc', null],
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    suppressCellSelection: true,
  }), []);

  const onSelectionChanged = useCallback((event: SelectionChangedEvent<Item>) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedItems(selectedRows);
    onSelectionChange(selectedRows);
  }, [onSelectionChange]);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent<Item>) => {
    params.api.sizeColumnsToFit();
    params.api.applyColumnState({
      state: [
        { colId: 'quantity', sort: 'desc' },
        { colId: 'denomination', sort: 'asc' },
        { colId: 'series', sort: 'asc' },
        { colId: 'year', sort: 'asc' }
      ],
      defaultState: { sort: null }
    });
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Toolbar sx={{ backgroundColor: 'grey.300', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="secondary" onClick={deselectAll}>
          Deselect All
        </Button>
        <TextField id="filled-basic" label="Search" variant="filled" />
      </Toolbar>
      <Box className="ag-grid-theme-builder" sx={{ height: 400, width: '100%' }}>
        <AgGridReact<Item>
          ref={gridRef}
          rowData={items}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, minWidth: 100 }}
          gridOptions={gridOptions}
          onSelectionChanged={onSelectionChanged}
          domLayout="autoHeight"
          onFirstDataRendered={onFirstDataRendered}
          groupDisplayType="groupRows"
        />
      </Box>
    </Box>
  );
};

export default UpperTable;