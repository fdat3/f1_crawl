import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Drivers, Results } from '@/models/tables'
import sequelize from 'sequelize';

export class DriverService extends CrudService<typeof Drivers> {
    constructor() {
        super(Drivers)
    }
    async findOrCreate(params: any, option?: ICrudOption) {
        let driver = await this.model.findOne({
            where: {
                team_id: params.team_id,
                name: params.name,
                country: params.country
            },
            transaction: option.transaction
        })
        if (!driver) {
            driver = await this.exec(this.model.create(params, this.applyCreateOptions(option)));
        }
        return driver
    }

}
