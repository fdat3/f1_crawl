import { driverController } from '@/controllers'
import * as _ from 'lodash'
import { Request, Response } from '../base'
import { CrudRouter } from '../crud'

export default class DriverRouter extends CrudRouter<typeof driverController> {
    constructor() {
        super(driverController)
    }
    customRouting() {
        this.router.get('/:driver_id/get-result-by-year/:year', this.route(this.getResultByYear))
        this.router.get('/:driver_name/get-result-by-name/:year', this.route(this.getResultDriverByName))
        this.router.get('/get-result-by-year/:year', this.route(this.getResultAllTeamByYear))
    }
    async getResultByYear(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const driver_id: String = req.params.driver_id
        const result = await this.controller.getResultATeamByYear({ year, driver_id })
        this.onSuccess(res, result)
    }
    async getResultDriverByName(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const driver_name: String = req.params.driver_name
        const result = await this.controller.getResultATeamByName({ year, driver_name })
        this.onSuccess(res, result)
    }
    async getResultAllTeamByYear(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const result = await this.controller.getResultAllTeamByYear({ year })
        this.onSuccess(res, result)
    }
}
