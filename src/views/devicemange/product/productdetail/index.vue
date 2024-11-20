<template>
  <div class="full-height">
    <PageWrapper :title="title" contentBackground>
      <template #subTitle>
        <a-badge status="success" text="已发布" />
        <a-button type="link">停用</a-button>
      </template>
      <template #extra>
        <a-button type="primary" preIcon="ant-design:sync-outlined"> 应用配置 </a-button>
      </template>

      <template #footer>
        <a-descriptions>
          <a-descriptions-item label="设备数量">
            <div style="margin-top: -5px">
              <CountTo :startVal="0" :endVal="deviceCount" style="padding-left: 5px" />
              <a-button type="link">查看</a-button>
            </div>
          </a-descriptions-item>
        </a-descriptions>

        <a-tabs default-active-key="1" @change="handleTabChange">
          <a-tab-pane key="1" tab="产品信息" />
          <a-tab-pane key="2" tab="物模型" />
          <a-tab-pane key="3" tab="设备接入" />
          <a-tab-pane key="4" tab="超临界数据" />
        </a-tabs>
      </template>
      <component :is="components.get(compName)" />
    </PageWrapper>
    </div>
</template>
<script lang="ts">
  import { defineComponent, defineAsyncComponent, onBeforeUnmount, ref, unref, markRaw } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Badge, Descriptions, Row, Col, Tabs } from 'ant-design-vue';
  import { CountTo } from '/@/components/CountTo/index';
  import { useRouter } from 'vue-router';
  import emitter from '/@/utils/eventbus';
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
      const productName = unref(currentRoute).query.productName;
      const deviceCount = Number(unref(currentRoute).query.deviceCount);
     
      components.set(
        'productinfo',
        defineAsyncComponent(() => import('./productinfo.vue')),
      );
      components.set(
        'objectmodel',
        defineAsyncComponent(() => import('./objectmodel.vue')),
      );
      components.set(
        'emptyDeviceAccess',
        defineAsyncComponent(() => import('./emptyDeviceAccess.vue')),
      );
      components.set(
        'deviceaccess',
        defineAsyncComponent(() => import('./deviceaccess.vue')),
      );

      components.set(
        'supercriticaldata',
        defineAsyncComponent(() => import('./supercriticaldata/index.vue')),
      );
      const compName = ref<string|null>('productinfo');

      function handleTabChange(activeKey) {
        switch (activeKey) {
          case '1':
            compName.value = 'productinfo';
            break;
          case '2':
            compName.value = 'objectmodel';
            break;
          case '3':
            compName.value = 'deviceaccess';
            break;
          case '4':
            compName.value = 'supercriticaldata';
            break;
        }
      }
      emitter.on('editChange', (value: string | null) => {
        compName.value = value
      });
      onBeforeUnmount(() => {
        emitter.off('editChange', (v: string | null) => { }); //关闭
      });
      return {
        handleTabChange,
        components,
        compName,
        title: "产品:" + productName,
        deviceCount
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
 
  ::v-deep .vben-collapse-container__header {
    border-width: 0px;
    ::v-deep .vben-collapse-container__heade .vben-basic-title-normal {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      font-size: 16px;
    }
  }
</style>
