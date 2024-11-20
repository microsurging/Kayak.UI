<template> 
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="[
          
            {
              label: '删除',
              tooltip: '删除此属性',
              popConfirm: {
                title: '是否删除此属性',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]" />
      </template>
      </BasicTable> 
      </template>
      <script lang="ts">
  import { defineComponent, ref,onBeforeUnmount, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAttributeColumns } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { usereportPropertyStore } from '/@/store/modules/reportProperty';
  import emitter from '/@/utils/eventbus';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    components: { BasicTable, PageWrapper, TableAction },
    setup() {
      const striped = ref(false);
      const canResize = ref(false);
      const pagination = ref<any>(true); 
      const reportPropertyStore = usereportPropertyStore();
      const router = useRouter();
      const { currentRoute } = router;
      const deviceId = unref(currentRoute).query.code?.valueOf();
      const JsonData = ref([]);
      const page: any = ref(1);
      const pageSize: any = ref(6); 
      const total: any = ref(null);
       const beginDate: any = ref("");
      const endDate: any = ref("");
      const propertyId: any = ref("");
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
        showSizeChanger:false
      });
      emitter.on('runstateselectChanged', (value: string) => {
      beginDate.value = value.beginTime;
    endDate.value = value.overTime;
    propertyId.value = value.propertyId;
      getPage();
  });
  onBeforeUnmount(() => {
    emitter.off('runstateselectChanged', (v: string) => {}); //关闭
  });
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getAttributeColumns(),
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          getPage();
        },
        canResize: canResize,
        useSearchForm: false, 
        striped: striped,
        showIndexColumn: false,
        pagination: pagination,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });


      function getPage() {
        reportPropertyStore
          .getreportpropertypageasync({
            query: { 
              deviceId: deviceId,
              propertyId: unref(propertyId),
              beginDate:unref(beginDate),
              endDate:unref(endDate),
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
      function handle() {
        methods.setPagination(paginationProp.value);
      }
      function handleDelete(record: Recordable) {
        var ids = [];
        ids.push(record.id);
        reportPropertyStore
          .deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
             getPage();
          });
      }
      
      return {
        confirm, 
        getPage,
        registerTable,
        handleDelete,
      };
    },
  });
      </script>

      <style lang="less" scoped>
        ::v-deep .ant-tag {
          margin-right: 8px;
        }

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
