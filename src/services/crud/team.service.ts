import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Teams } from '@/models/tables'

export class TeamService extends CrudService<typeof Teams> {
    constructor() {
        super(Teams)
    }
    /**For Crawl Data will fix later */

    // async findOrCreate(params: any, option?: ICrudOption) {
    //     let team = await this.model.findOne({
    //         where: {
    //             name: params.name,
    //             base: params.base
    //         },
    //         transaction: option.transaction
    //     })
    //     if (!team) {
    //         team = await this.exec(this.model.create(params, this.applyCreateOptions(option)));
    //     }
    //     return team
    // }

}
