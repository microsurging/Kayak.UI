<template>
  <PageWrapper class="high-form">
    <BasicTable @register="register">
      <template #action="{ record }">
        <a-tooltip title="编辑">
          <a-button type="link" @click="handleEdit(record)">编辑</a-button>
        </a-tooltip>
        <a-tooltip title="添加子分类">
          <a-button type="link" @click="handleAddCategory(record)">添加子分类</a-button>
        </a-tooltip>
        <a-popconfirm title="确定删除吗？" @confirm="handleDelete(record)" @cancel="cancel">
          <a-tooltip title="删除">
            <a-button type="link">删除</a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
      <template #toolbar>
        <a-button type="primary" preIcon="mdi:plus" @click="showAddModal"> 新增 </a-button>
      </template>
    </BasicTable>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './data';
  import { usePrdCategoryStore } from '/@/store/modules/productcategory';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import EditInfo from './components/edit.vue';
  export default defineComponent({
    components: { BasicTable, TableAction, EditInfo, PageWrapper },
    setup() {
      const prdCategoryStore = usePrdCategoryStore();
      const striped = ref(false);
      const canResize = ref(true);
      const JsonData = ref([]);
      const level = ref(1);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const inputText = ref('');
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });

      async function GetPage() {
        prdCategoryStore
          .getPageAsync({
            query: {
              level: unref(level),
              name: inputText.value,
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            var items = response.Result.Items;
            items.forEach((item: any) => {
              if (item.IsChildren == true) item.children = [];
            });
            JsonData.value = items;
            total.value = response.Result.Total;
            handle();
          });
      }

      GetPage();

      const [registerModal, { openModal }] = useModal();
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
          parentCode: null,
        });
      };
      function handleAddCategory(record: Recordable) {
        if (record.IsChildren == false) record.children = [];
        openModal(true, {
          isUpdate: false,
          parentCode: record.CategoryId,
        });
      }
      const [register, { expandAll, expandRows, collapseAll, setPagination }] = useTable({
        isTreeTable: true,
        canResize: canResize,
        striped: striped,
        showIndexColumn: false,
        onExpand: async (expanded, record: Recordable) => {
          var categorId = record.CategoryId;
          var level = record.Level;
          var response = await prdCategoryStore.getproductcategorybyconditionApi({
            query: {
              categoryId: categorId,
              level: ++level,
            },
          });
          var items = response.Result;
          record.children = [];
          items.forEach((item: any) => {
            if (item.IsChildren == true) item.children = [];
            record.children.push(item);
          });
          console.log('ex', expanded);
          console.log('re', record);
        },
        titleHelpMessage: '树形组件不能和序列号列同时存在',
        dataSource: JsonData,
        columns: getBasicColumns(),
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          GetPage();
        },
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        rowKey: 'CategoryId',
      });
      function handle() {
        setPagination(paginationProp.value);
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          parentCode: record.CategoryId,
        });
      }
      function handleModalSuccess(data: any) {
        if (data.values.CategoryId.length == 0) GetPage();
      }
      function handleDelete(record: Recordable) {
        var ids = [];
        ids.push(record.Id);
        prdCategoryStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            GetPage();
          });
      }
      return {
        handleEdit,
        handleModalSuccess,
        handleAddCategory,
        handleDelete,
        register,
        showAddModal,
        confirm,
        cancel,
        registerModal,
        expandAll,
        collapseAll,
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
