<style lang="scss">
  .form-reserve {
    min-height: 300px;
    padding: 1rem;
    &__hotel-name {
      font-size: 1.5rem;
    }
    &__reserve-data {
      padding: 1rem;
      border: solid 1px #ccc;
      border-radius: 0.5rem;
    }
    &__personal-data {
      padding: 1rem;
      border: solid 1px #ccc;
      border-radius: 0.5rem;
    }
    &__billing-data {
      padding: 1rem;
      border: solid 1px #ccc;
      border-radius: 0.5rem;
    }
  }
</style>
<template>
  <form class="form-reserve" @submit.prevent="submit">
    <div>Reserva em :</div>
    <div class="form-reserve__hotel-name">{{ props.hotel.name }}</div>
    <div class="form-reserve__reserve-data mt-4">
      <small>Informações da reserva:</small>
      <div>
        De <b>{{ dates.start }} á {{ dates.end }}</b>
      </div>
      <div>
        <b>{{ dates.daily }}</b> diária (s)
      </div>
      <div>
        Valor por diária: <b>{{ formatCurrency(hotel.price) }}</b>
      </div>
      <div>
        Valor Total <b>{{ formatCurrency(hotel.price * dates.daily) }}</b>
      </div>
    </div>
    <div class="form-reserve__personal-data mt-4">
      <small>Dados pessoais:</small>
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
        <div>
          <DocValidateField
            v-model="stateForm.cpf"
            label="CPF"
            id="field-cpf"
            dataTest="field-cpf"
            type="text"
            placeholder="CPF"
            docType="cpf"
            required
            fieldClass="customInput"
          />
        </div>
      </fieldset>
    </div>
    <div class="form-reserve__billing-data mt-4">
      <small>Dados de pagamento:</small>
    </div>

    <div class="mt-4">
      <button class="customPrimaryButton">Reservar</button>
    </div>
  </form>
</template>
<script setup lang="ts">
  import SimpleValidateField from "../../components/fields/SimpleValidateField.vue";
  import DocValidateField from "../../components/fields/DocValidateField.vue";
  import { reactive, defineEmits, defineProps } from "vue";
  import useVuelidate from "@vuelidate/core";
  import type { HotelInterface, DailyInterface } from "@/types/interfaces";
  import { formatCurrency } from "../../utils/function";

  const props = defineProps<{
    hotel: HotelInterface;
    dates: DailyInterface;
  }>();

  const stateForm = reactive({
    name: "",
    email: "",
    cpf: "",
  });

  const v$ = useVuelidate();
  const emit = defineEmits(["submit"]);

  async function submit() {
    const isValid = await v$.value.$validate();
    if (!isValid) return;
    emit("submit", stateForm);
  }
</script>
