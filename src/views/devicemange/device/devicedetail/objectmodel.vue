<template>
  <div class="m-4 desc-wrap">
    <a-tabs default-active-key="1" @change="handleTabChange" type="card">
      <a-tab-pane key="1" tab="属性定义" />
      <a-tab-pane key="2" tab="功能定义" />
      <a-tab-pane key="3" tab="事件定义" />
      <template #rightExtra>
        <a-space>
          <a-button @click="showImportModel">快速导入</a-button>
          <a-button type="primary" @click="showSeeModel"> 物模型TSL </a-button>
        </a-space>
      </template>
    </a-tabs>
    <component :is="components.get(compName)" />
    <ImportObjectModel @register="registerModal" @success="handleModalSuccess" :minHeight="220" />
    <SeeObjectModel @register="registerModal1" :minHeight="220" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, defineAsyncComponent, ref, markRaw } from 'vue';
  import { Descriptions, Tabs, Space } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import ImportObjectModel from '/@/views/devicemange/product/components/importobjectmodel.vue';
  import SeeObjectModel from '/@/views/devicemange/product/components/seeobjectmodel.vue';
  export default defineComponent({
    components: {
      [Tabs.name]: Tabs,
      Space,
      ImportObjectModel,
      SeeObjectModel,
      Descriptions,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const components = markRaw(new Map<string, any>());
      const [registerModal, { openModal }] = useModal();
      const [registerModal1, { openModal: openModal1 }] = useModal();
      components.set(
        'attribute',
        defineAsyncComponent(() => import('./attribute.vue')),
      );
      components.set(
        'function',
        defineAsyncComponent(() => import('./function.vue')),
      );
      components.set(
        'event',
        defineAsyncComponent(() => import('./event.vue')),
      );
      const compName = ref('attribute');

      function handleTabChange(activeKey) {
        switch (activeKey) {
          case '1':
            compName.value = 'attribute';
            break;
          case '2':
            compName.value = 'function';
            break;
          case '3':
            compName.value = 'event';
            break;
        }
      }
      const showImportModel = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      const showSeeModel = () => {
        openModal1(true, {
          isUpdate: false,
        });
      };
      function handleModalSuccess() {}
      return {
        handleTabChange,
        components,
        showSeeModel,
        compName,
        showImportModel,
        handleModalSuccess,
        registerModal,
        registerModal1,
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
