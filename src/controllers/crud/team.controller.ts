import { teamService } from '@/services'
import { CrudController } from '@/controllers'
import { ICrudOption } from '@/interfaces'

export class TeamController extends CrudController<typeof teamService> {
    constructor() {
        super(teamService)
    }
    async getResultTeamByName(params: { year: Number, team_name: String }) {
        const result = await this.service.getResultTeamByName(params)
        return result
    }
    async getTeamTableRanking(params: { year: Number }) {
        const result = await this.service.getTeamTableRanking(params)
        return result
    }
}
