import { BaseMiddleware } from './base'
import {
  errorService
} from '@/services'
import * as express from 'express'
import { Request, Response } from '@/routers/base'
export class BlockMiddleware extends BaseMiddleware {
  async use(req: Request, res: Response, next: express.NextFunction) {
    throw errorService.auth.permissionDeny()
  }
}