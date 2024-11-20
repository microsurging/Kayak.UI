<template>
  <BasicModal v-bind="$attrs"
              @register="registerModal"
              width="960px"
              :title="getTitle"
              :showCancelBtn="true"
              :showOkBtn="true" 
              @ok="handleSubmit">
    <template v-if="!loading">
      <div className="App">
        <div :class="`${prefixCls}__search`">
          <a-form ref="formRef">
            <a-row :gutter="20">
              <a-col :span="16" style="text-align: left">
                <a-form-item label="网关名称:" style="margin-bottom:12px;" :wrapper-col="{ sm: { span: 18 }, xs: { span: 6 } }">
                  <a-input v-model:value="inputText"
                           @change="getPage"
                           placeholder="请输入网关名称"
                           style="width: 160px; z-index: 100" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="20">
              <a-col :span="9" style="text-align: left">
                <a-space>
                  <a-button type="primary" preIcon="mdi:plus">
                
                    新增
                  </a-button>
                  <a-tag v-if="error" :bordered="false" color="error">
                    <template #icon>
                      <BulbOutlined />
                    </template>
                    请选择设备网关
                  </a-tag>
                  </a-space>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div :class="`${prefixCls}__content`">
          <a-list rowKey="id"
                  :grid="{ gutter: 9, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 2, xxxl: 1}"
                  :dataSource="jsonData"
                  class="card-list">
            <template #renderItem="{ item }">
              <a-list-item @click="checkCard(item)">
                <a-badge-ribbon text="正常" color="cyan">

                  <a-card :hoverable="true" :class="`${prefixCls}__card`">
                    <div v-if="item.isCheck" class="zj-topleft"><CheckOutlined style="color: #fff; position: absolute; top: 2px; left: -27px;" /></div>
                    <div :class="`${prefixCls}__avatar`">
                      <img src="\src\assets\images\avatar.jpg" />
                    </div>
                    <div :class="`${prefixCls}__item_content`">
                      <div :class="`${prefixCls}__card-title`">
                        <a-row :gutter="24">
                          <a-col>
                            <div>
                              {{ item.name }}
                            </div>
                          </a-col>
                        </a-row>
                      </div>
                      <div class="cardInfo">
                        <div>
                          <p>{{item.networkPart.name}}</p>
                          <p>  <a-badge status="success" :text="item.ipAddress" /></p>
                        </div>
                        <div>
                          <p>协议</p>
                          <p>{{ item.protocol.protocolName }}</p>
                        </div>
                        <div class="cardInfo_remark" :title="item.remark">{{ item.remark }}</div>

                      </div>
                    </div>
                  </a-card>
                </a-badge-ribbon>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
      <a-pagination v-model:current="page"
                    v-model:page-size="pageSize"
                    :total="total"
                    :pageSizeOptions="[6,10]"
                    class="ant-table-pagination ant-table-pagination-right"
                    :show-total="total => `共 ${total} 条数据`" />
    </template>

  </BasicModal>
  </template>
