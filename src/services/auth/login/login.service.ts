import { User, UserService } from '../../user';

export class LoginService {
  async getUserInfo(handleInfo: {
    handle: string;
    type: string;
  }): Promise<User | null> {
    if (handleInfo.type === 'phone') {
      return await new UserService().getUserByPhone(handleInfo.handle);
    } else if (handleInfo.type === 'email') {
      return await new UserService().getUserByEmail(handleInfo.handle);
    } else {
      return null;
    }
  }
}
