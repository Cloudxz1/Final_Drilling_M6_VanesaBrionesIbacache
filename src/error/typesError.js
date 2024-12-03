import AppError from "./AppError.js";


export class ValidationError extends AppError {
 
  constructor(message, details) {
    super(message || "Error de Validación", 400, details);
  }
}

export class NotFoundError extends AppError {
    constructor(message, details, entity) {
        super(message || `${entity} No encontrado`, 404, details)
    }
}

export class JSONError extends AppError {
    constructor(message, details) {
        super(message || 'Error en el JSON de datos', 500, details)
    }
}

export class InternalServerErrorTest extends AppError {
    constructor(message, details) {
        super(message || 'Error interno del Servidor', 500, details)
    }
}