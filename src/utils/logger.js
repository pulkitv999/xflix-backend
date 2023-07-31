const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDirectory = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Define log file path
const logFilePath = path.join(logsDirectory, 'app.log');

// Function to write logs to the file
const writeLogToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};

// Logger middleware for logging requests
const logger = (req, res, next) => {
  const { method, url } = req;
  const logMessage = `${method} ${url}`;
  writeLogToFile(logMessage);
  next();
};

// Logger middleware for logging errors
const errorLogger = (error, req, res, next) => {
  const logMessage = `Error: ${error.message}`;
  writeLogToFile(logMessage);
  next(error);
};

// Function to log general messages
const logMessage = (message) => {
  writeLogToFile(message);
};

const error = (error) => {
  const logMessage = `Error: ${error.message}`;
  writeLogToFile(logMessage);
};

module.exports = {
  logger,
  errorLogger,
  logMessage,
  error,
};
