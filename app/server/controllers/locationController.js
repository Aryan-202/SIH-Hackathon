const locationService = require("../services/locationService");

exports.updateLocation = async (req, res, next) => {
  try {
    const { userId, latitude, longitude } = req.body;

    if (!userId || !latitude || !longitude) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await locationService.saveLocation({ userId, latitude, longitude });
    res.json({ success: true, message: "Location updated" });
  } catch (err) {
    next(err);
  }
};

exports.getLocations = async (req, res, next) => {
  try {
    const latest = await locationService.getLatestLocations();
    res.json(latest);
  } catch (err) {
    next(err);
  }
};
