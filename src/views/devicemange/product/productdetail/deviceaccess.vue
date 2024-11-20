<template>
  <div class="desc-wrap">
    <a-form ref="formRef" :model="propertyValues" layout="vertical" name="advanced_search">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-typography>
            <a-typography-title :level="4">接入方式 <a-button preIcon="ant-design:edit-outlined" @click="showEditModal">更改</a-button></a-typography-title>
            <a-typography-paragraph>
              {{model.gatewayName}}

            </a-typography-paragraph>
            <a-typography-paragraph>
              {{model.remark}}
            </a-typography-paragraph>
          </a-typography>
          <a-typography>
            <a-typography-title :level="4">消息协议</a-typography-title>
            <a-typography-paragraph>
              <span v-if="model.protocol!=null">
                {{ model.protocol.protocolName	}}
              </span>
            </a-typography-paragraph>
            <a-typography-paragraph>
              <MdPreview :editorId="id" previewTheme="vuepress" preview="false" :modelValue="markdownContent" />
            </a-typography-paragraph>
          </a-typography>
          <a-typography>
            <a-typography-title :level="4">连接信息</a-typography-title>
            <a-typography-paragraph>
              <a-badge status="success" :text="model.ipAddress" />

            </a-typography-paragraph>
          </a-typography>
          <template v-if="config!=null && config.name!=null">
            <a-typography>
              <a-typography-title :level="4">
                {{ config.name }}
                <a-tooltip placement="topLeft" :title="config.description">
                  <InfoCircleOutlined />
                </a-tooltip>
              </a-typography-title>
              <a-typography-paragraph>
                <a-form-item v-for="(item, index) in config.properties"
                             :key="item.code"
                             :label="item.name"
                             :name="item.code">
                  <a-tooltip placement="right" :title="item.description">
                    <a-input v-model:value="propertyValues[index]"
                             placeholder="please input"
                             style="width: 60%; margin-right: 8px" />
                  </a-tooltip>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" @click="submitForm">{{ t('routes.devicemange.save')}}</a-button>
                  <a-button style="margin-left: 10px" @click="resetForm">{{ t('routes.devicemange.reset')}}</a-button>
                </a-form-item>

              </a-typography-paragraph>
            </a-typography>
          </template>
        </a-col>
        <a-col :span="12">
          <div v-if="routes.length>0" className="deviceaccess_route">
            <a-typography>
              <a-typography-title :level="4">上下行数据说明 </a-typography-title>
              <a-typography-paragraph>
                <a-table :dataSource="routes" :pagination="false" :columns="column"></a-table>
              </a-typography-paragraph>
            </a-typography>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <DeviceGateway @register="registerModal" @success="handleModalSuccess" :minHeight="380" />
  </div>
</template>

<script>
  import { defineComponent, onMounted, unref,  ref } from 'vue';
  import { MdPreview } from 'md-editor-v3';
  import { httpRouteColumns } from '../data'; 
  import { useI18n } from '/@/hooks/web/useI18n';
  import 'md-editor-v3/lib/preview.css'; 
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import DeviceGateway from '../components/selDeviceGateway.vue';
  import emitter from '/@/utils/eventbus';
  import { useDeviceAccessStore } from '/@/store/modules/deviceaccess';
  import {
    InfoCircleOutlined
  } from '@ant-design/icons-vue';

  export default defineComponent({
    components: { MdPreview, InfoCircleOutlined, DeviceGateway },
    setup() {
      const column = httpRouteColumns();
      const id = 'preview-only';
      const router = useRouter();
      const { currentRoute } = router;
      const [registerModal, { openModal }] = useModal();
      const productCode = unref(currentRoute).query.productCode?.valueOf();
      const markdownContent = ref(''); 
      const { t } = useI18n();
      const model = ref({});
      const formRef = ref();
      const propertyValues = ref([]);
      const routes = ref([]);
      const submitForm = () => {
        model.value.AuthConfig = propertyValues.value.join("|"); 
        deviceAccessStore.modifyApi({
          model: unref(model),
        })
          .then((data) => { 
          }); 
      };
      const resetForm = () => {
        propertyValues.value = [];
      };
      const config = ref({})
      const deviceAccessStore = useDeviceAccessStore();
      const loadMarkdown = function () {
        deviceAccessStore.downdocumentfileApi({ productCode: productCode })
          .then(response => {
            if(response !=null)
            markdownContent.value = response.data; 
          });
      }
      const showEditModal = () => {
        openModal(true, {
          record: model.value,
          isUpdate: true,
        });
      };
      async function handleModalSuccess() {
        getByProductCode();
      }
      const getByProductCode = async function () {
            deviceAccessStore.getaggbyproductcodeApi({ productCode: productCode })
          .then(async response => {
            model.value = response.result; 
            if (model.value == null)
              emitter.emit('editChange', 'emptyDeviceAccess');
            else
            {
                propertyValues.value = model.value.authConfig == null ? [] : model.value.authConfig.split("|");
                await  loadMarkdown();
              await getPropertyConfig();
              await getRoutes();
            }
          });
      }
      const getPropertyConfig = function () {
        deviceAccessStore.getpropertyconfigApi({ productCode: productCode })
          .then(response => {
            
            config.value = response.result; 
          });
      }
      const getRoutes = function () {
        deviceAccessStore.getroutesApi({ productCode: productCode })
          .then(response => {

            routes.value = response.result; 
          });
      }
      onMounted(async () => {
       await getByProductCode();
  
    });
      return {
        t,
        id,
        model,
        registerModal,
        column,
        showEditModal,
        handleModalSuccess,
        config,
        markdownContent,
        formRef, 
        submitForm,
        routes,
        resetForm,
        propertyValues,  
      };
    },
  });
</script>
<style lang="less" scoped>
  .deviceaccess_route {
   ::v-deep article.ant-typography{
                               padding:1px 2px;
                           }

  background-color:#f5f4f4;
  margin:5px;
  }
  ::v-deep .ant-typography .anticon-info-circle {
    font-weight: 300;
    font-size: 16px;
  }
  ::v-deep article.ant-typography {
    padding: 10px 20px;
  }
  ::v-deep div.ant-typography{
    margin-bottom:2px;
  }
  ::v-deep div.vuepress-theme h3 {
    font-weight: 400;
  }
  ::v-deep h4.ant-typography {
    border-left: 4px solid #2a7dc9;
    padding-left: 5px;
  }
  .desc-wrap {
    min-height: 630px;
  }
  ::v-deep .md-editor-preview-wrapper{
    padding:0px;
  }
  ::v-deep .md-editor-code .md-editor-code-head {
    display: none;
  }
  </style>
