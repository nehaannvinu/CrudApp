import TodoService from '../services/todoService'
import { Request, Response } from 'express'
import {
  mongoError,
  successResponse,
  failureResponse,
} from '../../utils/common/service'
import { ITodo, successMessage, failureMessage } from '../../utils/constants'

export class TodoController {
  private todoService: TodoService = new TodoService()

  public createTask(req: Request, res: Response) {
    try {
      let { title, priority }: { title: string; priority: number } = req.body
      const newTask: ITodo = {
        title,
        status: false,
        priority,
        modificationDetails: {
          created_on: new Date(),
          modified_on: new Date(),
        },
      }

      this.todoService.createTask(newTask, (err: any, task: ITodo) => {
        if (err) {
          mongoError(err, res)
        } else {
          successResponse(successMessage.taskAdded, task, res)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  public getAllTasks(req: Request, res: Response) {
    try {
      this.todoService.getAllTasks((err: any, task: ITodo) => {
        if (err) {
          mongoError(err, res)
        } else {
          successResponse(successMessage.fetchAllTask, task, res)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  public editTask(req: Request, res: Response) {
    try {
      let { id, updated_task } = req.body
      this.todoService.findTaskOnId({ _id: id }, (err: any, task: ITodo) => {
        if (err) {
          mongoError(err, res)
        } else if (task) {
          const updatedTask: ITodo = {
            _id: id,
            title: updated_task,
            status: task.status,
            priority: task.priority,
            modificationDetails: {
              created_on: task.modificationDetails.created_on,
              modified_on: new Date(),
            },
          }
          this.todoService.updateTask(updatedTask, (err: any, task: ITodo) => {
            if (err) {
              mongoError(err, res)
            } else {
              successResponse(successMessage.updatedTask, updatedTask, res)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  public deleteTask(req: Request, res: Response) {
    try {
      let { id } = req.body
      this.todoService.deleteTask(id, (err: any, delete_details) => {
        if (err) {
          mongoError(err, res)
        } else if (delete_details.deletedCount !== 0) {
          successResponse(successMessage.deleteUserSuccess, id, res)
        } else {
          failureResponse(failureMessage.invalidUser, null, res)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}
