export class MessageResponse {
    /**
     * messageFormat
     *
     * @static
     * @param {string} field
     * @param {string} customMessage
     * @returns {string}
     * @memberof MessageResponse
     */
    static messageFormat(customMessage) {
        return `${customMessage}`;
    }
    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static generalError() {
        return this.messageFormat('An error occured during the process');
    }

    /////// ***************************** PROCESS MESSAGES 
    /**
     *
     *
     * @returns {string}
     * @memberof MessageResponse
     */
    static isUploaded() {
        return this.messageFormat('Successfully uploaded');
    }
    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static notUploaded() {
        return this.messageFormat('Uploading process failed');
    }
    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static missingParam() {
        return this.messageFormat('Missing paramenter');
    }

    /////// ***************************** DB MESSAGES 

    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static notFound() {
        return this.messageFormat('An error occurred while getting data');
    }
    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static dbError() {
        return this.messageFormat('Database error');
    }

    /////// ***************************** USER MESSAGES

    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static unauthorized() {
        return this.messageFormat('Not authorized');
    }
    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static registerSuccess() {
        return this.messageFormat('Registered user successfully');
    }
    /**
     *
     *
     * @static
     * @returns {string}
     * @memberof MessageResponse
     */
    static registerFail() {
        return this.messageFormat('Failed to register user');
    }
}
