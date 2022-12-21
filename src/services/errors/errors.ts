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

export class AuthorNotFoundError extends EntityNotFoundError {
  constructor(message: string) {
    super(message);
  }
}
