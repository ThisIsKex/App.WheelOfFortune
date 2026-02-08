<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import ParticipantInput from './components/ParticipantInput.vue';
import ParticipantGrid from './components/ParticipantGrid.vue';
import SlotMachine from './components/SlotMachine.vue';
import WinnerModal from './components/WinnerModal.vue';
import { useParticipants } from './composables/useParticipants';

const {
  participants,
  activeParticipant,
  isRolling,
  hasConfig,
  addParticipant,
  removeParticipant,
  startRoll,
  save,
  load
} = useParticipants();

const showWinner = ref(false);

const handleRoll = async () => {
  showWinner.value = false;
  const winner = await startRoll();
  showWinner.value = true;
};

const handleAddParticipant = (name: string) => {
  addParticipant(name);
};
</script>

<template>
  <main class="app-container">
    <div class="glass-card">
      <AppHeader 
        :has-config="hasConfig"
        :can-save="participants.length > 0"
        @load="load"
        @save="save"
      />

      <div class="content-area">
        <!-- Slot Machine during roll -->
        <SlotMachine 
          v-if="isRolling"
          :participants="participants"
          :active-participant="activeParticipant"
        />

        <!-- Input and Grid when not rolling -->
        <template v-if="!isRolling">
          <ParticipantInput @add="handleAddParticipant" />
          <ParticipantGrid 
            :participants="participants"
            @remove="removeParticipant"
          />
        </template>

        <!-- Roll Button -->
        <div class="action-section">
          <v-btn
            :disabled="participants.length < 2 || isRolling"
            @click="handleRoll"
            size="x-large"
            class="roll-button"
            :class="{ 'rolling': isRolling }"
          >
            <v-icon class="mr-2">mdi-dice-multiple</v-icon>
            {{ isRolling ? 'Rolling...' : 'Roll the Dice!' }}
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Winner Modal -->
    <WinnerModal 
      :show="showWinner"
      :winner="activeParticipant"
      @close="showWinner = false"
    />
  </main>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: gradientShift 10s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glass-card {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  overflow: hidden;
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.content-area {
  padding: 32px;
}

.action-section {
  text-align: center;
  margin-top: 24px;
}

.roll-button {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  color: white !important;
  border-radius: 50px !important;
  padding: 24px 48px !important;
  font-size: 20px !important;
  font-weight: bold !important;
  text-transform: none !important;
  letter-spacing: 1px;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4) !important;
  transition: all 0.3s ease !important;
  margin: 0 auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.roll-button:not(:disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.6) !important;
}

.roll-button.rolling {
  animation: rollAnimation 1s ease-in-out infinite;
}

@keyframes rollAnimation {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-5deg) scale(1.05); }
  75% { transform: rotate(5deg) scale(1.05); }
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
