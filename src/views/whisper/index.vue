/*
 * @Author: houxiaoling 
 * @Date: 2021-01-07 11:26:16 
 * @Last Modified by: houxiaoling
 * @Last Modified time: 2021-01-07 11:52:25
 */
<template>
  <div class="app-container">
    <mavon-editor :style="{height:editHeight + 'px'}" class="editor-wrap" v-model="content"></mavon-editor>
	<el-button type="primary" @click="onSubmit" style="margin:10px 0;float:right">确定发布</el-button>

  </div>
</template>

<script>
import { api } from "@/utils/api";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      editHeight: document.body.offsetHeight - 150,
      content:'',
    };
  },
  created() {
  },
  methods: {
    onSubmit() {
        if (!this.content) {
            this.$message('请将信息填写完整！')
            return
        }
        const param = {
            content:this.content,
        }
        api.addWhisper({info:JSON.stringify(param)}). then((res) => {
            this.$message({message: '发布成功!',type: 'success'});
            this.content = ''
        })
    },
  },
};
</script>
<style scoped>
.editor-wrap {
  width: 100%;
}
.el-input {
  width: auto;
}
.pane-item {
  display: flex;
  flex-direction: row;
  line-height: 40px;
  margin: 10px 0;
}
.pane-label {
  width: 120px;
}
.pane-value {
  width: calc(100% - 120px);
}
</style>
