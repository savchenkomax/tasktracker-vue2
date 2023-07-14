import Vue from "vue";
import Vuex from "vuex";
import { IList, ITask, IModal } from "@/types/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [] as IList[],
    tasks: [] as ITask[],
    isVisible: false,
    modalData: {} as IModal,
  },

  getters: {
    getAllLists(state): IList[] {
      return state.lists;
    },
    getTasks(state): ITask[] {
      return state.tasks;
    },
    getTasksforList: (state) => (listId: number) => {
      return state.tasks.filter((el) => el.listId === listId);
    },
    getIsVisible(state): boolean {
      return state.isVisible;
    },
    getModalData(state): IModal {
      return state.modalData;
    },
  },

  mutations: {
    setList(state, payload: IList[]) {
      state.lists = payload;
    },
    setTask(state, payload: ITask[]) {
      state.tasks = payload;
    },
    setIsVisible(state, payload: boolean) {
      state.isVisible = payload;
    },
    setModalData(state, payload: IModal) {
      state.modalData = payload;
    },
  },

  actions: {
    setListLS(context, payload: IList) {
      const lists = JSON.stringify(payload);
      localStorage.setItem("lists", lists);
      context.commit("setList", payload);
    },
    getListsLS(context) {
      const data = localStorage.getItem("lists");
      if (data) {
        const lists = JSON.parse(data);
        context.commit("setList", lists);
      }
    },
    setTaskLS(context, payload: ITask) {
      const tasks = JSON.stringify(payload);
      localStorage.setItem("tasks", tasks);
      context.commit("setTask", payload);
    },

    getTaskLS(context) {
      const data = localStorage.getItem("tasks");
      if (data) {
        const tasks = JSON.parse(data);
        context.commit("setTask", tasks);
      }
    },
  },
  modules: {},
});
