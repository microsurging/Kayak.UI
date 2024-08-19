<template>
  <PageWrapper title="产品:制氧机" contentBackground>
    <template #subTitle>
      <a-badge status="error" text="离线" />
    </template>
    <template #extra>
      <a-button type="primary" preIcon="ant-design:sync-outlined"> 刷新 </a-button>
    </template>

    <template #footer>
      <a-descriptions>
        <a-descriptions-item label="ID">yuwell_device</a-descriptions-item>
        <a-descriptions-item label="产品"
          >制氧机
          <a-button
            type="link"
            style="vertical-align: top; border-width: 0px; padding: 0 0 10px 10px"
            >查看</a-button
          ></a-descriptions-item
        >
      </a-descriptions>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="实例信息" />
        <a-tab-pane key="2" tab="规则" />
      </a-tabs>
    </template>

    <div class="m-4 desc-wrap">
      <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" :size="14">
        <template #title>
          设备信息
          <a-button type="link" :size="18" preIcon="ant-design:edit-outlined"> 编辑 </a-button>
        </template>
        <a-descriptions-item label="产品名称">制氧机</a-descriptions-item>
        <a-descriptions-item label="设备类型">直连设备</a-descriptions-item>
        <a-descriptions-item label="所属机构" />
        <a-descriptions-item label="连接协议">MQTT</a-descriptions-item>
        <a-descriptions-item label="消息协议">鱼跃协议</a-descriptions-item>
        <a-descriptions-item label="IP地址">/0.0.0.111:11</a-descriptions-item>
        <a-descriptions-item label="创建时间">2022-05-07 18:23:11</a-descriptions-item>
        <a-descriptions-item label="注册时间">2022-05-07 18:23:54</a-descriptions-item>
        <a-descriptions-item label="最后上线时间">2022-06-02 10:29:15</a-descriptions-item>
        <a-descriptions-item label="说明" />
      </a-descriptions>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Badge, Descriptions, Row, Col, Tabs } from 'ant-design-vue';
  import { CountTo } from '/@/components/CountTo/index';

  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      Row,
      Col,
      [Tabs.name]: Tabs,
      Badge,
      CountTo,
      Descriptions,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      return {};
    },
  });
</script>
