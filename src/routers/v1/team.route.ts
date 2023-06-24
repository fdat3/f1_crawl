import { teamController } from '@/controllers'
import * as _ from 'lodash'
import { Request, Response } from '../base'
import { CrudRouter } from '../crud'

export default class TeamRouter extends CrudRouter<typeof teamController> {
    constructor() {
        super(teamController)
    }
    customRouting() {

    }

}
