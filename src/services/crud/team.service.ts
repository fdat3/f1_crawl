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

}
