import Router from "vue-router"
import Vue from "vue"

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: "history",
        routes: [
            {
                path: "/",
                components: () => import("./components/A.vue")
            }
        ]
    })
}
