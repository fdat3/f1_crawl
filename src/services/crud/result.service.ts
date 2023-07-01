import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Results } from '@/models/tables'
import sequelize from 'sequelize';

export class ResultService extends CrudService<typeof Results> {
    constructor() {
        super(Results)
    }
    /**For Crawl Data will fix later */

    // async findOrCreate(params: any, option?: ICrudOption) {
    //     let driverOfRace = await this.model.findOne({
    //         where: {
    //             race_id: params.race_id,
    //             driver_id: params.driver_id,
    //         },
    //         transaction: option.transaction
    //     })
    //     if (!driverOfRace) {
    //         driverOfRace = await this.exec(this.model.create(params, this.applyCreateOptions(option)));
    //     }
    //     return driverOfRace
    // }
    async getResultInOneRace(params: { year: Number, grand_prix: String }) {
        const result = await Results.findAll({
            where: {
                "$race.year$": params.year,
                "$race.grand_prix$": params.grand_prix
            },
            include: [
                {
                    association: "race",
                    attributes: ["grand_prix", "year"]
                },
                {
                    association: "driver",
                    attributes: ["name"]
                }
            ],
            attributes: ["pos", "no", "car", "laps", "time", "pts"],
            order: [["pos", "asc"]],
            raw: true
        })
        return result
    }

    async getResultDriverByYear(params: { year: Number, driver_id: String }) {
        const result = await Results.findAll({
            where: {
                "$race.year$": params.year,
                "$driver.id$": params.driver_id
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
            attributes: ["car", "pos", [sequelize.fn('sum', sequelize.col('pts')), 'pts']],
            group: ["race_id", "race.grand_prix", "race.date", "driver.id", "car", "pos"],
            raw: true
        })
        return result
    }
    async getResultDriverByName(params: { year: Number, driver_name: String }) {
        const result = await Results.findAll({
            where: {
                "$race.year$": params.year,
                "$driver.name$": params.driver_name
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
            attributes: ["car", "pos", [sequelize.fn('sum', sequelize.col('pts')), 'pts']],
            group: ["race_id", "race.grand_prix", "race.date", "driver.id", "car", "pos"],
            raw: true
        })
        return result
    }
    async getDriverTableRank(params: { year: Number }) {
        let driversOfRaceAYear: any = await Results.findAll({
            where: {
                "$race.year$": params.year
            },
            include: [
                {
                    association: "driver",
                    attributes: ["id", "name", "country"],
                },
                {
                    association: "race",
                    attributes: ["year"],
                },
            ],
            attributes: [[sequelize.fn('sum', sequelize.col('pts')), 'pts']],
            group: ["driver.id", "race.year"],
            order: [["pts", "desc"]],
            raw: true
        })
        return driversOfRaceAYear
    }
    async getResultTeamByName(params: { year: Number, team_name: String }) {
        const result = await Results.findAll({
            where: {
                car: params.team_name
            },
            include: [
                {
                    association: "race",
                    attributes: ["grand_prix", "date"]
                }
            ],
            attributes: [[sequelize.fn('sum', sequelize.col('pts')), 'pts']],
            group: ["race_id", "race.grand_prix", "race.date"],
            raw: true
        })
        return result
    }
    async getTeamTableRanking(params: { year: Number }) {
        let driversOfRaceAYear: any = await Results.findAll({
            where: {
                "$race.year$": params.year
            },
            include: [
                {
                    association: "driver",
                    attributes: [],
                    include: [
                        {
                            association: "team",
                            attributes: ["fullname_team"],

                        }
                    ]
                },
                {
                    association: "race",
                    attributes: ["year"],
                },
            ],
            attributes: [[sequelize.fn('sum', sequelize.col('pts')), 'pts']],
            group: ["driver.team.id", "race.year"],
            order: [["pts", "desc"]],
            raw: true
        })
        return driversOfRaceAYear
    }
}
