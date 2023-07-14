<template>
  <v-card class="task" width="300" max-height="250px">
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
      <v-btn text color="deep-purple accent-4" @click="openModal"> edit </v-btn>
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
import { mapMutations } from "vuex";

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
    allottedTime(): string {
      return this.task.dateOfCreation + "-" + this.task.dateOfCompletion;
    },
  },

  methods: {
    ...mapMutations(["setIsVisible", "setModalData"]),

    openModal() {
      this.setModalData({ type: "edit", taskForEdit: this.task });
      this.setIsVisible(true);
    },
  },
});
</script>

<style lang="scss" scoped>
.card__actions {
  justify-content: space-between;
}
.task {
  margin-top: 10px;
}
</style>
