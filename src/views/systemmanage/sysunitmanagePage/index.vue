<template>
  <PageWrapper class="high-form">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form>
        <a-row :gutter="24">
          <a-col :span="12" style="text-align: left">
            <a-form-item label="单位名称:" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-input v-model:value="inputText"
                       placeholder="请输入单位名称"
                       style="width: 160px; z-index: 100" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="[
              {
             label: '编辑',
             tooltip: '编辑单位',
             icon: 'clarity:note-edit-line',
             onClick: handleEdit.bind(null, record),
           },
            {
              label: '删除',
              icon: 'ant-design:delete-outlined',
              tooltip: '是否删除“' + record.Name + '”单位',
              popConfirm: {
                title: '是否删除“' + record.Name + '”单位',
                confirm: handleDeleteById.bind(null, record),
              },
            },
          ]" />
      </template>
      <template #toolbar>
        <a-button type="primary" preIcon="mdi:plus" @click="showAddModal"> 新建 </a-button>
      </template> 
    </BasicTable>  
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts">
  import { DatePicker } from 'ant-design-vue';
  import { defineComponent, ref, onMounted, unref } from 'vue';
  import { BasicTable, useTable, FormProps, TableAction } from '/@/components/Table';
  import { useUnitStore } from '/@/store/modules/unit';
  import { getBasicColumns } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import EditInfo from './components/edit.vue';
  import { useModal } from '/@/components/Modal';
 
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, DatePicker,EditInfo },
    setup() {
      const { t } = useI18n();
      const unitStore = useUnitStore();
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
      function getFormConfig(): Partial<FormProps> {
        return {
          labelWidth: 100,
          submitFunc: handleSubmit,
          resetFunc: handleReset,
          schemas: [],
        };
      }

      async function handleReset(e?: Event): Promise<void> {
        inputText.value = '';
        page.value = 1;

        GetPage();
      }
      async function handleSubmit(e?: Event): Promise<void> {
        page.value = 1;

        GetPage();
      }

      function GetPage() {
        unitStore
          .getPageAsync({
            query: {
              name: unref(inputText),
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
       const [registerModal, { openModal }] = useModal();
      const rowKeys = ref([]);
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getBasicColumns(),
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          GetPage();
        },
        canResize: canResize,
        useSearchForm: true,

        formConfig: getFormConfig(),
        striped: striped,
        showIndexColumn: true,
        pagination: pagination,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        rowKey: 'Id',
      });
      function handle() {
        methods.setPagination(paginationProp.value);
      }
       const showAddModal = () => {
    openModal(true, {
      isUpdate: false, 
    });
  };
       function handleEdit(record: Recordable) {
       openModal(true,{
         record,
         isUpdate: true, 
       });
     }
        function handleModalSuccess() {
         GetPage();
      }
      async function handleCheckDelete() {
        await unitStore.deletebyIdApi({
          ids: unref(rowKeys),
        });
        await GetPage();
      }

      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.Id);
        unitStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      onMounted(async () => {
        await GetPage();
      });
      return {
        t,
        inputText,
        confirm,
        handleCheckDelete,
        handleModalSuccess,
        showAddModal,
        handleEdit,
        registerTable,
        registerModal,
        handleDeleteById,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
  }

  ::v-deep .vben-basic-table-form-container .ant-form {
    margin-bottom: 0px;
  }

  ::v-deep .ant-card .ant-card-body {
    padding: 12px 12px 0px 0px;
    float: left;
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
