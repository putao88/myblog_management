<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
		<div class="pane-item">
			<label class="pane-label">微语：</label>
			<el-select
				v-model="whisperId"
				placeholder="请选择微语"
				@change="onChange"
				style="width:100%"
				>
				<el-option
					v-for="item in whisperList"
					:key="item.id"
					:label="item.time"
					:value="item.id">
				</el-option>
			</el-select>
		</div>
      </el-col>
      <el-col :span="4">
        <div class="pane-item">
          <el-button type="primary" @click="onSubmit">确定更新</el-button>
          <el-button type="primary" @click="deleteWhisper">删除</el-button>
        </div>
      </el-col>
    </el-row>

    <mavon-editor :style="{height:editHeight + 'px'}" class="editor-wrap" v-model="whisper.content"></mavon-editor>
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
      editHeight: document.body.offsetHeight - 180,
      whisperList:[],
      whisperId:'',
      whisper:{
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
    // 搜索微语
    fetchData() {
      this.loading = true;
      this.getAllWhisper()
    },
    getAllWhisper() {
      api.getAllWhisper().then((res) => {
        this.whisperList = res.data
      });
    },
    onChange() {
        for (let i = 0 ; i < this.whisperList.length ; i++) {
            const item = this.whisperList[i]
            if (this.whisperId === item.id) {
                this.whisper = {
                    id: item.id,
					content: item.content,
					time: item.time,
					like_count: item.like_count,
					comment_count: item.comment_count,
                }
                break
            }
        }
    },
    //删除当前微语
    deleteWhisper() {
        if (!this.whisperId) {
             this.$message({ message: "请选择微语!", type: "error" });
             return
        }
        api.deleteWhisper({ info: JSON.stringify({ id: this.whisperId }) })
            .then((res) => {
                this.$message({ message: "删除成功!", type: "success" });
                this.reset()
            });
    },
    onSubmit() {
        if (!this.whisper.content) {
            this.$message('请将信息填写完整！')
            return
        }
        const param = {
            id:this.whisper.id,
			content:this.whisper.content,
			time:this.whisper.time,
            like_count:this.whisper.like_count,
            comment_count:this.whisper.comment_count,
        }
        api.updateWhisper({info:JSON.stringify(param)}). then((res) => {
            this.$message({message: '更新成功!',type: 'success'});
            this.reset()
        })
    },
    reset() {
        this.whisper = {
            content:'',
        }
        this.whisperId = ''
        this.getAllWhisper()
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
