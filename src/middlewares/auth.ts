import { Request, Response, NextFunction } from 'express';
import { StatusCodes as HTTP } from 'http-status-codes';
import { getFromRedis, getCookie, Token } from '../helpers';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get user cookie
    const _t = getCookie(req, 'access_token');
    if (!_t) {
      res.status(HTTP.UNAUTHORIZED).json({
        msg: 'Invalid or empty token',
        data: null,
        error: null,
      });
      return;
    }

    // now get user information
    const token = await getFromRedis(_t);
    const parseInfo = new Token().parseJwt(token['accessToken']);
    req.role = parseInfo['role']; // set-request-user-role
    console.log('req_role => ', req.role);

    next(); // we can proced to next()
  } catch (err) {
    res.status(HTTP.BAD_REQUEST).json({
      message: 'Error! caughtBy:AuthMiddleware',
      data: null,
      error: err,
    });
    return;
  }
};
