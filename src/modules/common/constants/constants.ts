export const DEFAULT_NODE_ENV = "development"
export enum TYPEORM_DB_TYPES {
    POSTGRES = 'postgres'
}
export enum ErrorMessages {
    USEREMAIL_ALREADY_EXISTS = 'Email already exists',
    INVALID_CREDENTIALS = 'Invalid credentials.',
    INTERNAL_SERVER_ERROR = "Internal server error",
    NOTE_NOT_FOUND = 'Note with the given id is not found',
    USER_NOT_FOUND = "User not found",
    NOTE_SHARED_ALREADY = "This note is already shared with the user",
    CANNOT_SHARE_TO_OWN_ID = "Cannot share to own account"
}

export enum ErrorCodes {
    USEREMAIL_ALREADY_EXISTS = "USEREMAIL_ALREADY_EXISTS",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
}

export enum ENV_VARS{
    JWT_SECRET = 'JWT_SECRET',
    THROTTLE_TTL = "THROTTLE_TTL",
    THROTTLE_LIMIT = "THROTTLE_LIMIT",
    REDIS_CONNECTION_URL = "REDIS_CONNECTION_URL"
}