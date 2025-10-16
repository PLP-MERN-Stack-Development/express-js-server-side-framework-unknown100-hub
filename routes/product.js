const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const asyncWrapper = require('../middleware/asyncWrapper');
const { validateProduct } = require('../middleware/validate');
const controller = require('../controllers/productController');


// Protect routes that modify data
// Public: GET list, GET by id, search, stats
router.get('/', asyncWrapper(controller.listProducts));
router.get('/search', asyncWrapper(controller.searchProducts));
router.get('/stats', asyncWrapper(controller.productStats));
router.get('/:id', asyncWrapper(controller.getProduct));


// Protected routes
router.post('/', auth, validateProduct, asyncWrapper(controller.createProduct));
router.put('/:id', auth, validateProduct, asyncWrapper(controller.updateProduct));
router.delete('/:id', auth, asyncWrapper(controller.deleteProduct));


module.exports = router;