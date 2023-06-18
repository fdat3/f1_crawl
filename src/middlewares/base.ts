import {
  errorService,
} from '@/services'
import { BaseError } from '@/services/errors'
import { Request, Response } from '@/routers/base'
import * as express from 'express'
export class BaseMiddleware {
  onError(res: Response, error: any) {
    if (!error.options) {
      console.log("UNKNOW ERROR", error)
      const err = errorService.router.somethingWentWrong()
      res.status(err.options.code).json(err.options)
    } else {
      res.status(error.options.code).json(error.options)
    }
  }
  run(option?: any) {
    return (req: Request, res: Response, next: express.NextFunction) => this.use
      .bind(this)(req, res, next, option)
      .catch((error: any) => {
        this.onError(res, error)
      })
  }
  async use(req: Request, res: Response, next: express.NextFunction, option?: any) {
      next()
  }
}