import express from 'express';
import cookieparser from 'cookie-parser'

// Import user routes
import userRouter from './routes/user.routes.js';
import animalRoutes from './routes/animal.routes.js';
import treeRoutes from './routes/tree.routes.js';
import bookingRoutes from './routes/booking.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());

// Use user routes
app.use('/api/user', userRouter);
app.use('/api/animal', animalRoutes);
app.use('/api/tree', treeRoutes);
app.use('/api/booking', bookingRoutes);

export default app;