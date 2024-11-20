<template>
  <a-card :bordered="false" class="ant-pro-components-tag-select">
    <a-form>
      <a-row :gutter="24">
        <a-col :span="2" style="text-align: left">
          <a-form-item label="属性名" style="text-align: left" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
            <a-input v-model:value="inputText"
                     placeholder="请输入属性名"
                     style="width: 150px; z-index: 100" />
          </a-form-item>
        </a-col>
        <a-col :span="6" style="text-align: left">
          <a-form-item label="记录时间" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
            <DatePicker v-model:value="startTime"
                        :show-time="{ format: 'HH:mm' }"
                        style="width: 160px; z-index: 100"
                        placeholder="开始时间" />
          </a-form-item>
        </a-col>
        <a-col :span="5" style="text-align: left">
          <a-form-item label="至" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
            <DatePicker v-model:value="endTime"
                        :show-time="{ format: 'HH:mm' }"
                        style="width: 160px; z-index: 100"
                        placeholder="结束时间" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-space>
            <a-button type="primary" @click="getPage">搜索</a-button>
            <a-button>重置</a-button>
            </a-space>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <div :class="`${prefixCls}__content`">

    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction :actions="[

          {
            label: '删除',
            tooltip: '删除此告警信息',
            popConfirm: {
              title: '是否删除此告警信息',
              confirm: handleDelete.bind(null, record),
            },
          },
        ]" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts"> 
  import { defineComponent, unref, onMounted, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { FormInstance, Row, Col, DatePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { getAlarmColumns } from './data';
  import { useRouter } from 'vue-router';
  import { useReportPropertyLogStore } from '/@/store/modules/reportpropertylog';
  export default defineComponent({
    components: { BasicTable, PageWrapper, DatePicker, TableAction, Row, Col },
    setup() {
      const formRef = ref<FormInstance>();
      const reportPropertyLogStore = useReportPropertyLogStore();
      const striped = ref(false);
      const canResize = ref(true);
      const startTime = ref(null);
      const endTime = ref(null);
      const JsonData = ref([]); 
      const router = useRouter();
      const { currentRoute } = router;
      const deviceId = unref(currentRoute).query.code?.valueOf();
      const page: any = ref(1);
      const pageSize: any = ref(10);
      const pagination = ref<any>(true);
      const total: any = ref(null);
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
      });
      const [registerTable, methods] = useTable({
        dataSource: JsonData,
        columns: getAlarmColumns(),
        resizeHeightOffset: 15,
        canResize: canResize,
        useSearchForm: false,
        striped: striped,
        onChange: (pagination) => {
          page.value = pagination.current;
          pageSize.value = pagination.pageSize;

          handle();
          getPage();
        },
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
      const getPage = function () {
        reportPropertyLogStore.getPageAsync({
          query: {
            deviceCode: deviceId,
            propertyName: inputText.value,
            startTime: startTime.value,
            endTime: endTime.value,
            level: 'alarm',
            page: page.value,
            pageSize: pageSize.value,

          },
          global:0
          }).then((response) => {
            JsonData.value = response.result.items;
            total.value = response.result.total;
            handle();
        })
      }
      function handleDelete(record: Recordable) {
        var ids = [];
        ids.push(record.id);
        reportPropertyLogStore.deletebyIdApi({
            ids: ids,
          })
          .then((response) => {
            getPage();
          });
      }
      const inputText = ref('');
      onMounted(async () => {
        await getPage();
      });
      return {
        prefixCls: 'list-card',
        inputText,
        startTime,
        endTime,
        formRef,
        handleDelete,
        getPage,
        registerTable,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .ant-tag {
    margin-right: 8px;
  }

  ::v-deep .vben-basic-table-form-container .ant-form {
    margin-bottom: 0px;
  }
  .ant-form-item{
      margin-bottom:12px;
  }
  ::v-deep .ant-card-body {
    padding: 12px 12px 0px 0px;
    float: left;
    width: 70%;
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
