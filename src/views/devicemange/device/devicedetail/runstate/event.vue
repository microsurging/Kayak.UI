<template>
  <a-card :bordered="false" class="ant-pro-components-tag-select">
    <a-form>
      <a-row :gutter="16">

        <a-col :span="2" style="text-align: left">
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
            <a-button @click="reset">重置</a-button>
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
            tooltip: '删除此信息',
            popConfirm: {
              title: '是否删除此信息',
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
  import { BasicTable,BasicColumn, useTable, TableAction } from '/@/components/Table';
  import { FormInstance, Row, Col, DatePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { useEventParameterStore } from '/@/store/modules/eventparameter'; 

  import { useDeviceEventStore } from '/@/store/modules/deviceEvent'; 
  export default defineComponent({
    props: ["tabkey","tabcode"],
    components: { BasicTable, PageWrapper, DatePicker, TableAction, Row, Col },
    setup(prop) {
     async function getAlarmColumns(): BasicColumn[] {
           let result:BasicColumn[]=[];
        var response=await eventParameterStore.getbyeventidApi({
          eventId:prop.tabkey
        });
        var data= response.Result;
        for(var i=0;i<data.length;i++)
        {
          result.push({
              title: data[i].Name,
              dataIndex: data[i].Code,
          });
        }
        return result;
        }

      const column=ref<BasicColumn[]>([]);
      const formRef = ref<FormInstance>();
      const deviceEventStore = useDeviceEventStore();
      const eventParameterStore = useEventParameterStore();
      const striped = ref(false);
      const canResize = ref(true);
      const startTime = ref(null);
      const endTime = ref(null);
      const JsonData = ref<any>([]); 
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
        columns:column,
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
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      function handle() {
        methods.setPagination(paginationProp.value);
      }
      const getPage = function () {
        JsonData.value = [];
        deviceEventStore.getpageasyncApi({
          query: { 
              deviceId: deviceId,
            eventId: prop.tabcode, 
            beginDate: unref(startTime),
            endDate: unref(endTime),
              page: page.value,
              pageSize: pageSize.value,
            },
        }).then((response) => {
          var items = response.Result.Items;
          for (var i = 0; i < items.length; i++) {
            var dynamicDictionary = {};
            var eventOutParams = items[i].EventOutParams.split("|");

            var eventOutParamValues = items[i].EventOutParamValues.split("|");
            for (var j = 0; j < eventOutParams.length;j++)
              dynamicDictionary = { ...dynamicDictionary, [eventOutParams[j]]: eventOutParamValues[j] };
            dynamicDictionary.Id = items[i].Id;
            JsonData.value.push(dynamicDictionary);
          }
           
          total.value = response.Result.Total;
          handle();
        }); 
      }
      function handleDelete(record: Recordable) {
        var ids = [];
        ids.push(record.Id);
        deviceEventStore.deletebyIdApi({
          ids: ids,
        })
          .then((response) => {
            getPage();
          });
      }

      function reset() {
        startTime.value = null;
        endTime.value = null;
      }
      const inputText = ref('');
      onMounted(async () => {
        column.value=await getAlarmColumns();

       console.log(column.value);
        await getPage();
      });
      return {
        prefixCls: 'list-card',
        inputText,
        startTime,
        endTime,
        formRef,
        reset,
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
