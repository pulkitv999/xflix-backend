const express = require("express");
const validate = require("../middlewares/validate");
const videoValidation = require("../validations/video.validation");
const videosController = require("../controllers/video.controller");

const router = express.Router();

// GET /v1/videos
router.get(
  "/",
  validate(videoValidation.searchVideos),
  videosController.getVideos
);

// GET /v1/videos/:videoId
router.get(
  "/:videoId",
  validate(videoValidation.getVideos),
  videosController.getVideo
);

// POST /v1/videos
router.post(
  "/",
  validate(videoValidation.addVideo),
  videosController.addVideos
);

// PATCH /v1/videos/:videoId/views
router.patch(
  "/:videoId/views",
  validate(videoValidation.updateViews),
  videosController.changeViews
);

// PATCH /v1/videos/:videoId/votes
router.patch(
  "/:videoId/votes",
  validate(videoValidation.updateVotes),
  videosController.changeVotes
);

module.exports = router;
