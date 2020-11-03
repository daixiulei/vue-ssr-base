const { createApp } = require("./app")

const { app, router } = createApp()

router.onReady(() => {
    console.log("Ready to mount app")

    app.$mount("#app")
})
