<template>
  <div class="wrapper">
    <draggable
      class="list-group"
      v-model="lists"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <task-list
        class="list-group-item"
        v-for="list in lists"
        @setVisible="openModal"
        @deleteList="deleteList"
        :list="list"
        :key="list.id"
      />
    </draggable>
    <btn-add-list @onSubmit="addList" />
    <modal-add-task :listId="listId" :taskForEdit="taskForEdit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";

import BtnAddList from "@/components/BtnAddList.vue";
import ModalAddTask from "@/components/ModalAddTask.vue";
import TaskList from "@/components/TaskList.vue";
import { IList } from "@/types/types";

export default defineComponent({
  name: "main-page",

  components: {
    BtnAddList,
    TaskList,
    ModalAddTask,
    draggable,
  },

  data: () => {
    return {
      lists: [] as IList[],
      listId: 0,
      taskForEdit: {},
      drag: false,
    };
  },

  computed: {
    ...mapGetters(["getAllLists"]),

    dragOptions() {
      return {
        animation: 200,
        group: "lists",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },

  methods: {
    ...mapMutations(["setIsVisible", "setModalData"]),
    ...mapActions(["setListLS", "getListsLS"]),

    addList({ listName }: { listName: string }) {
      const newList: IList = {
        id: new Date().getTime(),
        name: listName,
      };
      this.lists.push(newList as never);
      this.setListLS(this.lists);
    },
    deleteList({ listId }: { listId: number }) {
      this.lists = this.lists.filter((el) => el.id !== listId);
      this.setListLS(this.lists);
    },
    openModal({ listId }: { listId: number }) {
      this.setModalData({ type: "create" });
      this.setIsVisible(true);
      this.listId = listId;
    },
  },

  mounted() {
    this.getListsLS();
    this.lists = this.getAllLists;
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
  gap: 30px;
  padding: 0 20px;
  overflow-x: scroll;
}
.list-group {
  display: flex;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.2;
  background: #813dff;
}

.list-group {
  min-height: 20px;
  span {
    display: block;
    min-height: 20px;
  }
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
