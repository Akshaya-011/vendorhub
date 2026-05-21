class ApiResponse {
  constructor(statusCode, success, message, data = null) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
  }

  static success(res, message = 'Success', data = null, statusCode = 200) {
    return res.status(statusCode).json(
      new ApiResponse(statusCode, true, message, data)
    );
  }

  static created(res, message = 'Resource Created Successfully', data = null) {
    return res.status(201).json(
      new ApiResponse(201, true, message, data)
    );
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
    const response = new ApiResponse(statusCode, false, message);
    if (errors) {
      response.errors = errors;
    }
    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
