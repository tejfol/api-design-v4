'use strict';
exports.__esModule = true;
const express_1 = require('express');
const router = (0, express_1.Router)();
/**
 * Create
 */
router.get('/product/:id', () => {});
router.get('/product', (req, res) => {
  res.json({'/product': 'route initialized', customData: res.sdfg});
});
router.put('/product/:id', () => {});
router.post('/product', () => {});
router['delete']('/product/:id', () => {});
/**
 * Update
 */
router.get('/update/:id', () => {});
router.get('/update', () => {});
router.put('/update/:id', () => {});
router.post('/update', () => {});
router['delete']('/update/:id', () => {});
/**
 * Update Points
 */
router.get('/updatepoint/:id', () => {});
router.get('/updatepoint', () => {});
router.put('/updatepoint/:id', () => {});
router.post('/updatepoint', () => {});
router['delete']('/updatepoint/:id', () => {});
exports['default'] = router;
//# sourceMappingURL=router.js.map
