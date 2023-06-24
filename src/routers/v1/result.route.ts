import { resultController } from '@/controllers'
import * as _ from 'lodash'
import { CrudRouter } from '../crud'
import { Request, Response } from '../base'


export default class ResultController extends CrudRouter<typeof resultController> {
    constructor() {
        super(resultController)
    }
    customRouting() {
        this.router.get('/get-result-by-grandprix/:year/:grand_prix', this.route(this.getResultInOneRace))
        this.router.get('/get-driver-result-by-name/:driver_name/:year', this.route(this.getResultDriverByName))
        this.router.get('/driver-table-rank/:year', this.route(this.getDriverTableRank))
        this.router.get('/team-table-rank/:year', this.route(this.getTeamTableRanking))
        this.router.get('/get-team-result-by-name/:team_name/:year', this.route(this.getResultTeamByName))

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
    async getResultInOneRace(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const grand_prix: String = req.params.grand_prix
        const result = await this.controller.getResultInOneRaces({ year, grand_prix })
        this.onSuccess(res, result)
    }
    async getResultTeamByName(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const team_name: String = req.params.team_name
        const result = await this.controller.getResultTeamByName({ year, team_name })
        this.onSuccess(res, result)
    }
    async getTeamTableRanking(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const result = await this.controller.getTeamTableRanking({ year })//test with latest year
        this.onSuccess(res, result)
    }
}
