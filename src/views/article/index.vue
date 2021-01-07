<template>
  <div class="app-container">
    <div class="pane-item">
      <label class="pane-label">文章标题：</label>
      <el-input class="pane-value" v-model="article.title" placeholder="输入文字标题"></el-input>
    </div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="pane-item">
          <label class="pane-label">文章分类：</label>
            <el-cascader
                v-model="article.type"
                :options="articleType"
                placeholder="请选择分类"
                ></el-cascader>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="pane-item">
          <label class="pane-label">封面图片：</label>
          <el-input class="pane-value" v-model="article.picture" placeholder="输入图片链接"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="pane-item">
          <el-button type="primary" @click="onSubmit">确定发布</el-button>
        </div>
      </el-col>

    </el-row>

    <mavon-editor :style="{height:editHeight + 'px'}" class="editor-wrap" v-model="article.content"></mavon-editor>
  </div>
</template>

<script>
import { api } from "@/utils/api";
import { fixIntoTree } from "@/utils/index";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  components: {
    mavonEditor,
  },
  data() {
    return {
      list: null,
      listLoading: false,
      editHeight: document.body.offsetHeight - 240,
      articleType:[],
      article:{
          title:'',
          type:'',
          picture:'',
          content:'',
      }
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 搜索文章分类
    fetchData() {
      this.loading = true;
      api.getAllWhisper().then((res) => {
        this.loading = false;
        this.articleType = fixIntoTree(res.data,0,'label','value','children',true);
      });
    },
    onSubmit() {
        if (!this.article.title||!this.article.content||!this.article.type.length) {
            this.$message('请将信息填写完整！')
            return
        }
        const length = this.article.type.length
        const param = {
            title:this.article.title,
            content:this.article.content,
            type:this.article.type[length-1]
        }
        api.addArticle({info:JSON.stringify(param)}). then((res) => {
            this.$message({message: '发布成功!',type: 'success'});
            this.article = {
                title:'',
                content:'',
                type:'',
                picture:'',
            }
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
