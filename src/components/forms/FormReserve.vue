<style lang="scss">
  .form-reserve {
    min-height: 300px;
    padding: 1rem;
    &__hotel-name {
      font-size: 1.5rem;
    }
  }
</style>
<template>
  <form class="form-reserve" @submit.prevent="submit">
    <div>Reserva em :</div>
    <div class="form-reserve__hotel-name">{{ props.hotel.name }}</div>
    <fieldset class="mt-4">
      <div>
        <SimpleValidateField
          v-model="stateForm.name"
          label="Nome"
          id="field-nome"
          dataTest="field-nome"
          type="text"
          placeholder="Nome"
          required
          fieldClass="customInput"
        />
      </div>
      <div>
        <SimpleValidateField
          v-model="stateForm.email"
          label="Email"
          id="field-email"
          dataTest="field-email"
          type="text"
          placeholder="E-mail"
          required
          fieldClass="customInput"
        />
      </div>
    </fieldset>

    <div class="mt-4">
      <button class="customPrimaryButton">Reservar</button>
    </div>
  </form>
</template>
<script setup lang="ts">
  import SimpleValidateField from "../../components/fields/SimpleValidateField.vue";
  import { reactive, defineEmits, defineProps } from "vue";
  import useVuelidate from "@vuelidate/core";
  import type { HotelInterface } from "@/types/interfaces";

  const props = defineProps<{
    hotel: HotelInterface;
  }>();

  const stateForm = reactive({
    name: "",
    email: "",
  });

  const v$ = useVuelidate();
  const emit = defineEmits(["submit"]);

  async function submit() {
    const isValid = await v$.value.$validate();
    if (!isValid) return;
    emit("submit", stateForm);
  }
</script>
