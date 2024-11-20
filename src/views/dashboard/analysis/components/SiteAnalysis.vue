<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <DeviceMessageLineAnalysis :startDate="startTime" :endDate="endTime" />
    </p>
    <template #tabBarExtraContent>
      <div class="md:inline-block !md:mr-6">
        <a-button  :type="btntypes[0]" @click="handleButtonClick(0)">1小时</a-button>
        <a-button  :type="btntypes[1]" @click="handleButtonClick(1)">1天</a-button>
        <a-button  :type="btntypes[2]" @click="handleButtonClick(2)">7天</a-button>
        <a-button  :type="btntypes[3]" @click="handleButtonClick(3)">30天</a-button>
      </div>
      <DatePicker v-model:value="beginTime"
                      @change="handleBeginDateChange"
                            :show-time="{ format: 'HH:mm' }"
                          />-
      <DatePicker  v-model:value="overTime" 
                              @change="handleEndDateChange"
                            :show-time="{ format: 'HH:mm' }" />
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { Card, DatePicker } from 'ant-design-vue';
  import DeviceMessageLineAnalysis from './DeviceMessageLineAnalysis.vue';
  import VisitAnalysisBar from './VisitAnalysisBar.vue';
  import emitter from '/@/utils/eventbus';
    import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  dayjs.locale('zh-cn');
  const activeKey = ref('tab1');
   const btntypes: any = ref(["default", "primary", "default", "default"]);
   const startTime=ref<any>(null);
   const endTime=ref<any>(null);
         const beginTime = ref<any>(null);
      const overTime = ref<any>(null);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
   handleButtonClick(0);
      function handleButtonClick(key) {
        btntypes.value = ["default", "default", "default", "default"];
        switch (key) {
          case 0:
            btntypes.value[0] = 'primary';  
            startTime.value = formattedTime("1h");
            break
          case 1:
            btntypes.value[1] = 'primary';
            startTime.value = formattedTime("1d");
            break;
          case 2:
            btntypes.value[2] = 'primary';
            startTime.value = formattedTime("7d");
            break;
          case 3:
            btntypes.value[3] = 'primary';
            startTime.value = formattedTime("30d");
            break;
        } 
        if (startTime.value != null)
        endTime.value = new Date().toLocaleString('zh-CN', options).replace(/\//g, '-');
 setDisplayDate() 
      }
            function setDisplayDate() {
        if (startTime.value != null)
          beginTime.value = dayjs(startTime.value, "YYYY-MM-DD HH:mm:ss");
        if (endTime.value != null)
          overTime.value = dayjs(endTime.value, "YYYY-MM-DD HH:mm:ss"); 
    emitter.off('deviceMegselectChanged', () => { });
              emitter.emit('deviceMegselectChanged', { beginTime: unref(startTime), overTime: unref(endTime) });
  }
  function handleEndDateChange(_, datastr2) {
    endTime.value = datastr2;

    emitter.off('deviceMegselectChanged', () => { });
    emitter.emit('deviceMegselectChanged', { beginTime: unref(startTime), overTime: unref(endTime)});
  }
  function handleBeginDateChange(_, datastr2) {
    startTime.value = datastr2;
    emitter.off('deviceMegselectChanged', () => { });
    emitter.emit('deviceMegselectChanged', { beginTime: unref(startTime), overTime: unref(endTime)});
  }
            function formattedTime(format) {
        var result = "";
        let time = 0; 
        switch (format) {
          case "1h":
              time = 60 * 60 * 1000; // 一天的毫秒数
            result = new Date(new Date().getTime() - time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
          case "1d":
              time =24* 60 * 60 * 1000; // 一天的毫秒数
            result = new Date(new Date().getTime() - time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
          case "7d":
            time = 24 * 60 * 60 * 1000*7; // 一天的毫秒数
            result = new Date(new Date().getTime() - time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
          case "30d":
            time = 24 * 60 * 60 * 1000 * 30; // 一天的毫秒数
            result = new Date(new Date().getTime() - time).toLocaleString('zh-CN', options).replace(/\//g, '-');
            break;
        } 
        return result;
      }
  const tabListTitle = [
    {
      key: 'tab1',
      tab: '设备消息',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
