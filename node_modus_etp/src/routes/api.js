const express = require('express');
const itemsController = require('../controllers/itemsController');

const router = express.Router();

router.get('/items', itemsController.getAllItems);
router.post('/items', itemsController.createItem);
router.put('/items/:sno', itemsController.updateItem);
router.delete('/items/:sno', itemsController.deleteItem);
router.get('/items/:sno', itemsController.getItemBySno);

module.exports = router;
