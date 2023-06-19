import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Teams, Races, Results } from '@/models/tables'
import sequelize from 'sequelize';

export class TeamService extends CrudService<typeof Teams> {
    constructor() {
        super(Teams)
    }
    async findOrCreate(params: any, option?: ICrudOption) {
        let team = await this.model.findOne({
            where: {
                name: params.name,
                base: params.base
            },
            transaction: option.transaction
        })
        if (!team) {
            team = await this.exec(this.model.create(params, this.applyCreateOptions(option)));
        }
        return team
    }
    async getResultATeamByYear(params: { year: Number, team_id: String }) {
        const result = await Results.findAll({
            where: {
                "$race.year$": params.year,
                "$driver.team_id$": params.team_id
            },
            include: [
                {
                    association: "race",
                    attributes: ["grand_prix", "date"]
                },
                {
                    association: "driver",
                    attributes: []
                }
            ],
            attributes: [[sequelize.fn('sum', sequelize.col('pts')), 'pts']],
            group: ["race_id", "race.grand_prix", "race.date", "driver.team_id"],
            // order: [["pts", "desc"]],
            raw: true
        })
        return result
    }
    async getResultALLTeamByYear(params: { year: Number }) {
        let driversOfRaceAYear: any = await Results.findAll({//get races of a team
            where: {
                "$race.year$": params.year
            },
            include: [
                {
                    association: "driver",
                    attributes: [],
                    include: [{
                        association: "team",
                        attributes: ["name"],

                    }]

                },
                {
                    association: "race",
                    attributes: ["year"],
                },
            ],
            attributes: [[sequelize.fn('sum', sequelize.col('pts')), 'pts']],
            group: ["driver->team.id", "driver.team_id", "race.year"],
            order: [["pts", "desc"]],
            raw: true
        })
        for (let index = 0; index < driversOfRaceAYear.length; index++) {
            const item = driversOfRaceAYear[index]
            const apiGetResultATeamByYear: string = `/api/v1/teams/${item["driver.team.id"]}/get-result-by-year/${params.year}`
            item.detail = apiGetResultATeamByYear
        }
        return driversOfRaceAYear
    }
}
