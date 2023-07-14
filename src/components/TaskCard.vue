<template>
  <div :class="activeColor">
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
        <v-btn text color="deep-purple accent-4" @click="openModal">
          edit
        </v-btn>
        <v-btn
          text
          color="red accent-4"
          @click="$emit('deleteTask', { taskId: task.id })"
        >
          delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
    return {
      priorityColor: ["red", "orange", "yellow", "green", "blue"],
    };
  },

  computed: {
    fullName(): string {
      return this.task.firstName + "" + this.task.lastName;
    },
    allottedTime(): string {
      return this.task.dateOfCreation + "-" + this.task.dateOfCompletion;
    },
    activeColor(): string {
      if (this.task.priority) {
        return this.priorityColor[this.task.priority - 1];
      }
      return "";
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
.v-card {
  border-radius: 0;
}
.red {
  box-shadow: 3px 5px 5px -2px red;
}
.orange {
  box-shadow: 3px 5px 5px -2px orange;
}
.yellow {
  box-shadow: 3px 5px 5px -2px yellow;
}
.green {
  box-shadow: 3px 5px 5px -2px green;
}
.blue {
  box-shadow: 3px 5px 5px -2px rgb(0, 119, 255);
}
</style>
