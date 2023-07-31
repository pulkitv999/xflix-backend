const express = require("express");
const videoRoutes = require("./video.router");

const router = express.Router();

router.use("/videos", videoRoutes);

module.exports = router;
