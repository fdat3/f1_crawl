import { driverService } from '@/services'
import { CrudController } from '@/controllers'
import { ICrudOption } from '@/interfaces'

export class DriverController extends CrudController<typeof driverService> {
    constructor() {
        super(driverService)
    }

}
