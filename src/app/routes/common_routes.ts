import { Application, Request, Response } from 'express';
import { responseMessage } from 'app/utils/common/constants';
export class CommonRoutes {
    public route(app: Application) {

        // Mismatch URL
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: responseMessage.invalidURL});
        });

    }
}