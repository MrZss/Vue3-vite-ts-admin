<template>
  <div class="navbar">
    <!-- 控制侧边栏按钮 -->
    <a-button class="sidebar-btn-container" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <!-- 右侧下拉菜单 -->
    <div class="right-menu">
      <a-dropdown class="avatar-container" :trigger="['click']">
        <a class="avatar-wrapper" @click.prevent >
          管理员
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0" class="user-dropdown">
              <router-link to="/">
                首页
              </router-link>
            </a-menu-item>
            <a-menu-item key="1">
              <a target="_blank" href="www.baidu.com">
                退出登录
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script setup>
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue';
import { computed } from 'vue';
import { useLayoutStore } from '../store'

const layoutStore = useLayoutStore()
const collapsed = computed(() => layoutStore.collapsed)

const toggleCollapsed = () => {
  layoutStore.updateCollapsed(!collapsed.value)
}
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 70px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .sidebar-btn-container {
    float: left;
    top: 18px;
    left: 12px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 70px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
