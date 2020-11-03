import Vue from "vue"
import { sync } from "vuex-router-sync"
import App from "./App.vue"
import { createRouter } from "./router.js"
import { createStore } from "./store.js"
import "./test.css"

export function createApp() {
    const router = createRouter()
    const store = createStore()

    sync(store, router)
    const app = new Vue({
        router,
        store,
        // template: "<App />",
        // components: { App },
        render: h => h(App)
    })

    return { app, router, store }
}
