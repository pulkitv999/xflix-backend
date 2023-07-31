const Joi = require('joi');

// Validation schema for creating a new video
const createVideoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().min(1).required(),
  releaseDate: Joi.date().iso().required(),
  category: Joi.string().required(),
  videoUrl: Joi.string().uri().required(),
});

// Validation schema for updating an existing video
const updateVideoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  duration: Joi.number().min(1),
  releaseDate: Joi.date().iso(),
  category: Joi.string(),
  videoUrl: Joi.string().uri(),
});

// Validation middleware for creating a new video
const validateCreateVideo = (req, res, next) => {
  const { error } = createVideoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Validation middleware for updating an existing video
const validateUpdateVideo = (req, res, next) => {
  const { error } = updateVideoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  createVideoSchema,
  updateVideoSchema,
  validateCreateVideo,
  validateUpdateVideo,
};
