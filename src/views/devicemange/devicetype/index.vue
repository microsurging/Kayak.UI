<template>
  <div>
    <PageWrapper class="high-form">
      <a-card :bordered="false" class="ant-pro-components-tag-select">
        <a-form class="ant-advanced-search-form" ref="formRef">
          <a-row :gutter="24">
            <a-col v-show="expand || true" :span="8" style="text-align: left">
              <a-form-item label="设备型号标识" :wrapper-col="{ sm: { span: 14 }, xs: { span: 24 } }">
                <a-input v-model:value="code" placeholder="请输入产品标识" />
              </a-form-item>
            </a-col>
            <a-col v-show="expand || true" :span="8" style="text-align: left">
              <a-form-item label="所属品类" :wrapper-col="{ sm: { span: 14 }, xs: { span: 24 } }">
                <a-select style="width: 100%"
                          v-model:value="categoryId"
                          :options="selData"
                          show-search
                          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                          placeholder="请选择"
                          allow-clear />
              </a-form-item>
            </a-col>
            <a-col v-show="expand" :span="8" style="text-align: left">
              <a-form-item label="产品类型" :wrapper-col="{ sm: { span: 14 }, xs: { span: 24 } }">
                <a-select ref="select" v-model:value="deviceType" style="width: 100%" allow-clear>
                  <a-select-option value=1>设备</a-select-option>
                  <a-select-option value=2>网关</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-show="expand || true" :span="8">
              <a-button type="primary" @click="handleClick">查询</a-button>
              <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">重置</a-button>
              <a style="font-size: 12px" @click="expand = !expand">
                <template v-if="expand">
                  收起
                  <UpOutlined />
                </template>
                <template v-else>
                  展开
                  <DownOutlined />
                </template>
              </a>
            </a-col>
          </a-row>
        </a-form>
      </a-card>

    
    </PageWrapper>

    <PageWrapper class="high-form">
      <BasicTable @register="registerTable">
        <template #action="{ record }">
          <TableAction :actions="[
     {
    label: '编辑',
    tooltip: '编辑型号',
    icon: 'clarity:note-edit-line',
    onClick: handleEdit.bind(null, record),
  },
   {
     label: '删除',
     icon: 'ant-design:delete-outlined',
     tooltip: '是否删除“' + record.deviceTypeName + '”型号',
     popConfirm: {
       title: '是否删除“' + record.deviceTypeName + '”型号',
       confirm: handleDeleteById.bind(null, record),
     },
   },
 ]" />
        </template>
        <template #toolbar>
          <a-button type="primary" preIcon="mdi:plus" @click="showAddModal"> 新建 </a-button>
        </template>
      </BasicTable>
      <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="568" />
    </PageWrapper>
  </div>
</template>

<script lang="ts">
  import { DatePicker, SelectProps } from 'ant-design-vue';
  import { defineComponent, ref, onMounted,   } from 'vue';
  import { BasicTable, useTable,   TableAction } from '/@/components/Table';
  import { useDeviceTypeStore } from '/@/store/modules/devicetype';
  import { getBasicColumns } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import EditInfo from './components/edit.vue';
  import { useModal } from '/@/components/Modal';
  import { usePrdCategoryStore } from '/@/store/modules/productcategory';
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, DownOutlined,UpOutlined,TableAction, DatePicker,EditInfo },
    setup() {
      const { t } = useI18n();
      const expand = ref(false);
      const deviceTypeStore = useDeviceTypeStore();
      const productCategoryStore = usePrdCategoryStore();
      const JsonData = ref([]);
      const page: any = ref(1);
      const code = ref("");
      const categoryId = ref<number | null>(null);
      const deviceType = ref<number | null>(null);
      const selData = ref<SelectProps['options']>([]);
      const pageSize: any = ref(10);
      const inputText = ref('');
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
       
      async function handleReset(e?: Event): Promise<void> {
        inputText.value = '';
        page.value = 1;

        GetPage();
      }
      async function handleSubmit(e?: Event): Promise<void> {
        page.value = 1;

        GetPage();
      }
      async function getLastChild() {
        productCategoryStore.getlastchildApi()
          .then((response) => {
            const data: any[] = [];
            response.forEach((r: any) => {
              var obj = {
                value: r.Id,
                label: r.CategoryName,
              };
              data.push(obj);
            });
            selData.value = data;
          });
      }
      function GetPage() {
        deviceTypeStore
          .getAggregationPageAsyncApi({
            query: {
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
       const [registerModal, { openModal }] = useModal(); 
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
        useSearchForm: false, 
        showIndexColumn: false,
        striped: striped, 
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
       const showAddModal = () => {
        openModal(true, {
      isUpdate: false,
    });
  };
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      const handleClick = async () => {
        await GetPage();
      };
        function handleModalSuccess() {
         GetPage();
      }
  

      function handleDeleteById(record: Recordable) {
        var ids = [];
        ids.push(record.id);
        deviceTypeStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      onMounted(async () => {
        await GetPage();
        await getLastChild();
      });
      return {
        t,
        inputText,
        confirm, 
        handleModalSuccess,
        showAddModal,
        handleEdit,
        registerTable,
        registerModal,
        handleDeleteById,
        expand,
        code,
        handleClick,
        categoryId,
        deviceType,
        selData
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 16px;
  }
  ::v-deep .ant-table-wrapper .vben-basic-table-header__toolbar {
    justify-content: normal;
  }
  .ant-pro-pages-list-projects-cardList {
    margin-top: 24px;
    ::v-deep .ant-card-meta-title{
    margin-bottom: 4px;
  }

  ::v-deep .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;
    > span

  {
    flex: 1 1;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }

  ::v-deep .ant-pro-avatar-list {
    flex: 0 1 auto;
  }

  }
  }

  .list-card {
    &__link

  {
    margin-top: 10px;
    font-size: 14px;
    a

  {
    margin-right: 30px;
  }

  span {
    margin-left: 5px;
  }

  }

  &__content {
    margin-top: 16px;
  }

  &__card {
    width: 100%;
    margin-bottom: -8px;
    .ant-card-body

  {
    padding: 16px;
  }

  &-title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 500;
    color: @text-color;
    .icon

  {
    margin-top: 5px;
    margin-right: 10px;
    font-size: 38px !important;
  }

  }

  &-detail {
    padding-top: 10px;
    padding-left: 30px;
    font-size: 14px;
    color: @text-color-secondary;
  }

  }
  }

  .ant-card-actions {
    background: #f7f9fa;
    li

  {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;
    &:not(:last-child)

  {
    border-right: 1px solid #e8e8e8;
  }

  a {
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
    display: inline-block;
    width: 100%;
    &:hover

  {
    color: @primary-color;
  }

  }
  }
  }

  ::v-deep .vben-page-wrapper-content {
    margin: 16px 10px;
  }

  ::v-deep .ant-card-actions .app-iconify svg {
    display: block;
    margin: auto;
  }

  ::v-deep span.iconify {
    min-width: 48px;
    min-height: 48px;
    background: #ccc;
  }

  ::v-deep .ant-col {
    width: auto;
  }

  .new-btn {
    border-radius: 2px;
    width: 100%;
    height: 220px;
    color: rgba(0, 0, 0, 0.45);
  }
</style>
