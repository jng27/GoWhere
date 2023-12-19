import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class InternalServerException extends HttpException {
    constructor() {
        super('internal_server_error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
