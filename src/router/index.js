import { createRouter, createWebHistory } from "vue-router";

const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,
    routes: [{
        path: "/login",
        name: "login",
        component: () =>
            import ("../components/Login.vue")
    }, {
        path: "/", // 父级路径
        name: "main",
        component: () =>
            import ("../components/Main.vue"),
        children: [{
                path: "/", // 空路径路由的路径与父级路径保持一致，否则会显示Main.vue，没有渲染router-view
                redirect: "/appListTable"
            }, // 定义空路径，用户访问localhost:3000时跳转至首页
            {
                path: "/appListTable",
                name: "appListTable",
                component: () =>
                    import ("../views/AppList.vue")
            },
            {
                path: "/appListChart",
                name: "appListChart",
                component: () =>
                    import ("../views/HelloWorld.vue")
            }
        ]
    }, {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () =>
            import ("../components/NotFound.vue")
    }]
});

// 导航守卫
router.beforeEach((to) => {
    let token = localStorage.getItem('Token');
    if (token && to.path === '/login')
        return "/appList";
    else if (!token && to.path !== '/login')
        return "/login";
});

export default router;