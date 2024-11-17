import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {title, description, requirments, salary, location, jobType, experience, position, companyId} = req.body;
        const userID = req.id;
        if(! title || !description || !requirments || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: " Something is Missing",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirments: requirments.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userID,
        });
        return res.status(201).json({
            message: " New Job Created Successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllJobs = async(req, res)=> {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {title: {$regex:keyword, $options: "i"}},
                {description: {$regex:keyword, $options: "i"}},
            ]
        };
        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message: "Job not Found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}


export const getJobById = async(req, res)=> {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not Found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAdminJob = async (req, res)=> {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId});
        if(!jobs){
            return res.status(404).json({
                message: "Job not Found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}