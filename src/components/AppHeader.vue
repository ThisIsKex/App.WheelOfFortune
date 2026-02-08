<script setup lang="ts">
defineProps<{
  hasConfig: boolean;
  canSave: boolean;
}>();

const emit = defineEmits<{
  load: [];
  save: [];
}>();
</script>

<template>
  <div class="header-gradient">
    <div class="header-content">
      <h1 class="header-title">
        <v-icon class="trophy-icon">mdi-trophy</v-icon>
        Wheel of Fortune
      </h1>
      <div class="header-actions">
        <v-tooltip text="Load configuration">
          <template v-slot:activator="{ props }">
            <v-btn 
              icon 
              variant="text" 
              :disabled="!hasConfig" 
              class="glass-btn"
              v-bind="props"
              @click="emit('load')"
            >
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Save configuration">
          <template v-slot:activator="{ props }">
            <v-btn 
              icon 
              variant="text" 
              :disabled="!canSave" 
              class="glass-btn"
              v-bind="props"
              @click="emit('save')"
            >
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-gradient {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
  padding: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.trophy-icon {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.header-actions {
  display: flex;
  gap: 8px;
}

.glass-btn {
  color: white !important;
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  transform: scale(1.1);
}
</style>
