import { resultService } from '@/services'
import { CrudController } from '@/controllers'

export class ResultController extends CrudController<typeof resultService> {
    constructor() {
        super(resultService)
    }
}
