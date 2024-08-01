import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Set up PostgreSQL client
const pool = new Pool();

// Define a route to fetch items from the database
app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM inventory.obt_inventory ORDER BY sku');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
