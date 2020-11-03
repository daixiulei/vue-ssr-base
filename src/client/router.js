import Router from "vue-router"
import Vue from "vue"

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: "history",
        base: "/",
        routes: [
            {
                path: "/",
                component: () => import("./components/A.vue")
            },
            {
                path: "*",
                name: "404",
                component: () => import("./components/404.vue")
            }
        ]
    })
}
