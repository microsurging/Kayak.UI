<template>
  <Card title="产品数量" :loading="loading">
    <template #extra>
      <Tooltip placement="top">
        <template #title>
          <span>{{ t('common.redo') }}</span>
        </template> 
      </Tooltip>
    </template>
        <div class="md:flex enter-y">
    <div class="md:w-3/4 w-full">
    <CountTo
      :startVal="1"
      :endVal="total"
      style="font-size: 50px; color: rgba(0, 0, 0, 0.85); padding-left: 24px"
    />
      </div>
         

      <div class="md:w-1/4 !md:ml-1 w-full">
        <img src="\src\assets\images\prd.jpg" />
      </div>
          </div>
    <template #actions>
      <div class="md:flex enter-y">
  <div class="md:w-1/4 w-full"> <a-badge status="success" text="正常" /> </div>  <div class="md:w-1/4 w-full"> <CountTo :startVal="1" :endVal="jsonData.NormalCount" style="padding-left: 5px"
      /></div>  <div class="md:w-1/4 w-full"> <a-badge status="error" text="禁用" /> </div>  <div class="md:w-1/4 w-full"> <CountTo :startVal="1" :endVal="jsonData.DisableCount" style="padding-left: 5px"
      /></div></div>
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { CountTo } from '/@/components/CountTo/index';
  import { Card, Tooltip, Tag } from 'ant-design-vue';
  import { useProductStore } from '/@/store/modules/product';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  const jsonData = ref({});
  const total = ref(0);
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
  function getData() {
    var productStore = useProductStore();
    productStore.getproductstatisticsApi().then(response => {
      var data= response.Result
      jsonData.value = data;
      total.value = data.NormalCount + data.DisableCount;
    });
  }
  getData();
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
    ::v-deep .ant-card-actions{
  border-top: 1px solid #e6e5e5;
  }
  ::v-deep .ant-card-head-title {
    padding: 20px 0 0 0px;
    color: rgba(0, 0, 0, 0.45);
  }

  ::v-deep .ant-card-extra {
    padding: 20px 0 0 0px;
  }
</style>
