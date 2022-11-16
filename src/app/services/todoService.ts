import { ITodo } from 'utils/constants'
import todo from '../models/todo.model'

export default class TodoService {
  public async createTask(task: ITodo, callback: any) {
    const newTask = new todo(task)
    await newTask.save(callback)
  }

  public async getAllTasks(callback: any) {
    await todo.find(callback)
  }

  public async findTaskOnId(query: any, callback: any) {
    await todo.findOne(query, callback)
  }

  public async updateTask(task: ITodo, callback: any) {
    const id = { _id: task._id }
    await todo.findOneAndUpdate(id, task, callback)
  }

  //Delete user
  public async deleteTask(_id: String, callback: any) {
    const id = { _id: _id }
    await todo.deleteOne(id, callback)
  }
}
