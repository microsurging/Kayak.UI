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
  import { useSysOrgManageStore } from '/@/store/modules/sysorgmanage';
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
      const searchV = ref('');
      const genData: any = ref([{ title: '组织机构列表', key: '', children: [] }]);
      const expandedKeys = ref<string[]>(['']);
      const searchValue = ref<string | null>(searchV);
      const autoExpandParent = ref<boolean>(true);
      const gData = ref<TreeDataItem[]>(genData);
      const sysOrgManageStore = useSysOrgManageStore();
      emitter.on('sysorgeditChange', (value: string | null) => {
        genData.value[0].children = [];
        getList(null);
      });
      onBeforeUnmount(() => {
        emitter.off('sysorgeditChange', (v: string | null) => {}); //关闭
      });
      function getList(_preKey: string | null, _tns?: TreeDataItem[]) {
        const preKey = _preKey;
        const tns = _tns || genData;
        let level = 1;
        if (preKey) level = preKey.split('-').length + 1;
        sysOrgManageStore
          .getsysorganizationbyconditionApi({
            query: {
              levelCode: preKey,
              level: level,
              name: searchV.value,
            },
          })
          .then((response) => {
            const list = response?.Result;
            if (list != null) {
              for (let i = 0; i < list?.length; i++) {
                tns.value[0].children.push({ key: list[i].LevelCode, title: list[i].Name });
              }
              console.log('odd', tns);
              genData.value.values = tns.values;
            }
          });
      }
      const onTreeNodeSelect = (treeNode: any) => {
        emitter.emit('sysorgselectChanged', treeNode[0] || null);
      };

      const onLoadData = (treeNode: any) => {
        const tns: TreeDataItem[] = [];
        return new Promise((resolve: (value?: unknown) => void) => {
          if (treeNode.dataRef.children) {
            resolve();
            return;
          }
          const level = treeNode.key.split('-').length + 1;
          sysOrgManageStore
            .getsysorganizationbyconditionApi({
              query: {
                levelCode: treeNode.key,
                level: level,
              },
            })
            .then((response) => {
              const list = response?.Result;
              if (list != null) {
                for (let i = 0; i < list?.length; i++) {
                  tns.push({ key: list[i].LevelCode, title: list[i].Name });
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
