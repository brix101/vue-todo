import { defineStore } from 'pinia'

export type Todo = {
  id: string
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
    add(text: string) {
      this.items.push({ id: crypto.randomUUID(), text, done: false })
    },
    toggle(id: Todo['id']) {
      const todo = this.items.find((t) => t.id === id)
      if (todo) todo.done = !todo.done
    },
    remove(id: Todo['id']) {
      this.items = this.items.filter((todo) => todo.id !== id)
    },
    update(item: Todo) {
      const todo = this.items.find((t) => t.id === item.id)
      if (todo) {
        Object.assign(todo, item)
      }
    },
  },
})
