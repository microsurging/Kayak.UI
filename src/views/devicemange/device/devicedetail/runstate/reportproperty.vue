<template>
  <a-input-search v-model:value="searchValue" style="margin-bottom: 8px;width:200px;" @change="getPage" placeholder="Search" />
  <div :class="`${prefixCls}__content`">

    <a-list rowKey="id"
            :grid="{ gutter: 8, xs: 1, sm: 2, md: 6, lg: 6, xl: 6, xxl:6, xxxl: 5}"
            :dataSource="reportProperties"
            class="card-list">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card :title="item.propertyName" :class="`${prefixCls}__card`">
            <template #extra>
              <a-space>
                <a-tooltip title="上报">
                  <edit-outlined @click="" />
                </a-tooltip>
                <a-tooltip title="刷新">
                  <RedoOutlined @click="refresh(item)" />
                </a-tooltip>
                <a-tooltip title="详情">
                  <OrderedListOutlined @click="showModal(item)" />
                </a-tooltip>
              </a-space>
            </template>
            <p> <a-typography-title :level="2">{{item.propertyValue==null?"--":item.propertyValue}} {{item.propertyValue==null?"":item.unitValue}}</a-typography-title></p>
            <p>更新时间</p>
            <p>{{item.createDate==null?"--":item.createDate}}</p>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
  <Detail @register="registerModal"  :minHeight="400" />
</template>
<script lang="ts">

  import {
    EditOutlined,
    RedoOutlined,
    OrderedListOutlined, 
  } from '@ant-design/icons-vue';

  import { defineComponent, unref, onMounted, ref } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table'; 
  import { PageWrapper } from '/@/components/Page'; 
  import { Space, Card } from 'ant-design-vue';
  import Detail from './propertytab.vue';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';
  import { usereportPropertyStore } from '/@/store/modules/reportProperty';
  export default defineComponent({
    props: {
      tabkey: String,
      tabcode:String,
},
    components: { BasicTable, Detail, PageWrapper, TableAction, Space, Card, EditOutlined, RedoOutlined, OrderedListOutlined },
    setup(prop) {
      const reportProperty = usereportPropertyStore();
      const router = useRouter();
      const { currentRoute } = router;
      const searchValue = ref("");
      const reportProperties = ref<any>([]);
      const [registerModal, { openModal }] = useModal();
      const deviceId = unref(currentRoute).query.code;
      const refresh = function (record: Recordable) {
        var propertyId: any = null;
        if (record != null)
          propertyId = record.propertyId;
        reportProperty.getAggregationPageAsyncApi({
          query: {
            deviceId: deviceId,
            propertyName: unref(searchValue),
            propertyId: propertyId
          }
        }).then((response) => { 
          for (var i = 0; i < reportProperties.value.length;i++) { 
            if (reportProperties.value[i].propertyId == response.result.items[0].propertyId) {
              reportProperties.value[i] = response.result.items[0]; 
            }
          }; 
        })
      }
      const showModal = (record: Recordable) => {
        openModal(true, {
          record,
          isUpdate: false,
        });
      };
      const getPage = function () {
          reportProperty.getAggregationPageAsyncApi({
          query: {
              deviceId: deviceId,
              propertyName: unref(searchValue)
          }
          }).then((response) => {
          reportProperties.value = response.result.items;
        })
      }
      const inputText = ref(''); 
      onMounted(async () => {
        console.log(prop.tabkey);
        await getPage();
      });
      return { 
        prefixCls: 'list-card',
        inputText, 
        getPage,
        registerModal,
        showModal,
        refresh,
        searchValue,
        reportProperties
      };
    },
  });
</script>

<style lang="less" scoped>

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

  &__content {
    margin-top: 16px;
  }

  &__card {
    width: 100%;
    background-color: #f8f8f8;
    margin-bottom: -8px;
    .ant-card-body {
      padding: 16px;
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
  
  ::v-deep .ant-tag {
    margin-right: 8px;
  }
  ::v-deep .vben-basic-table .vben-basic-table-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
  }

  ::v-deep .vben-basic-table .ant-table-wrapper {
    padding: 0px;
  }
</style>
