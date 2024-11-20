<template>
  <div class="m-4 desc-wrap">
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" :size="14">
      <template #title>
        设备信息
        <a-button type="link" :size="18" preIcon="ant-design:edit-outlined" @click="handleEdit"> 编辑 </a-button>
      </template>

      <a-descriptions-item label="产品名称">{{deviceData.productName}}</a-descriptions-item>
      <a-descriptions-item label="设备类型">直连设备</a-descriptions-item>
      <a-descriptions-item label="连接协议">{{deviceData.connProtocol}}</a-descriptions-item>
      <a-descriptions-item label="消息协议">{{deviceData.protocolName	}}</a-descriptions-item>
      <a-descriptions-item label="IP地址">{{deviceData.ipAddress}}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{deviceData.createDate	}}</a-descriptions-item>
      <a-descriptions-item label="注册时间">2024-11-04 18:23:54</a-descriptions-item>
      <a-descriptions-item label="最后上线时间">2024-11-05 10:29:15</a-descriptions-item>
      <a-descriptions-item label="说明">{{deviceData.remark	}}</a-descriptions-item>
    </a-descriptions>
  </div>

  <div class="m-4 desc-wrap">
    <div style="margin-top: 20px;">
      <div style="display: flex; margin-bottom: 20px; align-items: center;">
        <div style="font-size: 16px; font-weight: 700;">配置</div>
        <a-space :size="middle">
          <a-button type="link" :size="18"  preIcon="ant-design:edit-outlined" @click="handleConfigEdit"> 编辑 </a-button>
        </a-space>
      </div>
    </div>
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" :size="14">

      <template #title>
        <h4>
          {{ config.name }}
          <a-tooltip placement="topLeft" :title="config.description">
            <InfoCircleOutlined />
          </a-tooltip>
        </h4>

      </template>
      <a-descriptions-item v-for="(item, index) in config.properties" :label="item.name">{{ propertyValues[index] }}</a-descriptions-item>

    </a-descriptions>
  </div>
  <EditInfo @register="registerModal" @success="handleModalSuccess" :minHeight="200" />
  <EditConfigInfo @register="registerModal1"    @success="handleConfigModalSuccess" :minHeight="300" />
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, unref } from 'vue';
  import { Descriptions } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import EditInfo from '../components/edit.vue';
  import EditConfigInfo from '../components/editConfig.vue'; 
  import { useDeviceStore } from '/@/store/modules/device';
  import { useDeviceAccessStore } from '/@/store/modules/deviceaccess';
  import { useDeviceConfigStore } from '/@/store/modules/deviceConfig';
  import { useRouter } from 'vue-router'; 
  import {
    InfoCircleOutlined
  } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      Descriptions,
      EditInfo,
      EditConfigInfo,
      InfoCircleOutlined
    },
    setup() {
      const deviceAccessStore  = useDeviceAccessStore();
      const deviceStore = useDeviceStore();
      const deviceConfigStore = useDeviceConfigStore();
      const router = useRouter();
      const { currentRoute } = router;
      const deviceId = unref(currentRoute).query.id;
      const productCode = unref(currentRoute).query.typeCode?.valueOf();
      const deviceCode = unref(currentRoute).query.code?.valueOf();
      const deviceData = ref({}); 
      const model = ref({}); 
      const propertyValues = ref([]);
      const config = ref({})
      const [registerModal, { openModal }] = useModal();
      const [registerModal1, { openModal: openModal1 }] = useModal();  
      function getDevice() {
        deviceStore.getdevicemodelApi({
          deviceId: Number(deviceId)
        }).then((response) => {
          deviceData.value = response?.result;
        });
      }
      function toCamelCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      function convertKeysToCamelCase(json) {
        const camelCaseJson = {};

        for (const key in json) {
          if (json.hasOwnProperty(key)) {
            camelCaseJson[toCamelCase(key)] = json[key];
          }
        }

        return camelCaseJson;
      }
      const getPropertyConfig = function () {
        deviceAccessStore.getpropertyconfigApi({ productCode: productCode })
          .then(response => {

            config.value = response.result;
          });
      }
      function handleConfigEdit() {  
        openModal1(true,{
          productCode: productCode,
          deviceCode: deviceCode,
          record: model,
          isUpdate: true,
        });
      }
      function handleEdit() { 
        openModal(true, {
          record: convertKeysToCamelCase(deviceData.value),
          isUpdate: true,
        });
      }
      const getByDeviceCode = function () {
        deviceConfigStore.getbydevicecodeApi({ deviceCode: deviceCode })
          .then(response => {
            model.value = response.Result; 
            propertyValues.value = model.value==null?[]: model.value.AuthConfig.split("|");
          });
      }
      async function handleModalSuccess() {
        await getDevice(); 
      }
      async function handleConfigModalSuccess() {
        await getByDeviceCode();
      }
      onMounted(async () => {
        await getDevice();
        await getPropertyConfig();
        await getByDeviceCode();
      });
      return {
        config,
        registerModal, 
        registerModal1,
        handleConfigEdit,
        handleConfigModalSuccess,
        propertyValues,
        handleEdit,  
        handleModalSuccess,
        deviceData,
      };
    },
  });
</script>

<style lang="less" scoped>
  ::v-deep .ant-descriptions .anticon-info-circle {
    font-size: 14px;
    font-weight: 300; 
    margin-left: 2px;
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
