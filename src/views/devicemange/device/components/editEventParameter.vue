<template>
  <BasicModal width="780px"
              :canFullscreen="false"
              v-bind="$attrs"
              @register="registerModal"
              :title="getTitle"
              :showCancelBtn="true" 
              @ok="handleSubmit"
              :showOkBtn="true">
    <template v-if="!loading">
      <BasicTable @register="registerTable">
        <template #action="{ record,index }">
          <TableAction :actions="[ 
            {
              label: '删除',
              tooltip: '删除此指标',
              popConfirm: {
                title: '是否删除此指标',
                confirm: handleDelete.bind(null, record),
              },
            },
              {
                label: '添加',
                tooltip: '添加参数',
                ifShow:({ values}) =>index ==jsonData.length-1,
                onClick: handleAddItem.bind(null, record),
              },
          ]" />
        </template>
      </BasicTable>
    </template>
  </BasicModal>
</template>
<script lang="ts"> 
  import { defineComponent, ref,h, computed, unref } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table'; 
  import { BasicModal, useModalInner } from '/@/components/Modal';    
  import { Input, Select } from 'ant-design-vue';
  import { useEventParameterStore } from '/@/store/modules/eventparameter'; 
  export default defineComponent({
    components: {
      BasicModal,
      BasicTable,
      TableAction
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      function getThresholdColumns(): BasicColumn[] {
        return [
          {
            title: '参数标识',
            dataIndex: 'Code',
            editable: true,
            sorter: true,
            width: 120,
            customRender: ({ text, record }) => {
              return h(Input, { value: text, onChange: e => handleSave({ ...record, Code: e.target.value }) }, () => text);

            },

          },
          {

            title: '参数名称',
            dataIndex: 'Name',
            editable: true,
            sorter: true,
            width: 120,
            customRender: ({ text, record }) => {
              return h(Input, { value: text,  onChange: e => handleSave({ ...record, Name: e.target.value }) }, () => text);

            },

          }, 
            {
            title: '数据类型',
            dataIndex: 'DataTypeValue',
            width: 150,
            customRender: ({ text, record }) => {
              var children: any = [];
              children.push(h(Select.Option, { value: 'int' }, () => 'int(整型)'))
              children.push(h(Select.Option, { value: 'long' }, () => 'long(长整型)'))
              children.push(h(Select.Option, { value: 'float' }, () => 'float(浮点)'))
              children.push(h(Select.Option, { value: 'double' }, () => 'double(双精度)'))
              children.push(h(Select.Option, { value: 'text' }, () => 'text(文本)'))
              children.push(h(Select.Option, { value: 'bool' }, () => 'bool(布尔)'))
              children.push(h(Select.Option, { value: 'date' }, () => 'date(日期)'))
              children.push(h(Select.Option, { value: 'datetime' }, () => 'datetime(日期时间)'))
              return h(Select, { style: 'width:120px', value: text, onChange: e => handleSave({ ...record, DataTypeValue: e }) }, () => children);

            },
          }
        ]
      }
      const eventParameterStore = useEventParameterStore();
      const striped = ref(true);
      const canResize = ref(false);
      const eventId = ref<number | null>(null);
      const pagination = ref<any>(false);
      const deviceCode = ref<string | null>(null);
      const eventCode = ref<string | null>(null);
      const productCode = ref<string | null>(null);
      const loading = ref(false); 
      const isUpdate = ref(true);
      const page: any = ref(1);
      const jsonData = ref([{
        "key": 7889990,
        EventId: unref(eventId),
        ProductCode: unref(productCode),
        DeviceCode: unref(deviceCode),
        EventCode: unref(eventCode),
        Code:"",
        Name: "",
        Constraint: null,
        DataTypeValue: null,
      }]);
      const total: any = ref(null);
      const pageSize: any = ref(6); 
      const paginationProp = ref({
        pageSize: pageSize,
        current: page,
        total,
        showSizeChanger: false
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(
        async (data) => {
          setModalProps({ confirmLoading: false });
          eventId.value = data?.record?.Id;
          eventCode.value = data?.record?.EventId;
          productCode.value = data?.productCode; 
          deviceCode.value = data?.deviceCode;
          console.log(data?.record);
          jsonData.value = [{
            "key": 7889990,
            EventId: unref(eventId),
            ProductCode: unref(productCode),
            DeviceCode: unref(deviceCode),
            EventCode: unref(eventCode),
            Code: "",
            Name: "",
            Constraint: null,
            DataTypeValue: null,
          }];
          getList(); 
          isUpdate.value = !!data?.isUpdate;
       if (unref(isUpdate)) {

       }
     },
   );
      const [registerTable, methods] = useTable({
        dataSource: jsonData,
        columns: getThresholdColumns(), 
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

      function edit(callback: Function) {
        eventParameterStore
          .editApi({
            key: [eventCode.value, productCode.value, deviceCode.value].join("_"),
            list: jsonData.value
          })
          .then((data) => {
            callback(data);
          });
      }

      function getList() {
        eventParameterStore
          .getbyeventidApi({
            eventId: eventId.value,
          })
          .then((data) => {
            if (data.Result != null && data.Result.length > 0)
              jsonData.value = data.Result;
          });
      }
      function handle() {
        methods.setPagination(paginationProp.value);
      }
      function handleDelete(record: Recordable) {
        const data = jsonData.value.filter(item => (item.key!=null && item.key !== record.key)  || item.Id != record.Id);
        jsonData.value = data;
        console.log(jsonData.value);
      }
      const handleSave = row => {
        console.log(row);
        const newData = [...jsonData.value];
        const index = newData.findIndex(item => (item.key != null && item.key === row.key) || (item.Id!=null &&  item.Id === row.Id));
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        jsonData.value =  newData;
        console.log(jsonData.value);
      };
      function handleAddItem(record: Recordable) {
        var key = (1 + Math.random()) * 0x10000 
        jsonData.value.push({
          "key": key,
          EventId: unref(eventId),
          ProductCode: unref(productCode),
          DeviceCode: unref(deviceCode),
          EventCode: unref(eventCode),
          Code: "",
          Name: "",
          Constraint: null,
          DataTypeValue: null,
        }); 
        methods.setTableData(jsonData.value);
      }
      const getTitle = computed(() => '详情');

      async function handleSubmit() {
        try { 

            const callback = (result) => {
              setModalProps({ confirmLoading: false });
              closeModal();
              emit('success', {
                isUpdate: unref(isUpdate),
              });
            };
            if (unref(isUpdate) == false) {
              edit( callback);
            } 
        } finally {
          setModalProps({ confirmLoading: true });
        }
      }
      return {
        registerModal,  
        getTitle,
        loading,
        jsonData,
        handleDelete,
        handleSave,
        handleSubmit,
        registerTable,
        handleAddItem
      };
    },
  });
</script>
