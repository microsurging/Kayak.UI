<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="720px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #Script="{ model, field }">
        <CodeEditor
          v-model:value="model[field]"
          style="height: 260px; width: 620px"
          :mode="modeValue"
        />
      </template>
      <template #FileAddr="{ model, field }">
        <a-upload 
                  name="file" 
                    :file-list="uploadfileList"
                   @change="handleChange" 
                  :customRequest="customRequest"
                  >
          <a-input    v-model:value="model[field]" :disabled="model.isEditing==1"  style="width: 140px" />
          <a-button type="primary" :disabled="model.isEditing==1" preIcon="ant-design:upload-outlined">
            上传模块
          </a-button>
          </a-upload>
</template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import axios from 'axios';
  import { FormSchema } from '/@/components/Table';
  import { getToken } from '/@/utils/auth';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  import { useProtocolManageStore } from '/@/store/modules/protocolmanage';
  import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';
  const sysDicManageStore = useSysDicManageStore();
  export const formSchema: FormSchema[] = [
    {
      field: 'ProtocolCode',
      label: '协议ID',
      required: true,
      component: 'Input', 
      dynamicDisabled:(formData)  => formData.model.isEditing==1,
      colProps: {
        span: 12,
      },
    },
    {
      field: 'ProtocolName',
      label: '协议名称',
      required: true,
      component: 'Input',
      colProps: {
        span: 12,
      },
    },
    {
      field: 'ProtocolType',
      label: '组件类型',
      required: true,
      component: 'ApiSelect',
    componentProps: {
   api: sysDicManageStore.getsysdictionarybyconditionApi,
   params: {
     query: {
       parentCode: 'ProtocolType',
     },
   },
   fieldNames: {
     label: 'Name',
     value: 'Code',
   },
   style: 'width: 90%;',
 },
      colProps: {
        span: 13,
      },
    },
    {
      field: 'ClassName',
      label: '类名',
      required: true,
      component: 'Input',

      colProps: {
        span: 12,
      },
    },
    {
      field: 'ConnProtocol',
      label: '连接协议',
      required: true,
      component: 'Input',
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => values.ProtocolType == 'Script',
    },
    {
      field: 'FileAddress',
      label: '文件地址',
      required: true,
      component: 'Input',
     dynamicDisabled:(formData) => formData.model.isEditing==1,
      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => values.ProtocolType == "LocalModule",
    },

    {
      field: 'FileAddress',
      label: '文件地址',
      slot: 'FileAddr',
      dynamicDisabled:(formData) => formData.model.isEditing==1,
      required: true,
      component: 'Input',

      colProps: {
        span: 12,
      },
      ifShow: ({ values }) => values.ProtocolType == null || values.ProtocolType == "ModuleFile",
    },
    {
      field: 'Script',
      label: '解析脚本',
      slot: 'Script',
      required: true,
      component: 'Input',

      colProps: {
        span: 24,
      },
      ifShow: ({ values }) => values.ProtocolType == 'Script',
    },
    {
      label: '描述',
      field: 'Remark',
      component: 'InputTextArea',

      colProps: {
        span: 24,
      },
      componentProps: {
        rows: 6,
      },
    },
      {
    label: '可编辑',
    field: 'isEditing',
    component: 'Input',
    show:false,
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
      const globSetting = useGlobSetting(); 
      const uploadfileList: any = ref([]);
      const token = getToken();
      const uploadFileAddr = globSetting.apiUrl + '/filemanage/uploadfile';
      const handleChange = function ({ fileList }) {
          const allowedTypes = ['application/x-zip-compressed', 'application/octet-stream'];
       if (!allowedTypes.includes(fileList[0].type)) { 
         return false;
       }
        uploadfileList.value = fileList;  
        setFieldsValue({'FileAddress':fileList[0].name}) ;
        if (fileList.length > 1) {
          // 移除第一个文件
          uploadfileList.value = [fileList[fileList.length - 1]];
        }
      }
      const handleBeforeUpload = (file) => {
       
      };
      const customRequest = function (options) { 
           const allowedTypes = ['application/x-zip-compressed', 'application/octet-stream'];
        
                 if (!allowedTypes.includes(options.file.type)) { 
                    return ;
                   }
           const data = new FormData()
          data.append('form1', options.file)
          const config = {
            "headers": {
              "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
              'Authorization': token,
            }
          }
          axios.post(uploadFileAddr, data, config).then((res: any) => {
      options.file.id=  res.data.entity.result[0].id; 
            options.onSuccess(res.data, options.file)
          }).catch((err: Error) => {
            console.log(err)
          }) 
          
      };
      var protocolManageStore = useProtocolManageStore();
      const { t } = useI18n();
      const modeValue = ref<MODE>(MODE.JS);
      const isUpdate = ref(true);
      let Id: number = 0;
      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false }); 
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告

        isUpdate.value = !!data?.isUpdate;
        Id = data?.record?.Id ?? 0;
        if (unref(isUpdate)) { 
          data.record.isEditing=1; 
          setFieldsValue({   
            ...data.record  
          });
        }
        else {
          setFieldsValue({
            'Script':'var decode=function(buffer)\n{\n}\n' + 
              'var encode=function(buffer)\n{\n}\n'
          })
        }
      });

      function modify(model: any, callback: Function) {
        model.Id = Id;
        if(uploadfileList.value.length>0)
        model.fileId=uploadfileList.value[0].id;
        protocolManageStore
          .modifyAggApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      function add(model: any, callback: Function) {
         if(uploadfileList.value.length>0)
        model.fileId=uploadfileList.value[0].id;
        protocolManageStore
          .addAggApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('routes.deviceconnect.addprotocol')
          : t('routes.deviceconnect.editprotocol'),
      );
      async function handleSubmit() {
        try {
          await validate().then((p) => {
            const callback = (result) => {
              setDrawerProps({ confirmLoading: false });
              closeDrawer();
              emit('success', {
                isUpdate: unref(isUpdate),
                values: { ...p},
              });
            };
            if (unref(isUpdate) == true) {
              modify(p, callback);
            } else {
              add(p, callback);
            }
          }); 
        } finally {
          setDrawerProps({ confirmLoading: true });
        }
      }
      return {
        modeValue,
        uploadFileAddr,
        registerForm,
        registerDrawer,
        uploadfileList,
        handleChange, 
        handleBeforeUpload,
        getTitle,
        customRequest,
        handleSubmit,
      };
    },
  });
</script>
