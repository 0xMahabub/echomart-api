import { Router, Request, Response } from 'express';
import { StatusCodes as HTTP } from 'http-status-codes';
import { api as APIs } from './API.router';

const router = Router();
/**--------------------------------------------------------*
 * @Router :=> This is the main application route handler
 * Every routing should be @register or @hooked in here
 *---------------------------------------------------------*/
// [Don't change if u don't know routing well]
router.use('/api', APIs); /// APIs endpoints are registerd
// you can versionize api endpoint like /api/v1 => APIs--v1 & /api/v2 => APIs--v2
// And also can rename API.router.ts to `API.v1.router.ts`, `API.v2.router.ts` as u wish

// Application Base Routers

// GET /
router.get('/', (req: Request, res: Response) => {
  res
    .status(HTTP.OK)
    .send(
      `<h1>Welcome! @codex-7/express-typescript</h1><p>req_url:${req.url}</p>`,
    );
});

// GET /docs API @documention can be used in here
router.get('/docs', (req: Request, res: Response) => {
  res.status(HTTP.OK).send(
    `
      <h1>You can add SPA or static app in here for documentation or integrate swagger</h1>
      <p>req_url:${req.url}</p>
    `,
  );
});

// ALL * (as 404)
router.use('*', (req: Request, res: Response) => {
  res
    .status(HTTP.NOT_FOUND)
    .send(`<h1>Error 404! page not found.</h1><p>req_url:${req.url}</p>`);
});

// EOF: End Of Line
export { router };
