import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateUser } from '../middlewares/validateUser';

const routes = Router(); // Cria o objeto das rotas do express

const userController = new UserController(); // objeto da classe UserController

// Rotas de Usuario
// para criar uma rota, usamos o objeto routes que criamos la em cima
// com um metodo que mostra se é get, post, update

routes.get('/users', userController.list.bind(userController));
routes.get('/users/:id', userController.getById.bind(userController));
routes.post('/users', validateUser, userController.create.bind(userController));
routes.put('/users/:id', userController.update.bind(userController));
routes.delete('/users/:id', userController.delete.bind(userController));

export { routes };

