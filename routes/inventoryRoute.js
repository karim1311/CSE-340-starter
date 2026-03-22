// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Route to build inventory by inventory ID view
router.get("/detail/:inventoryId", invController.buildByInventoryId)

// route to error
router.get("/error", invController.buildErrorView)

module.exports = router;
