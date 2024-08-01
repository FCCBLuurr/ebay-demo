import React from 'react';

interface CreateItemIdProps {
    locationCode: string;
    shelfNumber: string;
    boxNumber: string;
    sku: string;
}

const CreateItemId: React.FC<CreateItemIdProps> = ({
    locationCode,
    shelfNumber,
    boxNumber,
    sku,
}) => {
    const itemId = `${locationCode}:${shelfNumber}:${boxNumber}::${sku}`;
    return <span>{itemId}</span>;
};

export default CreateItemId;
