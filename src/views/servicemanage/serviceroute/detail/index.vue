<template>
  <PageWrapper
    title="服务Id:Surging.IModuleServices.Common.IUserService.GetUser_user"
    contentBackground
  >
    <template #subTitle>
      <a-badge status="success" text="在线" />
    </template>
    <template #extra>
      <a-button type="primary" @click="getServiceDescriptor" preIcon="ant-design:sync-outlined">
        刷新
      </a-button>
    </template>

    <template #footer>
      <a-descriptions>
        <a-descriptions-item label="注册中心">{{ regCenterName }}</a-descriptions-item>
        <a-descriptions-item label="Token">{{ serviceDescriptor.token }}</a-descriptions-item>
        <a-descriptions-item label="RoutePath"
          >{{ serviceDescriptor.routePath }}
          <a-button
            type="link"
            style="vertical-align: top; border-width: 0px; padding: 0 0 10px 10px"
            >查看</a-button
          ></a-descriptions-item
        >
      </a-descriptions>
      <a-tabs default-active-key="1" @change="handleTabChange">
        <a-tab-pane key="1" tab="元数据" />
        <a-tab-pane key="2" tab="服务节点" />
        <a-tab-pane key="3" tab="服务规则" />
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
  import { useServiceRouteStore } from '/@/store/modules/serviceroute';
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
      const serviceRouteStore = useServiceRouteStore();
      const router = useRouter();
      const { currentRoute } = router;
      const regCenterName = unref(currentRoute).query.regCenterName;

      const serviceId = unref(currentRoute).query.id;
      const serviceDescriptor = ref({});
      const regCenterT = unref(currentRoute).query.regCenterT;
      const components = markRaw(new Map<string, any>());
      components.set(
        'metadata',
        defineAsyncComponent(() => import('./metadata.vue')),
      );
      components.set(
        'servicenode',
        defineAsyncComponent(() => import('./servicenode.vue')),
      );
      components.set(
        'servicecommand',
        defineAsyncComponent(() => import('./servicecommand.vue')),
      );
      const compName = ref('metadata');
      const actKey = ref('1');
      function handleTabChange(activeKey) {
        actKey.value = activeKey;
        switch (activeKey) {
          case '1':
            compName.value = 'metadata';
            break;
          case '2':
            compName.value = 'servicenode';
            break;
          case '3':
            compName.value = 'servicecommand';
            break;
        }
      }
      async function getServiceDescriptor() {
        var response = await serviceRouteStore.getservicedescriptorApi({
          registryCenterType: unref(regCenterT),

          serviceId: unref(serviceId),
        });
        serviceDescriptor.value = response.result;
      }

      onMounted(async () => {
        await getServiceDescriptor();
      });

      return {
        serviceDescriptor,
        getServiceDescriptor,
        handleTabChange,
        router,
        regCenterName,
        components,
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
</style>
