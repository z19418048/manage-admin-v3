<template>
  <t-row :gutter="[16, 16]">
    <t-col v-for="(infoCard, index) in infoCards" :key="index" :span="3">
      <info-card :info="infoCard"></info-card>
    </t-col>
    <t-col>
      <t-card :bordered="false">
        <div style="height: 500px">
          <e-charts :option="options"></e-charts>
        </div>
      </t-card>
    </t-col>
  </t-row>
</template>

<script lang="ts" setup>
import InfoCard from "@/components/InfoCard.vue";
import userApi from "@/api/user";

const getProductTotalApi = userApi.getProductTotal().then((res) => {
  return res.data;
});
console.log(getProductTotalApi);

const infoCards = [
  {
    icon: "user",
    title: "新增用户",
    color: "#40c9c6",
    number: 123,
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
    number: 123,
    unit: "个",
  },
];
const options = {
  tooltip: {},
  legend: {
    data: ["推荐指数"],
  },
  xAxis: {
    data: ["下饭小黄鱼", "辣椒炒肉", "肉沫茄子", "桂花红烧肉"],
  },
  yAxis: {},
  series: [
    {
      name: "推荐指数",
      type: "bar",
      data: [90, 80, 80, 60],
    },
  ],
};
</script>

<style scoped></style>
