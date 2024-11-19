import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String], // Changed to Array of Strings
    },
    salary: {
        type: Number,
        required: true,
        min: 0 // Salary cannot be negative
    },
    experienceLevel: {
        type: String, // Fixed typo
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'] // Restricted to specific values
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
        required: true // Fixed typo
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true // Fixed typo
    },
    application: [{
        type: mongoose.Types.ObjectId,
        ref: 'Application',
    }]
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);
