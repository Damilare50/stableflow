import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(AuthGuard.name);

  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization: string = request.headers['authorization'];

    const authToken: string = authorization.split(' ')[1];

    const jwtDataResponse = await this.authService.decodeJwt(authToken);
    this.logger.debug(jwtDataResponse);
    if (!jwtDataResponse.isValid || !jwtDataResponse.data)
      throw new UnauthorizedException('user is not authorized');

    const { data: jwtData } = jwtDataResponse;
    const user = await this.authService.getUserData(jwtData.userId);
    this.logger.debug(user);
    if (!user) throw new UnauthorizedException('invalid userId');

    return true;
  }
}
