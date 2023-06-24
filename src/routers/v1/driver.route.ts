import { driverController } from '@/controllers'
import * as _ from 'lodash'
import { Request, Response } from '../base'
import { CrudRouter } from '../crud'

export default class DriverRouter extends CrudRouter<typeof driverController> {
    constructor() {
        super(driverController)
    }
    customRouting() {

    }
}
