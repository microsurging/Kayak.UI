<template>
  <div class="m-4 desc-wrap">
    <BasicTable @register="registerTable" title="服务节点">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              tooltip: '编辑注册中心',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              onClick: handleDelete.bind(null, record),
              tooltip: '删除此注册中心',
              popConfirm: {
                title: '是否删除此注册中心',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref, onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getServiceNodeColumns,
  } from '/@/views/servicemanage/serviceroute/data';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useServiceRouteStore } from '/@/store/modules/serviceroute';
  import { useModal } from '/@/components/Modal';
  import EditInfo from '/@/views/servicemanage/serviceroute/components/editservicenode.vue';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction, EditInfo },
    setup() {
      const router = useRouter();
      const serviceRouteStore = useServiceRouteStore();
      const { currentRoute } = router;

      const serviceId = unref(currentRoute).query.id;
      const regCenterT = unref(currentRoute).query.regCenterT;
      const JsonData = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
      async function GetPage() {
        serviceRouteStore
          .getaddressesApi({
            query: {
              registryCenterType: unref(regCenterT),
              serviceId: unref(serviceId),
              page: page.value,
              pageSize: pageSize.value,
            },
          })
          .then((response) => {
            console.log(response.result);
            for (var i = 0; i < response.result.items.length; i++) {
              var model = response.result.items[i].address;
              model.isHealth = response.result.items[i].isHealth;
              JsonData.value.push(model);
            }
            total.value = response.result.total;
            handle();
          });
      }
      const striped = ref(false);
      const canResize = ref(true);
      const pagination = ref<any>(true);
      const [registerModal, { openModal }] = useModal();
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getServiceNodeColumns(),
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;
          handle();
          GetPage();
        },
        canResize: canResize,
        resizeHeightOffset: 20,
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

      function handle() {
        methods.setPagination(paginationProp.value);
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          parentId: unref(serviceId),
          regCenterT: unref(regCenterT),
        });
      }
      async function handleModalSuccess() {
        await GetPage();
      }
      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }
      onMounted(async () => {
        await GetPage();
      });
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
  ::v-deep .vben-basic-table .vben-basic-table-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
  }

  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 0px;
  }
</style>
