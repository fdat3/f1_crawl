import {BaseError} from './base'
import {AppExceptionType, HttpStatus} from "@/common/enum";

class RouterErrorService extends BaseError {
    constructor(type?: AppExceptionType, message?: string, code?: HttpStatus) {
        super({
            code: code || HttpStatus.INTERNAL_SERVER_ERROR,
            type,
            message
        })
    }
}

export class RouterExceptionService {

    public somethingWentWrong() {
        return new RouterErrorService(AppExceptionType.UNEXPECTED)
    }
    badRequest() {
        return new RouterErrorService(AppExceptionType.BAD_REQUEST, null, HttpStatus.BAD_REQUEST)
    }
    requestDataInvalid(message: string) {
        return new RouterErrorService(AppExceptionType.BAD_REQUEST, message, 403)
    }
}
