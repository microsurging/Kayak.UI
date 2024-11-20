<template>
  <BasicModal v-bind="$attrs"
              @register="registerModal"
              width="480px"
              :title="getTitle"
              :showCancelBtn="true"
              :showOkBtn="true"
              :helpMessage="config.description"
              @ok="handleSubmit">
    <template v-if="!loading">
      <div className="App">
        <a-form layout="vertical" ref="formRef" :model="formData">
                            <a-form-item v-for="(item, index) in config.properties"
                               :key="item.code"
                               :label="item.name" 
                               :name="item.code">
                    <a-tooltip placement="right" :title="item.description">
                      <a-input  v-model:value="propertyValues[index]"
                               placeholder="please input"
                               style="width: 60%; margin-right: 8px" />
                      </a-tooltip>
                    </a-form-item>
        </a-form>
      </div>
    </template>

  </BasicModal>
  </template>
<script lang="ts">
  import { defineComponent, ref, computed, watch, unref } from 'vue';
  import {  FormInstance} from 'ant-design-vue';
 import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useDeviceAccessStore } from '/@/store/modules/deviceaccess';
  import { useDeviceConfigStore } from '/@/store/modules/deviceConfig';
 export default defineComponent({
   name: 'EditConfigModal',
   components: {
     BasicModal,
   },
   emits: ['success', 'register'],
   setup(_, { emit }) {
     const loading = ref(false);
     const isUpdate = ref(true);
     const formRef = ref<FormInstance>();
     const productCode = ref(null);
     const propertyValues = ref([]);
     const deviceCode = ref(null);
     const formData = ref({
       productCode: null,
       deviceCode: null,
       authConfig:null
     });
     const deviceAccessStore = useDeviceAccessStore(); 
     const deviceConfigStore = useDeviceConfigStore();
     const lines = ref(10); 
     const config = ref({});
     const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(
       async (data) => { 
         await formRef.value?.resetFields();
         setModalProps({ confirmLoading: false });
       
         productCode.value = data?.productCode; 
         deviceCode.value = data?.deviceCode; 
         isUpdate.value = !!data?.isUpdate;
         await getPropertyConfig();
         if (unref(isUpdate)) {
          propertyValues.value=[];
           if(data.record==null)  isUpdate.value=false;
           else
           { 
             var authConfig = data.record.AuthConfig.split("|"); 
             if (config.value.properties.length===authConfig.length)
               propertyValues.value = authConfig;
              isUpdate.value=true;
             formData.value = data.record;
           }
         }
       },
     );
     const getPropertyConfig = async function () {
      var response = await deviceAccessStore.getpropertyconfigApi({ productCode: unref(productCode) });
       config.value = response.result;
     }
     function modify(model: any,  callback: Function) {
       model.AuthConfig = propertyValues.value.join("|"); 
       deviceConfigStore
         .modifyApi({
           model:model,
         })
         .then((data) => {
           callback(data);
         });
     }

     function add(model: any, callback: Function) {
       model.deviceCode = deviceCode;
       model.productCode = productCode;
       model.authConfig = propertyValues.value.join("|"); 

       deviceConfigStore
         .addApi({
           model: model,
         })
         .then((data) => {
           callback(data);
         });
     }
     watch(
       () => lines.value,
       () => {
         redoModalHeight();
       },
       { flush: 'post' }
     );
     const getTitle = computed(() => (!unref(isUpdate) ? '新增': '编辑').concat(config.value.name) );
     const resetForm = () => {
       closeModal();
     };
     async function handleSubmit() {
       try { 
         const values = await formRef.value?.validateFields(); 
         formRef.value?.validate().then((p) => {

           const callback = (result) => {
             setModalProps({ confirmLoading: true });
             closeModal();
             emit('success', {
               isUpdate: unref(isUpdate),
               values: { ...p },
             });
           };
           if (unref(isUpdate) == true) {
             modify(unref(formData), callback);
           } else {
             add(unref(formData), callback);
           }
         });
       } finally {
         setModalProps({ confirmLoading: false });
       }
     }
     return { registerModal, resetForm, config, propertyValues, formRef, formData, loading, getTitle, handleSubmit };
   },
 });
  </script>
<style lang="less" scoped>
  ::v-deep .ant-form-item-label {
    text-align: left;
  }
</style>
