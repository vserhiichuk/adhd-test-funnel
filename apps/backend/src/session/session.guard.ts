import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionService } from './session.service.js';
import type { AuthenticatedRequest } from './session.types.js';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const userId = this.sessionService.getUserId(request);
    if (!userId) {
      throw new UnauthorizedException();
    }
    request.userId = userId;
    return true;
  }
}
