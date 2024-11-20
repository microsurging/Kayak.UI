<template>
  <div class="m-4 desc-wrap">
    <a-tabs default-active-key="1" tab-position="left" @change="handleTabChange" animated>
        <a-tab-pane v-for="item in tabItems" :key="item.key" :tab="item.value">
          <component  v-if="item.key==tabKey"  :is="components.get(compName)" :tabkey="tabKey" :tabcode="item.code" />

        </a-tab-pane> 
    </a-tabs>
  
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, defineAsyncComponent, unref,ref, markRaw } from 'vue';
  import { Descriptions, Tabs, Space } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import { useEventConfigStore } from '/@/store/modules/eventConfigure';
  export default defineComponent({
    components: {
      [Tabs.name]: Tabs,
      Space,
      Descriptions,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const correlationFrom = "device";
      const tabItems = ref<Array<object>>([{
        key: 1,
        code:"prop",
        value:'属性'
      }])
      const router = useRouter();
      const page: any = ref(1);
      const tabKey = ref<number>(1);
      const pageSize: any = ref(99);
      const { currentRoute } = router;
      const components = markRaw(new Map<string, any>());
      const [registerModal, { openModal }] = useModal();
      const correlationId = unref(currentRoute).query.code?.valueOf();
      const eventConfigStore = useEventConfigStore();
      const [registerModal1, { openModal: openModal1 }] = useModal();
      components.set(
        'reportproperty',
        defineAsyncComponent(() => import('./reportproperty.vue')),
      );
      components.set(
        'event',
        defineAsyncComponent(() => import('./event.vue')),
      );
      const compName = ref('reportproperty');

      function handleTabChange(activeKey) {
        tabKey.value = activeKey;
        console.log(23333);
        switch (activeKey) {
          case 1:
            compName.value = 'reportproperty';
            break;
          default:
            compName.value = 'event';
            break;
        }
      }

      function getPage() {
        eventConfigStore
          .getPageAsync({
            query: {
              correlationId: correlationId ?? 0,
              correlationFrom: correlationFrom,
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            var jsonData = response.Result.Items;
            for (var i = 0; i < jsonData.length;i++)
              tabItems.value.push({
                key: jsonData[i].Id,
                code: jsonData[i].EventId,
                value: jsonData[i].EventName
            })
           
          });
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
      onMounted(async () => {
        await getPage();
      });
      function handleModalSuccess() {}
      return {
        handleTabChange,
        components,
        tabKey,
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
    ::v-deep .vben-collapse-container__heade .vben-basic-title-normal {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      font-size: 16px;
    }
  }
</style>
