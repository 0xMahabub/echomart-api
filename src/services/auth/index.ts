import { Router } from 'express';
import { loginController } from './login';

// Don't change if not necessary :)
const authController = Router();

// login
authController.use('/login', loginController);

// signup
//

export { authController };
