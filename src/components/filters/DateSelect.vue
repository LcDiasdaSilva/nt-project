<template>
  <div>
    <div>Datas:</div>
    <VueDatePicker
      v-model="state.date"
      range
      multi-calendars
      :format="format"
      cancelText="Cancelar"
      selectText="Selecionar"
      :disabled-date="disabledDate"
      :min-date="new Date()"
      locale="pt-Br"
    />
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from "vue";
  import { reactive, ref, watch, defineEmits } from "vue";
  import { DateTime } from "luxon";

  const emit = defineEmits(["submit"]);

  const date = ref(new Date());

  const state = reactive({
    date: [null, null] as (Date | null)[],
  });

  const disabledDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const format = (date: Date[]) => {
    let dayStart: number | null = null;
    let monthStart: number | null = null;
    let yearStart: number | null = null;
    let dayEnd: number | null = null;
    let monthEnd: number | null = null;
    let yearEnd: number | null = null;

    if (date[0]) {
      dayStart = date[0].getDate();
      monthStart = date[0].getMonth() + 1;
      yearStart = date[0].getFullYear();
    }

    if (date[1]) {
      dayEnd = date[1].getDate();
      monthEnd = date[1].getMonth() + 1;
      yearEnd = date[1].getFullYear();
    }

    const start = `${dayStart}/${monthStart}/${yearStart}`;
    const end = date[1] ? `${dayEnd}/${monthEnd}/${yearEnd}` : start;

    return `Data selecionada é ${start} á ${end}`;
  };

  interface FormattedDates {
    start: string;
    end: string;
    daily: number;
  }

  function formatDatesAndInterval(
    startDate: Date | null,
    endDate: Date | null
  ): FormattedDates {
    const start = DateTime.fromJSDate(startDate, { zone: "America/Sao_Paulo" });
    const end = DateTime.fromJSDate(endDate, { zone: "America/Sao_Paulo" });

    if (!start.isValid || !end.isValid) {
      throw new Error("Invalid DateTime");
    }

    const formattedStart = start.toFormat("dd/MM/yy");
    const formattedEnd = end.toFormat("dd/MM/yy");

    const daily = end.diff(start, "days").days;

    return {
      start: formattedStart,
      end: formattedEnd,
      daily: Math.round(daily) + 1,
    };
  }

  onMounted(() => {
    state.date = [date.value];
  });

  watch(
    state,
    (newState) => {
      const start = newState.date[0];
      const end = newState.date[1];

      const result = formatDatesAndInterval(start, end ? end : start);
      emit("submit", result);
    },
    { deep: true }
  );
</script>
