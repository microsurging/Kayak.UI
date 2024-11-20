<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #Script="{ model, field }">
        <CodeEditor
          v-model:value="model[field]"
          style="height: 260px; width: 380px"
          :mode="modeValue"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { useNetworkPartStore } from '/@/store/modules/networkPart';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
   import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
  const sysDicManageStore = useSysDicManageStore();
  const isFixedLength = (resolveMode: string) => resolveMode === 3;
  const isDelimited = (resolveMode: string) => resolveMode === 1;
  const isScript = (resolveMode: string) => resolveMode === 2;
  export const formSchema: FormSchema[] = [
    {
      field: 'name',
      label: '组件名称',
      required: true,
      component: 'Input',
    },
    {
      field: 'componentTypeCode',
      label: '组件类型',
      required: true,
      component: 'ApiSelect',
      componentProps: {
      api: sysDicManageStore.getsysdictionarybyconditionApi,
      params: {
        query: {
          parentCode: 'componenttype',
        },
      },
      fieldNames: {
        label: 'Name',
        value: 'Code',
      }, 
      },
    },
    {
      field: 'clusterModeId',
      label: '集群',
      component: 'RadioButtonGroup',
      defaultValue:1,
      componentProps: {
        options: [
          { label: '共享配置', value: 1 },
          { label: '独立配置', value: 2 },
        ],
      },
    },
    {
      field: 'enableSSL',
      label: '开启SSL',
      component: 'RadioGroup',
      defaultValue: false,
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      ifShow: ({ values }) => values.ComponentType != 'Rtmp',
    },
    {
      field: 'host',
      label: 'HOST',
      required: true,
      component: 'Input',
    },
    {
      field: 'port',
      label: 'PORT',
      required: true,
      component: 'Input',
    },
    {
      field: 'isMulticast',
      label: '是否组播',
      component: 'RadioGroup',
      defaultValue: false,
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      ifShow: ({ values }) => values.componentTypeCode == 'Udp',
    },
    {
      field: 'enableSwagger',
      label: 'Swagger',
      component: 'RadioGroup',
      helpMessage: '开启Swagger',
      defaultValue:true,
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      ifShow: ({ values }) => values.componentTypeCode == 'Http',
    },
    {
      field: 'enableWebService',
      label: 'webservice',
      component: 'RadioGroup',
      helpMessage: '开启webservice',
      defaultValue: false,
      componentProps: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
      ifShow: ({ values }) => values.componentTypeCode == 'Http',
    },
    {
      field: 'resolveMode',
      label: '解析方式',
      required: true,
      helpMessage: '处理TCP粘拆包的方式',
      component: 'Select',
      componentProps: {
        options: [
          { label: '不处理', value: 0 },
          { label: '分隔符', value: 1 },
          { label: '自定义脚本', value: 2 },
          { label: '固定长度', value: 3 },
        ],
      },
      ifShow: ({ values }) => values.componentTypeCode == 'Tcp',
    },
    {
      field: 'fixedLength',
      label: '固定长度',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => isFixedLength(values.resolveMode) && values.componentTypeCode == 'Tcp',
    },
    {
      field: 'delimited',
      label: '分隔符',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => isDelimited(values.resolveMode) && values.componentTypeCode == 'Tcp',
    },
    {
      field: 'ruleScript',
      label: '解析脚本',
      slot: 'Script',
      required: true,
      component: 'Input',
      ifShow: ({ values }) => isScript(values.resolveMode) && values.componentTypeCode == 'Tcp',
    },
    {
      field: 'maxMessageLength',
      label: '最大长度',
      required: true,
      helpMessage: '最大消息长度',
      component: 'Input',
      ifShow: ({ values }) => values.componentTypeCode == 'Rtmp',
    },
    {
      label: '描述',
      field: 'remark',
      component: 'InputTextArea',
      componentProps: {
        rows: 6,
      },
    },
    {
      label: ' ',
      field: 'menu',
      slot: 'menu',
      component: 'Input',
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
      const networkPartStore = useNetworkPartStore();
      const { t } = useI18n();
      const modeValue = ref<MODE>(MODE.JS);
      const parentId = ref('');
      const isUpdate = ref(true);
      const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate; 
        if(data!=null && data.record!=null)
        data.record.ruleScript = data?.record?.ruleScript ?? '';
        parentId.value = data?.record?.id ?? '';
        if (unref(isUpdate)) { 
          setFieldsValue({
            ...data.record,
          });
        }
      });
      async function modify(model: any, callback: Function) {
        model.Id = parentId.value;
       await  networkPartStore
          .aggregationModifyApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      async function add(model: any, callback: Function) {
       await networkPartStore
          .addApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }
      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('routes.deviceconnect.addcomponent')
          : t('routes.deviceconnect.editcomponent'),
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
