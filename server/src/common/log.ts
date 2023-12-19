import { Injectable, Logger } from '@nestjs/common';

@Injectable()
class LogService {
    private logger = new Logger(LogService.name);

    debug(message: string) {
        this.logger.debug(message);
    }

    error(message: string) {
        this.logger.error(message);
    }
}

export default new LogService();
