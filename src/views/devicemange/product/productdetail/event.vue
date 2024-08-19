<template>
  <div class="m-4 desc-wrap">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              tooltip: '编辑注册中心',
              onClick: handleEdit.bind(null, record),
              auth: 'super', // 根据权限控制是否显示: 无权限，不显示
            },
            {
              label: '删除',
              onClick: handleDelete.bind(null, record),
              tooltip: '删除此注册中心',
              auth: 'super', // 根据权限控制是否显示: 有权限，会显示
              popConfirm: {
                title: '是否删除此注册中心',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button type="primary" preIcon="mdi:plus"> 新增 </a-button>
      </template>
    </BasicTable>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getEventColumns, getEventData } from '/@/views/devicemange/product/data';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { Space } from 'ant-design-vue';
  import EditInfo from '/@/views/servicemanage/serviceroute/components/editservicenode.vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo, Space },
    setup() {
      const striped = ref(false);
      const canResize = ref(false);
      const pagination = ref<any>(true);
      const [registerModal, { openModal }] = useModal();
      const [registerTable] = useTable({
        dataSource: getEventData(),
        columns: getEventColumns(),
        canResize: canResize,
        useSearchForm: false,
        striped: striped,
        showIndexColumn: false,
        pagination: pagination,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

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
        handleModalSuccess,
        registerTable,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .ant-table-wrapper .vben-basic-table-header__toolbar {
    justify-content: normal;
  }

  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 0px;
  }
</style>
