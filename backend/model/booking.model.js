import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    safariType: {
        type: String,
        enum: ['Jungle Trek', 'Wildlife Safari', 'Bird Watching', 'Night Safari'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, // in hours
        required: true
    },
    participants: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Pending'
    },
    specialRequests: {
        type: String
    },
    guide: {
        type: String // guide name or ID
    }
}, {
    timestamps: true
});

const bookingModel = mongoose.model('booking', bookingSchema);

export default bookingModel;
