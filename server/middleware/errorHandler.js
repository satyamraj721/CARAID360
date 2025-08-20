function notFound(req, res, next) {
  res.status(404);
  res.json({ message: `Not Found - ${req.originalUrl}` });
}

// Centralized error handler for clean responses
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || 'Server Error'
  });
}

module.exports = { notFound, errorHandler };

