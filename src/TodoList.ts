export type Task = {
    title: string,
    description: string,
    targetDate: string,
    type?: string,
    priority?: string,
    subTasks?: Task []
}

export class ToDoList {
  private tasks: Task[] = []

  add (task: Task) {
    this.tasks.push(task)
  }

  getTasks () {
    return this.tasks
  }
}
