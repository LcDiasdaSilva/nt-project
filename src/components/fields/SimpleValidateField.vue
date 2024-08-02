<template>
  <label :class="fieldClass">
    {{ label }}
    <input
      v-model="state.value"
      @input="updateValue"
      :id="id"
      :type="type"
      :ref="ref"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :data-test="dataTest"
      :disabled="isDisabled"
    />
    <div style="height: 1rem" class="error">
      <small
        data-test="custom-input-error-message"
        v-if="v$.value && v$.value.$error"
      >
        {{ getError(v$.value.$errors) }}
      </small>
    </div>
  </label>
</template>

<script setup lang="ts">
  import {
    reactive,
    ref,
    onMounted,
    watch,
    computed,
    withDefaults,
    defineEmits,
    defineProps,
  } from "vue";
  import useVuelidate from "@vuelidate/core";
  import {
    required,
    minLength,
    maxLength,
    sameAs,
    email,
  } from "@vuelidate/validators";

  const fieldInput = ref();

  const props = withDefaults(
    defineProps<{
      id: string;
      modelValue?: string;
      matchValue?: string;
      matchValueErrorLabel?: string;
      autocomplete?: string;
      maxValidator?: number;
      minValidator?: number;
      dataTest?: string;
      label?: string;
      placeholder?: string;
      required?: boolean;
      fieldClass?: string;
      initialFocus?: boolean;
      type?: string;
      autofocus?: boolean;
      isDisabled?: boolean;
    }>(),
    {
      type: "text",
      required: false,
    }
  );

  const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
  }>();

  const state = reactive({
    value: props.modelValue,
  });

  const rules = computed(() => {
    return {
      value: {
        ...(props.required ? { required } : {}),
        ...(props.minValidator
          ? { minLength: minLength(props.minValidator) }
          : {}),
        ...(props.maxValidator
          ? { maxLength: maxLength(props.maxValidator) }
          : {}),
        ...(props.matchValue ? { sameAs: sameAs(props.matchValue) } : {}),
        ...(props.type === "email" ? { email } : {}),
      },
    };
  });

  const v$ = useVuelidate(rules, state);

  watch(
    () => props.modelValue,
    (newValue) => {
      state.value = newValue;
    }
  );

  watch(
    () => props.matchValue,
    () => {
      v$.value.$touch();
      v$.value.$validate();
    }
  );

  const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    state.value = target.value;
    emit("update:modelValue", state.value);
    v$.value.$touch();
    v$.value.$validate();
  };

  onMounted(() => {
    if (props.initialFocus) {
      fieldInput.value.focus();
    }
  });

  interface ValidationError {
    $validator: string;
  }

  const getError = (errors: string | ValidationError[]) => {
    const messages: Record<string, string> = {
      required: `${props.label} é obrigatório`,
      minLength: `${props.label} deve ter no mínimo ${props.minValidator} caracteres`,
      maxLength: `${props.label} deve ter no máximo ${props.maxValidator} caracteres`,
      sameAs: `${props.label} deve ser igual ao campo ${props.matchValueErrorLabel}`,
      email: `${props.label} inválido`,
    };

    if (Array.isArray(errors)) {
      const validationError = errors[0] as ValidationError;
      return validationError && validationError.$validator
        ? messages[validationError.$validator]
        : "";
    }

    return "";
  };
</script>
