import React, { useCallback, useRef, useState } from 'react';
import DataEntryTable from '../components/dataEntry/dataEntryTable';
import DataEntryHeader from '../components/dataEntry/dataEntryHeader';
import { Box } from '@mui/material';
// import PhotoUpload from '../components/dataEntry/photoUpload';

const DataEntry: React.FC = () => {
    const gridRef = useRef<{
        handleAddRow: () => void;
        handleSave: () => void;
        handleClearTable: () => void;
        
    }>(null);
    const [locationCode, setLocationCode] = useState<string>('');
    const [shelfNumber, setShelfNumber] = useState<string>('');
    const [boxNumber, setBoxNumber] = useState<string>('');
    const [currentSku, setCurrentSku] = useState<string>('');

    const handleUpdateLocationCode = useCallback((value: string) => {
        setLocationCode(value);
    }, []);

    const handleUpdateShelfNumber = useCallback((value: string) => {
        setShelfNumber(value);
    }, []);

    const handleUpdateBoxNumber = useCallback((value: string) => {
        setBoxNumber(value);
    }, []);

    const handlePhotoUploadComplete = useCallback((urls: string[]) => {
        console.log('Uploaded photo URLs:', urls);
    }, []);

    return (
        <Box>
            <DataEntryHeader
                onAddRow={() => gridRef.current?.handleAddRow()}
                onSave={() => gridRef.current?.handleSave()}
                onUpdateLocationCode={handleUpdateLocationCode}
                onUpdateShelfNumber={handleUpdateShelfNumber}
                onUpdateBoxNumber={handleUpdateBoxNumber}
                onClearTable={() => gridRef.current?.handleClearTable()}
                onPhotoUploadComplete={handlePhotoUploadComplete}
                sku={currentSku}
                sx={{ paddingTop: '2px'}}
            />
            <DataEntryTable
                locationCode={locationCode}
                shelfNumber={shelfNumber}
                boxNumber={boxNumber}
                ref={gridRef}
                onAddRow={() => gridRef.current?.handleAddRow()}
                onSave={() => gridRef.current?.handleSave()}
            />
        </Box>
    );
};

export default DataEntry;
