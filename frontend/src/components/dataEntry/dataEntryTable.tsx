import React, { useCallback, useMemo, useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box } from '@mui/material';
import { ColDef, ICellRendererParams, GridOptions, ValueFormatterParams } from 'ag-grid-community';
import CreateItemId from './createItemId';
import { createItems } from '../../api/createItems'; // Adjust the import path as necessary
import Item from '../../types/items'; // Adjust the import path as necessary

interface DataEntryTableProps {
    locationCode: string;
    shelfNumber: string;
    boxNumber: string;
    onAddRow: () => void;
    onSave: () => void;
}

const DataEntryTable = forwardRef<{
    handleAddRow: () => void;
    handleSave: () => void;
}, DataEntryTableProps>(({ locationCode, shelfNumber, boxNumber, onAddRow, onSave }, ref) => {
    const gridRef = useRef<AgGridReact<Item>>(null);
    const [rowData, setRowData] = useState<Item[]>(() => {
        const savedData = localStorage.getItem('rowData');
        return savedData ? JSON.parse(savedData) : [];
    });
    useEffect (() => {
        if (gridRef.current?.api) {
            gridRef.current.api.forEachNode((node) => {
                const data = node.data;
                if (data) {
                    const updatedItemId = `${locationCode}:${shelfNumber}:${boxNumber}::${data.sku}`;
                    node.setDataValue('item_id', updatedItemId);
                    node.setDataValue('location_code', locationCode);
                    node.setDataValue('shelf_number', shelfNumber);
                    node.setDataValue('box_number', boxNumber);
                }
            });
        }
    }, [locationCode, shelfNumber, boxNumber]);

    useImperativeHandle(ref, () => ({
        handleAddRow: () => {
            const newItem: Item = {
                sku: '',
                title: '',
                description: null,
                value: '',
                quantity: null,
                item_id: null,
                shelf_number: null,
                box_number: null,
                location_code: null,
                consignor_id: null,
                consignor_sku: null,
                year: null,
                mint_mark: null,
                denomination: null,
                series: null,
                grade_company: null,
                grade: null,
                strike_type: null,
                circulated_uncirculated: null,
                listing_type: null,
                starting_price: '',
                reserve_price: '',
                sales_channel: null,
                auction_id: null,
                auction_name: '',
                photos: null,
                notes: null,
                date_listed: null,
                date_sold: null,
                entry_created: null,
                status: null,
            };

            setRowData((prevData) => [...prevData, newItem]);
        },
        handleSave: async () => {
            try {
                const allData = gridRef.current?.api.getRenderedNodes().map(node => node.data) || [];
                console.log('Saving data:', allData);

                // Save all rows to the database
                for (const item of allData) {
                    if (item) {
                        await createItems(item);
                    }
                }

                console.log('Data saved successfully');
            } catch (error) {
                console.error('Error during upload: ', error)
            }
        },

        handleClearTable: () => {
            setRowData([]);
            localStorage.removeItem('rowData');
        },

    }));

    useEffect(() => {
        if (gridRef.current?.api) {
            gridRef.current.api.forEachNode((node) => {
                const data = node.data;
                if (data) {
                    const updatedItemId = `${locationCode}:${shelfNumber}:${boxNumber}::${data.sku}`;
                    node.setDataValue('item_id', updatedItemId);
                }
            });
        }
    }, [locationCode, shelfNumber, boxNumber]);

    useEffect(() => {
        localStorage.setItem('rowData', JSON.stringify(rowData));
    }, [rowData]);

    const columnDefs: ColDef<Item>[] = useMemo(
        () => [
            {
                field: 'sku',
                headerName: 'SKU',
                editable: true,
                onCellValueChanged: (params) => {
                    if (params.node) {
                        const sku = params.data?.sku || '';
                        const updatedItemId = `${locationCode}:${shelfNumber}:${boxNumber}::${sku}`;
                        params.node.setDataValue('item_id', updatedItemId);
                    }
                }
            },
            {
                field: 'item_id',
                headerName: 'Item ID',
                editable: false,
                cellRenderer: (params: ICellRendererParams) => {
                    const sku = params.data?.sku || '';
                    return (
                        <CreateItemId
                            locationCode={locationCode}
                            shelfNumber={shelfNumber}
                            boxNumber={boxNumber}
                            sku={sku}
                        />
                    );
                },
            },
            { field: 'title', headerName: 'Title', editable: true },
            { field: 'description', headerName: 'Description', editable: true },
            {
                field: 'value',
                headerName: 'Value',
                editable: true,
                valueFormatter: (params: ValueFormatterParams<Item>) =>
                    params.value != null ? `$${params.value}` : '',
            },
            { field: 'quantity', headerName: 'QTY', editable: true },
            { field: 'location_code', headerName: 'Location Code', editable: true },
            { field: 'shelf_number', headerName: 'Shelf Number', editable: true },
            { field: 'box_number', headerName: 'Box Number', editable: true },
            { field: 'consignor_id', headerName: 'Consignor ID', editable: true },
            { field: 'consignor_sku', headerName: 'Consignor SKU', editable: true },
            { field: 'year', headerName: 'Year', editable: true },
            { field: 'mint_mark', headerName: 'Mint Mark', editable: true },
            { field: 'denomination', headerName: 'Denomination', editable: true },
            { field: 'series', headerName: 'Series', editable: true },
            { field: 'grade_company', headerName: 'Grade Company', editable: true },
            { field: 'grade', headerName: 'Grade', editable: true },
            { field: 'strike_type', headerName: 'Strike Type', editable: true },
            {
                field: 'circulated_uncirculated',
                headerName: 'Circulated/Uncirculated',
                editable: true,
            },
            { field: 'listing_type', headerName: 'Listing Type', editable: true },
            {
                field: 'starting_price',
                headerName: 'Starting Price',
                editable: true,
                valueFormatter: (params: ValueFormatterParams<Item>) =>
                    params.value != null ? `$${params.value}` : '',
            },
            {
                field: 'reserve_price',
                headerName: 'Reserve Price',
                editable: true,
                valueFormatter: (params: ValueFormatterParams<Item>) =>
                    params.value != null ? `$${params.value}` : '',
            },
            { field: 'sales_channel', headerName: 'Sales Channel', editable: true },
            { field: 'auction_id', headerName: 'Auction ID', editable: true },
            { field: 'auction_name', headerName: 'Auction Name', editable: true }
        ],
        [locationCode, shelfNumber, boxNumber]
    );

    const gridOptions: GridOptions<Item> = {
        autoSizeStrategy: {
            type: 'fitGridWidth',
            defaultMinWidth: 100,
        },
        enableRangeSelection: true,
        enableFillHandle: true,
        pagination: true,
        paginationPageSizeSelector: [10, 25, 50, 100, 200, 500, 1000],
        fillHandleDirection: 'xy',
        suppressMultiRangeSelection: false,
    };

    const onFirstDataRendered = useCallback(() => {
        if (gridRef.current) {
            gridRef.current.api.sizeColumnsToFit();
        }
    }, []);

    const tabToNextCell = (params: { nextCellPosition: any }) => {
        const nextCell = params.nextCellPosition;
        const currentCell = gridRef.current?.api.getFocusedCell();
        if (nextCell && gridRef.current) {
            gridRef.current.api.setFocusedCell(nextCell.rowIndex, nextCell.column);
            if (nextCell.rowIndex !== currentCell?.rowIndex || nextCell.column.getColId() !== currentCell?.column.getColId()) {
                gridRef.current.api.startEditingCell({
                    rowIndex: nextCell.rowIndex,
                    colKey: nextCell.column.getColId()
                });
            }
        }
        return nextCell;
    };

    return (
        <Box style={{ width: '100%' }}>
            <Box className="ag-grid-theme-builder" style={{ height: '600px', width: '100%' }}>
                <AgGridReact<Item>
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{ resizable: true, minWidth: 100 }}
                    gridOptions={gridOptions}
                    paginationPageSize={50}
                    domLayout="autoHeight"
                    onFirstDataRendered={onFirstDataRendered}
                    tabToNextCell={tabToNextCell}
                    onCellValueChanged={(event) => {
                        setRowData((prevData) =>
                            prevData.map((item, index) =>
                                index === event.node?.rowIndex ? { ...item, ...event.data } : item
                            )
                        );
                    }}
                />
            </Box>
        </Box>
    );
});

export default DataEntryTable;
