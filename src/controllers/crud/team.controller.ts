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
    async getResultTeamByName(params: { year: Number, team_name: String }) {
        const result = await this.service.getResultTeamByName(params)
        return result
    }
    async getResultAllTeamByYear(params: { year: Number }) {
        const result = await this.service.getResultAllTeamByYear(params)
        return result
    }
}
