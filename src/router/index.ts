import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from "@/layout/index.vue";
import { MessageOutlined, BorderOuterOutlined, UnorderedListOutlined, CheckCircleOutlined, ContainerOutlined, TeamOutlined  } from '@ant-design/icons-vue';

export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
        name: 'home',
        component: Layout,
        meta: {
            title: '控制台',
            icon:  MessageOutlined
        },
        children:[
            {
                path: "home",
                name: 'home-list',
                component: () => import("@/views/home/list/index.vue"),
                meta: {
                    title: "主页",
                    icon: UnorderedListOutlined
                }
            }
        ]
    },
    {
		path: "/template",
        name: 'template',
		component: Layout,
        meta: {
            title: "模板管理",
            icon: BorderOuterOutlined
        },
        children:[
            {
                path: "list",
                name: 'template-list',
                component: () => import("@/views/template/list/index.vue"),
                meta: {
                    title: "模板列表",
                    icon: ContainerOutlined
                }
            }
        ]
	},
    {
        path: "/login",
        meta: {
            title: "登录",
            hidden: true
        },
        component: () => import("@/views/login/index.vue"),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
