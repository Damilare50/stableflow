import { Injectable } from '@nestjs/common';
import { AuthTokenClaims, PrivyClient, User } from '@privy-io/server-auth';
import { config } from 'node-config-ts';

@Injectable()
export class PrivyService {
  #privyClient: PrivyClient;

  constructor() {
    this.#privyClient = new PrivyClient(
      config.PRIVY_APP_ID,
      config.PRIVY_APP_SECRET,
    );
  }

  verifyToken = async (
    token: string,
  ): Promise<{ isValid: boolean; data?: AuthTokenClaims; error?: any }> => {
    try {
      const isVerified: AuthTokenClaims =
        await this.#privyClient.verifyAuthToken(token);

      return {
        isValid: true,
        data: isVerified,
      };
    } catch (error) {
      console.log(JSON.stringify(error));

      return {
        isValid: false,
        error,
      };
    }
  };

  getUser = async (userId: string): Promise<User> => {
    const user: User = await this.#privyClient.getUserById(userId);

    return user;
  };
}
