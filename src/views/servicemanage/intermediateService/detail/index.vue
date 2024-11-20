<template>
  <PageWrapper :title="title"
               contentBackground>
    <template #subTitle>
      <a-badge status="success" text="在线" />
    </template>
    <template #extra>
      <a-button type="primary" @click="getByServiceId" preIcon="ant-design:sync-outlined">
        刷新
      </a-button>
    </template>

    <template #footer>
      <a-descriptions>
        <a-descriptions-item label="模块">{{ serviceEntry.moduleName }}</a-descriptions-item>
        <a-descriptions-item v-if="serviceEntry.serviceType=='MicroService'" label="服务类型">微服务</a-descriptions-item>
        <a-descriptions-item v-if="serviceEntry.serviceType=='AggregationService'" label="服务类型">聚合服务(中间服务)</a-descriptions-item>
        <a-descriptions-item label="RoutePath">
          {{ serviceEntry.routePath }}
          <a-button type="link"
                    style="vertical-align: top; border-width: 0px; padding: 0 0 10px 10px">查看</a-button>
        </a-descriptions-item>
      </a-descriptions>
      <a-tabs default-active-key="1" @change="handleTabChange">
        <a-tab-pane key="1" tab="元数据" />
      </a-tabs>
    </template>
    <component :is="components.get(compName)" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, defineAsyncComponent, onMounted, unref, ref, markRaw } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Badge, Descriptions, Row, Col, Tabs } from 'ant-design-vue';
  import { CountTo } from '/@/components/CountTo/index';
  import { useRouter, RouterView } from 'vue-router';
  import { useIntermediateServiceStore } from '/@/store/modules/intermediateService';
  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      Row,
      Col,
      [Tabs.name]: Tabs,
      Badge,
      CountTo,
      RouterView,
      Descriptions,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const intermediateServiceStore = useIntermediateServiceStore();
      const router = useRouter();
      const { currentRoute } = router;
      const serviceId = unref(currentRoute).query.id?.valueOf(); 
      const serviceEntry = ref({}); 
      const components = markRaw(new Map<string, any>());
      components.set(
        'metadata',
        defineAsyncComponent(() => import('./metadata.vue')),
      );
      const compName = ref('metadata');
      const actKey = ref('1');
      function handleTabChange(activeKey) {
        actKey.value = activeKey;
        switch (activeKey) {
          case '1':
            compName.value = 'metadata';
            break;
        }
      }
      async function getByServiceId() {
        var response = await intermediateServiceStore.getbyserviceidApi({
          serviceId: unref(serviceId),
        });
        serviceEntry.value = response.result;
      }

      onMounted(async () => {
        await getByServiceId();
      });

      return {
        serviceEntry,
        getByServiceId,
        handleTabChange,
        router, 
        components,
        title: "服务Id:" + serviceId,
        actKey,
        compName,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .vben-page-wrapper-content {
    margin: 10px;
  }

  ::v-deep .vben-page-wrapper-content {
    min-height: 632px; /* 设置最小高度 */
  }
</style>
