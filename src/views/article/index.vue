<template>
  <div class="app-container">
    <mavon-editor class="editor-wrap"></mavon-editor>
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: false,
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      api.getArticle().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
  },
};
</script>
<style>
.editor-wrap {
    height:800px;
    width:100%;
}
</style>
