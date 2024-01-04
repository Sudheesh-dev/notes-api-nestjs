export const DEFAULT_NODE_ENV = "development"
export enum TYPEORM_DB_TYPES {
    POSTGRES = 'postgres'
}
export enum ErrorMessages {
    USEREMAIL_ALREADY_EXISTS = 'Email already exists',
    INVALID_CREDENTIALS = 'Invalid credentials.'
}

export enum ErrorCodes {
    USEREMAIL_ALREADY_EXISTS = "USEREMAIL_ALREADY_EXISTS",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
}

export enum ENV_VARS{
    JWT_SECRET = 'JWT_SECRET'
}