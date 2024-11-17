import express from 'express';
import isAuthenticated from '../middlwares/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById); // Changed to POST and added isAuthenticated
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;
