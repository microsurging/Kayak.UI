<template>
  <div>
    <PageWrapper class="high-form">
      <a-card :bordered="false" title="基本信息">
        <a-row :gutter="24">
          <a-col :span="14">
            <BasicForm @register="register" style="height: 100%" />
          </a-col>
          <a-col :span="10">
            <div class="change-avatar">
              <div class="mb-2">头像</div>
              <CropperAvatar
                :uploadApi="uploadApi"
                :value="avatar"
                btnText="更换头像"
                :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
                @change="updateAvatar"
                width="150"
              />
            </div>
          </a-col>
        </a-row>
        <template #actions>
          <div style="height: 35px">
            <div class="absolute right-4">
              <a-button class="mr-4">返回</a-button>
              <a-button type="primary">保存</a-button>
            </div>
          </div>
        </template>
      </a-card>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { Button, Row, Col, Card } from 'ant-design-vue';
  import { computed, defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import headerImg from '/@/assets/images/header.jpg';
  import { baseSetschemas } from '/@/views/devicemange/product/data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/sys/upload';

  export default defineComponent({
    name: 'Add',
    components: {
      Card,
      PageWrapper,
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const userStore = useUserStore();

      const [register] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;
        return avatar || headerImg;
      });

      function updateAvatar(src: string) {
        const userinfo = userStore.getUserInfo;
        userinfo.avatar = src;
        userStore.setUserInfo(userinfo);
      }

      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
