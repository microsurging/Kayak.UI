<template>
  <div style="margin: 10px auto">
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
    <a-tree
      :expandedKeys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :load-data="onLoadData"
      :tree-data="gData"
      @select="onTreeNodeSelect"
      @expand="onExpand"
    >
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onBeforeUnmount, ref, watch } from 'vue';
  import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
  import emitter from '/@/utils/eventbus';
  import { useSysDicManageStore } from '/@/store/modules/sysdicmanage';

  //const getParentKey = (key: string, tree: TreeDataItem[]): string | number | undefined => {
  //  let parentKey;
  //  for (let i = 0; i < tree.length; i++) {
  //    const node = tree[i];
  //    if (node.children) {
  //      if (node.children.some(item => item.key === key)) {
  //        parentKey = node.key;
  //      } else if (getParentKey(key, node.children)) {
  //        parentKey = getParentKey(key, node.children);
  //      }
  //    }
  //  }
  //  return parentKey;
  //};
  export default defineComponent({
    setup() {
      const searchV = ref(null);
      const genData: any = ref([{ title: '字典列表', key: 'none', children: [] }]);
      const sysDicManageStore = useSysDicManageStore();
      const expandedKeys = ref<string[]>(['none']);
      const searchValue = ref<string>(searchV);
      const autoExpandParent = ref<boolean>(true);
      const gData = ref<TreeDataItem[]>(genData);
      emitter.on('editChange', (value: string | null) => {
        genData.value[0].children = [];
        getList(null);
      });
      onBeforeUnmount(() => {
        emitter.off('editChange', (v: string | null) => {}); //关闭
      });
      function getList(_preKey: string | null, _tns?: TreeDataItem[]) {
        const preKey = _preKey || 'none';
        const tns = _tns || genData;
        sysDicManageStore
          .getsysdictionarybyconditionApi({
            query: {
              parentCode: preKey,
              name: searchV.value,
            },
          })
          .then((response) => {
            const list = response;
            if (list != null) {
              console.log('odd', tns);
              for (let i = 0; i < list?.length; i++) {
                tns.value[0].children.push({ key: list[i].Code, title: list[i].Name });
              }
              genData.value.values = tns.values;
            }
          });
      }
      const onTreeNodeSelect = (treeNode: any) => {
        emitter.emit('selectChanged', treeNode[0] || 'none');
      };

      const onLoadData = (treeNode: any) => {
        const tns: TreeDataItem[] = [];
        return new Promise((resolve: (value?: unknown) => void) => {
          if (treeNode.dataRef.children) {
            resolve();
            return;
          }
          sysDicManageStore
            .getsysdictionarybyconditionApi({
              query: {
                parentCode: treeNode.key,
              },
            })
            .then((response) => {
              const list = response;
              if (list != null) {
                for (let i = 0; i < list?.length; i++) {
                  tns.push({ key: list[i].Code, title: list[i].Name });
                }
                treeNode.dataRef.children = tns;
                genData.value = [...genData.value];
                resolve();
              }
            });
        });
      };
      getList(null);
      const onExpand = (keys: string[]) => {
        expandedKeys.value = keys;
        autoExpandParent.value = false;
      };

      watch(searchValue, (value) => {
        genData.value[0].children = [];
        getList(null);
        searchValue.value = value;
      });
      return {
        onTreeNodeSelect,
        onLoadData,
        expandedKeys,
        searchValue,
        autoExpandParent,
        gData,
        onExpand,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep .ant-tree .ant-tree-list {
    min-height: calc(100vh - 120px);
  }
</style>
