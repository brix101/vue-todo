<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { ref } from 'vue';

const todoStore = useTodoStore()

const newTask = ref("")

function handleSubmit() {
  if (newTask.value.trim() === "") return;
  todoStore.add(newTask.value);
  newTask.value = "";
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <label for="todo" class="">Todo:</label>
    <input v-model="newTask" type="text" placeholder="What needs to be done?"
      class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <div>
      <button type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
        Add Todo</button>
    </div>
  </form>
</template>
