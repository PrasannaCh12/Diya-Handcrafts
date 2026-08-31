import express from 'express';
import {
  getProducts,
  getArchivedProducts,
  getProductById,
  createProduct,
  updateProduct,
  archiveProduct,
  restoreProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/archived', getArchivedProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.post('/:id/archive', archiveProduct);
router.post('/:id/restore', restoreProduct);

export default router;
