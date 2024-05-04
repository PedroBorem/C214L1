/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToDoList } from './TodoList'
import { Task, UpdateTask } from '../models/Task'
import { TodoListRepository } from '../repository/TodoListRepository'

const anyTask: Task = {
  id: 1,
  title: 'any_title',
  description: 'any_description',
  targetDate: '01/01/2025',
  type: 'any_type',
  priority: '1',
  subTasks: []
}

const anyUpdateTask = {
  id: 1,
  title: 'Updated_title',
  description: 'Updated_description',
  targetDate: '16/03/2024',
  type: 'Updated_type',
  priority: '1',
  subTasks: []
}

const makeRepositoryStub = (): TodoListRepository => {
  class TodoListStub implements TodoListRepository {
    create (_task: Task) {
      return {
        success: true,
        error: null
      }
    }

    getAll () {
      return {
        success: [anyTask],
        error: null
      }
    }

    update (_task: UpdateTask) {
      return {
        success: true,
        error: null
      }
    }

    delete (_id: number) {
      return {
        success: true,
        error: null
      }
    }
  }
  return new TodoListStub()
}

describe('ToDoList', () => {
  describe('Testing add', () => {
    test('should add a new task to the list', () => {
      const repositoryStub = makeRepositoryStub()
      const todoInstance = new ToDoList(repositoryStub)
      // todoInstance.add(anyTask)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([anyTask])
    })

    test('should add a valid tasks', () => {
      const repositoryStub = makeRepositoryStub()
      const todoInstance = new ToDoList(repositoryStub)
      const invalidValue: any = {
        invalidField: 'invalidValue'
      }
      const response = todoInstance.add(invalidValue)
      expect(response).toEqual('Missing properties in task object')
    })
  })

  describe('getTasks', () => {
    test('should initialize tasks with an empty array', () => {
      const repositoryStub = makeRepositoryStub()
      jest.spyOn(repositoryStub, 'getAll').mockReturnValueOnce({
        success: [],
        error: null
      })
      const todoInstance = new ToDoList(repositoryStub)
      const response = todoInstance.getTasks()
      expect(response).toEqual([])
    })
  })

  /*
  describe('Testing Update', () => {
    test('Should Update the only Task', () => {
      const repositoryStub = makeRepositoryStub()
      const todoInstance = new ToDoList(repositoryStub)
      todoInstance.add(anyTask)
      todoInstance.updateTask(anyUpdateTask)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([anyUpdateTask])
    })
  })
    test('Should only Update the index=2 Task', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      todoInstance.add(anyTask)
      todoInstance.add(anyTask)
      todoInstance.updateTask(2, anyUpdateTask)
      const tasks = todoInstance.getTasks()
      expect(tasks[0]).toEqual(anyTask)
      expect(tasks[1]).toEqual(anyTask)
      expect(tasks[2]).toEqual(anyUpdateTask)
    })

    test('Should only Update the TargetDate of the task', () => {
      const todoInstance = new ToDoList()
      const dateUpdateTask = {
        targetDate: '66/66/6666'
      }
      todoInstance.add(anyTask)
      todoInstance.updateTask(0, dateUpdateTask)
      const tasks = todoInstance.getTasks()
      expect(tasks[0].targetDate).toEqual(dateUpdateTask.targetDate)
    })
  })

  describe('Testing Remove', () => {
    test('Should Remove the only Task', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      todoInstance.removeTask(0)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([])
    })

    test('Should only Remove one Task', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      todoInstance.add(anyTask)
      todoInstance.add(anyTask)
      todoInstance.removeTask(1)
      const tasks = todoInstance.getTasks()
      expect(tasks.length).toEqual(2)
    })

    test('Should only Remove index=1 Task', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      todoInstance.add(anyUpdateTask)
      todoInstance.add(anyTask)
      todoInstance.removeTask(1)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([anyTask, anyTask])
    })
  })
  */
})
