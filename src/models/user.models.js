import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Member'],
        default: 'Member'
    },
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);