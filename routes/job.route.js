import express from 'express';
import isAuthenticated from '../middlwares/isAuthenticated.js';
import { getAdminJob, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.route("/jobs").post(isAuthenticated, postJob); // For creating a job
router.route("/jobs").get(isAuthenticated, getAllJobs); // For retrieving all jobs
router.route("/admin/jobs").get(isAuthenticated, getAdminJob); // For retrieving admin jobs
router.route("/jobs/:id").get(isAuthenticated, getJobById); // For retrieving a job by ID


export default router;
