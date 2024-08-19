<template>
  <PageWrapper class="high-form">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              tooltip: '编辑注册中心',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              onClick: handleDelete.bind(null, record),
              tooltip: '删除此注册中心',
              popConfirm: {
                title: '是否删除此注册中心',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button type="primary" preIcon="mdi:plus" @click="showAddModal"> 新建 </a-button>
      </template>
    </BasicTable>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig, getBasicData } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useRegistryCenterStore } from '/@/store/modules/registrycenter';
  import { useModal } from '/@/components/Modal';
  import EditInfo from './components/edit.vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo },
    setup() {
      const registryCenterStore = useRegistryCenterStore();
      const striped = ref(false);
      const canResize = ref(true);
      const JsonData = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const pagination = ref<any>(true);
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
      const [registerModal, { openModal }] = useModal();
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getBasicColumns(),
        canResize: canResize,
        useSearchForm: false,
        formConfig: getFormConfig(),
        striped: striped,
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          GetPage();
        },
        showIndexColumn: false,
        pagination: pagination,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const confirm = (e) => {
        console.log(e);
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 3000);
        });
      };
      function handle() {
        methods.setPagination(paginationProp.value);
      }

      function GetPage() {
        registryCenterStore
          .getaggregationpageasyncApi({
            query: {
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            console.log(response.result);
            JsonData.value = response.result.items;
            total.value = response.result.Total;
            handle();
          });
      }
      const cancel = (e) => {
        console.log(e);
      };
      const showAddModal = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      function handleAddGateway(record: Recordable) {
        openModal(true, {
          isUpdate: false,
          parentId: record.CategoryId,
        });
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      async function handleModalSuccess() {
        await GetPage();
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      onMounted(async () => {
        await GetPage();
      });
      return {
        confirm,
        registerModal,
        cancel,
        showAddModal,
        handleAddGateway,
        handleModalSuccess,
        registerTable,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
  }

  ::v-deep .ant-table-wrapper .vben-basic-table-header__toolbar {
    justify-content: normal;
  }

  ::v-deep .vben-page-wrapper-content .vben-basic-table-form-container {
    padding: 0px;
  }

  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 16px;
  }

  ::v-deep .ant-table .ant-btn-link {
    color: #1890ff;
  }
</style>
