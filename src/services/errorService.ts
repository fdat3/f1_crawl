import { RouterExceptionService, DatabaseExceptionService, FirebaseErrorService } from './errors'
import { AuthExceptionService } from "@/services/errors/authErrorService";
export class ErrorService {
    constructor() {
        this.router = new RouterExceptionService()
        this.auth = new AuthExceptionService()
        this.database = new DatabaseExceptionService()
        this.firebase = new FirebaseErrorService()
    }
    router: RouterExceptionService
    auth: AuthExceptionService
    database: DatabaseExceptionService
    firebase: FirebaseErrorService
}
