// types.ts
export default interface Item {
    sku: string;
    title: string;
    description: string | null;
    value: number | string | null;
    quantity: number | null;
    item_id: string | null;
    shelf_number: string | null;
    box_number: string | null;
    location_code: string | null;
    consignor_id: string | null;
    consignor_sku: string | null;
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
    sales_channel: string | null;
    auction_id: number | null;
    auction_name: string | null;
    // photos?: string | null;
    photos?: { urls: string } | null;
    notes?: string | null;
    date_listed?: string | null;
    date_sold?: string | null;
    entry_created?: string | null;
    status?: string | null;
}



