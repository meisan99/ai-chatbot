export const UNKNOWN_ERROR_CODE = -1

export class ApiError extends Error {
    /**
     * @param {string} message
     * @param {number} status
     */
    constructor(message, status) {
        super(message)
        this.name = "ApiError"
        this.status = status
    }
}