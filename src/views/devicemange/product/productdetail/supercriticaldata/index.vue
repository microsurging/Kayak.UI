<template>
  <div class="m-4 desc-wrap">
    <a-tabs default-active-key="1" tab-position="left" @change="handleTabChange"  animated>
      <a-tab-pane v-for="item in tabItems" :key="item.key" :tab="item.text">
        <component v-if="compName==item.value" :is="components.get(item.value)" />

      </a-tab-pane>
    </a-tabs>

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
      const tabItems = ref<Array<object>>([{
        key: 1,
        value:'alarm',
        text:'告警数据'
      },
        {
          key: 2,
          value:'important',
          text: '超临界数据'
        }])
      const components = markRaw(new Map<string, any>());
      const [registerModal, { openModal }] = useModal();
      const [registerModal1, { openModal: openModal1 }] = useModal();
      components.set(
        'alarm',
        defineAsyncComponent(() => import('./alarm.vue')),
      );
      components.set(
        'important',
        defineAsyncComponent(() => import('./important.vue')),
      );
      const compName = ref('alarm');

      function handleTabChange(activeKey) {
        switch (activeKey) {
          case 1:
            compName.value = 'alarm';
            break;
          default:
            compName.value = 'important';
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
        tabItems,
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
    ::v-deep .vben-collapse-container__heade .vben-basic-title-normal

  {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 700;
    font-size: 16px;
  }
  }
</style>
