import { Task, UpdateTask } from '../models/Task'
import { TodoListRepository } from '../repository/TodoListRepository'
import { TodoListInt } from './interfaces/ToDoList'

export class ToDoList implements TodoListInt {
  private repository: TodoListRepository

  constructor (toDoListRepository: TodoListRepository) {
    this.repository = toDoListRepository
  }

  add (task: Task) {
    const missingProperties = ['title', 'description', 'targetDate'].filter(
      (prop) => !Object.keys(task).includes(prop)
    )
    try {
      if (missingProperties.length > 0) {
        return 'Missing properties in task object'
      }

      const response = this.repository.create(task)
      if (response.error) {
        return 'Falha ao criar tarefa'
      }
      return 'Tarefa criada com sucesso'
    } catch (error) {
      return new Error(JSON.stringify(error))
    }
  }

  getTasks () {
    const response = this.repository.getAll()
    if (response.error) {
      return 'Falha ao listar tarefas'
    }
    return response.success
  }

  updateTask (task: UpdateTask) {
    const response = this.repository.update(task)
    if (response.error) {
      return 'Falha ao atualizar tarefa'
    }
    return 'Tarefa atualizada com sucesso'
  }

  removeTask (index: number) {
    const response = this.repository.delete(index)
    if (response.error) {
      return 'Falha ao remover tarefa'
    }
    return 'Tarefa removida com sucesso'
  }
}

export { Task }
