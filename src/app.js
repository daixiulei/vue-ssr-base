import Vue from "vue"
import App from "./App.vue"
import { createRouter } from "./router.js"
import "./test.css"

export function createApp() {
    const router = createRouter()
    const app = new Vue({
        router,
        // template: "<App />",
        // components: { App },
        render: h => h(App)
    })
    return { app, router }
}
