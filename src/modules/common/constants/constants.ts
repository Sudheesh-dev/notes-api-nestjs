export const DEFAULT_NODE_ENV = "development"
export enum TYPEORM_DB_TYPES {
    POSTGRES = 'postgres'
}
export enum ErrorMessages {
    USEREMAIL_ALREADY_EXISTS = 'Email already exists',
    INVALID_CREDENTIALS = 'Invalid credentials.',
    INTERNAL_SERVER_ERROR = "Internal server error"
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