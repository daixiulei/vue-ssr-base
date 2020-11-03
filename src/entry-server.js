const { createApp } = require("./app")

module.exports = context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()

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
            // 匹配到路由返回app
            resolve(app)
        }, reject)
    })
}
