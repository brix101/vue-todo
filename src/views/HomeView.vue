<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const todoStore = useTodoStore()

const { items } = storeToRefs(todoStore)

const newTask = ref('')

const handleSubmit = () => {
  if (newTask.value.trim() !== '') {
    todoStore.addTodo(newTask.value)
    newTask.value = ''
  }
}
</script>

<template>
  <main class="container mx-auto px-4 py-8 max-w-xl">
    <h2 class="text-2xl font-bold mb-6 text-center">Task List</h2>

    <form @submit.prevent="handleSubmit" class="mb-6 flex gap-3">
      <input v-model="newTask" type="text" placeholder="What needs to be done?"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
        Add Task
      </button>
    </form>

    <ul class="divide-y divide-gray-100">
      <li v-for="todo in items" :key="todo.id" class="px-4 py-4 flex items-center hover:bg-gray-50 transition-colors">
        <!-- Left border indicator for completed tasks -->
        <!-- <div class="w-0.5 bg-green-400 :class=" { 'hidden' : !todo.done } mr-4"></div> -->

        <div class="flex-1 flex items-center space-x-3">
          <span :class="{ 'line-through text-gray-400': todo.done }" class="text-lg font-medium">
            {{ todo.text }}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <button @click="todoStore.toggleTodo(todo.id)"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
            :class="todo.done
              ? 'bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 border border-green-200'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 border border-blue-200'">
            <svg :class="{ 'text-green-600': todo.done, 'text-blue-600': !todo.done }" class="w-4 h-4" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path :class="{ 'hidden': !todo.done }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 13l4 4L19 7" />
              <path :class="{ 'hidden': todo.done }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4" />
            </svg>
            <span class="whitespace-nowrap">
              {{ todo.done ? 'Undo' : 'Complete' }}
            </span>
          </button>
          <button @click="todoStore.removeTodo(todo.id)"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 border border-red-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="whitespace-nowrap">Remove</span>
          </button>
        </div>
      </li>
    </ul>

    <p v-if="items.length === 0" class="text-center text-gray-500 py-6">
      No tasks yet! Add one above to get started.
    </p>
  </main>
</template>
