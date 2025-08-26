import mongoose from 'mongoose';
const borrowSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    isReturned: {
        type: Boolean,
        default: false
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date
    },
},{
    timestamps: true
});

export default mongoose.model('Borrow', borrowSchema);