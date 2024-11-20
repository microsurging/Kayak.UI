<template style="height:100%">
  <div class="full-height">
    <PageWrapper :title="title" contentBackground>
      <template #subTitle>
        <a-badge status="error" text="离线" />
      </template>
      <template #extra>
        <a-button type="primary" preIcon="ant-design:sync-outlined"> 刷新 </a-button>
      </template>

      <template #footer>
        <a-descriptions>
          <a-descriptions-item label="设备标识">{{ deviceCode }}</a-descriptions-item>
          <a-descriptions-item label="设备型号">
            {{ typeCode }}
            <a-button type="link"
                      style="vertical-align: top; border-width: 0px; padding: 0 0 10px 10px">查看</a-button>
          </a-descriptions-item>
        </a-descriptions>
        <a-tabs default-active-key="1" @change="handleTabChange">
          <a-tab-pane key="1" tab="实例信息" />
          <a-tab-pane key="2" tab="运行状态" />
          <a-tab-pane key="3" tab="物模型" />
          <a-tab-pane key="4" tab="超临界数据" />
        </a-tabs>
      </template>

      <component :is="components.get(compName)" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent, markRaw, unref, ref, defineAsyncComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Badge, Descriptions, Row, Col, Tabs } from 'ant-design-vue';
  import { CountTo } from '/@/components/CountTo/index';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      Row,
      Col,
      [Tabs.name]: Tabs,
      Badge,
      CountTo,
      Descriptions,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const components = markRaw(new Map<string, any>());
      const router = useRouter();
      const { currentRoute } = router;
      const deviceCode = unref(currentRoute).query.code;
      const deviceName =  unref(currentRoute).query.name; 
      const typeCode = unref(currentRoute).query.typeCode;
      components.set(
        'deviceinfo',
        defineAsyncComponent(() => import('./deviceinfo.vue')),
      );
      components.set(
        'runstate',
        defineAsyncComponent(() => import('./runstate/index.vue')),
      );
    components.set(
     'supercriticaldata',
     defineAsyncComponent(() => import('./supercriticaldata/index.vue')),
   );
      components.set(
        'objectmodel',
        defineAsyncComponent(() => import('./objectmodel.vue')),
      );
      const compName = ref('deviceinfo');

      function handleTabChange(activeKey) {
        switch (activeKey) {
          case '1':
            compName.value = 'deviceinfo';
            break;
          case '2':
            compName.value = 'runstate';
            break;
          case '3':
            compName.value = 'objectmodel';
            break;
          case '4':
           compName.value='supercriticaldata';
            break;

        }
      }
      return {
        handleTabChange,
        components,
        compName,
        deviceCode,
        title: "设备:" + deviceName,
        typeCode
      };
    },
  });
</script>
<style lang="less" scoped>
.full-height {
    height: 100%; 
  }

  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
    height: 100%;
    
  }
  ::v-deep .vben-page-wrapper-content {
    min-height: 632px; /* 设置最小高度 */
  }
  </style>
