<template>
  <div class="app-container">
    <div class="pane-item">
        <label class="pane-label">文章：</label>
        <el-select
            v-model="articleId"
            placeholder="请选择文章"
            @change="onChange"
            >
            <el-option
                v-for="item in articleList"
                :key="item.id"
                :label="item.title"
                :value="item.id">
            </el-option>
        </el-select>
    </div>
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
          <el-button type="primary" @click="onSubmit">确定更新</el-button>
          <el-button type="primary" @click="deleteArticle">删除</el-button>
        </div>
      </el-col>

    </el-row>

    <mavon-editor :style="{height:editHeight + 'px'}" class="editor-wrap" v-model="article.content"></mavon-editor>
  </div>
</template>

<script>
import { api } from "@/utils/api";
import { fixIntoTree, getFathersById } from "@/utils/index";
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
      editHeight: document.body.offsetHeight - 280,
      articleType:[],
      articleList:[],
      articleId:'',
      article:{
          title:'',
          type:[],
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
      this.queryAllArticle()
      api.queryArticleClassify().then((res) => {
        this.loading = false;
        this.articleType = fixIntoTree(res.data,0,'label','value','children',false);
      });
    },
    queryAllArticle() {
      api.queryAllArticle().then((res) => {
        this.articleList = res.data
      });
    },
    onChange() {
        let father_id = ''
        for (let i = 0 ; i < this.articleList.length ; i++) {
            const item = this.articleList[i]
            if (this.articleId === item.id) {
                this.article = {
                    title: item.title,
                    id: item.id,
                    content: item.content,
                    picture: item.picture,
                }
                father_id = (item.type).toString()
                break
            }
        }
        this.article.type = getFathersById(father_id, this.articleType, 'value') 
    },
    //删除当前文章
    deleteArticle() {
        if (!this.articleId) {
             this.$message({ message: "请选择文章!", type: "error" });
             return
        }
        api
            .deleteArtcle({ info: JSON.stringify({ id: this.articleId }) })
            .then((res) => {
                this.$message({ message: "删除成功!", type: "success" });
                this.reset()
            });
    },
    onSubmit() {
        if (!this.article.title||!this.article.content||!this.article.type.length) {
            this.$message('请将信息填写完整！')
            return
        }
        const length = this.article.type.length
        const param = {
            id:this.article.id,
            title:this.article.title,
            content:this.article.content,
            type:this.article.type[length-1]
        }
        api.updateArticle({info:JSON.stringify(param)}). then((res) => {
            this.$message({message: '更新成功!',type: 'success'});
            this.reset()
        })
    },
    reset() {
        this.article = {
            title:'',
            content:'',
            type:[],
            picture:'',
        }
        this.articleId = ''
        this.queryAllArticle()
    }
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
