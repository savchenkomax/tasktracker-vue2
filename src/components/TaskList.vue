<template>
  <div class="list">
    <div class="list__title">
      <h2>{{ list.name }}</h2>
      <v-btn
        @click="deleteList"
        class="ma-2"
        outlined
        color="red"
        height="25px"
      >
        <v-icon> mdi-cancel </v-icon>
      </v-btn>
    </div>
    <div class="list__body">
      <v-btn @click="$emit('setVisible', { listId: list.id })">
        Add task
      </v-btn>
      <draggable
        class="list-group"
        :list="getTasksforList(list.id)"
        group="tasks"
        @change="log"
      >
        <task-card
          class="list-group-item"
          v-for="task in getTasksforList(list.id)"
          @deleteTask="deleteTask"
          :task="task"
          :key="task.id"
        />
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";

import TaskCard from "@/components/TaskCard.vue";
import { IList, ITask } from "@/types/types";

export default defineComponent({
  name: "task-list",

  components: { TaskCard, draggable },

  props: {
    list: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    tasks: [] as ITask[],
  }),

  computed: {
    ...mapGetters(["getTasksforList", "getTasks", "getAllLists"]),
  },

  methods: {
    ...mapActions(["setListLS", "setTaskLS", "getTaskLS", "setListLS"]),

    deleteTask({ taskId }: { taskId: number }) {
      this.tasks = this.getTasks;
      this.tasks = this.tasks.filter((el: ITask) => el.id !== taskId);
      this.setTaskLS(this.tasks);
    },

    deleteList() {
      this.tasks = this.getTasks;
      this.tasks = this.tasks.filter((el) => el.listId !== this.list.id);
      this.setTaskLS(this.tasks);
      this.$emit("deleteList", { listId: this.list.id });
    },
    log: function (event: any) {
      if ("added" in event) {
        const currentList = this.getTasksforList(event.added.element.listId);
        currentList.splice(event.added.oldIndex, 1);
        const newList = this.getTasksforList(this.list.id);
        newList.splice(event.added.newIndex, 0, event.added.element);
        event.added.element.listId = this.list.id;
        const allLists = this.getAllLists;
        this.tasks = allLists.map((el: IList) => {
          if (el.id === this.list.id) {
            return newList;
          }
          if (el.id === event.added.element.listId) {
            return currentList;
          }
          const otherList = this.getTasksforList(el.id);
          return otherList;
        });
        this.setTaskLS(this.tasks.flat());
      } else if ("moved" in event) {
        const currentList = this.getTasksforList(event.moved.element.listId);
        [currentList[event.moved.oldIndex], currentList[event.moved.newIndex]] =
          [
            currentList[event.moved.newIndex],
            currentList[event.moved.oldIndex],
          ];
        const allLists = this.getAllLists;
        this.tasks = allLists.map((el: IList) => {
          if (el.id === event.moved.element.listId) {
            return currentList;
          }
          const otherList = this.getTasksforList(el.id);
          return otherList;
        });
        this.setTaskLS(this.tasks.flat());
      }
    },
  },

  mounted() {
    this.getTaskLS();
    this.tasks = this.getTasks;
  },
});
</script>

<style lang="scss" scoped>
.list {
  width: 300px;
  padding: 10px;
  &__title {
    border-bottom: solid 1px gray;
    display: flex;
    justify-content: space-between;
    align-items: end;
    & h2 {
      font-size: 25px;
    }
  }

  &__body {
    display: flex;
    flex-flow: column-reverse;
    gap: 10px;
    justify-content: center;
    padding: 20px 10px 0;
  }
}
</style>
