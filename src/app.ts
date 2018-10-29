import * as express from 'express';
import * as bodyParser from 'body-parser';
import { userRouter } from './routes/users.routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initConfiguration();
    this.loadRoutes();
  }

  private loadRoutes(): void {
    // Routes
    this.app.use('/user', userRouter);
  }

  private initConfiguration(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

const app = new App().app;

export default app;
