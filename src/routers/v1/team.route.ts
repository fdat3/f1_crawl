import { teamController } from '@/controllers'
import * as _ from 'lodash'
import { Request, Response } from '../base'
import { CrudRouter } from '../crud'

export default class TeamRouter extends CrudRouter<typeof teamController> {
    constructor() {
        super(teamController)
    }
    customRouting() {
        this.router.get('/table-rank/:year', this.route(this.getTeamTableRanking))
        this.router.get('/get-result-by-name/:team_name/:year', this.route(this.getResultDriverByName))
    }
    async getResultDriverByName(req: Request, res: Response) {
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
