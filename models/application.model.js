import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true });

// Add indexes
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
applicationSchema.index({ job: 1 });
applicationSchema.index({ applicant: 1 });

// Prevent model recompilation in development
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application;
