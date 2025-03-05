const express = require("express");
const { generateSqlPlan ,getSqlPlan } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate-sql-plan", protect, generateSqlPlan);
// router.post("/sql-concept-plan/update-progress", protect, updateProgress);

router.get("/get-sql-plan", protect, getSqlPlan);

module.exports = router;

