import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import environment from '../environment'
import { UserRoutes } from '../app/routes/user.routes'
import { CommonRoutes } from '../utils/common/routes'
import { TodoRoutes } from '../app/routes/todo.routes'

class App {
  public app: express.Application
  public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName()

  private user_routes: UserRoutes = new UserRoutes()
  private todo_routes: TodoRoutes = new TodoRoutes()
  private common_routes: CommonRoutes = new CommonRoutes()

  private corsOptions = {
    origin: ['http://localhost:4200'],
    credentials: true,
  }

  constructor() {
    this.app = express()
    this.config()
    this.mongoSetup()

    this.user_routes.route(this.app)
    this.todo_routes.route(this.app)
    this.common_routes.route(this.app)
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json())
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }))

    this.app.use(cors(this.corsOptions))
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  }
}
export default new App().app
