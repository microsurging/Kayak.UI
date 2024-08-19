<template>
  <PageWrapper class="high-form">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form>
        <a-row :gutter="17">
          <a-col :span="5" style="text-align: left">
            <a-form-item label="用户名" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-input
                v-model:value="inputText"
                placeholder="请输入用户名"
                style="width: 160px; z-index: 100"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" style="text-align: left">
            <a-form-item label="性别" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-select v-model:value="sex" style="width: 160px" :options="sexData" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              tooltip: '编辑注册中心',
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              icon: 'ant-design:delete-outlined',
              tooltip: '是否删除“' + record.UserName + '”字典',
              popConfirm: {
                title: '是否删除“' + record.UserName + '”字典',
                confirm: handleDeleteById.bind(null, record),
              },
            },
            {
              label: record.Status == 1 ? '停用' : '启用',
              icon:
                record.Status == 1
                  ? 'ant-design:stop-outlined'
                  : 'ant-design:check-circle-outlined',
              popConfirm: {
                title: record.Status == 1 ? '是否停用' : '是否启用',
                confirm:
                  record.Status == 1
                    ? handleDisable.bind(null, record)
                    : handleEnable.bind(null, record),
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
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, FormProps, TableAction } from '/@/components/Table';
  import { useUserStore } from '/@/store/modules/user';
  import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
  import { getBasicColumns } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import EditInfo from './components/edit.vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo },
    setup() {
      const { t } = useI18n();
      const sysUserManageStore = useUserStore();
      const sysDicManageStore = useSysDicManageStore();
      const JsonData = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const sex: any = ref(null);
      const sexData: any = ref([]);
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

      const handleChange = (value: string) => {
        sex.value = value;
      };

      async function handleReset(e?: Event): Promise<void> {
        inputText.value = '';
        sex.value = null;
        page.value = 1;

        GetPage();
      }
      async function handleSubmit(e?: Event): Promise<void> {
        page.value = 1;

        GetPage();
      }

      function getsysdicbycode() {
        sysDicManageStore
          .getsysdicbyparentcodeApi({
            parentCode: 'sex',
          })
          .then((response) => {
            const data: any[] = [];
            console.log('res', response);
            response.forEach((r: any) => {
              var obj = {
                value: r.Value,
                label: r.Name,
              };
              if (r.Status == 0) obj.disabled = true;
              data.push(obj);
            });
            sexData.value = data;
          });
      }

      function GetPage() {
        sysUserManageStore
          .getpageasyncApi({
            query: {
              userName: inputText.value,
              sex: sex.value,
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

      getsysdicbycode();
      GetPage();
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const [registerModal, { openModal }] = useModal();
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
      });
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
      function handleAddGateway(record: Recordable) {
        openModal(true, {
          isUpdate: false,
          parentId: record.UserId,
        });
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      function handleModalSuccess() {
        GetPage();
      }
      function handleDisable(record: Recordable) {
        var ids = [];
        ids.push(record.UserId);
        sysUserManageStore
          .changedisableApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      function handleEnable(record: Recordable) {
        var ids = [];
        ids.push(record.UserId);
        sysUserManageStore
          .changeenableApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.UserId);
        sysUserManageStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      return {
        t,
        sex,
        inputText,
        confirm,
        registerModal,
        cancel,
        showAddModal,
        handleAddGateway,
        handleModalSuccess,
        registerTable,
        handleEdit,
        handleDisable,
        handleEnable,
        handleDeleteById,
        sexData,
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
