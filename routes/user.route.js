import express from 'express';
import { login, register, logout, updateProfile } from '../controllers/user.controller.js'; // Import logout
import isAuthenticated from '../middlwares/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isAuthenticated, logout); // Changed to POST and added isAuthenticated
router.route("/profile/update").post(isAuthenticated, updateProfile);

export default router;
