<template>
  <BasicForm    @register="registerForm" />
  <br />
  <a-divider>调试日志</a-divider>
  <ul>
    <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
  </ul>
  <!--<pre>

  </pre>-->
</template>
<script lang="ts">
  import { defineComponent, onMounted, unref, ref } from 'vue';
  import { Input, Divider } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { FormSchema } from '/@/components/Table';
  import { useNetworkLogStore } from '/@/store/modules/networklog';
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
    props: {
      networkId: {
        type: [String, Number],
        default: 0,
      },
    },
    setup(props) {
      let networkId = ref(props.networkId);
      console.log(props.networkId);
      const page: any = ref(1);
      let logMsg = ref([]);
      const pageSize: any = ref(100);
      const networkLogStore = useNetworkLogStore();
      const [registerForm] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });
      const value = ref<string>('');
      async function getPage() { 
        networkLogStore
          .getPageAsync({
            query: {
              networkId: unref(networkId), 
              page: page.value,
              pageSize: pageSize.value,
              
            },
          })
          .then((response) => {
            console.log(response);
            for (var i = 0; i < response?.Items.length;i++)
            {
              logMsg.value.push([response?.Items[i].CreateDate, " - ", "[", response?.Items[i].logLevelName, "] ", response?.Items[i].Content].join(""));
          }
          });
      };
      onMounted(async () => { 
        await getPage();
      });
      return { 
        registerForm,
        value,
        logs: logMsg,
      };
    },
   async created() {
      // 假设这是你要显示的日志
     // this.logs = ['2024-08-31 23:09:00 - [Info]: Vue is running', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed', '2024-08-31 23:09:00  - [Warning]: Network latency', '2024-08-31 23:09:00  - [Error]: Database connection failed'];
    }
  });
</script>
