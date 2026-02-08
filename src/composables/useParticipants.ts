import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';

export interface Participant {
  name: string;
  avatar: string;
  color: string;
}

const SMILEYS = [
  "emoticon",
  "emoticon-cry",
  "emoticon-sad",
  "emoticon-cool",
  "emoticon-dead",
  "emoticon-kiss",
  "emoticon-poop",
  "emoticon-devil",
  "emoticon-happy"
];

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
  "#F8B739", "#52B788", "#E76F51", "#2A9D8F"
];

export function useParticipants() {
  const participants = ref<Participant[]>([]);
  const activeParticipant = ref<Participant | null>(null);
  const isRolling = ref(false);
  const hasConfig = ref(false);

  const addParticipant = (name: string) => {
    if (!name.trim() || isRolling.value) return false;
    
    const exists = participants.value.some(p => p.name === name);
    if (exists) return false;

    const avatar = SMILEYS[Math.floor(Math.random() * SMILEYS.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    participants.value.push({ name, avatar, color });
    return true;
  };

  const removeParticipant = (name: string) => {
    if (isRolling.value) return;
    const index = participants.value.findIndex(p => p.name === name);
    if (index !== -1) {
      participants.value.splice(index, 1);
    }
  };

  const startRoll = (): Promise<Participant> => {
    return new Promise((resolve) => {
      activeParticipant.value = null;
      isRolling.value = true;
      
      let speed = 20;
      let counter = 0;
      const maxIterations = 150;
      
      const animate = () => {
        if (counter >= maxIterations) {
          const finalIndex = Math.floor(Math.random() * participants.value.length);
          const winner = participants.value[finalIndex];
          activeParticipant.value = winner;
          
          setTimeout(() => {
            isRolling.value = false;
            fireConfetti();
            resolve(winner);
          }, 500);
          return;
        }
        
        // Gradually slow down
        if (counter > maxIterations * 0.7) {
          speed += 2;
        }
        
        // Random selection during roll
        const randomIndex = Math.floor(Math.random() * participants.value.length);
        activeParticipant.value = participants.value[randomIndex];
        
        counter++;
        setTimeout(animate, speed);
      };
      
      animate();
    });
  };

  const fireConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const save = () => {
    localStorage.setItem("wheelOfFortuneParticipants", JSON.stringify(participants.value));
    hasConfig.value = true;
  };

  const load = () => {
    const config = localStorage.getItem("wheelOfFortuneParticipants");
    if (config) {
      participants.value = JSON.parse(config);
    }
  };

  onMounted(() => {
    const stored = localStorage.getItem("wheelOfFortuneParticipants");
    hasConfig.value = !!stored;
  });

  return {
    participants,
    activeParticipant,
    isRolling,
    hasConfig,
    addParticipant,
    removeParticipant,
    startRoll,
    save,
    load
  };
}
