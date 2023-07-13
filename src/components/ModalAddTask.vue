<template>
  <v-dialog v-model="getIsVisible" @click:outside="closeModal" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Adding a task
      </v-card-title>
      <v-card-text>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="onSubmit">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required"
            >
              <v-text-field
                v-model="form.name"
                :error-messages="errors"
                label="Name"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="FirstName"
              rules="required"
            >
              <v-text-field
                v-model="form.firstName"
                :error-messages="errors"
                label="FirstName"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="LastName"
              rules="required"
            >
              <v-text-field
                v-model="form.lastName"
                :error-messages="errors"
                label="LastName"
                required
              />
            </validation-provider>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <validation-provider
                  v-slot="{ errors }"
                  name="DateOfCompletion"
                  rules="required"
                >
                  <v-text-field
                    :value="getDateOfCompletion"
                    :error-messages="errors"
                    clearable
                    label="Date of completion"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="form.dateOfCompletion = ''"
                  />
                </validation-provider>
              </template>
              <v-date-picker
                v-model="form.dateOfCompletion"
                @change="menu2 = false"
              ></v-date-picker>
            </v-menu>
            <validation-provider name="Description">
              <v-text-field v-model="form.description" label="Description" />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Priority Items"
              rules="required"
            >
              <v-select
                v-model="form.priority"
                :items="priorityItems"
                :error-messages="errors"
                label="Priority Items"
                data-vv-name="select"
                required
              ></v-select>
            </validation-provider>

            <v-btn class="mr-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clearForm"> clear </v-btn>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { required } from "vee-validate/dist/rules";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import { ITask } from "@/types/types";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default defineComponent({
  name: "modalAddTask",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  props: {
    listId: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    priorityItems: [1, 2, 3, 4, 5],
    menu2: false,
    form: {
      id: null,
      listId: null,
      name: "",
      description: "",
      firstName: "",
      lastName: "",
      priority: null,
      dateOfCreation: "",
      dateOfCompletion: "",
    },
  }),

  computed: {
    ...mapGetters(["getIsVisible", "getTasks"]),

    getDateOfCompletion(): string {
      return this.form.dateOfCompletion;
    },
  },

  methods: {
    ...mapMutations(["setIsVisible"]),
    ...mapActions(["setTaskLS"]),

    clearForm() {
      const observer = this.$refs.observer as InstanceType<
        typeof ValidationObserver
      >;
      observer.reset();
      return (this.form = {
        id: null,
        listId: null,
        name: "",
        description: "",
        firstName: "",
        lastName: "",
        priority: null,
        dateOfCreation: "",
        dateOfCompletion: "",
      });
    },
    onSubmit() {
      const newTask: ITask = {
        id: new Date().getTime(),
        listId: this.listId,
        name: this.form.name,
        description: this.form.description,
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        priority: this.form.priority,
        dateOfCreation: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        dateOfCompletion: this.form.dateOfCompletion,
      };
      const tasks = this.getTasks;
      tasks.push(newTask);
      this.setTaskLS(tasks);
      this.setIsVisible(false);
      this.clearForm();
    },
    closeModal() {
      this.setIsVisible(false);
      this.clearForm();
    },
  },
  mounted() {
    this.$refs.observer;
  },
});
</script>

<style lang="scss" scoped></style>