<script lang="ts">

  import { CheckOutlined, BulbOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref, computed, watch, unref } from 'vue';
  import {  FormInstance} from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useDeviceGatewayStore } from '/@/store/modules/devicegateway';
  import { useDeviceAccessStore } from '/@/store/modules/deviceaccess';
  import { useRouter } from 'vue-router';
 export default defineComponent({
   name: 'DeviceGatewayModal',
   components: {
     BasicModal,
     CheckOutlined, 
     BulbOutlined,
   },
   emits: ['success', 'register'],
   setup(_, { emit }) {

     const page = ref<number>(1); 
     const pageSize = ref<number>(6);
     const loading = ref(false); 
     const inputText = ref<string>("");
     const jsonData = ref([]);
     const total = ref<number>(0);
     const formRef = ref<FormInstance>();
     const isUpdate = ref(true);
     const lines = ref(10);
     const modelObj = ref<object|null>(null);
     const error = ref(false);
     const parentId = ref(null);
     const router = useRouter();
     const { currentRoute } = router;
     const productCode = unref(currentRoute).query.productCode?.valueOf();
     const deviceGatewayStore = useDeviceGatewayStore();
     const deviceAccessStore = useDeviceAccessStore();
     const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(
       async (data) => {  
         isUpdate.value = !!data?.isUpdate;
         parentId.value = data?.record?.Id;
         modelObj.value = null;
         error.value = false;
         setModalProps({ confirmLoading: false });
         getPage();
       },
     );
     const getPage = function () { 
       deviceGatewayStore
         .getPageAsync({
           query: {
             name: unref( inputText),
             page: page.value,
             pageSize: pageSize.value,
           },
         })
         .then((response) => {
           jsonData.value = response.result.items;
           total.value = response.result.total;
         });
     }
     const checkCard = function (record: Recordable) {
       const productCode = unref(currentRoute).query.productCode?.valueOf();
       for (var i = 0; i < jsonData.value.length; i++) {
         jsonData.value[i].isCheck = false;
       }
       var data = {
         gatewayId: record.id,
         gatewayName: record.name,
         connProtocol: record.networkPart.componentTypeCode,
         productCode: productCode,
         remark: record.remark,
       }
       modelObj.value = data
       record.isCheck = true;
     }

     function modify(model: any, callback: Function) {
       model.Id = parentId.value;
       deviceAccessStore
         .modifyApi({
           model: model,
         })
         .then((data) => {
           callback(data);
         });
     }

     function add(model: any, callback: Function) {
       deviceAccessStore
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
     const getTitle = computed(() => "选择设备网关");
     const resetForm = () => {
       closeModal();
     };
     async function handleSubmit() {
       try {
         if (modelObj.value == null) error.value = true;
         else {
           error.value = false;
           const callback = (result) => {
             setModalProps({ confirmLoading: true });
             closeModal();
             emit('success', {
               isUpdate: unref(isUpdate),
               values: { ...unref(modelObj) },
             });
           };
           if (unref(isUpdate) == true) {
             modify(unref(modelObj), callback);
           } else {
             add(unref(modelObj), callback);
           }
         }
       } finally {
         setModalProps({ confirmLoading: false });
       }
     }
     return { registerModal, jsonData, error, checkCard, getPage, page, inputText, total, pageSize, prefixCls: 'list-card', resetForm, formRef,  loading, getTitle, handleSubmit };
   },
 });
  </script>
<style lang="less" scoped>
  .zj-topleft {
    width: 0;
    height: 0;
    border-color: transparent #ff0000;
    border-width: 0 0 30px 30px;
    border-style: solid;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .ant-table-pagination.ant-pagination {
    margin: 0 8px;
  }
  .ant-pro-pages-list-projects-cardList {
   margin-top: 24px;
   ::v-deep .ant-card-meta-title {
     margin-bottom: 4px;
   }

   ::v-deep .ant-card-meta-description {
     height: 44px;
     overflow: hidden;
     line-height: 22px;
   }

   .cardItemContent {
     display: flex;
     height: 20px;
     margin-top: 16px;
     margin-bottom: -4px;
     line-height: 20px;
     > span {
       flex: 1 1;
       color: rgba(0, 0, 0, 0.45);
       font-size: 12px;
     }

     ::v-deep .ant-pro-avatar-list {
       flex: 0 1 auto;
     }
   }
 }

 .list-card {
   &__link {
     margin-top: 10px;
     font-size: 14px;
     a {
       margin-right: 30px;
     }

     span {
       margin-left: 5px;
     }
   }
  &__avatar {
    display: flex;
    align-items: center;
    margin-right: 16px;
    margin-top:5px;
  }
  &__item_content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 0;
  }
  &__content {
    margin-top: 5px;
    min-height:320px;
   ::v-deep .ant-spin-container{

    margin-right: 8px;
  }
  }

  &__card {
    width: 100%;
    margin-bottom: -8px;
    ::v-deep .ant-card-body {
       padding: 16px;
       display:flex;
     }

     &-title {
       margin-bottom: 5px;
       font-size: 16px;
       font-weight: 500;
       color: @text-color;
       .icon {
         margin-top: 5px;
         margin-right: 10px;
         font-size: 38px !important;
       }
     }

     &-detail {
       padding-top: 10px;
       padding-left: 30px;
       font-size: 14px;
       color: @text-color-secondary;
     }
   }
 }

 .ant-card-actions {
   background: #f7f9fa;
   li {
     float: left;
     text-align: center;
     margin: 12px 0;
     color: rgba(0, 0, 0, 0.45);
     width: 50%;
     &:not(:last-child) {
       border-right: 1px solid #e8e8e8;
     }

     a {
       color: rgba(0, 0, 0, 0.45);
       line-height: 22px;
       display: inline-block;
       width: 100%;
       &:hover {
         color: @primary-color;
       }
     }
   }
 }

 ::v-deep .vben-page-wrapper-content {
   margin: 16px 10px;
 }

 ::v-deep .ant-card-actions .app-iconify svg {
   display: block;
   margin: auto;
 }

 ::v-deep span.iconify {
   min-width: 48px;
   min-height: 48px;
   background: #ccc;
 }

 ::v-deep .ant-col {
   width: auto;
 }

 .new-btn {
   border-radius: 2px;
   width: 100%;
   height: 220px;
   color: rgba(0, 0, 0, 0.45);
 }
  ::v-deep .ant-form-item-label {
    text-align: left;
  }
  @import '/@/utils/utils.less';
   .cardInfo {
    .clearfix(); 
   margin-left: 5px;
   & > div {
     position: relative;
     float: left;
     width: 50%;
     text-align: center;
     p {
       margin: 0;
       font-size: 14px;
       line-height: 20px;
       text-align:left;
     }  
     p:first-child {
       margin-bottom: 4px;
       color: @text-color-secondary;
       font-size: 12px;
       line-height: 20px;
       text-align:left;
     }
   }
  & > div.cardInfo_remark {
    width: 100%;
    text-align: left;
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 使用省略号 */
    color: #666;
    margin: 5px auto;
  }
 }
</style>
