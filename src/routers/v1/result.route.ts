import { resultController } from '@/controllers'
import * as _ from 'lodash'
import { CrudRouter } from '../crud'

export default class ResultController extends CrudRouter<typeof resultController> {
    constructor() {
        super(resultController)
    }
    customRouting() {

    }
}
