export default class InvalidPasswordError extends Error {
    constructor() {
        super()
        this.message = 'La contraseña actual no coincide con la del sistema'
    }
}
