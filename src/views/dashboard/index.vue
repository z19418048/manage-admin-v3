<template>
  <t-row :gutter="[16, 16]">
    <t-col v-for="(card, indx) in cards" :key="index" :span="3">
      <info-card :info="card"></info-card>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import InfoCard from "@/components/InfoCard.vue";
const cards = [
  {
    icon: "user",
    title: "新增用户",
    color: "#40c9c6",
    number: 195,
    unit: "位",
  },
  {
    icon: "chat",
    title: "今日消息",
    color: "#36a3f7",
    number: 99,
    unit: "个",
  },
  {
    icon: "money-circle",
    title: "营业额",
    color: "#f4516c",
    number: 365454,
    unit: "元",
  },
  {
    icon: "cart",
    title: "订单数",
    color: "#34bfa3",
    number: 195,
    unit: "个",
  },
];
</script>

<style scoped></style>
