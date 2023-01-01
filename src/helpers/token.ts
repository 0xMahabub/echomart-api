import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpires, ROLE } from '../configs';

export class Token {
  private expires: number;
  private secret: string;
  public role: ROLE = ROLE.USER; // by default assume it's an user

  constructor(role?: string) {
    this.secret = jwtSecret; // JWT Secret from env
    this.expires = jwtExpires; // JWT expire time
    if (role) {
      // role -- information
      if (role === 'vendor') this.role = ROLE.VENDOR;
      else if (role === 'admin') this.role = ROLE.ADMIN;
    }
  }

  // @Generate JWT Token
  generateJwt(info: object): string {
    return jwt.sign({ ...info, role: this.role }, this.secret, {
      expiresIn: this.expires,
    });
  }
}
