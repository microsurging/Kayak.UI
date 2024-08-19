<template>
  <PageWrapper title="产品:surging测试" contentBackground>
    <template #subTitle>
      <a-badge status="success" text="已发布" />
      <a-button type="link">停用</a-button>
    </template>
    <template #extra>
      <a-button type="primary" preIcon="ant-design:sync-outlined"> 应用配置 </a-button>
    </template>

    <template #footer>
      <a-descriptions>
        <a-descriptions-item label="设备数量"
          ><div style="margin-top: -5px"
            ><CountTo :startVal="1" :endVal="999" style="padding-left: 5px" />
            <a-button type="link">查看</a-button></div
          ></a-descriptions-item
        >
      </a-descriptions>

      <a-tabs default-active-key="1" @change="handleTabChange">
        <a-tab-pane key="1" tab="产品信息" />
        <a-tab-pane key="2" tab="物模型" />
      </a-tabs>
    </template>
    <component :is="components.get(compName)" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref, markRaw } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Badge, Descriptions, Row, Col, Tabs } from 'ant-design-vue';
  import { CountTo } from '/@/components/CountTo/index';

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
      components.set(
        'productinfo',
        defineAsyncComponent(() => import('./productinfo.vue')),
      );
      components.set(
        'objectmodel',
        defineAsyncComponent(() => import('./objectmodel.vue')),
      );
      const compName = ref('productinfo');

      function handleTabChange(activeKey) {
        switch (activeKey) {
          case '1':
            compName.value = 'productinfo';
            break;
          case '2':
            compName.value = 'objectmodel';
            break;
        }
      }
      return {
        handleTabChange,
        components,
        compName,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .vben-collapse-container__header {
    border-width: 0px;
    ::v-deep .vben-collapse-container__heade .vben-basic-title-normal {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      font-size: 16px;
    }
  }
</style>
