import express from 'express';
import isAuthenticated from '../middlwares/isAuthenticated.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/applications").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/applications/:id/status").post(isAuthenticated, updateStatus);


export default router;