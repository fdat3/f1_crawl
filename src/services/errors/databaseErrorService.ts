import {BaseError} from "./base";
import {AppExceptionType, HttpStatus} from "@/common/enum";
class DatabaseErrorService extends BaseError {
  constructor(key: string, message: string, code?: number) {
    super({
      code: code || 500,
      type: `database_exception_${key}`,
      message,
    });
  }
}
export class DatabaseExceptionService {
  public recordNotFound() {
    return new DatabaseErrorService(AppExceptionType.RECORD_NOT_FOUND, null, HttpStatus.NOT_FOUND);
  }
  public queryFail(message?: string) {
    return new DatabaseErrorService(AppExceptionType.QUERY_FAIL, message);
  }
  public customError(message: string = AppExceptionType.CUSTOM, code: HttpStatus) {
    return new DatabaseErrorService(AppExceptionType.CUSTOM, message, code);
  }
  public invalidScope(message?: string) {
    return new DatabaseErrorService(AppExceptionType.INVALID_SCOPE, message, HttpStatus.FORBIDDEN);
  }
  // public customError(message: string = "Invalid scope", errCode: number) {
  //   return new DatabaseExceptionService("invalid_scope", message, errCode);
  // }
}
