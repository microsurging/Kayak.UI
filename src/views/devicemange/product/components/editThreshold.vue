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
                tooltip: '添加指标',
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
  import { usePropertyThresholdStore } from '/@/store/modules/propertyThreshold'; 
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
            title: '阈值类型',
            dataIndex: 'ThresholdType',
            width: 150,
            customRender: ({ text, record }) => {
              var children: any = [];
              children.push(h(Select.Option, { text: '>', value: '>' }))
              children.push(h(Select.Option, { text: '=', value: '=' }))
              children.push(h(Select.Option, { text: '<', value: '<' }))
              children.push(h(Select.Option, { text: 'between', value: 'between' }))
              return h(Select, { style: 'width:120px', value: text, onChange: e => handleSave({ ...record, ThresholdType: e }) }, () => children);

            },
          },
          {

            title: '指标阈值',
            dataIndex: 'ThresholdValue',
            helpMessage:"当阈值类型为'between'时,指标阈值应该为*,*比如29,22",
            editable: true,
            sorter: true,
            width: 120,
            customRender: ({ text, record }) => {
              return h(Input, { value: text, defaultValue:0, onChange: e => handleSave({ ...record, ThresholdValue: e.target.value }) }, () => text);

            },

          },
          {
            title: '级别',
            dataIndex: 'ThresholdLevel',
            width: 150,
            customRender: ({text, record }) => {
              var children: any = [];
              children.push(h(Select.Option, {  value: 'ignore' }, () => '忽略'))
              children.push(h(Select.Option, {  value: 'important' },()=>'重要'))
              children.push(h(Select.Option, { value: 'alarm' },()=>'告警'))
              return h(Select, { style: 'width:120px', value: text, onChange: e => handleSave({ ...record, ThresholdLevel: e }) }, () => children);

            },
          }

        ]
      }
      const propertyThresholdStore = usePropertyThresholdStore();
      const striped = ref(true);
      const canResize = ref(false);
      const propertyId = ref<number | null>(null);
      const propertyCode = ref<number | null>(null);
      const productCode = ref<number | null>(null);
      const pagination = ref<any>(false);
      const loading = ref(false); 
      const isUpdate = ref(true);
      const page: any = ref(1);
      const jsonData = ref([{
        "key": 7889990,
        PropertyId: unref(propertyId),
        ProductCode: unref(productCode),
        PropertyCode: unref(propertyCode),
        "ThresholdValue": null,
        "ThresholdType": "",
        "ThresholdLevel": "",
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
          propertyId.value = data?.record?.id;
          propertyCode.value = data?.record?.propertyId;
          productCode.value = data?.productCode;
          jsonData.value = [{
            "key": 7889990,
            PropertyId: unref(propertyId),
            ProductCode: unref(productCode),
            PropertyCode: unref(propertyCode),
            "ThresholdValue": null,
            "ThresholdType": "",
            "ThresholdLevel": "",
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
        propertyThresholdStore
          .editApi({
            key: [propertyCode.value, productCode.value, ""].join("_"),
            list: jsonData.value
          })
          .then((data) => {
            callback(data);
          });
      }

      function getList() {
        propertyThresholdStore
          .getbypropertyidApi({
            propertyId: propertyId.value,
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
        const index = newData.findIndex(item => (item.key != null && item.key === row.key) || (item.Id!=null && item.Id === row.Id));
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
          PropertyId: unref(propertyId),
          ProductCode: unref(productCode),
          PropertyCode: unref(propertyCode),
          "ThresholdValue": null,
          "ThresholdType": "",
          "ThresholdLevel": ""
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
