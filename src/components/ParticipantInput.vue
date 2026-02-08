<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  add: [name: string];
}>();

const inputValue = ref('');

const handleAdd = () => {
  if (inputValue.value.trim()) {
    emit('add', inputValue.value.trim());
    inputValue.value = '';
  }
};
</script>

<template>
  <div class="input-section">
    <v-text-field
      v-model="inputValue"
      variant="solo"
      density="comfortable"
      placeholder="Enter participant name..."
      prepend-inner-icon="mdi-account-plus"
      class="modern-input"
      :disabled="disabled"
      @keydown.enter="handleAdd"
      hide-details
    >
      <template v-slot:append-inner>
        <v-btn
          icon="mdi-send"
          color="primary"
          variant="flat"
          size="small"
          :disabled="disabled"
          @click="handleAdd"
          class="send-btn"
        ></v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<style scoped>
.input-section {
  margin-bottom: 24px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modern-input {
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 20px !important;
  overflow: hidden;
}

.send-btn {
  border-radius: 50% !important;
}
</style>
