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
        this.router.get('/craw/:year', this.crawdataMiddleware(), this.route(this.crawdata))//for test
        this.router.get('/sync-data', this.crawdataMiddleware(), this.route(this.syncData))
        this.router.get('/craw-driver/:name', this.crawdataMiddleware(), this.route(this.crawDriver))
        this.router.get('/craw-team/:name', this.crawdataMiddleware(), this.route(this.crawTeam))
    }
    async syncData(req: Request, res: Response) {
        this.controller.syncData()
        this.onSuccess(res, { message: "in sync" })
    }
    async crawdata(req: Request, res: Response) {
        const year: Number = parseInt(req.params.year)
        const result = await this.controller.crawdata(year)//test with latest year
        this.onSuccess(res, result)
    }

    async crawDriver(req: Request, res: Response) {
        const name: string = req.params.name
        const result = await this.controller.crawDrivers(name)//test with latest year
        this.onSuccess(res, result)
    }
    async crawTeam(req: Request, res: Response) {
        const team: string = req.params.name
        const result = await this.controller.crawTeam(team)//test with latest year
        this.onSuccess(res, result)
    }
    crawdataMiddleware(): any[] {
        // return [blockMiddleware.run()]
        return []
    }
}
