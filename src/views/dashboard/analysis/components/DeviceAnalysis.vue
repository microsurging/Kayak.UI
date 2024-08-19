<template>
  <Card title="当前在线" :loading="loading">
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
      :endVal="7"
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
        >设备总数 <CountTo :startVal="1" :endVal="699890" style="padding-left: 5px"
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
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月',
          ],

          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            max: 6000,
            show: false,

            splitNumber: 4,
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
          width: '85%', // 宽度
          height: '90%', // 高度
          bottom: 0,
        },
        series: [
          {
            data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
            type: 'bar',
            barWidth: 8,
            barGap: '1%',
            barCategoryGap: '1%',
            barMaxWidth: 8,
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
