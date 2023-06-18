import {AppExceptionType, AuthException, HttpStatus} from "@/common/enum";

export interface IBaseErrorOption {
    code: HttpStatus
    type: AppExceptionType | AuthException | any
    message?: string
    data?: any
}
