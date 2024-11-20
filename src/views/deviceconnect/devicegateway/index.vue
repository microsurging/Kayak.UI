<template>
  <PageWrapper class="high-form">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form layout="inline">
        <a-row block>
          <a-col :lg="8" :md="10" :sm="2" :xs="12">
            <a-form-item :wrapper-col="{ sm: { span: 12 }, xs: { span: 12 } }" label="网关名称">
              <a-input v-model:value="inputText" placeholder="请输入" style="width: 200px" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="[
            {
               icon: 'clarity:note-edit-line',
             label: t('routes.deviceconnect.edit'),
              onClick: handleEdit.bind(null, record),
            },
             {
   icon: record.status == 1 ?'ant-design:stop-outlined': 'ant-design:reload-outlined',
   label:   record.status == 1 ? t('routes.deviceconnect.stop') : t('routes.deviceconnect.open') ,
   popConfirm: {
     title:  record.status == 1 ?t('routes.deviceconnect.c-stop'): t('routes.deviceconnect.w-open'),
     confirm:  record.status == 1
  ? handleStop.bind(null, record)
  : handleOpen.bind(null, record),
   },
 }, 
 {
   label: t('routes.deviceconnect.delete'),
   popConfirm: {
     title: '是否删除“' + record.name + '”网关',
     confirm: handleDeleteById.bind(null, record),
   },
   icon: 'ant-design:delete-outlined',
 },
          ]" />
      </template>
      <template #toolbar>
        <a-button type="primary" preIcon="mdi:plus" @click="showAddModal"> 新建 </a-button>
      </template>
    </BasicTable>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="480" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent,onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns} from './data';
  import { PageWrapper } from '/@/components/Page';
    import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import { FormProps } from '/@/components/Table'; 
  import EditInfo from './components/edit.vue';
  import { useDeviceGatewayStore } from '/@/store/modules/devicegateway';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo },
    setup() {
            const { t } = useI18n();
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const deviceGatewayStore= useDeviceGatewayStore();
      const [registerModal, { openModal }] = useModal();
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

        getPage();
      }
      async function handleSubmit(e?: Event): Promise<void> {
        page.value = 1;

        getPage();
      }

      function getPage() {
        deviceGatewayStore
          .getPageAsync({
            query: {
              name: inputText.value,
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

      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getBasicColumns(),
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          getPage();
        },
        canResize: canResize,
        useSearchForm: true,
        formConfig: getFormConfig(),
        striped: striped,
        pagination: pagination,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
    function handleStop(record: Recordable) {
    var ids = [];
    ids.push(record.id);
    deviceGatewayStore
      .stop_aggApi({
        ids: ids,
      })
      .then((response) => {
        getPage();
      });
  }
  function handleOpen(record: Recordable) {
    var ids = [];
    ids.push(record.id);
    deviceGatewayStore
      .open_aggApi({
        ids: ids,
      })
      .then((response) => {
        getPage();
      });
  }
      function handle() {
        methods.setPagination(paginationProp.value);
      }
      const confirm = (e) => {
        console.log(e);
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 3000);
        });
      };

      const cancel = (e) => {
        console.log(e);
      };
      const showAddModal = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.id);
        deviceGatewayStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            getPage();
          });
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      function handleModalSuccess() {getPage();}
     onMounted(async () => { 
     await getPage();
   });
  
      return {
        t,
        confirm,
        registerModal,
        cancel,
        showAddModal, 
        inputText,
        handleModalSuccess,
        registerTable,
        handleEdit,
        handleOpen,
        handleStop,
        handleDeleteById,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
  }
  ::v-deep .ant-card .ant-card-body {
    padding: 12px;
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
