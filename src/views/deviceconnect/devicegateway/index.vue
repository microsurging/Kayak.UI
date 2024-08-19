<template>
  <PageWrapper class="high-form">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              auth: 'super', // 根据权限控制是否显示: 无权限，不显示
            },
            {
              label: '暂停',
              onClick: handleAddGateway.bind(null, record),
              tooltip: '暂停此网关',
              auth: 'super', // 根据权限控制是否显示: 有权限，会显示
              popConfirm: {
                title: '是否暂停此网关',
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              label: '停止',
              onClick: handleDelete.bind(null, record),
              tooltip: '删除此网关',
              auth: 'super', // 根据权限控制是否显示: 有权限，会显示
              popConfirm: {
                title: '是否停止此网关',
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
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig, getBasicData } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import EditInfo from './components/edit.vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo },
    setup() {
      const striped = ref(false);
      const canResize = ref(false);
      const pagination = ref<any>(true);
      const [registerModal, { openModal }] = useModal();
      const [registerTable] = useTable({
        dataSource: getBasicData(),
        columns: getBasicColumns(),
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
          parentId: record.CategoryId,
        });
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }
      function handleModalSuccess() {}
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
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
