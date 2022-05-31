import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application) {
        
        app.post('/api/user', (req: Request, res: Response) => {
            this.user_controller.createUser(req, res);
        });

        app.get('/api/user',(req: Request, res: Response) => {
            this.user_controller.getUsers(req, res);
        })

        // app.get('/api/user/:username',(req: Request, res: Response) => {
        //     this.user_controller.getUserByName(req, res);
        // })

        app.get('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.getUser(req, res);
        });

        app.put('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.updateUser(req, res);
        });

        app.delete('/api/user/:id', (req: Request, res: Response) => {
            this.user_controller.deleteUser(req, res);
        });

    }
}