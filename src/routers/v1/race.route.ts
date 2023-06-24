import { raceController, teamController } from '@/controllers'
import * as _ from 'lodash'
import { Request, Response } from '../base'
import { CrudRouter } from '../crud'
// import { blockMiddleware } from '@/middlewares'

export default class RacesRouter extends CrudRouter<typeof raceController> {
    constructor() {
        super(raceController)
    }
    customRouting() {
        this.router.get('/crawl-result/:year', this.crawldataMiddleware(), this.route(this.crawlResult))
        this.router.get('/crawl-driver/:name', this.crawldataMiddleware(), this.route(this.crawlDriver))
        this.router.get('/crawl-team/:name', this.crawldataMiddleware(), this.route(this.crawlTeam))
    }

    async crawlResult(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const result = await this.controller.crawlResult(year)
        this.onSuccess(res, result)
    }

    async crawlDriver(req: Request, res: Response) {
        const name: string = req.params.name
        const result = await this.controller.crawlDrivers(name)
        this.onSuccess(res, result)
    }
    async crawlTeam(req: Request, res: Response) {
        const team: string = req.params.name
        const result = await this.controller.crawlTeam(team)
        this.onSuccess(res, result)
    }
    crawldataMiddleware(): any[] {
        return []
    }
}
