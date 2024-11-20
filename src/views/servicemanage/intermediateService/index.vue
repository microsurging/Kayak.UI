<template>
  <PageWrapper class="high-form">
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form>
        <a-row :gutter="19">
          <a-col :span="4" style="text-align: left">
            <a-form-item label="RoutePath" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-input v-model:value="inputText"
                       placeholder="请输入routePath"
                       style="width: 160px; z-index: 100" />
            </a-form-item>
          </a-col>
          <a-col :span="7" style="text-align: left">
            <a-form-item label="模块" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-input v-model:value="moduleName"
                       placeholder="请输入模块"
                       style="width: 160px; z-index: 100" />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: left">
            <a-form-item label="服务类型" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
              <a-select v-model:value="serviceType" style="width: 160px">
                <a-select-option value="MicroService">微服务</a-select-option>
                <a-select-option value="AggregationService">聚合服务(中间服务)</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="[
            {
              label: '查看',
              tooltip: '查看详情',
              onClick: handleDetail.bind(null,record),
            },
          ]" />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './data';
  import { FormProps } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useIntermediateServiceStore } from '/@/store/modules/intermediateService';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const intermediateServiceStore = useIntermediateServiceStore();
      const striped = ref(false);
      const canResize = ref(true);
      const JsonData = ref([]);
      const router = useRouter();
      const inputText = ref('');
      const moduleName=ref('');
      const serviceType=ref('');
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const pagination = ref<any>(true);
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
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getBasicColumns(),
        canResize: canResize,
        useSearchForm: true,
        resizeHeightOffset: 20,
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
          width: 80,
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
    const handleDetail = (record: Recordable) => {
     router.push({
       path: '/servicemanage/intermediateService/detail',
       replace: true,
       query: {
         routePath: record.routePath,
         id:record.descriptor.id,
       },
     });
   };
      function handle() {
        methods.setPagination(paginationProp.value);
      }

      function GetPage() {
        intermediateServiceStore
          .getPageAsync({
            query: {
              routePath:inputText.value,
              moduleName:moduleName.value,
              serviceType:serviceType.value,
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            console.log(response.result);
            JsonData.value = response.result.items;
            total.value = response.result.total;
            handle();
          });
      }
      async function handleReset(e?: Event): Promise<void> {
        inputText.value = '';
        serviceType.value = '';
        moduleName.value='';
        page.value = 1;

        GetPage();
      }
      async function handleSubmit(e?: Event): Promise<void> {
        page.value = 1;

        GetPage();
      }
      onMounted(async () => {
        await GetPage();
      });
      return {
        confirm, 
        moduleName,
        inputText,
        serviceType,
        registerTable,
        handleDetail
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
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
