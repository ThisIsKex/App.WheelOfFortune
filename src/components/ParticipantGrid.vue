<script setup lang="ts">
import type { Participant } from '../composables/useParticipants';

defineProps<{
    participants: Participant[];
    activeParticipant?: Participant | null;
    isRolling?: boolean;
}>();

const emit = defineEmits<{
    remove: [name: string];
}>();
</script>

<template>
    <div class="participant-container">
        <div v-if="participants.length > 0" class="participants-grid">
            <transition-group name="participant-list">
                <div v-for="participant in participants" :key="participant.name" 
                    class="participant-card"
                    :class="{ 
                        'active': activeParticipant?.name === participant.name,
                        'rolling': isRolling
                    }"
                    :style="{ borderColor: participant.color }">
                    <div class="participant-avatar" :style="{ backgroundColor: participant.color }">
                        <v-icon color="white" size="x-large">mdi-{{ participant.avatar }}</v-icon>
                    </div>
                    <div class="participant-name">{{ participant.name }}</div>
                    <v-btn v-if="!isRolling" icon="mdi-close" size="x-small" variant="text" class="remove-btn"
                        @click="emit('remove', participant.name)"></v-btn>
                </div>
            </transition-group>
        </div>

        <div v-else class="empty-state">
            <v-icon size="80" color="grey-lighten-1">mdi-account-group-outline</v-icon>
            <p class="empty-text">Add participants to get started!</p>
        </div>
    </div>
</template>

<style scoped>
.participant-container {
    min-height: 240px;
    margin-bottom: 24px;
}

.participants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
    padding: 8px;
}

.participants-grid::-webkit-scrollbar {
    width: 8px;
}

.participants-grid::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.participants-grid::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.5);
    border-radius: 10px;
}

.participant-card {
    position: relative;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border: 3px solid;
    transition: all 0.3s ease;
    cursor: pointer;
}

.participant-card.rolling {
    opacity: 0.5;
    filter: grayscale(0.5);
}

.participant-card.active {
    transform: scale(1.15);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    opacity: 1 !important;
    filter: grayscale(0) !important;
    z-index: 10;
    animation: pulse-glow 0.5s ease-in-out infinite;
}

@keyframes pulse-glow {
    0%, 100% {
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(102, 126, 234, 0.5);
    }
    50% {
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3), 0 0 40px rgba(102, 126, 234, 0.8);
    }
}

.participant-card:not(.rolling):hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.participant-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.participant-name {
    font-weight: 600;
    color: #333;
    text-align: center;
    word-break: break-word;
}

.remove-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.remove-btn:hover {
    opacity: 1;
}

.participant-list-enter-active,
.participant-list-leave-active {
    transition: all 0.5s ease;
}

.participant-list-enter-from {
    opacity: 0;
    transform: scale(0.5) rotate(180deg);
}

.participant-list-leave-to {
    opacity: 0;
    transform: scale(0.5) rotate(-180deg);
}

.empty-state {
    text-align: center;
    padding: 60px 20px;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.empty-text {
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    margin-top: 16px;
    font-weight: 500;
}
</style>
