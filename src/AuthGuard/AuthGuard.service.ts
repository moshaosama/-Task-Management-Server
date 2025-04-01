import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization;

    if (!accessToken || !accessToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized: Access token is required');
    }

    return true;
  }
}
