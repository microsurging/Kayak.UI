<template>
  <Card title="cpu 使用率" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card, Tooltip } from 'ant-design-vue';
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
      default: '200px',
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
        series: [
          {
            type: 'gauge',
            min: 0,
            max: 10,
            radius: '100%',
            itemStyle: {
              color: '#0084f4',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowOffsetX: 1,
              shadowOffsetY: 1,
            },
            progress: {
              show: true,
              width: 10,
            },
            axisLine: {
              lineStyle: {
                width: 10,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 5,
              lineStyle: {
                width: 1,
                color: '#999',
              },
            },
            pointer: {
              width: 2,
              length: '60%',
            },
            axisLabel: {
              distance: 12,
              color: '#999',
              fontSize: 12,
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 12,
              itemStyle: {
                borderWidth: 1,
                borderColor: '#0084f4',
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 20,
              formatter: (value) => `${parseFloat(value * 10).toFixed(1)}%`,
              offsetCenter: [0, '70%'],
              color: '#777',
            },
            data: [
              {
                value: 1.3,
              },
            ],
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
