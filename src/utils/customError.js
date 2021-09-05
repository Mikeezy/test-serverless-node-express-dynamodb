const {
  ERROR,
  VALIDATION_ERROR,
  PROPERTY_INVALID,
} = require("./errorCode");

class MyError extends Error {
  constructor(message) {
    super(message);
    this.isOperationalError = true;
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError {
  constructor(message) {
    super(message);
    this.code = VALIDATION_ERROR;
  }
}

class PropertyInvalidWithErrorMessage extends ValidationError {
  constructor(property, message) {
    super(message);
    this.property = property;
    this.code = PROPERTY_INVALID;
  }
}

class PropertyInvalidError extends PropertyInvalidWithErrorMessage {
  constructor(property) {
    super(property, `${property} is required or invalid, please retry !`);
  }
}

class CustomError extends MyError {
  constructor(message, code = ERROR) {
    super(message);
    this.code = code;
  }
}

class CustomSimpleError extends CustomError {
  constructor() {
    super(
      `Operation failure, it seems like something went wrong, please retry !`,
      ERROR
    );
  }
}

const IsOperationalError = function (error) {
  return error.isOperationalError;
}

module.exports = {
  MyError,
  ValidationError,
  PropertyInvalidError,
  PropertyInvalidWithErrorMessage,
  CustomError,
  CustomSimpleError,
  IsOperationalError,
};
