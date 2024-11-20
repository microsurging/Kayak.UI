<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"     layout="vertical">
 
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { usepropertyConfigStore } from '/@/store/modules/propertyConfigure';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
  const isShowSign = (dataTypeValue: string) => ['int', 'long'].includes(dataTypeValue); 
  const isShowMaxLen = (dataTypeValue: string) => dataTypeValue === 'text'; 
  const propertyConfigStore = usepropertyConfigStore(); 
  const sysDicManageStore = useSysDicManageStore();
  export const formSchema: FormSchema[] = [
    {
      field: 'propertyId',
      label: '属性标识',
      required: true,
      component: 'Input',
    },
    {
      field: 'propertyName',
      label: '属性名称',
      required: true,
      component: 'Input',
    },
    {
      field: 'dataTypeValue',
      label: '数据类型',
      required: true,
      defaultValue:'int',
      component: 'Select',
      componentProps: {
        options: [
          { label: 'int(整型)', value: "int" },
          { label: 'long(长整型)', value: "long" },
          { label: 'float(浮点)', value: "float" },
          { label: 'double(双精度)', value: "double" },
          { label: 'text(文本)', value: "text" },
          { label: 'bool(布尔)', value: "bool" },
          { label: 'date(日期)', value: "date" },
          { label: 'datetime(日期时间)', value:"datetime"}, 
        ],
      },
    },
    {
      field: 'unitValue',
      label: '单位',
      required: true,
      component: 'ApiSelect',
      componentProps: {
        api: sysDicManageStore.getsysdictionarybyconditionApi,
        params: {
          query: {
            parentCode: 'sysunit',
          },
        },
        fieldNames: {
          label: 'Name',
          value: 'Code',
        },
      },
    }, 
    {
      field: 'sign',
      label: '符号',
      component: 'Select',
      defaultValue:1,
      componentProps: {
        options: [
          { label: '无', value: 1 },
          { label: '有符号', value: 2 },
          { label: '无符号', value: 3 }, 
        ],
      },
      ifShow: ({ values }) => isShowSign(values.dataTypeValue)
    },
    {
      field: 'precision',
      label: '精度',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => values.dataTypeValue === 'float' || values.dataTypeValue === 'double'
    },
    {
      field: 'sourceValue',
      label: '来源',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: '设备', value: "device" },
          { label: '手动', value: "manual" }, 
        ],
      },
    },
    {
      field: 'maxLength',
      label: '最大长度',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => isShowMaxLen(values.dataTypeValue)
    },
    {
      field: 'readWriteType',
      label: '读写类型',
      required: true,
      component: 'Select',
      componentProps: {
        options: [
          { label: '读', value: "read" },
          { label: '写', value: "write" },
          { label: '上报', value: "report" }
        ],
        mode:'multiple'
      },
    },
    {
      label: '描述',
      field: 'remark',
      component: 'InputTextArea',
      componentProps: {
        rows: 5,
      },
    },
  ];
  export default defineComponent({
    name: 'EditInfo',
    components: { BasicDrawer, BasicForm, CodeEditor },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['success', 'register'],
    setup(_, { emit }) { 
      const { t } = useI18n();
      const modeValue = ref<MODE>(MODE.JS);
      const parentId = ref('');
      const isUpdate = ref(true);
      let correlationId: number = 0;
      let correlationFrom: string = '';
      const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({ 
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate; 
        correlationId = data?.correlationId ?? 0; 
        correlationFrom = data?.correlationFrom ?? '';
        console.log(data?.record);
        parentId.value = data?.record?.id ?? ''; 
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        } 
      });
      async function modify(model: any, callback: Function) {
        model.id = parentId.value;
        await propertyConfigStore
          .modifyApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      async function add(model: any, callback: Function) {
        model.correlationId = correlationId;
        model.correlationFrom = correlationFrom;
        await propertyConfigStore
          .addApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }
      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('routes.devicemange.addProp')
          : t('routes.devicemange.editProp'),
      );
      async function handleSubmit() {
        try { 
          await validate().then(async (p) => {
              const callback =  (result) => {
                setDrawerProps({ confirmLoading: true });
                closeDrawer();
                emit('success', {
                  isUpdate: unref(isUpdate),
                  values: { ...p },
                });
              };
              if (unref(isUpdate) == true) {
              await  modify(p, callback);
              } else {
                await add(p, callback);
              }
            });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      return {
        modeValue,
        registerForm,
        registerDrawer,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
