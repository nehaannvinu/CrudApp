import { Application, Request, Response } from 'express'
import { TodoController } from '../controllers/todo.controller'

export class TodoRoutes {
  private todoController: TodoController = new TodoController()

  public route(app: Application) {
    app.post('/addTask', (req: Request, res: Response) => {
      this.todoController.createTask(req, res)
    })

    app.get('/getTasks', (req: Request, res: Response) => {
      this.todoController.getAllTasks(req, res)
    })

    app.put('/updateTask', (req: Request, res: Response)=> {
        this.todoController.editTask(req, res)
    })

    app.delete('/deleteTask', (req: Request, res: Response)=> {
        this.todoController.deleteTask(req, res)
    })
  }
}
