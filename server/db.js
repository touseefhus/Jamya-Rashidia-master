const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/form", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add any other options you need here
});

const dbConnection = mongoose.connection;

dbConnection.on("connected", () => {
  console.log("Database is connected");
});

dbConnection.on("error", (error) => {
  console.error("Error in database connection:", error);
});

module.exports = mongoose;
