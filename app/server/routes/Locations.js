const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

// Tourist app → send location updates
router.post("/update", locationController.updateLocation);

// Dashboard → fetch latest locations
router.get("/", locationController.getLocations);

module.exports = router;
