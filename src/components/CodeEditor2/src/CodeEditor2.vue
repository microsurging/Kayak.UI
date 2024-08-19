<template>
  <div class="relative !h-full w-full overflow-hidden">
    <textarea ref="editor"></textarea>
  </div>
</template>
<script setup lang="ts">
  // 引入全局实例
  import _CodeMirror from 'codemirror/lib/codemirror.js';
  // 核心样式
  import './codemirror.css';
  import 'codemirror/theme/idea.css';
  import 'codemirror/theme/material-palenight.css';
  import 'codemirror/addon/selection/active-line';
  // import 'codemirror/addon/lint/lint.css';

  // modes
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/css/css';
  import 'codemirror/mode/htmlmixed/htmlmixed';
  // addons
  // import 'codemirror/addon/edit/closebrackets';
  // import 'codemirror/addon/edit/closetag';
  // import 'codemirror/addon/comment/comment';
  // import 'codemirror/addon/fold/foldcode';
  // import 'codemirror/addon/fold/foldgutter';
  // import 'codemirror/addon/fold/brace-fold';
  // import 'codemirror/addon/fold/indent-fold';
  // import 'codemirror/addon/lint/json-lint';
  // import 'codemirror/addon/fold/comment-fold';
  import { ref, nextTick } from 'vue';

  let props = defineProps({
    mode: {
      type: String,
      required: false,
      default: 'htmlmixed',
    },
    content: {
      type: String,
      required: false,
      default: '',
    },
  });

  const editor = ref();

  let coder;

  nextTick(() => {
    coder = _CodeMirror.fromTextArea(editor.value, {
      mode: props.mode, // 不设置的话，默认使用第一个引用
      // 缩进格式
      tabSize: 2,
      // 显示行号
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai',
      matchTags: { bothTags: true },
      foldGutter: true,
      autoCloseTags: true,
      styleActiveLine: true,
      autoCloseBrackets: true,
      extraKeys: {
        'Alt-F': 'findPersistent',
      },
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'breakpoints'],
    });
    coder.setValue(props.content);
  });

  /**
   * 对外提供赋值
   */
  const setValue = (val: string) => {
    coder.setValue(val);
  };

  /**
   * 设置模式
   */
  const setMode = (mode: string) => {
    console.info(mode);
    coder.setOption('mode', mode);
  };

  /**
   * 对外提供取值
   */
  const getValue = () => {
    return coder.getValue();
  };

  defineExpose({
    setValue,
    getValue,
    setMode,
  });
</script>
<style lang="less" scoped>
  ::v-deep .CodeMirror-gutter {
    background: #ebebeb;
    border-right: 1px solid rgb(159, 159, 159);
    color: rgb(136, 136, 136);
  }
</style>
