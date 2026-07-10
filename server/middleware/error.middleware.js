const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,

    message: error.message || "Server Error",

    stack: process.env.NODE_ENV === "development" ? error.stack : null,
  });
};

export default errorMiddleware;
