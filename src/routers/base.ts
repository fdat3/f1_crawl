import * as express from 'express';
import { errorService, utilService } from '@/services';
import { ICrudOption } from '@/interfaces';
import { config } from '@/config';
import * as _ from 'lodash';

const CHANNEL_ID_NOTIFICATION_GROUP = process.env.CHANNEL_ID_NOTIFICATION_GROUP;
export interface Request extends express.Request {
  queryInfo?: ICrudOption;
  tokenInfo?: {
    payload: any;
    role: string;
    exp: any;
    user?: any;
    employee?: any;
    [x: string]: any;
  };
  [x: string]: any;
}

export interface Response extends express.Response {
  [x: string]: any;
}

export interface IValidateSchema {
  type?: string | string[];
  properties?: IValidateSchemaProperties;
  additionalProperties?: boolean;
  required?: string[];
  uniqueItems?: boolean;
  minItems?: number;
  items?: IValidateSchema;

  [x: string]: any;
}

export interface IValidateSchemaProperties {
  [x: string]: IValidateSchema;
}

export class BaseRouter {
  onError(res: Response, error: any) {
    const userAgent = res.req.headers['user-agent'] || undefined;
    const dataHeader = res.req.headers;
    if (!userAgent.includes('Postman')) {
      const tags: any = {
        headers: {
          host: dataHeader?.host,
          ip: dataHeader['x-forwarded-for'] || res.req.socket.remoteAddress || null,
          authorization: dataHeader.authorization,
        },
        method: res.req.method,
        originalUrl: res.req.originalUrl,
        params: res.req.params,
        query: res.req.query,
        body: res.req.body,
      };
      error.tags = tags;

      const paramsBodyTelegram: any = {
        channel: CHANNEL_ID_NOTIFICATION_GROUP,
        text: `* error: ${JSON.stringify(error.options)}\n* userAgent: ${userAgent}\n* env: ${process.env.NODE_ENV}\n* platform: ${res.req.headers['platform']
          }\n* tag: ${JSON.stringify(tags)}`,
      };

      if (res.req.headers['localhost']) {
        paramsBodyTelegram.text = `* localhost:  ===> ${res.req.headers['localhost']} <===\n ${paramsBodyTelegram.text}`;
      }
      // telegramService.telegramSendToChannel(paramsBodyTelegram);
    }
    if (!error.options) {
      console.log('UNKNOWN ERROR', error);
      const err = errorService.router.somethingWentWrong();
      res.status(err.options.code).json(err.options);
    } else {
      res.status(error.options.code).json(error.options);
    }
  }

  onSuccess(res: Response, object: any = {}, extras: any = {}) {
    object = object || {};

    res.json({
      code: 200,
      results: Object.assign(
        {
          object,
        },
        extras,
      ),
    });
  }

  onSuccessAsList(
    res: Response,
    objects: any = [],
    extras: any = {},
    option: ICrudOption = {
      offset: 0,
      limit: config.database.defaultPageSize,
      where: {},
    },
  ) {
    if (objects.toJSON) {
      objects = objects.toJSON();
    }
    const total = objects.count > 0 ? objects.count : 0;
    // delete objects.count
    const page = _.floor(option.offset / option.limit) + 1;
    res.json({
      code: 200,
      results: Object.assign(
        {
          objects,
        },
        extras,
      ),
      pagination: {
        total: total,
        current_page: page,
        next_page: page + 1,
        prev_page: page - 1,
        limit: option.limit,
      },
    });
  }

  async validateJSON(body: any, schema: IValidateSchema) {
    const validate = utilService.validateJSON(schema, body)

    if (!validate.isValid) {
      throw errorService.router.requestDataInvalid(validate.message)
    }
  }

  route(func: (req: Request, rep: Response) => Promise<any>) {
    return (req: Request, res: Response) =>
      func
        .bind(this)(req, res)
        .catch((error: any) => {
          this.onError(res, error);
        });
  }
}
