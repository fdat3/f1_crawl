import { teamService } from '@/services'
import { CrudController } from '@/controllers'
import { ICrudOption } from '@/interfaces'

export class TeamController extends CrudController<typeof teamService> {
    constructor() {
        super(teamService)
    }

}
