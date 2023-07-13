<template>
  <div class="wrapper">
    <task-list
      v-for="list in lists"
      @setVisible="openModal"
      @deleteList="deleteList"
      :list="list"
      :key="list.id"
    />
    <btn-add-list @onSubmit="addList" />
    <modal-add-task :listId="listId" :taskForEdit="taskForEdit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapGetters, mapActions } from "vuex";

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
  },

  data: () => {
    return {
      lists: [] as IList[],
      listId: 0,
      taskForEdit: {},
    };
  },

  computed: {
    ...mapGetters(["getAllLists"]),
  },

  methods: {
    ...mapMutations(["setIsVisible"]),
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
  gap: 30px;
  padding: 0 20px;
}
</style>
