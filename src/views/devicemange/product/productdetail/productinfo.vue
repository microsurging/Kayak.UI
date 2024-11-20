<template>
  <div class="m-4 desc-wrap">
    <a-descriptions bordered :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }">
      <template #title>
        产品信息
        <a-button type="link" size="18" preIcon="ant-design:edit-outlined" @click="handleEdit">
          编辑
        </a-button>
      </template>
      <a-descriptions-item label="产品ID">{{ productData.productCode }}</a-descriptions-item>
      <a-descriptions-item label="所属品类">{{ productCategory.categoryName }}</a-descriptions-item>
      <a-descriptions-item label="设备类型">{{ productDeviceType.name }}</a-descriptions-item>
      <a-descriptions-item label="接入方式">
        <span v-if="model !=null"><a-button type="link" @click="editDeviceAccessModal">{{model.GatewayName	}}</a-button></span>
        <span v-else><a-button type="link" @click="showDeviceAccessModal">配置接入方式</a-button></span>

      </a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ productData.createDate }}</a-descriptions-item>
      <a-descriptions-item label="更新时间">{{ productData.updateDate }}</a-descriptions-item>
      <a-descriptions-item label="说明">
        {{ productData.remark }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
  <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="408" />
  <DeviceGateway @register="registerModal1" @success="handleModalSuccess1" :minHeight="380" />
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, unref } from 'vue';
  import { Descriptions } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import EditInfo from '/@/views/devicemange/product/components/edit.vue';
  import { useProductStore } from '/@/store/modules/product';
  import { useDeviceAccessStore } from '/@/store/modules/deviceaccess'; 
  import DeviceGateway from '../components/selDeviceGateway.vue';
  import { useRouter } from 'vue-router'; 
  export default defineComponent({
    components: {
      Descriptions,
      DeviceGateway,
      EditInfo,
    },
    setup() {
      const productStore = useProductStore();
      const router = useRouter();
      const { currentRoute } = router;
      const productId = unref(currentRoute).query.id;
      const productCode = unref(currentRoute).query.productCode?.valueOf();
      const productData = ref({});

      const productCategory = ref({});
      const productDeviceType = ref({});
      const model = ref({}); 
      const deviceAccessStore = useDeviceAccessStore();
      const record: any = {
        ProductId: `yuwell-product`,
        ProductCategory: '0',
        Organization: '1',
        TransportProtocol: '0',
        DeviceType: '0',
        remark: '6666',
      };
      const [registerModal, { openModal }] = useModal();
      const [registerModal1, { openModal: openModal1}] = useModal();
      async function getProduct() {
        var data = await productStore.getproductbyidApi({
          id: Number(productId)
        });
        productData.value = data;
        productCategory.value = data?.category;
        productDeviceType.value = data?.prdDeviceType;
        console.log(data);
      }
      function handleEdit() {
        openModal(true, {
          record:productData,
          isUpdate: true,
        });
      }
      const editDeviceAccessModal = () => {
        openModal1(true, {
          record: model.value,
          isUpdate: true,
        });
      };
      const showDeviceAccessModal = () => {
        openModal1(true, { 
          isUpdate: false,
        });
      };
      async function handleModalSuccess1() {
        await getByProductCode();
      }
      const getByProductCode = function () {
        deviceAccessStore.getbyproductcodeApi({ productCode: productCode })
          .then(response => {
            model.value = response.Result;
          });
      }
      async function handleModalSuccess() {
        await getProduct();
      }
      onMounted(async () => {
        await getProduct(); 
        await getByProductCode();
      });
      return {
        showDeviceAccessModal,
        editDeviceAccessModal,
        handleModalSuccess1,
        registerModal1,
        registerModal,
        handleEdit,
        model,
        productCategory,
        productDeviceType,
        handleModalSuccess,
        productData,
      };
    },
  });
</script>

<style lang="less" scoped>
  .desc-wrap {
    height: 600px;
  }
  ::v-deep .vben-collapse-container__header {
    border-width: 0px;
    ::v-deep .vben-collapse-container__heade .vben-basic-title-normal {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
      font-size: 16px;
    }
  }
</style>
