
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/authRoutes");
 const sqlConceptPlanRoutes = require("./routes/sqlConceptPlanRoutes"); // Import SQL concept plan routes
const sqlRoutes = require("./routes/sqlRoutes");
const sqlPlanRoutes = require("./routes/sqlPlanRoutes");
const user1Routes = require('./routes/userRoutes');
dotenv.config();
const app = express();

 app.use(cors());
app.use(express.json()); // Allow JSON requests
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes); 
app.use("/api/sql-plans", sqlPlanRoutes);
// Ensure route is correctly prefixed
app.use("/api/sql", sqlRoutes);
app.use('/api/users', user1Routes);
 app.use("/api/sql-concept-plan", sqlConceptPlanRoutes); // SQL Concept Plan Routes
// app.use("/api/sql-plan", sqlPlanRoutes); 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
