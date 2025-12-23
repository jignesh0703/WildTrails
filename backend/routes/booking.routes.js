import express from 'express';
import { createBooking, getUserBookings, getAllBookings, updateBooking, deleteBooking } from '../controller/booking.controller.js';
import jwtAuth from '../middelware/jwtAuth.js';

const bookingRoutes = express.Router();

bookingRoutes.post('/create', jwtAuth, createBooking);
bookingRoutes.get('/mybookings', jwtAuth, getUserBookings);
bookingRoutes.get('/all', jwtAuth, getAllBookings);
bookingRoutes.put('/:id', jwtAuth, updateBooking);
bookingRoutes.delete('/:id', jwtAuth, deleteBooking);

export default bookingRoutes;
