<template>
  <div>
    <iframe :src="nodeRedUrl"
            width="100%"
            height="820"
            style="border: none;">
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 替换为你的Node-RED URL
      nodeRedUrl: 'http://localhost:1880'
    };
  }
};
</script>

<style>
  /* 可以添加一些样式 */
</style>
