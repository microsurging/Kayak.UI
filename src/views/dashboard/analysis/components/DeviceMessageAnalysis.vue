<template>
  <Card title="今日设备消息量" :loading="loading">
    <template #extra>
      <Tooltip placement="top">
        <template #title>
          <span>{{ t('common.redo') }}</span>
        </template>
        <RedoOutlined @click="redo" />
      </Tooltip>
    </template>
    <CountTo
      :startVal="1"
      :endVal="699890"
      style="font-size: 30px; color: rgba(0, 0, 0, 0.85); padding-left: 24px"
    />
    <div ref="chartRef" :style="{ width, height }"> </div>
    <template #actions>
      <span
        style="
          text-align: left;
          width: 100%;
          display: block;
          padding-left: 24px;
          color: rgba(0, 0, 0, 0.65);
        "
        >当月设备消息量 <CountTo :startVal="1" :endVal="699890" style="padding-left: 5px"
      /></span>
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { CountTo } from '/@/components/CountTo/index';
  import { Card, Tooltip, Tag } from 'ant-design-vue';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  const redo = () => {};
  import { useECharts } from '/@/hooks/web/useECharts';
  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '100px',
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);

  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          show: false,
          data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),

          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            max: 67000,
            show: false,

            splitNumber: 10,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: {
          width: '100%', // 宽度
          height: '89%', // 高度
          bottom: 0,
        },
        series: [
          {
            smooth: true,
            symbol: 'none',
            data: [
              66666, 222, 4000, 18000, 33333, 55555, 6666, 3333, 1400, 3600, 6666, 4444, 22222,
              11111, 4000, 2000, 500, 333, 222, 111,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef',
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
<style lang="less" scoped>
  ::v-deep .ant-card-body {
    padding: 0px 10px 10px 10px;
  }

  ::v-deep .ant-card-head {
    border-width: 0px;
  }

  ::v-deep .ant-card-head-title {
    padding: 20px 0 0 0px;
    color: rgba(0, 0, 0, 0.45);
  }

  ::v-deep .ant-card-extra {
    padding: 20px 0 0 0px;
  }
</style>
