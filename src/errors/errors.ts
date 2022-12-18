import httpStatus from "http-status";

export class BaseAppError extends Error {

  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class EntityNotFound extends BaseAppError {
  constructor(message: string) {
    super(httpStatus.NOT_FOUND, message);
  }
}
