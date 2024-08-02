<template>
  <div :class="fieldClass">
    <label> {{ label }}: </label>
    <input
      v-model="state.doc"
      type="text"
      @input="updateValue"
      :placeholder="
        docType === 'cnpj' ? '00.000.000/0000-00' : '000.000.000.00'
      "
      v-maska
      :data-maska="mask"
    />
    <div class="error" style="height: 1rem">
      <small v-if="v$.doc && v$.doc.$error">
        {{ getError(v$.doc.$errors) }}
      </small>
    </div>
  </div>
</template>
<script setup>
  import useVuelidate from "@vuelidate/core";
  import { required } from "@vuelidate/validators";
  import { computed, reactive } from "vue";
  import {
    isValidCPF,
    isValidCNPJ,
    defineEmits,
    defineProps,
  } from "@brazilian-utils/brazilian-utils";

  const props = defineProps({
    modelValue: String,

    docType: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      default: "CPF",
    },
    required: {
      type: Boolean,
      default: false,
    },
    fieldClass: {
      type: String,
    },
  });

  const isValid = () => {
    if (props.docType === "cpf") return isValidCPF(state.doc);
    if (props.docType === "cnpj") return isValidCNPJ(state.doc); //.replace(/[^0-9]/g, '')
    if (props.modelValue.length <= 14) return isValidCPF(state.doc);
    if (props.modelValue.length > 14) return isValidCNPJ(state.doc);
  };

  const mask = computed(() => {
    let mask = "";

    if (props.docType == "cpf") mask = "###.###.###-##";
    if (props.docType == "cnpj") mask = "##.###.###/####-##";
    if (props.modelValue.length <= 14) mask = "###.###.###-##";
    if (props.modelValue.length > 14) mask = "##.###.###/####-##";
    return mask;
  });

  const getError = (error) => {
    const messages = {
      required: `${props.label} é obrigatório`,
      isValid: `${props.label} inválido`,
    };
    return messages[error[0].$validator];
  };

  const emit = defineEmits(["update:modelValue"]);
  const state = reactive({
    doc: props.modelValue,
  });

  const rules = props.required
    ? {
        doc: { required, isValid },
      }
    : {
        doc: { isValid },
      };

  const updateValue = (event) => {
    emit("update:modelValue", event.target.value);
  };

  const v$ = useVuelidate(rules, state);
</script>
