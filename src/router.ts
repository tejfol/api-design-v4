import {Router} from 'express';

import {body} from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';

import {handleInputErrors} from './modules/middleware';

const router = Router();

/**
 * Create
 */
router.get('/product/:id', getOneProduct);

router.get('/product', getProducts);

router.put(
  '/product/:id',
  body('name').not().isEmpty().isString(),
  handleInputErrors,
  updateProduct
);

router.post(
  '/product',
  body('name').not().isEmpty().isString(),
  handleInputErrors,
  createProduct
);

router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update/:id', getOneUpdate);

router.get('/update', getUpdates);

router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status')
    .isIn([body('IN_PROGRESS'), body('SHIPPED'), body('DEPRECATED')])
    .optional(),
  body('version').optional(),
  updateUpdate
);

router.post(
  '/update',
  body('title').exists(),
  body('body').optional().isString(),
  body('productId').exists().isString(),
  createUpdate
);

router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint/:id', (req, res) => {});

router.get('/updatepoint', (req, res) => {});

router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req, res) => {}
);

router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  (req, res) => {}
);

router.delete('/updatepoint/:id', () => {});

export default router;
