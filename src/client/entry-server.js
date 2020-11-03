const { createApp } = require("./app")

module.exports = context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        router.push(context.url)
        // 等待路由挂载结束
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 没有匹配到路由返回404
            if (!matchedComponents.length) {
                return reject({
                    code: 404
                })
            }

            // 遍历匹配到的组件，调用asyncData方法
            Promise.all(
                matchedComponents.map(cpt => {
                    if (cpt.asyncData) {
                        cpt.asyncData({
                            store,
                            route: router.currentRoute
                        })
                    }
                })
            ).then(() => {
                // 将全局的state传递给context带到浏览器端做两端状态同步
                context.state = store.state
                // 匹配到路由返回app
                resolve(app)
            })
        }, reject)
    })
}
