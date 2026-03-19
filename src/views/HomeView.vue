<script setup lang="ts">
import TodoForm from '@/components/TodoForm.vue';
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore()

const { items } = storeToRefs(todoStore)


</script>

<template>
  <main class="container mx-auto px-4 py-8 max-w-xl">
    <h2 class="text-2xl font-bold mb-6 text-center">Todo List</h2>

    <TodoForm />

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
          <button @click="todoStore.toggle(todo.id)"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
            :class="todo.done
              ? 'bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 border border-green-200'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800 border border-blue-200'">

            <span class="whitespace-nowrap">
              {{ todo.done ? 'Undo' : 'Complete' }}
            </span>
          </button>
          <button @click="todoStore.remove(todo.id)"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 border border-red-200">
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
