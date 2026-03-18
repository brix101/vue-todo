import { defineStore } from 'pinia'

export type Todo = {
  id: number
  text: string
  done: boolean
}

type State = {
  items: Todo[]
  nextId: number
}

export const useTodoStore = defineStore('todos', {
  state: (): State => ({
    items: [],
    nextId: 1,
  }),
  getters: {},
  actions: {
    addTodo(text: string) {
      const id = new Date().getTime()
      this.items.push({ text, id, done: false })
    },
    toggleTodo(id: number) {
      const todo = this.items.find((t) => t.id === id)
      if (todo) todo.done = !todo.done
    },
    removeTodo(id: number) {
      // const index = this.items.findIndex((todo) => todo.id === id)
      //
      // // 2. If it exists (index is not -1), pluck it right out!
      // if (index !== -1) {
      //   this.items.splice(index, 1)
      // }

      this.items = this.items.filter((todo) => todo.id !== id)
    },
  },
})
