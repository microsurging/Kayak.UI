<template>
  <div class="m-4 desc-wrap">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="[
            {
              label: '编辑',
              tooltip: '编辑功能',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              tooltip: '删除功能',
              popConfirm: {
                title: '是否删除功能',
                confirm: handleDelete.bind(null, record),
              },
            },
             {
                 label: '配置入参',
                 tooltip: '配置入参',
                 onClick: showInputModal.bind(null, record),
              },
              {
                label: '配置出参',
                tooltip: '配置出参',
                onClick: showOutputModal.bind(null, record),
             },
          ]" />
      </template>
      <template #toolbar>
        <a-button type="primary" preIcon="mdi:plus" @click="showDrawer"> 新增 </a-button>
      </template>
    </BasicTable>
    <EditInfo @register="registerDrawer" @success="handleSuccess" :minHeight="200" />
    <EditFunctionParameter @register="registerModal" :minHeight="300" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getFunctionColumns } from '../data';
  import { PageWrapper } from '/@/components/Page';
  import { useFunctionConfigStore } from '/@/store/modules/functionConfigure';
  import { useDrawer } from '/@/components/Drawer';
  import { Space } from 'ant-design-vue';
  import EditInfo from '../components/editFunction.vue';
  import EditFunctionParameter from '../components/editFunctionParameter.vue';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo, Space, EditFunctionParameter },
    setup() {
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerModal, { openModal }] = useModal();
      const functionConfigStore = useFunctionConfigStore();
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
      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      const showInputModal = (record: Recordable) => {
        openModal(true, {
          record,
          deviceCode: correlationId,
          productCode: productCode,
          parameterType:"input",
          isUpdate: false,
        });
      };
      const showOutputModal = (record: Recordable) => {
        openModal(true, {
          record,
          deviceCode: correlationId,
          productCode: productCode,
          parameterType: "output",
          isUpdate: false,
        });
      };
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getFunctionColumns(),
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
        functionConfigStore
          .getPageAsync({
            query: {
              correlationId: correlationId ?? 0,
              correlationFrom: correlationFrom, 
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            JsonData.value = response.Result.Items;
            total.value = response.Result.Total;
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
        ids.push(record.Id);
        functionConfigStore
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
        showDrawer,
        registerDrawer,
        registerModal,
        inputText,
        getPage,
        handleSuccess,
        showInputModal,
        showOutputModal,
        registerTable,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  
  ::v-deep .ant-table-wrapper .vben-basic-table-header__toolbar {
    justify-content: normal;
  }
   
  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 0px;
  }
</style>
