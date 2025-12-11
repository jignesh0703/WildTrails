import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './connectDB/connectDB.js';
dotenv.config();

const port = process.env.PORT;

connectDB()
    .then(
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    ) 