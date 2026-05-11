const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const code = err.code || "INTERNAL_ERROR";

  console.error(err);

  res.status(status).json({
    success: false,
    message,
    data: null,
    error: code,
  });
};

module.exports = errorHandler;
