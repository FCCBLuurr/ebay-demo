import { Sequelize, DataTypes, Model } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`);

interface ItemAttributes {
    sku: string;
    title: string;
    description?: string;
    value?: number;
    quantity?: number;
    item_id: string;
    shelf_number?: string;
    box_number?: string;
    location_code?: string;
    consignor_id?: string;
    consignor_sku?: string;
    year?: string;
    mint_mark?: string;
    denomination?: string;
    series?: string;
    grade_company?: string;
    grade?: string;
    strike_type?: string;
    circulated_uncirculated?: string;
    listing_type?: string;
    starting_price?: number;
    reserve_price?: number;
    sales_channel?: string;
    date_listed?: Date;
    date_sold?: Date;
    entry_created?: Date;
    status?: string;
    auction_id?: number;
    auction_name?: string;
    photos?: string[];
}

class Item extends Model<ItemAttributes> implements ItemAttributes {
    public sku!: string;
    public title!: string;
    public description!: string;
    public value!: number;
    public quantity!: number;
    public item_id!: string;
    public shelf_number!: string;
    public box_number!: string;
    public location_code!: string;
    public consignor_id!: string;
    public consignor_sku!: string;
    public year!: string;
    public mint_mark!: string;
    public denomination!: string;
    public series!: string;
    public grade_company!: string;
    public grade!: string;
    public strike_type!: string;
    public circulated_uncirculated!: string;
    public listing_type!: string;
    public starting_price!: number;
    public reserve_price!: number;
    public sales_channel!: string;
    public date_listed!: Date;
    public date_sold!: Date;
    public entry_created!: Date;
    public status!: string;
    public auction_id!: number;
    public auction_name!: string;
    public photos!: string[];
}

Item.init({
    sku: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    value: { type: DataTypes.FLOAT, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    item_id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    shelf_number: { type: DataTypes.STRING, allowNull: true },
    box_number: { type: DataTypes.STRING, allowNull: true },
    location_code: { type: DataTypes.STRING, allowNull: true },
    consignor_id: { type: DataTypes.STRING, allowNull: true },
    consignor_sku: { type: DataTypes.STRING, allowNull: true },
    year: { type: DataTypes.STRING, allowNull: true },
    mint_mark: { type: DataTypes.STRING, allowNull: true },
    denomination: { type: DataTypes.STRING, allowNull: true },
    series: { type: DataTypes.STRING, allowNull: true },
    grade_company: { type: DataTypes.STRING, allowNull: true },
    grade: { type: DataTypes.STRING, allowNull: true },
    strike_type: { type: DataTypes.STRING, allowNull: true },
    circulated_uncirculated: { type: DataTypes.STRING, allowNull: true },
    listing_type: { type: DataTypes.STRING, allowNull: true },
    starting_price: { type: DataTypes.FLOAT, allowNull: true },
    reserve_price: { type: DataTypes.FLOAT, allowNull: true },
    sales_channel: { type: DataTypes.STRING, allowNull: true },
    date_listed: { type: DataTypes.DATE, allowNull: true },
    date_sold: { type: DataTypes.DATE, allowNull: true },
    entry_created: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    auction_id: { type: DataTypes.INTEGER, allowNull: true },
    auction_name: { type: DataTypes.STRING, allowNull: true },
    photos: { type: DataTypes.JSON, allowNull: true },
}, {
    sequelize,
    modelName: 'Item',
    schema: 'inventory',
    tableName: 'obt_inventory',
    timestamps: false,
});

sequelize.sync();

export default Item;