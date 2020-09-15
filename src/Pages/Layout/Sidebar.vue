<template>
    <el-menu mode="vertical" 
        background-color="#545c64" 
        text-color="#fff" 
        active-text-color="#ffd04b"
        unique-opened 
        :default-active="$route.path" 
        :collapse="isCollapse">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
