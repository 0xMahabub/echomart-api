import { Router, Request, Response } from 'express';
import { StatusCodes as HTTP } from 'http-status-codes';
import { Password } from '../../../helpers';
import { ZodError } from 'zod';
import { loginSchema } from './login.schema';
import { LoginService } from './login.service';

const controller = Router();
const loginService = new LoginService();

// -----------------------------------------------------------//

// # POST: /login/user,  login-gateway :=> [User]
controller.post('/user', async (req: Request, res: Response) => {
  try {
    const login = loginSchema.parse(req.body);
    let handleInfo = {
      handle: '',
      password: login.password,
      type: '',
    };
    // finding user if phone
    if (login.phone) {
      handleInfo = { ...handleInfo, handle: login.phone, type: 'phone' };
    } else if (login.email) {
      handleInfo = { ...handleInfo, handle: login.email, type: 'email' };
    }

    if (handleInfo.handle.length <= 7) {
      // return bad request error
      res.status(HTTP.BAD_REQUEST).json({
        message: "Email or Phone couldn't be found!",
        data: null,
        error: null,
      });
      return;
    }

    const findUser = await loginService.getUserInfo({
      handle: handleInfo.handle,
      type: handleInfo.type,
    });
    const pwdCheck = await new Password(
      handleInfo.password,
      findUser?.password,
    ).verify();
    if (pwdCheck) {
      // password is accepted!
      res.status(HTTP.ACCEPTED).json({
        message: 'Login successfully!',
        data: {
          user: findUser,
          token: 'token_____',
        },
        error: null,
      });
    } else {
      res.status(HTTP.UNAUTHORIZED).json({
        message: 'Wrong Password!',
        data: null,
        error: null,
      });
      return;
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP.BAD_REQUEST).json({
        message: 'Input validation error!',
        data: null,
        error: err.issues.map((issue) => issue.message),
      });
      return;
    }

    res.status(HTTP.BAD_REQUEST).json({
      message: 'internal server error!',
      data: null,
      error: err,
    });
  }
});

// -----------------------------------------------------------//
// EOF: End of Line
export { controller as loginController };
