<template>
  <BasicForm @register="registerForm" />
  <br />
  <a-divider>调试日志</a-divider>
  <pre> </pre>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Input, Divider } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  export const formSchema: FormSchema[] = [
    {
      label: '响应数据',
      field: 'ResponseData',

      component: 'InputTextArea',
      componentProps: {
        rows: 6,
      },
    },
  ];
  export default defineComponent({
    name: 'TcpDebug',
    components: { Textarea: Input.TextArea, BasicForm, Divider },
    setup() {
      const [registerForm] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const value = ref<string>('');
      return {
        registerForm,
        value,
      };
    },
  });
</script>
