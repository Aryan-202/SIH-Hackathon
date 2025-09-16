const express = require("express");
const { addTourist, getTouristHashID } = require("../services/touristID");

const router = express.Router();

// Route to add a tourist
router.post("/add-tourist", async (req, res) => {
  const { name } = req.body;
  try {
    await addTourist(name);
    res.send({ message: "Tourist added!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

// Route to get hashID of a tourist
router.get("/hash/:name", async (req, res) => {
  try {
    const hash = await getTouristHashID(req.params.name);
    res.send({ hash });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;
