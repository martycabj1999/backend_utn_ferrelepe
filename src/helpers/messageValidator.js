export class MessageValidator {
    /**
     * messageFormat
     *
     * @static
     * @param {string} field
     * @param {string} customMessage
     * @param {string} [option]
     * @returns {string}
     * @memberof MessageValidator
     */
    static messageFormat(field, customMessage, option = '') {
        const fieldSplited = field.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
        const opt =
            option != undefined ? option.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase() : null;
        if (opt) {
            return `${fieldSplited} ${customMessage} ${opt}`;
        }
        return `${fieldSplited} ${customMessage}`;
    }
    /**
     * isRequired
     *
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static isRequired(field) {
        return this.messageFormat(field, 'es requerido');
    }
    /**
     * isInt
     *
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static isInt(field) {
        return this.messageFormat(field, 'tiene que ser un número entero');
    }
    /**
     * isString
     *
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static isString(field) {
        return this.messageFormat(field, 'tiene que ser una cadena de caracteres');
    }
    /**
     * isDecimal
     *
     * @static
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static isDecimal(field) {
        return this.messageFormat(field, 'tiene que ser de tipo decimal');
    }
    /**
     * isLength
     *
     * @param {string} field
     * @param {number} maxLength
     * @returns {string}
     * @memberof MessageValidator
     */
    static maxLength(field, maxLength) {
        const message = `can't be more than ${maxLength} characters long`;
        return this.messageFormat(field, message);
    }
    /**
     * minLength
     *
     * @static
     * @param {string} field
     * @param {number} minLength
     * @returns {string}
     * @memberof MessageValidator
     */
    static minLength(field, minLength) {
        const message = `can't be less than ${minLength} characters long`;
        return this.messageFormat(field, message);
    }

    static betweenLength(field, minLength, maxLength) {
        const message = `must be between ${minLength} and ${maxLength} characters long`;
        return this.messageFormat(field, message);
    }
    /**
     * incorrect
     *
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static incorrect(field) {
        return this.messageFormat(field, 'incorrect');
    }
    /**
     * inUse
     *
     * @static
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static inUse(field) {
        return this.messageFormat(field, 'already in use');
    }
    /**
     * hasRelateditems
     *
     * @static
     * @param {string} field
     * @param {string} items
     * @returns {string}
     * @memberof MessageValidator
     */
    static hasRelatedItems(field, items) {
        return this.messageFormat(field, 'has related', items);
    }
    /**
     * mustBeOfType
     *
     * @static
     * @param {string} field
     * @param {string} type
     * @returns {string}
     * @memberof MessageValidator
     */
    static mustBeOfType(field, type) {
        return this.messageFormat(field, 'must be of type', type);
    }
    /**
     * arrayEmpty
     *
     * @static
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static arrayEmpty(field) {
        return this.messageFormat(field, 'array empty');
    }
    /**
     * isEmpty
     *
     * @static
     * @param {string} field
     * @returns {string}
     * @memberof MessageValidator
     */
    static isEmpty(field) {
        return this.messageFormat(field, 'can not be empty');
    }
}