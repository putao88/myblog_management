<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <template v-for="item in routes">
        <router-link :key='item.path' v-if="!item.hidden&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
            <el-menu-item  :index="item.path+'/'+item.children[0].path">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </router-link>
    </template>
  </el-menu>
</template>


<script>
import { constantRouterMap } from '@/router'
export default {
  name: "Sidebar",
  data() {
    return {
      routes:constantRouterMap
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>