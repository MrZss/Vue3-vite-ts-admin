<script setup lang='ts'>
import SidebarItem from "./SidebarItem.vue";
import { ref, computed } from 'vue';
import { routes } from "@/router";

import { useLayoutStore } from '../../store'

const layoutStore = useLayoutStore()


const collapsed = computed(() => layoutStore.collapsed)

const openKeys = ref<string[]>(['/message'])
const selectedKeys = ref<string[]>(['2'])

</script>

<template>
  <div class="tab-wrapper" :style="{width: collapsed ? '80px' : '240px'}">
		<a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
			mode="inline"
			theme="dark"
			:inline-collapsed="collapsed"
			>
       <div class="menu-title">{{collapsed?'管理':'管理后台'}}</div>
			 <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
		</a-menu>
  </div>
</template>

<style lang='scss' scoped>
.tab-wrapper {
    width: 200px;
}

.menu-title {
    background-color: #001529;
    color: white;
    height: 70px;
    font-size: 24px;
    font-weight: bold;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;

}

</style>