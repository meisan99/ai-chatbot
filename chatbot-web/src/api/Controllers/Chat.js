import { ApiError, BaseApiController, UNKNOWN_ERROR_CODE } from "../APIController"

export class ChatApiResult {
    /**
     * @param {string | null} message 
     * @param {ApiError|null} error
     */

    constructor(message, error = null) {
        this.message = message
        this.error = error
    }
}

export class ChatApiController extends BaseApiController {
    /**
     * @param {string} message 
     * @returns {Promise<ChatApiResult>}
     */
    async sendMessage(message) {
        try {
            const response = await this.post("/chat", { message })

            if (!response.ok) {
                throw new ApiError(response.statusText, response.status)
            }

            const data = await response.json()

            return new ChatApiResult(data.message)
        }
        catch (error) {

            if (error instanceof ApiError) {
                return new ChatApiResult(null, error)
            }

            return new ChatApiResult(null, new ApiError("Unknown error occurred", UNKNOWN_ERROR_CODE))
        }
    }
}
