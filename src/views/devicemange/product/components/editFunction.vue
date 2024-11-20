<template>
  <BasicDrawer v-bind="$attrs"
               @register="registerDrawer"
               showFooter
               :title="getTitle"
               width="500px"
               @ok="handleSubmit">
    <BasicForm @register="registerForm" layout="vertical">

    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { useFunctionConfigStore } from '/@/store/modules/functionConfigure';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { CodeEditor, MODE } from '/@/components/CodeEditor'; 
  const functionConfigStore = useFunctionConfigStore(); 
  export const formSchema: FormSchema[] = [
    {
      field: 'FunctionId',
      label: '功能标识',
      required: true,
      component: 'Input',
    },
    {
      field: 'FunctionName',
      label: '功能名称',
      required: true,
      component: 'Input',
    },
    {
      field: 'IsAsync',
      label: '是否异步',
      required: true,
      defaultValue: true,
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '异步', value: true },
          { label: '不异步', value: false }, 
        ],
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
        parentId.value = data?.record?.Id ?? '';
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });
      async function modify(model: any, callback: Function) {
        model.id = parentId.value;
        await functionConfigStore
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
        await functionConfigStore
          .addApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }
      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('routes.devicemange.addFunction')
          : t('routes.devicemange.editFunction'),
      );
      async function handleSubmit() {
        try {
          await validate().then(async (p) => {
            const callback = (result) => {
              setDrawerProps({ confirmLoading: true });
              closeDrawer();
              emit('success', {
                isUpdate: unref(isUpdate),
                values: { ...p },
              });
            };
            if (unref(isUpdate) == true) {
              await modify(p, callback);
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
