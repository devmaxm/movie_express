class AppError extends Error {
    constructor(message, status, errors) {
        super(message);
        this.message = message
        this.status = status
    }

    static Unauthorized() {
        return new AppError('Unauthorized', 401)
    }

    static Forbidden() {
        return new AppError('Forbidden', 403)
    }

    static BadRequest(message, errors=[]) {
        return new AppError(message, 400, errors)
    }

    static NotFound() {
        return new AppError('Document not found', 404)
    }
}

module.exports = AppError