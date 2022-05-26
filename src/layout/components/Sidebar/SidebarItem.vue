<template>
  <div v-if="!item.meta.hidden" class="sidebar-item-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <a-menu-item :key="resolvePath(item.path)">
          <component #icon :is="onlyOneChild.meta.icon" />
          <span v-if="onlyOneChild.meta.title" class="sub-a-title" >{{ onlyOneChild.meta.title }}</span>
        </a-menu-item>
      </app-link>
    </template>

    <a-sub-menu
      v-else
      ref="subMenu"
      :key="resolvePath(item.path)"
    >
      <template #icon><component :is="item.meta.icon" /></template>
      <template v-if="!collapsed" #title>{{ item.meta.title }}</template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </a-sub-menu>
  </div>
</template>

<script setup lang='ts'>
import path from "path-browserify";
import AppLink from "./Link.vue";
import { isExternal } from "utils/validate";
import { useLayoutStore } from '../../store'
import { defineProps, ref, computed } from "vue";

const layoutStore = useLayoutStore()
const collapsed = computed(() => layoutStore.collapsed)

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});
const onlyOneChild = ref<any>(null);
const hasOneShowingChild = (children: Array<any>= [], parent: Array<any>) => {
  const showingChildren = children.filter((item) => {
    if (item.meta.hidden) {
      console.log('item',item)
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });
  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }
  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
};
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
