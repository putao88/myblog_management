<template>
  <div class="app-container article" v-loading="loading">
    <div class="pane-item">
      <label class="pane-label">一级分类</label>
      <el-input v-model="levelName" placeholder="请输入分类名称"></el-input>
      <el-button size="medium" type="primary" @click="onSubmit(0,'')">创建</el-button>
    </div>
    <div class="pane-item">
      <!-- <label class="pane-label">其他分类</label> -->
      <div class="block">
        <h4>其他分类</h4>
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
        ></el-tree>
      </div>
    </div>
  </div>
</template>

<script>
let id = 1000;
import { api } from "@/utils/api";
import { fixIntoTree } from "@/utils/index";
export default {
  data() {
    return {
      loading: false,
      levelName: "", //分类名称
      data: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //   搜索文章分类
    fetchData() {
      this.loading = true;
      api.queryArticleClassify().then((res) => {
        this.loading = false;
        this.data = fixIntoTree(res.data, 0, "label", "id", "children", true);
      });
    },
    //创建子分类
    append(data) {
      this.$prompt("请输入分类名称", "新建", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S+/,
        inputErrorMessage: "请输入分类名称后再提交",
      }).then(({ value }) => {
        this.onSubmit(data.id, value);
      });
    },

    // 修改子类
    update(data) {
      this.$prompt("请输入分类名称", "修改分类名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S+/,
        inputErrorMessage: "请输入分类名称后再提交",
      }).then(({ value }) => {
        const param = {
            id: data.id,
            name: value,
        };
        this.loading = true;
        api.updateArtcleClassify({ info: JSON.stringify(param) }).then((res) => {
            this.$message({ message: "修改成功!", type: "success" });
            this.levelName = "";
            this.loading = false;
            this.fetchData();
        });
      });
    },

    // 移除子分类
    remove(node, data) {
      this.loading = true;
      if (data.isArticle) {
        api
            .deleteArtcle({ info: JSON.stringify({ id: data.id }) })
            .then((res) => {
            this.$message({ message: "删除成功!", type: "success" });
            this.loading = false;
            this.fetchData();
            });
      } else {
        api
            .deleteArtcleClassify({ info: JSON.stringify({ id: data.id }) })
            .then((res) => {
            this.$message({ message: "删除成功!", type: "success" });
            this.loading = false;
            this.fetchData();
            });
      }
    },

    renderContent(h, { node, data, store }) {
      if (!data.isArticle) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data)}
              >
                添加
              </el-button>
             <el-button
                size="mini"
                type="text"
                on-click={() => this.update(data)}
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <i class='el-icon-finished'></i>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      }
    },

    //   提交创建
    onSubmit(father_id, value) {
      const name = value ? value : this.levelName;
      if (!name) {
        this.$message("请输入分类名称");
        return;
      }
      const param = {
        father_id: father_id,
        name: name,
      };
      this.loading = true;
      api.addArtcleClassify({ info: JSON.stringify(param) }).then((res) => {
        this.$message({ message: "创建成功!", type: "success" });
        this.levelName = "";
        this.loading = false;
        this.fetchData();
      });
    },
  },
};
</script>
<style>
.article .pane-item {
  width: 700px;
  margin: 20px auto;
}
.article .pane-label {
  width: 120px;
}
.article .pane-item .el-input {
  margin: 20px;
  width: calc(100% - 200px);
}
.article .pane-item .el-button--primary {
  margin: 20px 0;
}
.article .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node .el-icon-finished {
    padding-right:10px;
}
</style>

