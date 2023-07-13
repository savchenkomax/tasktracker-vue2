<template>
  <v-card class="mx-auto" width="300" max-height="250px">
    <v-card-text>
      <p>{{ task.name }}</p>
      <p>{{ fullName }}</p>
      <p>Description</p>
      <div class="text--primary">
        {{ task.description }}
      </div>
      <p>{{ allottedTime }}</p>
    </v-card-text>
    <v-card-actions class="card__actions">
      <v-btn text color="deep-purple accent-4"> edit </v-btn>
      <v-btn
        text
        color="red accent-4"
        @click="$emit('deleteTask', { taskId: task.id })"
      >
        delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";

import { ITask } from "@/types/types";

export default defineComponent({
  name: "TaskCard",

  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true,
    },
  },

  data: () => {
    return {};
  },

  computed: {
    fullName(): string {
      return this.task.firstName + "" + this.task.lastName;
    },
    allottedTime(): any {
      return this.task.dateOfCreation + "-" + this.task.dateOfCompletion;
    },
  },
});
</script>

<style lang="scss" scoped>
.card__actions {
  justify-content: space-between;
}
</style>
