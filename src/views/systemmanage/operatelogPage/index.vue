<template>
  <PageWrapper class="high-form">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form>
        <a-row :gutter="20">
          <a-col :span="4" style="text-align: left">
            <a-form-item label="RoutePath" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-input
                v-model:value="inputText"
                placeholder="请输入RoutePath"
                style="width: 160px; z-index: 100"
              />
            </a-form-item>
          </a-col>
          <a-col :span="9" style="text-align: left">
            <a-form-item label="记录时间" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <DatePicker
                v-model:value="startTime"
                :show-time="{ format: 'HH:mm' }"
                style="width: 160px; z-index: 100"
                placeholder="开始时间"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7" style="text-align: left">
            <a-form-item label="至" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <DatePicker
                v-model:value="endTime"
                :show-time="{ format: 'HH:mm' }"
                style="width: 160px; z-index: 100"
                placeholder="结束时间"
              />
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
              label: '删除',
              icon: 'ant-design:delete-outlined',
              tooltip: '是否删除“' + record.RoutePath + '”日志',
              popConfirm: {
                title: '是否删除“' + record.RoutePath + '”日志',
                confirm: handleDeleteById.bind(null, record),
              },
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-popconfirm title="确定删除吗？" @confirm="handleCheckDelete()" @cancel="cancel">
          <a-button type="primary" preIcon="ant-design:delete-outlined"> 批量删除 </a-button>
        </a-popconfirm>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { DatePicker } from 'ant-design-vue';
  import { defineComponent, ref, onMounted, unref } from 'vue';
  import { BasicTable, useTable, FormProps, TableAction } from '/@/components/Table';
  import { useOperateLogStore } from '/@/store/modules/operatelog';
  import { getBasicColumns } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, DatePicker },
    setup() {
      const { t } = useI18n();
      const operateLogStore = useOperateLogStore();
      const JsonData = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const startTime: any = ref(null);
      const endTime: any = ref(null);
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

      async function handleReset(e?: Event): Promise<void> {
        inputText.value = '';
        startTime.value = null;
        endTime.value = null;
        page.value = 1;

        GetPage();
      }
      async function handleSubmit(e?: Event): Promise<void> {
        page.value = 1;

        GetPage();
      }

      function GetPage() {
        operateLogStore
          .getPageAsync({
            query: {
              startTime: unref(startTime),
              endTime: unref(endTime),
              routePath: unref(inputText),
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
        rowSelection: {
          onChange: (selectedRowKeys: (string | number)[]) => {
            rowKeys.value = selectedRowKeys;
          },
          type: 'checkbox',
          columnWidth: 60,
          getCheckboxProps() {
            // Demo: 第一行（id为0）的选择框禁用
            return { disabled: false };
          },
        },
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

      function handleModalSuccess() {
        GetPage();
      }
      async function handleCheckDelete() {
        await operateLogStore.deletebyIdApi({
          ids: unref(rowKeys),
        });
        await GetPage();
      }

      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.Id);
        operateLogStore
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
        startTime,
        endTime,
        inputText,
        confirm,
        handleCheckDelete,
        handleModalSuccess,
        registerTable,
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
