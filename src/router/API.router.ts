import { Router, Request, Response } from 'express';
import { StatusCodes as HTTP } from 'http-status-codes';
import { userController, authController } from '../services';

const api = Router();
/**------------------------------------------------------------*
 * @Router :=> This is the main router for all api handlers
 * Every api controllers should be @register or @hooked in here
 *-------------------------------------------------------------*/

/**-------------------------------------------------------------*
 * @APIs :=> are registered & hooked in here
 *--------------------------------------------------------------*/
//===============================================================//
api.use('/auth', authController);
api.use('/user', userController);

//===============================================================//

// GET /api
api.get('/', (req: Request, res: Response) => {
  res.status(HTTP.OK).json({ message: '/api => OK!', req_url: req.url });
});

// ALL /api/* (as 404)
api.use('*', (req: Request, res: Response) => {
  res
    .status(HTTP.NOT_FOUND)
    .json({ message: '/api/xxx => endpoint not found!', req_url: req.url });
});

// EOF: End Of Line
export { api };
