const express = require("express");
const app = express();
const touristRoutes = require("./routes/touristRoutes"); // import the routes you just created

app.use(express.json()); // for parsing JSON request bodies
app.use("/api", touristRoutes); // all routes will start with /api

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
