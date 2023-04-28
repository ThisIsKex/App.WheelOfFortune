<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";

interface Participant {
  name: string;
  avatar: string;
}

const participant = ref<string>("");
const activeParticipant = ref<Participant>(null!);
const participants = ref<Participant[]>([]);
const startTime = ref<number>(0);
const isRolling = ref<boolean>(false);
const dialog = ref<boolean>(false);
const hasConfig = ref<boolean>(false);
const smileys = [
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

function addParticipant() {
  if (isRolling.value) {
    return;
  }

  if (participant.value.trim() === "") {
    return;
  }

  const index = participants.value.findIndex((x) => x.name === participant.value);
  if (index !== -1) {
    return;
  }

  var avatar = smileys[Math.floor(Math.random() * smileys.length)];

  participants.value.push({
    name: participant.value,
    avatar
  });
  participant.value = "";
}

function remove(value: string) {
  if (isRolling.value) {
    return;
  }

  const index = participants.value.findIndex((x) => x.name === value);
  if (index === -1) {
    return;
  }
  participants.value.splice(index, 1);
}

function rollTheDice() {
  let previousIndex = -1;
  isRolling.value = true;
  startTime.value = new Date().getTime();

  previousIndex = setRandom(previousIndex);

  var interval = setInterval(function () {
    if (new Date().getTime() - startTime.value > 10000) {
      clearInterval(interval);
      isRolling.value = false;
      dialog.value = true;
      return;
    }
    previousIndex = setRandom(previousIndex);
  }, 300);
}

function setRandom(previousIndex: number) {
  let index = Math.floor(Math.random() * participants.value.length);
  if (previousIndex === index) {
    if (participants.value.length - 1 === index) {
      index = 0;
    } else {
      index++;
    }
  }
  const current = participants.value[index];
  activeParticipant.value = current;
  return index;
}

function save() {
  localStorage.setItem("wheelOfFortuneParticipants", JSON.stringify(participants.value));
  hasConfig.value = true;
}

function load() {
  const storedParticipants = JSON.parse(localStorage.getItem("wheelOfFortuneParticipants"));
  participants.value = storedParticipants ?? [];
}

onMounted(() => {
  const storedParticipants = localStorage.getItem("wheelOfFortuneParticipants");
  hasConfig.value = storedParticipants != undefined;
});
</script>

<template>
  <main class="container">
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-app-bar color="teal-darken-4">
          <template v-slot:image>
            <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
          </template>
          <v-app-bar-title>Wheel of fortune</v-app-bar-title>
          <v-spacer></v-spacer>

          <v-tooltip text="Load configuration">
            <template v-slot:activator="{ props }">
              <v-btn icon :disabled="!hasConfig">
                <v-icon @click="load()" v-bind="props">mdi-reload</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Save configuration">
            <template v-slot:activator="{ props }">
              <v-btn icon :disabled="participants.length === 0">
                <v-icon @click="save()" v-bind="props">mdi-content-save</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </v-app-bar>

        <v-main>
          <v-container fluid>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  :disabled="isRolling"
                  v-model="participant"
                  :append-icon="'mdi-send'"
                  variant="filled"
                  clear-icon="mdi-close-circle"
                  clearable
                  label="Participant"
                  type="text"
                  @keydown.enter="addParticipant"
                  @click:append="addParticipant"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-chip
                  v-for="participant in participants"
                  class="ma-2"
                  :key="participant.name"
                  :color="participant === activeParticipant ? 'primary' : 'default'"
                  :prepend-icon="'mdi-' + participant.avatar"
                  :closable="!isRolling"
                  @click:close="remove(participant.name)"
                >
                  {{ participant.name }}
                </v-chip>
              </v-col>
              <v-col cols="12">
                <v-btn :disabled="participants.length < 2" @click="rollTheDice()">Roll the dice!</v-btn>
              </v-col>
            </v-row>
            <v-dialog v-model="dialog" width="600px">
              <v-card>
                <v-card-text>
                  And the happy winner is
                  <v-chip
                    class="ma-2"
                    :key="activeParticipant.name"
                    :color="'success'"
                    :prepend-icon="'mdi-' + activeParticipant.avatar"
                  >
                    {{ activeParticipant.name }}
                  </v-chip>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </main>
</template>
<style>
.container {
  background-image: url("https://picsum.photos/1920/1080?random");
  height: calc(100vh);
}

body::-webkit-scrollbar {
  display: none;
}
</style>
