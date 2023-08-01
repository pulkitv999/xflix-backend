const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_DEV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    NODE_ENV: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB URL'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_DEV,
  port: envVars.NODE_ENV,
  // Set mongoose configuration
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_DEV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
