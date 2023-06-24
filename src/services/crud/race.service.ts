import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Races, Results } from '@/models/tables'

export class RacesService extends CrudService<typeof Races> {
    constructor() {
        super(Races)
    }
    async findOrCreate(params: any, option?: ICrudOption) {
        console.log("🚀 ~ file: race.service.ts:10 ~ RacesService ~ findOrCreate ~ params:", params)
        console.log("🚀 ~ file: race.service.ts:10 ~ RacesService ~ findOrCreate ~ params:", params.grand_prix)
        let race = await this.model.findOne({
            where: {
                grand_prix: params.grand_prix,
                date: params.date
            },
            transaction: option.transaction
        })
        if (!race) {
            race = await this.exec(this.model.create(params, this.applyCreateOptions(option)));
        }
        return race
    }

}
