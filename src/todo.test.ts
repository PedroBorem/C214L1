/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToDoList } from './TodoList'

const anyTask = {
  title: 'any_title',
  description: 'any_description',
  targetDate: '01/01/2025',
  type: 'any_type',
  priority: '1',
  subTasks: []
}

const anyUpdateTask = {
  title: 'Updated_title',
  description: 'Updated_description',
  targetDate: '16/03/2024',
  type: 'Updated_type',
  priority: '1',
  subTasks: []
}

describe('ToDoList', () => {
  describe('Testing add', () => {
    test('should add a new task to the list', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([anyTask])
    })

    test('should add a valid tasks', () => {
      const todoInstance = new ToDoList()
      const invalidValue: any = {
        invalidField: 'invalidValue'
      }
      todoInstance.add(invalidValue)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([])
    })
  })

  describe('Testing Update', () => {
    test('Should Update the only Task', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      todoInstance.updateTask(0, anyUpdateTask)
      const tasks = todoInstance.getTasks()
      expect(tasks[0]).toEqual(anyUpdateTask)
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
        targetDate: '66/66/6666',
      }
      todoInstance.add(anyTask)
      todoInstance.updateTask(0, dateUpdateTask)
      const tasks = todoInstance.getTasks()
      expect(tasks[0]['targetDate']).toEqual(dateUpdateTask['targetDate'])
    })
  })

})
