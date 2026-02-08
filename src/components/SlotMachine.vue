<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import type { Participant } from '../composables/useParticipants';

const props = defineProps<{
  participants: Participant[];
  activeParticipant: Participant | null;
}>();

const slotItems = ref<Participant[]>([]);
const slotPosition = ref(0);
const isSlowing = ref(false);

// Create extended list for smooth scrolling
watch(() => props.participants, (newParticipants) => {
  if (newParticipants.length > 0) {
    slotItems.value = [];
    // Create enough repetitions for smooth infinite scroll
    for (let i = 0; i < 30; i++) {
      slotItems.value.push(...newParticipants);
    }
  }
}, { immediate: true });

// Animate position based on active participant
watch(() => props.activeParticipant, (newParticipant, oldParticipant) => {
  if (newParticipant === null) {
    // Reset position when starting new roll
    slotPosition.value = 0;
    isSlowing.value = false;
  } else if (newParticipant !== oldParticipant) {
    // Continue moving down
    slotPosition.value -= 80;
  }
});

const slotStyle = computed(() => ({
  transform: `translateY(${slotPosition.value}px)`,
  transition: isSlowing.value ? 'transform 0.2s ease-out' : 'transform 0.05s linear'
}));
</script>

<template>
  <div class="slot-machine-container">
    <div class="slot-window">
      <div class="gradient-overlay top"></div>
      <div class="gradient-overlay bottom"></div>
      <div class="slot-pointer">▶</div>
      <div class="slot-reel" :style="slotStyle">
        <div 
          v-for="(item, index) in slotItems" 
          :key="index"
          class="slot-item"
          :style="{ backgroundColor: item.color }"
        >
          <v-icon class="slot-icon" color="white">mdi-{{ item.avatar }}</v-icon>
          <span class="slot-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slot-machine-container {
  margin-bottom: 32px;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slot-window {
  position: relative;
  height: 240px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 3px solid rgba(102, 126, 234, 0.3);
}

.gradient-overlay {
  position: absolute;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 5;
  pointer-events: none;
}

.gradient-overlay.top {
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), transparent);
}

.gradient-overlay.bottom {
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent);
}

.slot-pointer {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  color: #667eea;
  z-index: 10;
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1; 
    transform: translateY(-50%) scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: translateY(-50%) scale(1.2); 
  }
}

.slot-reel {
  padding-top: 80px;
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.slot-item {
  height: 80px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 80px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 20px;
  font-weight: bold;
  transition: filter 0.1s ease;
}

.slot-icon {
  font-size: 36px !important;
}

.slot-name {
  flex: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
