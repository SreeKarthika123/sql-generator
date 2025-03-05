const express = require("express");
const { generateSqlPlan, } = require("../controllers/sqlPlanController");
// const { protect } = require("../middleware/authMiddleware"); 
const router = express.Router();

// console.log("SqlPlan model:", SQLPlan);
// console.log("updateProgress:", updateProgress);
console.log("Exports from sqlPlanController:", module.exports);

// POST route to create SQL Plan
router.post("/generate", generateSqlPlan);
// router.put("/update-progress", protect, updateProgress);
// router.get("/get", protect, getSqlPlan);

module.exports = router;
