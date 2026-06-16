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

export class BaseApiController {

    #baseUrl

    constructor() {
        this.#baseUrl = "http://localhost:3000/api"
    }


    /**
     * @protected
     * @param {string} path 
     * @param {object} body 
     * @returns {Promise<Response>}
     */
    async get(path, body) {
        const res = await fetch(
            `${this.#baseUrl}${path}`,
            {
                method: "get",
                headers: { "Content-Type": "application/json" },
            }
        )
        return res
    }

    /**
     * @protected
     * @param {string} path 
     * @param {object} body 
     * @returns {Promise<Response>}
     */
    async post(path, body) {
        const res = await fetch(
            `${this.#baseUrl}${path}`,
            {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        )
        return res
    }
}