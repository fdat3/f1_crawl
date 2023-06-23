import { driverService } from '@/services'
import { CrudController } from '@/controllers'
import { ICrudOption } from '@/interfaces'

export class DriverController extends CrudController<typeof driverService> {
    constructor() {
        super(driverService)
    }
    async getResultATeamByYear(params: { year: Number, driver_id: String }) {
        const result = await this.service.getResultADriverByYear(params)
        return result
    }
    async getResultATeamByName(params: { year: Number, driver_name: String }) {
        const result = await this.service.getResultADriverByName(params)
        return result
    }
    async getResultAllDriverByYear(params: { year: Number }) {
        const result = await this.service.getResultAllDriverByYear(params)
        return result
    }
}
