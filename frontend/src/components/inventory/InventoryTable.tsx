import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Box, Drawer, Toolbar, Typography, Switch } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, ValueFormatterParams, RowClickedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../themes/ag-grid-theme-builder.css';
import 'ag-grid-enterprise';
import PhotoCarousel from './table/blocks/PhotoCarousel';
import DetailsRow from './table/DetailsRow';
import Item from '../../types/items';
import { RedbookSort } from './filters/customSorts/redbookSort';

interface InventoryTableProps {
    items: Item[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items }) => {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isRedbookSortEnabled, setIsRedbookSortEnabled] = useState<boolean>(false);
    const gridRef = useRef<AgGridReact<Item>>(null);

    const handleRowClick = useCallback((item: Item) => {
        setSelectedItem(item);
    }, []);

    const handleToggleEdit = useCallback(() => {
        setIsEditable((prev) => !prev);
    }, []);

    const handleToggleRedbook = useCallback(() => {
        setIsRedbookSortEnabled((prev) => {
            const newValue = !prev;
            if (gridRef.current && gridRef.current.api) {
                setTimeout(() => {
                    gridRef.current!.api.refreshClientSideRowModel('sort');
                    gridRef.current!.api.applyColumnState({
                        state: [
                            { colId: 'denomination', sort: 'asc' },
                            { colId: 'series', sort: 'asc' },
                            { colId: 'year', sort: 'asc' }
                        ],
                        defaultState: { sort: null }
                    });
                }, 0);
            }
            return newValue;
        });
    }, []);

    const columnDefs: ColDef<Item>[] = useMemo(() => [
        { field: 'sku', headerName: 'SKU', sortable: true, filter: true, minWidth: 100 },
        { field: 'title', headerName: 'Title', sortable: true, filter: true, flex: 1, editable: isEditable, minWidth: 500 },
        { 
            field: 'value', 
            headerName: 'Value', 
            sortable: true, 
            filter: false, 
            valueFormatter: (params: ValueFormatterParams<Item>) => 
                params.value != null ? `$${(params.value as number).toFixed(2)}` : '', 
            minWidth: 100, 
            editable: isEditable 
        },
        { 
            field: 'quantity', 
            headerName: 'QTY', 
            sortable: true, 
            filter: false, 
            minWidth: 100, 
            editable: isEditable,
            comparator: isRedbookSortEnabled ? 
                (valueA, valueB, nodeA, nodeB, isDescending) => 
                    RedbookSort(valueA, valueB, nodeA as any, nodeB as any, isDescending)
                : undefined
        },
        { field: 'year', headerName: 'Year', sortable: true, filter: true, minWidth: 140, editable: isEditable },
        { field: 'mint_mark', headerName: 'Mint Mark', sortable: true, filter: true, minWidth: 140, editable: isEditable },
        { 
            field: 'denomination', 
            headerName: 'Denomination', 
            sortable: true, 
            filter: true, 
            minWidth: 160, 
            editable: isEditable,
            comparator: isRedbookSortEnabled ? 
                (valueA, valueB, nodeA, nodeB, isDescending) => 
                    RedbookSort(valueA, valueB, nodeA as any, nodeB as any, isDescending)
                : undefined
        },
        { 
            field: 'series', 
            headerName: 'Series', 
            sortable: true, 
            filter: true, 
            minWidth: 160, 
            editable: isEditable,
            comparator: isRedbookSortEnabled ? 
                (valueA, valueB, nodeA, nodeB, isDescending) => 
                    RedbookSort(valueA, valueB, nodeA as any, nodeB as any, isDescending)
                : undefined
        },
        { field: 'grade_company', headerName: 'Grade Company', sortable: true, filter: true, minWidth: 140, editable: isEditable },
        { field: 'grade', headerName: 'Grade', sortable: true, filter: true, minWidth: 120, editable: isEditable },
        { field: 'strike_type', headerName: 'Strike Type', sortable: true, filter: true, minWidth: 140, editable: isEditable },
        { field: 'circulated_uncirculated', headerName: 'Circulated/Uncirculated', sortable: true, filter: true, minWidth: 200, editable: isEditable },
        { field: 'listing_type', headerName: 'Listing Type', sortable: true, filter: true, minWidth: 140, editable: isEditable },
        { 
            field: 'starting_price', 
            headerName: 'Starting Price', 
            sortable: true, 
            filter: true, 
            valueFormatter: (params: ValueFormatterParams<Item>) => 
                params.value != null ? `$${(params.value as number).toFixed(2)}` : '', 
            minWidth: 140, 
            editable: isEditable 
        },
        { 
            field: 'reserve_price', 
            headerName: 'Reserve Price', 
            sortable: true, 
            filter: true, 
            valueFormatter: (params: ValueFormatterParams<Item>) => 
                params.value != null ? `$${(params.value as number).toFixed(2)}` : '', 
            minWidth: 140, 
            editable: isEditable 
        },
        { field: 'sales_channel', headerName: 'Sales Channel', sortable: true, filter: true, minWidth: 180, editable: isEditable },
        { field: 'date_listed', headerName: 'Date Listed', sortable: true, filter: true, minWidth: 160, editable: isEditable },
        { field: 'date_sold', headerName: 'Date Sold', sortable: true, filter: true, minWidth: 140, editable: isEditable },
        { field: 'entry_created', headerName: 'Entry Created', sortable: true, filter: true, minWidth: 180, editable: isEditable },
        { field: 'status', headerName: 'Status', sortable: true, filter: true, minWidth: 140, editable: isEditable },
        { field: 'auction_id', headerName: 'Auction ID', sortable: true, filter: true, minWidth: 100, editable: isEditable },
        { field: 'auction_name', headerName: 'Auction Name', sortable: true, filter: true, minWidth: 140, editable: isEditable },
    ], [isEditable, isRedbookSortEnabled]);

    const gridOptions: GridOptions<Item> = useMemo(() => ({
        autoSizeStrategy: {
            type: 'fitGridWidth',
            defaultMinWidth: 100,
        },
        enableAdvancedFilter: true,
        pagination: true,
        paginationPageSize: 25,
        paginationPageSizeSelector: [10, 25, 50, 100, 200, 500, 1000],
        groupDefaultExpanded: -1,
        groupIncludeFooter: false,
        groupIncludeTotalFooter: false,
        sortingOrder: ['asc', 'desc', null],
    }), []);

    const onRowClicked = useCallback((event: RowClickedEvent) => {
        if (!isEditable) {
            handleRowClick(event.data);
        }
    }, [isEditable, handleRowClick]);

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

    useEffect (() => {
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.refreshClientSideRowModel('sort');
        }
    }, [isRedbookSortEnabled]);

    return (
        <Box sx={{ width: '100%' }}>
            <Toolbar sx={{ backgroundColor: 'grey.300' }}>
                <Typography variant="body1" sx={{ color: 'text.primary', marginRight: 2 }}>
                    Toggle Edit:
                </Typography>
                <Switch onChange={handleToggleEdit} checked={isEditable} />
                <Typography variant="body1" sx={{ color: 'text.primary', marginRight: 2 }}>
                    Toggle RedBook Sort:
                </Typography>
                <Switch onChange={handleToggleRedbook} checked={isRedbookSortEnabled} />
            </Toolbar>
            <Box className="ag-grid-theme-builder" sx={{ height: 600, width: '100%' }}>
                <AgGridReact<Item>
                    ref={gridRef}
                    rowData={items}
                    columnDefs={columnDefs}
                    defaultColDef={{ resizable: true, minWidth: 100 }}
                    gridOptions={gridOptions}
                    onRowClicked={onRowClicked}
                    domLayout="autoHeight"
                    onFirstDataRendered={onFirstDataRendered}
                    groupDisplayType="groupRows"
                />
            </Box>
            <Drawer
                anchor="right"
                open={Boolean(selectedItem)}
                onClose={() => setSelectedItem(null)}
                sx={{ '& .MuiDrawer-paper': { width: 800 } }}
            >
                <Box sx={{ width: 800, padding: 2 }}>
                    {selectedItem?.photos?.urls ? (
                        <PhotoCarousel photos={selectedItem.photos.urls.split('|').map((photo) => photo.trim())} />
                    ) : (
                        <Typography>No photos available</Typography>
                    )}
                    {selectedItem && (
                        <DetailsRow
                            description={selectedItem.description}
                            photos={selectedItem.photos}
                            item_id={selectedItem.item_id}
                            shelf_number={selectedItem.shelf_number}
                            box_number={selectedItem.box_number}
                            location_code={selectedItem.location_code}
                            consignor_id={selectedItem.consignor_id}
                            consignor_sku={selectedItem.consignor_sku}
                            year={selectedItem.year}
                            mint_mark={selectedItem.mint_mark}
                            denomination={selectedItem.denomination}
                            series={selectedItem.series}
                            grade_company={selectedItem.grade_company}
                            grade={selectedItem.grade}
                            strike_type={selectedItem.strike_type}
                            circulated_uncirculated={selectedItem.circulated_uncirculated}
                            listing_type={selectedItem.listing_type}
                            starting_price={selectedItem.starting_price}
                            reserve_price={selectedItem.reserve_price}
                            sales_channel={selectedItem.sales_channel}
                            date_listed={selectedItem.date_listed}
                            date_sold={selectedItem.date_sold}
                            entry_created={selectedItem.entry_created}
                            status={selectedItem.status}
                        />
                    )}
                </Box>
            </Drawer>
        </Box>
    );
};

export default InventoryTable;