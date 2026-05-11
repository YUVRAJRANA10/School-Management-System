const successResponse = (res, status, message, data) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    error: null,
  });
};

const errorResponse = (res, status, message, error) => {
  return res.status(status).json({
    success: false,
    message,
    data: null,
    error: error || null,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
