import { NextFunction, Request, Response } from 'express';
import { existsSync, statSync } from 'fs';
import { join, resolve } from 'path';

import { HttpErrorMessages } from '@/common/messages/http-error';
import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  NotImplementedException,
} from '@nestjs/common';

const viewDistributionDir = resolve(__dirname, '..', 'view');
const viewIndex = join(viewDistributionDir, 'index.html');

@Injectable()
export class ResourceHandlerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { path } = req;

    if (path.startsWith('/api/')) return next();

    const filePath = join(viewDistributionDir, path);
    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
      if (!existsSync(viewIndex) || !statSync(viewIndex).isFile()) {
        throw new NotImplementedException(HttpErrorMessages.VIEW_NOT_BUILT);
      }

      return res.status(HttpStatus.OK).sendFile(viewIndex);
    }

    return res.status(HttpStatus.OK).sendFile(filePath);
  }
}
