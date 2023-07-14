<template>
  <div>
    <validation-observer ref="observer">
      <form @submit.prevent="onSubmit" class="form">
        <validation-provider v-slot="{ errors }" name="Name" rules="required">
          <v-text-field
            class="input"
            v-model="listName"
            :error-messages="errors"
            label="Name"
            required
          ></v-text-field>
        </validation-provider>
        <v-btn class="mr-4" type="submit"> submit </v-btn>
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default defineComponent({
  name: "addListBtn",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data: () => {
    return {
      listName: "",
      required: [(v: string) => !!v || "Name is required"],
    };
  },

  computed: {
    ...mapGetters(["getAllLists"]),
  },

  methods: {
    onSubmit() {
      const observer = this.$refs.observer as InstanceType<
        typeof ValidationObserver
      >;
      observer.reset();
      this.$emit("onSubmit", { listName: this.listName });
      this.listName = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  .input {
    min-width: 260px;
    margin-top: 7px;
  }
}
</style>
