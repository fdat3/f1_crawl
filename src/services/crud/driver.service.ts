import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Drivers } from '@/models/tables'

export class DriverService extends CrudService<typeof Drivers> {
    constructor() {
        super(Drivers)
    }
    /**For Crawl Data will fix later */

    // async findOrCreate(params: any, option?: ICrudOption) {
    //     let driver = await this.model.findOne({
    //         where: {
    //             team_id: params.team_id,
    //             name: params.name,
    //             country: params.country
    //         },
    //         transaction: option.transaction
    //     })
    //     if (!driver) {
    //         driver = await this.exec(this.model.create(params, this.applyCreateOptions(option)));
    //     }
    //     return driver
    // }

}
