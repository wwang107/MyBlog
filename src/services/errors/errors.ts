class EntityNotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class PostNotFoundError extends EntityNotFoundError {
  constructor(message: string) {
    super(message);
  }
}

export class UserNotFoundError extends EntityNotFoundError {
  constructor(message: string) {
    super(message);
  }
}
