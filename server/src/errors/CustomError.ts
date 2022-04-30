class CustomError extends Error {
    constructor(
        public message: string,
        public code: string | number = 'INTERNAL_ERROR',
        public status: number = 500,
      ) {
        super();
      }
}

export default CustomError;
