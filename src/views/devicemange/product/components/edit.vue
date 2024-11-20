<template>
  <BasicModal v-bind="$attrs"
              @register="registerModal"
              width="480px"
              :title="getTitle"
              :showCancelBtn="true"
              :showOkBtn="true"
              helpMessage="处理消息"
              @ok="handleSubmit">
    <template v-if="!loading">
      <div className="App">
        <a-form layout="vertical" ref="formRef" :model="formData">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-image :width="150"
                       :height="150"
                       src="\src\assets\images\product_b.png"
                       fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==" />

            </a-col>
            <a-col :span="16">
              <a-row :gutter="16">
                <a-col :span="24">
                  <a-form-item name="productCode" label="ID:" :rules="[{ required: true }]">
                    <a-tooltip title="产品标识">
                      <a-input v-model:value="formData.productCode" placeholder="请输入ID" />
                    </a-tooltip>
                  </a-form-item>
                </a-col>
                <a-col :span="24" :style="{ marginTop: '-8px' }">
                  <a-form-item name="productName" label="名称" :rules="[{ required: true }]">
                    <a-input name="productName" v-model:value="formData.productName" placeholder="请输入名称" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-form-item label="产品分类:" name="categoryId">
            <a-select v-model:value="formData.categoryId"
                      style="width: 100%"
                      :options="selData"
                      show-search
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                      placeholder="Please select"
                      allow-clear />
          </a-form-item>
          <a-form-item label="设备分类:" name="deviceType" :style="{ marginTop: '-8px' }">
            <a-radio-group v-model:value="formData.deviceType" button-style="solid">
              <a-radio-button :value=1>直连设备</a-radio-button>
              <a-radio-button :value=2>网关子设备</a-radio-button>
              <a-radio-button :value=3>网关设备</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="备注:" name="remark" helpMessage="处理消息" :style="{ marginTop: '-8px' }">
            <a-textarea placeholder="请输入备注" v-model:value="formData.remark" :rows="6" show-count :maxlength="100" />
          </a-form-item>
        </a-form>
      </div>
    </template>

  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, watch, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Input, FormInstance, SelectProps, Row, Col, Image} from 'ant-design-vue';
  import { usePrdCategoryStore } from '/@/store/modules/productcategory';
  import { useProductStore } from '/@/store/modules/product'; 
  export default defineComponent({
    name: 'DebugModal',
    components: {
      BasicModal,
      'a-input': Input,
      'a-row': Row,
      'a-col': Col,
      Image,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const loading = ref(false);
      const isUpdate = ref(true);
      const formRef = ref<FormInstance>();
      const parentId = ref(null);
      const selData = ref<SelectProps['options']>([]);
      const formData = ref({
        productCode: null,
        productName: null,
        categoryId: null,
        deviceType: 1,
        remark: null
      });
      const productCategoryStore = usePrdCategoryStore();
      const productStore = useProductStore();
      const lines = ref(10);
      const value1 = ref<string>('a');

      const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(
        async (data) => {
          await formRef.value?.resetFields();
          setModalProps({ confirmLoading: false });
          await getLastChild();
          parentId.value = data?.record?.id;
          isUpdate.value = !!data?.isUpdate;
          if (unref(isUpdate)) {
            var tmpObj = {};
            Object.assign(tmpObj, data.record);
            formData.value = tmpObj;

          }
        },
      );
      async function getLastChild() {
        productCategoryStore.getlastchildApi()
          .then((response) => {
            const data: any[] = [];
            response.forEach((r: any) => {
              var obj = {
                value: r.Id,
                label: r.CategoryName,
              };
              data.push(obj);
            });
            selData.value = data;
          });
      }

      function modify(model: any, callback: Function) {
        model.Id = parentId.value;
        productStore
          .modifyApi({
            model: model,
          })
          .then((data) => {
            callback(data);
          });
      }

      function add(model: any, callback: Function) {
        productStore
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
      const getTitle = computed(() => (!unref(isUpdate) ? '新增产品' : '编辑产品'));
      const resetForm = () => {
        closeModal();
      };
      async function handleSubmit() {
        try {  
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
              modify(p, callback);
            } else {
              add(p, callback);
            }
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerModal, resetForm, formRef, formData, value1, selData, loading, getTitle, handleSubmit };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep .ant-form-item-label {
    text-align: left;
  }
</style>
