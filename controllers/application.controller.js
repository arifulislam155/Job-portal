import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: " Job Id is required",
                success: false
            })
        };
        const existingApplication = await Application.findOne({job: jobId, applicant: userId});

        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            })
        }
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message: "Job Not Found",
            success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};


// export const getAppliedJobs = async(req, res)=>{
//     try {
//         const userId = req.id;
//         const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
//             path: "job",
//         options: {sort({createdAt: -1})}});
//     } catch (error) {
//         console.log(error)
//     }
// }