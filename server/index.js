require("express-async-errors");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");

const db = require("./db");

const createTeacherRouter = require("./routes/teacherRoutes");
const createEmployerRouter = require("./routes/empolyersRoutes");
const createStudentsRouter = require("./routes/studentsRouter");
const userRoutes = require("./modules/users/users.routes");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

// Model
require("./models/user.model");

// Public
// Login Signup
app.use("/api/users", userRoutes);

// Middleware
// app.use(auth);
app.use(auth);
// Protected Routes
app.use("/api", createTeacherRouter);
app.use("/api", createEmployerRouter);
app.use("/api", createStudentsRouter);

// errorHandler
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
