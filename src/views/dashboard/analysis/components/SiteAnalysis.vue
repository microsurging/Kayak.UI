<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tabChange="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <DeviceMessageLineAnalysis />
    </p>
    <template #tabBarExtraContent>
      <div class="md:inline-block !md:mr-6">
        <a-button>1小时</a-button>
        <a-button>1天</a-button>
        <a-button>7天</a-button>
        <a-button>30天</a-button>
      </div>
      <DatePicker :show-time="{ format: 'HH:mm' }" />
    </template>
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card, DatePicker } from 'ant-design-vue';
  import DeviceMessageLineAnalysis from './DeviceMessageLineAnalysis.vue';
  import VisitAnalysisBar from './VisitAnalysisBar.vue';

  const activeKey = ref('tab1');

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
