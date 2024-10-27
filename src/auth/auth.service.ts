import { Injectable } from '@nestjs/common';
import { PrivyService } from '../general/privy.service';
import { AuthTokenClaims, User } from '@privy-io/server-auth';

@Injectable()
export class AuthService {
  constructor(private privyService: PrivyService) {}

  decodeJwt = async (
    jwt: string,
  ): Promise<{ isValid: boolean; data?: AuthTokenClaims; error?: any }> => {
    const jwtData = await this.privyService.verifyToken(jwt);

    return jwtData;
  };

  getUserData = async (userId: string): Promise<User> => {
    const user = await this.privyService.getUser(userId);

    return user;
  };
}
