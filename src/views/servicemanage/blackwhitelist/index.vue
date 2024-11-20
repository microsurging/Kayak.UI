<template>
  <PageWrapper class="high-form">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form layout="inline">
        <a-row block>
          <a-col :lg="8" :md="10" :sm="2" :xs="12">
            <a-form-item :wrapper-col="{ sm: { span: 12 }, xs: { span: 12 } }" label="模块代码">
              <a-input v-model:value="inputText" placeholder="请输入模块代码" style="width: 200px" />
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
              icon: record.Status == 1 ?'ant-design:stop-outlined': 'ant-design:reload-outlined',
              label:   record.Status == 1 ? t('routes.servicemanage.disable') : t('routes.servicemanage.enable') ,
              popConfirm: {
                title:  record.Status == 1 ?t('routes.deviceconnect.c-stop'): t('routes.deviceconnect.w-open'),
                confirm:  record.Status == 1
             ? handleDisable.bind(null, record)
             : handleEnable.bind(null, record),
              },
            }, 
            {
              label: t('routes.deviceconnect.delete'),
              popConfirm: {
                title: '是否删除“' + record.RoutePathPattern + '”路由规则',
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
    <EditInfo @register="registerModal" @success="handleModalSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useBlackWhiteListStore } from '/@/store/modules/blackwhitelist';
  import { FormProps } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getBasicColumns } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import EditInfo from './components/edit.vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo },
    setup() {
      const { t } = useI18n();
      const [registerModal, { openModal }] = useModal();
      const blackWhiteListStore = useBlackWhiteListStore();

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
        blackWhiteListStore
          .getPageAsync({
            query: {
              routePathPattern: inputText.value,
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

      const striped = ref(false);
      const canResize = ref(true);
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
        showIndexColumn: false,
        pagination: paginationProp,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handle() {
        methods.setPagination(paginationProp.value);
      }
         const showAddModal = () => {
        openModal(true, {
          isUpdate: false,
        });
      };


  function handleDisable(record: Recordable) {
    var ids = [];
    ids.push(record.Id);
    blackWhiteListStore
      .disableAggApi({
        ids: ids,
      })
      .then((response) => {
        GetPage();
      });
  }
  function handleEnable(record: Recordable) {
    var ids = [];
    ids.push(record.Id);
    blackWhiteListStore
      .enableAggApi({
        ids: ids,
      })
      .then((response) => {
        GetPage();
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

      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.Id);
        blackWhiteListStore
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
        showAddModal,
        registerModal,
        handleDisable,
        handleEnable,
        registerTable,
        handleEdit,
        handleDeleteById,
        handleModalSuccess,
        handleSubmit,
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
