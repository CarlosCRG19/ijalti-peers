import CustomError from './CustomError';

class NoEntityFoundError extends CustomError {
    constructor(entityName: string) {
        super(`${entityName} not found.`, 'NO_FOUND_ENTITY', 404);
    }
}

export default NoEntityFoundError;
