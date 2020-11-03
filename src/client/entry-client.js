const { createApp } = require("./app")

const { app, router, store } = createApp()

router.onReady(() => {
    console.log("Ready to mount app")

    // 在router.beforeResolve中调用确保所有的组件都被resolve
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to),
            prevMatched = router.getMatchedComponents(from)

        // 获取没渲染过、没获取过数据的组件
        const actived = matched.filter((cpt, index) => {
            return prevMatched[i] !== cpt
        })

        if (!actived.length) {
            next()
        }

        Promise.all(
            actived.map(cpt => {
                if (cpt.asyncData) {
                    cpt.asyncData({ store, route: to })
                }
            })
        )
            .then(() => {
                // 数据获取结束
                next()
            })
            .catch(next)
    })

    // 把服务端的state替换到浏览器端
    store.replaceState(window.__INITIAL_STATE__)
    app.$mount("#app")
})
