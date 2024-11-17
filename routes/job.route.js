import express from 'express';
import isAuthenticated from '../middlwares/isAuthenticated.js';
import { getAdminJob, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").post(isAuthenticated, getAdminJob); 
router.route("/get/:id").post(isAuthenticated, getJobById);

export default router;
