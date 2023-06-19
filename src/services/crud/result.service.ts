import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Results } from '@/models/tables'

export class ResultService extends CrudService<typeof Results> {
    constructor() {
        super(Results)
    }
    async findOrCreate(params: any, option?: ICrudOption) {
        let driverOfRace = await this.model.findOne({
            where: {
                race_id: params.race_id,
                driver_id: params.driver_id,
            },
            transaction: option.transaction
        })
        if (!driverOfRace) {
            driverOfRace = await this.exec(this.model.create(params, this.applyCreateOptions(option)));
        }
        return driverOfRace
    }
}
