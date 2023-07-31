const videoService = require('../services/videos.service');
const catchAsync = require('../utils/catchAsync.js');

const addVideos = catchAsync(async (req, res) => {
  const video = await videoService.addVideo(req.body);
  res.status(201).send(video);
});

const getVideos = catchAsync(async (req, res) => {
    const title = req.query.title ? req.query.title : "";
    const contentRating = req.query.contentRating ? req.query.contentRating : "All" ;
    const genres = req.query.genres ? req.query.genres.split(",") : ["All"];
    const sortBy = req.query.sortBy ? req.query.sortBy : "releaseDate";

   const videos = await videoService.getVideos(
    title,
    contentRating,
    genres,
    sortBy,
   );

   res.status(200).send({ videos: videos });
});


const getVideo = catchAsync(async (req, res) => {
  const video = await videoService.getVideo(req.params.videoId);
  res.status(200).send(video);
});

// PATCH /v1/videos/:videoId/votes
const changeVotes = catchAsync(async (req, res) => {
  // Implement logic to update votes (upVotes and downVotes) for a video
  await videoService.changeVotes(req.params.videoId, req.body.vote, req.body.change);
  res.status(204).send()
});

// PATCH /v1/videos/:videoId/views
const changeViews = catchAsync(async (req, res) => {
  // Implement logic to update viewCount for a video
  await videoService.changeViews(req.params.videoId);
  res.status(204).send();
});

module.exports = {
  addVideos,
  getVideos,
  getVideo,
  changeVotes,
  changeViews,
};
