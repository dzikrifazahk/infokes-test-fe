<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-4">Add New Data</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4">
          <label for="parentId" class="block text-sm font-medium text-gray-700">Parent ID</label>
          <input
            type="text"
            id="parentId"
            v-model="form.parentId"
            class="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4">
          <label for="position" class="block text-sm font-medium text-gray-700">Position</label>
          <input
            type="text"
            id="position"
            v-model="form.position"
            class="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            class="w-full border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>

        <div class="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isHeader"
            v-model="form.isHeader"
            class="mr-2"
          />
          <label for="isHeader" class="text-sm font-medium text-gray-700">Is Header</label>
        </div>

        <div class="flex justify-end gap-3">
          <button @click="closeModal" type="button" class="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      
    }
  }
);

const emit = defineEmits<{
  (event: 'closeModal'): void;
  (event: 'dataAdded'): void;
}>();

const form = ref({
  name: '',
  parentId: '',
  position: '',
  description: '',
  isHeader: false,
});

const handleSubmit = async () => {
  try {
    console.log("Data added", form.value);
    
    emit('dataAdded');
    emit('closeModal');
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

const closeModal = () => {
  emit('closeModal');
};
</script>

