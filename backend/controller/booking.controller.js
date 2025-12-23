import bookingModel from "../model/booking.model.js";

const createBooking = async (req, res) => {
    try {
        const user = req.user;
        const { safariType, date, duration, participants, totalPrice, specialRequests, guide } = req.body;

        // Validate required fields
        if (!safariType || !date || !duration || !participants || !totalPrice) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Create booking
        const booking = await bookingModel.create({
            user: user._id,
            safariType,
            date,
            duration,
            participants,
            totalPrice,
            specialRequests,
            guide
        });

        return res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            data: { booking }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

const getUserBookings = async (req, res) => {
    try {
        const user = req.user;
        const bookings = await bookingModel.find({ user: user._id }).populate('user', 'username email');

        return res.status(200).json({
            success: true,
            message: 'Bookings fetched successfully!',
            data: { bookings }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

const getAllBookings = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admin can view all bookings!'
            });
        }

        const bookings = await bookingModel.find({}).populate('user', 'username email');

        return res.status(200).json({
            success: true,
            message: 'All bookings fetched successfully!',
            data: { bookings }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

const updateBooking = async (req, res) => {
    try {
        const user = req.user;
        const bookingId = req.params.id;
        const { safariType, date, duration, participants, totalPrice, status, specialRequests, guide } = req.body;

        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found!'
            });
        }

        // Check if user owns the booking or is admin
        if (booking.user.toString() !== user._id.toString() && user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You can only update your own bookings!'
            });
        }

        // Update fields
        if (safariType) booking.safariType = safariType;
        if (date) booking.date = date;
        if (duration) booking.duration = duration;
        if (participants) booking.participants = participants;
        if (totalPrice) booking.totalPrice = totalPrice;
        if (status && user.role === 'admin') booking.status = status; // Only admin can update status
        if (specialRequests) booking.specialRequests = specialRequests;
        if (guide) booking.guide = guide;

        await booking.save();

        return res.status(200).json({
            success: true,
            message: 'Booking updated successfully!',
            data: { booking }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const user = req.user;
        const bookingId = req.params.id;

        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found!'
            });
        }

        // Check if user owns the booking or is admin
        if (booking.user.toString() !== user._id.toString() && user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own bookings!'
            });
        }

        await bookingModel.findByIdAndDelete(bookingId);

        return res.status(200).json({
            success: true,
            message: 'Booking deleted successfully!'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error!'
        });
    }
}

export {
    createBooking,
    getUserBookings,
    getAllBookings,
    updateBooking,
    deleteBooking
}
