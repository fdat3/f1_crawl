import { errorService } from '@/services';
import { BaseError } from '@/services/errors';
import { config } from '@/config';
import { sequelize } from '@/models';
import { ICrudOption } from '@/interfaces';
import { Transaction, ModelDefined, CreateOptions, DestroyOptions } from 'sequelize';

export interface ICrudExecOption {
  allowNull?: boolean;
}
export class CrudService<T extends ModelDefined<any, any>> {
  constructor(model: T) {
    this.model = model;
  }
  protected model: T;
  async transaction(): Promise<Transaction> {
    return await sequelize.transaction();
  }
  async exec(promise: any, option: ICrudExecOption = { allowNull: true }) {
    try {
      const result = await promise;
      if ((result === undefined || result === null) && !option.allowNull) throw errorService.database.customError('Result not found', 404);

      return result;
    } catch (error) {
      console.log('ERROR ==> ', error);
      if (error instanceof BaseError) throw errorService.database.customError(error.options.message, error.options.code);
      if (config.server.debug) {
        if (error.errors && error.errors[0]) {
          throw errorService.database.customError('Service unavailable', 404);
        } else {
          throw errorService.database.customError('Service unavailable', 404);
        }
      } else {
        throw errorService.database.customError('Service unavailable', 404);
      }
    }
  }
  public async getList(
    option: ICrudOption = {
      limit: config.database.defaultPageSize,
      offset: 0,
      scope: ['defaultScope'],
      distinct: true,
      where: {},
    },
  ) {
    return await this.exec(this.modelWithScope(option.scope).findAndCountAll(option));
  }
  async getItem(option: ICrudOption = { scope: ['defaultScope'], where: {} }, allowNull = false) {
    return await this.exec(this.modelWithScope(option.scope).findOne(option), { allowNull: allowNull });
  }
  public async count(option: ICrudOption = { scope: ['defaultScope'], where: {} }): Promise<number> {
    return await this.exec(this.modelWithScope(option.scope).count(option));
  }
  async create(params: any, option?: ICrudOption) {
    return await this.exec(this.model.create(params, this.applyCreateOptions(option)));
  }
  async update(params: any, option?: ICrudOption) {
    const item = await this.exec(this.model.findByPk(option.where.id), { allowNull: false });
    await this.exec(item.update(params));
    return await this.getItem(option);
  }
  async delete(option?: ICrudOption) {
    return await this.exec(this.model.destroy(option), { allowNull: false });
  }
  async deleteAll(option?: ICrudOption) {
    const t = await this.transaction();
    option.transaction = t;
    try {
      const result = await this.exec(this.model.destroy(this.applyDestroyOptions(option)));
      await t.commit();
      return result;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  applyCreateOptions(option: ICrudOption = { where: {} }) {
    const query: CreateOptions = {
      transaction: option.transaction,
    };
    return query;
  }
  applyDestroyOptions(option: ICrudOption = { where: {} }) {
    const query: DestroyOptions = {
      where: option.where,
      limit: option.limit,
      transaction: option.transaction,
    };
    return query;
  }
  modelWithScope(scope: string[]) {
    try {
      return this.model.scope(scope);
    } catch (err) {
      throw errorService.database.invalidScope(err.message);
    }
  }
}
