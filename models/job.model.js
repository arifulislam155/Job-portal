import { application } from "express";
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
    requirments: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type:mongoose.Types.ObjectId,
        ref: 'Company',
        requred:true
    },
    created_by: {
        type:mongoose.Types.ObjectId,
        ref: 'User',
        requred:true
    },
    application: [{
        type:mongoose.Types.ObjectId,
        ref: 'Application',
    }]
}, {timestamps:true})

export const Job = mongoose.model('Job', jobSchema);