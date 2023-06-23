import { driverService } from '@/services'
import { CrudController } from '@/controllers'
import { ICrudOption } from '@/interfaces'

export class DriverController extends CrudController<typeof driverService> {
    constructor() {
        super(driverService)
    }
    async getResultDriverByName(params: { year: Number, driver_name: String }) {
        const result = await this.service.getResultDriverByName(params)
        return result
    }
    async getDriverTableRank(params: { year: Number }) {
        const result = await this.service.getDriverTableRank(params)
        return result
    }
}
