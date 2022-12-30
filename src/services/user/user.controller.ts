import { Router, Request, Response } from 'express';
import { StatusCodes as HTTP } from 'http-status-codes';
import { UserService } from './user.service';
import { Password } from '../../helpers';
import {
  createUserSchema,
  getUserByIdSchema,
  getUserByEmailSchema,
  getUserByPhoneSchema,
} from './user.schema';
import { ZodError } from 'zod';

const controller = Router();
const userService = new UserService();

// -----------------------------------------------------------//

// POST: /, create a user :=> User
controller.post('/', async (req: Request, res: Response) => {
  try {
    const params = createUserSchema.parse(req.body);
    const hashedPassword = await new Password(params.password).hash();
    // console.log(hashedPassword);
    const user = await userService.addUser({
      ...params,
      password: hashedPassword,
    });
    res.status(HTTP.CREATED).json({
      message: '',
      data: user,
      error: null,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP.BAD_REQUEST).json({
        message: 'Input validation error!',
        data: null,
        error: err.issues.map((issue) => issue.message),
      });

      return;
    }

    res.status(HTTP.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error!',
      data: null,
      error: err,
    });
  }
});

// # GET: /,  get all users :=> User[]
controller.get('/', async (req: Request, res: Response) => {
  try {
    const getAllUsers = await userService.getUsers();
    res.status(HTTP.OK).json({
      message: 'get all users',
      data: getAllUsers,
      error: null,
    });
  } catch (err) {
    res.status(HTTP.INTERNAL_SERVER_ERROR).json({
      message: 'error: get all users',
      data: null,
      error: err,
    });
  }
});

// # GET: /:id,  get users by ID :=> User
controller.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = getUserByIdSchema.parse(req.params);
    const getUser = await userService.getUser(id);
    res.status(HTTP.OK).json({
      message: 'get one user',
      data: getUser,
      error: null,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP.BAD_REQUEST).json({
        message: 'Input validation error!',
        data: null,
        error: err.issues.map((issue) => issue.message),
      });

      return;
    }

    res.status(HTTP.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error!',
      data: null,
      error: err,
    });
  }
});

// # GET: /:email,  get users by Email :=> User
controller.get('/e/:email', async (req: Request, res: Response) => {
  try {
    const { email } = getUserByEmailSchema.parse(req.params);
    const getUser = await userService.getUserByEmail(email);
    if (getUser) {
      res.status(HTTP.OK).json({
        message: 'get one user',
        data: getUser,
        error: null,
      });
    } else {
      res.status(HTTP.NOT_FOUND).json({
        message: 'user not found!',
        data: null,
        error: null,
      });
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP.BAD_REQUEST).json({
        message: 'Input validation error!',
        data: null,
        error: err.issues.map((issue) => issue.message),
      });
    }

    res.status(HTTP.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error!',
      data: null,
      error: err,
    });
  }
});

// # GET: /:phone,  get users by Phone :=> User
controller.get('/p/:phone', async (req: Request, res: Response) => {
  try {
    const { phone } = getUserByPhoneSchema.parse(req.params);
    const getUser = await userService.getUserByPhone(phone);
    if (getUser) {
      res.status(HTTP.OK).json({
        message: 'get one user',
        data: getUser,
        error: null,
      });
    } else {
      res.status(HTTP.NOT_FOUND).json({
        message: 'user not found!',
        data: null,
        error: null,
      });
    }
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(HTTP.BAD_REQUEST).json({
        message: 'Input validation error!',
        data: null,
        error: err.issues.map((issue) => issue.message),
      });
    }

    res.status(HTTP.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error!',
      data: null,
      error: err,
    });
  }
});

// PUT: /:id, update a user :=> User
controller.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = getUserByIdSchema.parse(req.params);
    const params = createUserSchema.parse(req.body);
    const findUser = await userService.getUser(id);
    if (findUser) {
      await userService
        .updateUser(id, params)
        .then((d) => {
          res.status(HTTP.ACCEPTED).json({
            message: 'user updated succesfully!',
            data: d,
            error: null,
          });
        })
        .catch((err) => {
          res.status(HTTP.INTERNAL_SERVER_ERROR).json({
            message: 'internal server error! while updating.',
            data: null,
            error: err,
          });
        });
    } else {
      // user not found
      res.status(HTTP.NOT_FOUND).json({
        message: 'user not found!',
        data: null,
        error: {},
      });
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

    res.status(HTTP.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error!',
      data: null,
      error: err,
    });
  }
});

// # DELETE: /:id,  get users by ID :=> User
controller.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = getUserByIdSchema.parse(req.params);
    await userService
      .removeUser(id)
      .then((d) => {
        res.status(HTTP.ACCEPTED).json({
          message: 'user removed successfully!',
          data: d,
          error: null,
        });
      })
      .catch((err) => {
        res.status(HTTP.BAD_REQUEST).json({
          message: 'error while deleting user!',
          data: null,
          error: err,
        });
      });
  } catch (err) {
    res
      .status(HTTP.INTERNAL_SERVER_ERROR)
      .json({ message: 'internal server error!', data: null, error: err });
  }
});

// -----------------------------------------------------------//
// EOF: End of Line
export { controller as userController };
