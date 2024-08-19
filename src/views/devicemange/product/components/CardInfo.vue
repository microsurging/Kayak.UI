<template>
  <div class="cardInfo">
    <div>
      <p>设备数量</p>
      <p
        ><a>{{ newUser }}</a></p
      >
    </div>
    <div>
      <p>产品类型</p>
      <p>{{ deviceType.name }}</p>
    </div>
    <div>
      <p>状态</p>
      <p>
        <a-popconfirm :title="confirmTitle" @confirm="confirm(productId)" @cancel="cancel">
          <a-switch
            slot="actions"
            v-model:checked="state"
            checked-children="发布"
            un-checked-children="停用"
            size="small"
            @change="handleChange"
            @click="handleClick"
          />
        </a-popconfirm>
      </p>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { useProductStore } from '/@/store/modules/product';
  export default defineComponent({
    name: 'CardInfo',
    components: { Switch },
    props: {
      deviceType: {
        type: [Object],
        default: 0,
      },
      productId: {
        type: [String, Number],
        default: 0,
      },
      newUser: {
        type: [String, Number],
        default: 0,
      },
      state: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const productStore = useProductStore();
      const state = ref(props.state);
      const confirmTitle = ref('');
      const handleChange = (checked) => {};
      const handleClick = (checked) => {
        state.value = !state.value;
        if (checked == true) {
          confirmTitle.value = '是否发布';
        } else {
          confirmTitle.value = '是否停用';
        }
      };
      const confirm = async (id) => {
        var ids = [];
        ids.push(id);
        if (state.value)
          await productStore.stopApi({
            ids: ids,
          });
        else
          await productStore.openApi({
            ids: ids,
          });
        state.value = !state.value;
      };

      const cancel = (e) => {
        console.log(e);
      };
      const deviceType = props.deviceType;
      const newUser = props.newUser;
      const productId = props.productId;

      return {
        handleChange,
        handleClick,
        productId,
        deviceType,
        newUser,
        state,
        confirmTitle,
        confirm,
        cancel,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/utils/utils.less';
  .cardInfo {
    .clearfix();
    margin-top: 16px;
    margin-left: 5px;
    & > div {
      position: relative;
      float: left;
      width: 33%;
      text-align: center;
      p {
        margin: 0;
        font-size: 14px;
        line-height: 32px;
      }

      p:first-child {
        margin-bottom: 4px;
        color: @text-color-secondary;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
