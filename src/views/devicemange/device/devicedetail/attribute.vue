<template>
  <div class="m-4 desc-wrap">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="[
            {
              label: '编辑',
              tooltip: '编辑属性',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              tooltip: '删除此属性',
              popConfirm: {
                title: '是否删除此属性',
                confirm: handleDelete.bind(null, record),
              },
            },
            {
                label: '配置阈值',
                tooltip: '配置阈值',
                onClick: showModal.bind(null, record),
             },
          ]" />
      </template>
      <template #toolbar>
        <a-input-search placeholder="请输入属性信息" v-model:value="inputText" @change="getPage" style="width: 200px" />

        <div style="width: 100%; text-align: right">
          <a-space>
            <a-button> 导入属性 </a-button>
            <a-button type="primary" preIcon="mdi:plus" @click="showDrawer"> 新增 </a-button>
          </a-space>
        </div>
      </template>
    </BasicTable>
    <EditInfo @register="registerDrawer" @success="handleSuccess" :minHeight="200" />
    <EditThreshold @register="registerModal" :minHeight="300" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAttributeColumns } from '../data';
  import { PageWrapper } from '/@/components/Page';
  import { usepropertyConfigStore } from '/@/store/modules/propertyConfigure';
  import { useDrawer } from '/@/components/Drawer';
  import { Space } from 'ant-design-vue';
  import EditInfo from '../components/editProp.vue';
  import { useModal } from '/@/components/Modal';
  import EditThreshold from '../components/editThreshold.vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: { BasicTable, PageWrapper, EditThreshold,TableAction, EditInfo, Space },
    setup() {
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
      const propertyConfigStore = usepropertyConfigStore();
      const correlationFrom = "device";
      const router = useRouter();
      const { currentRoute } = router;
      const correlationId = unref(currentRoute).query.code?.valueOf();
      const productCode = unref(currentRoute).query.typeCode?.valueOf();
      const JsonData = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10); 
      const inputText = ref('');
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
      const showDrawer = () => {
        openDrawer(true, { 
          correlationId: correlationId,
          correlationFrom: correlationFrom,
          isUpdate: false,
        });
      };
      const showModal = (record: Recordable) => {
        openModal(true, {
          record,
          deviceCode: correlationId,
          productCode: productCode,
          isUpdate: false,
        });
      };
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record, 
          isUpdate: true,
        });
      }
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getAttributeColumns(),
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          getPage();
        },
        canResize: canResize,
        useSearchForm: false,
        striped: striped,
        showIndexColumn: false,
        pagination: pagination,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });


      function getPage() {
        propertyConfigStore
          .getAggregationPageAsyncApi({
            query: {
              correlationId: correlationId ?? 0,
              correlationFrom: correlationFrom,
              inputText: inputText.value, 
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            JsonData.value = response.result.items;
            total.value = response.result.total;
            handle();
          });
      }
      function handle() {
        methods.setPagination(paginationProp.value);
      }
      async function handleSuccess() {
        await getPage(); 
      }
      function handleDelete(record: Recordable) {
        var ids = [];
        ids.push(record.id);
        propertyConfigStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
             getPage();
          });
      }
      onMounted(async () => {
        await getPage(); 
      });
      return {
        confirm,
        registerModal,
        showModal,
        showDrawer,
        registerDrawer,
        inputText,
        getPage,
        handleSuccess,
        registerTable,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .ant-tag {
    margin-right: 8px;
  }
  ::v-deep .vben-basic-table .vben-basic-table-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
  }

  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 0px;
  }
</style>
