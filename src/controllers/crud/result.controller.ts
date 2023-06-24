import { resultService } from '@/services'
import { CrudController } from '@/controllers'

export class ResultController extends CrudController<typeof resultService> {
    constructor() {
        super(resultService)
    }
    async getResultInOneRaces(params: { year: Number, grand_prix: String }) {
        const result = await this.service.getResultInOneRace(params)
        return result
    }
    async getResultDriverByName(params: { year: Number, driver_name: String }) {
        const result = await this.service.getResultDriverByName(params)
        return result
    }
    async getDriverTableRank(params: { year: Number }) {
        const result = await this.service.getDriverTableRank(params)
        return result
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
