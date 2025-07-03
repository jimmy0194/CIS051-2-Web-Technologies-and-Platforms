import express from 'express';
import { loginUser, registerUser , getAllStudents } from '../controllers/authController.js';



const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllStudents);
export default router;
