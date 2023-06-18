import { BaseController } from './baseController'
import { CrudService } from '@/services'
import { ICrudOption } from '@/interfaces'
export class CrudController<T extends CrudService<any>> extends BaseController {
    constructor(service: T) {
        super()
        this.service = service
    }
    service: T
    async transaction() {
        return await this.service.transaction()
    }
    async getList(option?: ICrudOption) {
        return await this.service.getList(option)
    }
    async getItem(option?: ICrudOption) {
        return await this.service.getItem(option)
    }
    async create(params: any, option?: ICrudOption) {
        return await this.service.create(params, option)
    }
    async update(params: any, option?: ICrudOption) {
        return await this.service.update(params, option)
    }
    async delete(option?: ICrudOption) {
        return await this.service.delete(option)
    }
    async deleteAll(option?: ICrudOption) {
        return await this.service.deleteAll(option)
    }



}
