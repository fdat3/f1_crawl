import { ICrudOption } from '@/interfaces';
import { CrudService } from '../crudService.pg'
import { Races } from '@/models/tables'

export class RacesService extends CrudService<typeof Races> {
    constructor() {
        super(Races)
    }
    async findOrCreate(params: any, option?: ICrudOption) {
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
    async getResultInOneRace(params: { year: Number, grand_prix: String }) {
        const result = await Races.findAll({
            where: {
                year: params.year,
                grand_prix: params.grand_prix
            },
            include: [
                {
                    association: 'results',
                    attributes: ['no', 'pos', 'car', 'laps', 'time', 'pts'],
                },
            ],
            raw: true
        })
        return result
    }
}
