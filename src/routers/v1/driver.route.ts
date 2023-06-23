import { driverController } from '@/controllers'
import * as _ from 'lodash'
import { Request, Response } from '../base'
import { CrudRouter } from '../crud'

export default class DriverRouter extends CrudRouter<typeof driverController> {
    constructor() {
        super(driverController)
    }
    customRouting() {
        this.router.get('/get-driver-result-by-name/:driver_name/:year', this.route(this.getResultDriverByName))
        this.router.get('/table-rank/:year', this.route(this.getDriverTableRank))
    }
    async getResultDriverByName(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const driver_name: String = req.params.driver_name
        const result = await this.controller.getResultDriverByName({ year, driver_name })
        this.onSuccess(res, result)
    }
    async getDriverTableRank(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const result = await this.controller.getDriverTableRank({ year })
        this.onSuccess(res, result)
    }
}
