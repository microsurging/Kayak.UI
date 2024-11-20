<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, unref, onBeforeUnmount } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts'; 
  import { useDeviceMsgTotalStore } from '/@/store/modules/devicemessage';
  import moment from 'moment';
  import emitter from '/@/utils/eventbus';
  import { deviceMsgProps } from './props';
import { integer } from 'vue-types';
  const props =  defineProps({
    ...deviceMsgProps,
  });
  const jsonData = ref({});
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const categoryData = ref<any>([]);
  const beginDate = ref<any>(props.startDate);
  const endDate = ref<any>(props.endDate);
  const contentData = ref<any>([]);
  const maxContent = ref<number>(0);
  function getData() {
    var deviceMsgTotalStore = useDeviceMsgTotalStore();
    deviceMsgTotalStore.getgroupstatisticsApi({ startDate: unref(beginDate), endDate: unref(endDate) }).then(response => {
      var data = response.result
      jsonData.value = data;
      categoryData.value = [];
      contentData.value = [];
      for (var i = 0; i < data.length; i++) {
        var dateMoment = moment(data[1].date);
        if (moment(data[0].date).hour()>0 || dateMoment.hour() > 0 )
        {

          categoryData.value.push(moment(data[i].date).format("HH:mm"));
        }
        else {
          categoryData.value.push(moment(data[i].date).format("MM-DD"));
        }
        contentData.value.push(data[i].count.toString());
        if (maxContent.value < data[i].count)
          maxContent.value = Number( data[i].count);
      }
      handle();
      console.log(223444);
    });
  }
  emitter.on('deviceMegselectChanged', (value: string) => {
    beginDate.value = value.beginTime;
    endDate.value = value.overTime; 
    getData();
  });
  onBeforeUnmount(() => {
    emitter.off('deviceMegselectChanged', (v: string) => { }); //关闭
  });
  function handle() {
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
        data: unref(categoryData),
        splitLine: {
          show: false,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          max: Number(unref(maxContent)),
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'dashed',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: ['rgba(255,255,255,0.2)'],
            },
          },
        },
      ],
      grid: { left: '1%', right: '1%', top: '10  %', bottom: 0, containLabel: true },
      series: [
        {
          smooth: true,
          symbol: 'none',
          data: unref(contentData),
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: '#5ab1ef',
          },
        },
      ],
    });
  }
  onMounted(() => {
    getData();
   
  });
</script>
