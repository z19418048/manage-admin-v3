<template>
  <t-card>这是信息卡片</t-card>
</template>

<script lang="ts" setup>
interface Props {
  info: Info;
}
type Info = {
  icon: string;
  title: string;
  color: string;
  number: number;
  unit: string;
};

defineProps();
</script>

<style scoped></style>
