const express = require("express");
const { generateSqlConceptPlan, getSqlConceptPlan } = require("../controllers/sqlConceptPlanController");
const protect = require("../middleware/authMiddleware"); // Middleware for authentication

const router = express.Router();

// Route to generate an SQL concept plan
router.post("/generate", protect, generateSqlConceptPlan);

// Route to get an existing SQL concept plan
router.get("/get", protect, getSqlConceptPlan);

module.exports = router;
