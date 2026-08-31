import express from 'express';
import {
  loginAdmin,
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/users', getAdminUsers);
router.post('/users', createAdminUser);
router.put('/users/:id', updateAdminUser);
router.delete('/users/:id', deleteAdminUser);

export default router;
