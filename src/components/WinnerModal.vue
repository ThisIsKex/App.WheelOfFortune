<script setup lang="ts">
import type { Participant } from '../composables/useParticipants';

defineProps<{
  show: boolean;
  winner: Participant | null;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <v-dialog :model-value="show" max-width="500" persistent>
    <v-card class="winner-card">
      <v-card-text class="winner-content">
        <div class="winner-trophy">
          <v-icon size="100" color="amber">mdi-trophy-award</v-icon>
        </div>
        <h2 class="winner-title">🎉 And the Winner is... 🎉</h2>
        <div v-if="winner" class="winner-chip" :style="{ backgroundColor: winner.color }">
          <v-icon color="white" size="x-large">mdi-{{ winner.avatar }}</v-icon>
          <span class="winner-name">{{ winner.name }}</span>
        </div>
      </v-card-text>
      <v-card-actions class="winner-actions">
        <v-btn 
          color="primary" 
          block 
          size="large" 
          @click="emit('close')" 
          variant="flat"
        >
          Awesome! 🎊
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.winner-card {
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%) !important;
  border-radius: 24px !important;
  overflow: hidden;
  animation: winnerPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes winnerPop {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.winner-content {
  padding: 48px 24px !important;
  text-align: center;
}

.winner-trophy {
  animation: trophyBounce 1s ease-in-out infinite;
}

@keyframes trophyBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(-5deg); }
  75% { transform: translateY(-10px) rotate(5deg); }
}

.winner-title {
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 24px 0;
}

.winner-chip {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 16px 32px;
  border-radius: 50px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: winnerGlow 2s ease-in-out infinite;
}

@keyframes winnerGlow {
  0%, 100% { box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); }
  50% { box-shadow: 0 8px 32px rgba(255, 215, 0, 0.6); }
}

.winner-name {
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.winner-actions {
  padding: 0 24px 24px !important;
}
</style>
