import { teamService } from '@/services'
import { CrudController } from '@/controllers'
import { ICrudOption } from '@/interfaces'

export class TeamController extends CrudController<typeof teamService> {
    constructor() {
        super(teamService)
    }
    async getResultATeamByYear(params: { year: Number, team_id: String }) {
        const result = await this.service.getResultATeamByYear(params)
        return result
    }
    async getResultAllTeamByYear(params: { year: Number }) {
        const result = await this.service.getResultALLTeamByYear(params)
        return result
    }
}
