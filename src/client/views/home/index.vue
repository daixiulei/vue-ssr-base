<!--
 * @Author: xiulei.dai
 * @Date: 2020-11-03 14:49:59
 * @LastEditors: xiulei.dai
 * @LastEditTime: 2020-11-03 16:22:47
 * @Description: 
-->
<template>
    <div></div>
</template>

<script>
import module from "./module"
export default {
    asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
        store.registerModule("home", module)
        return store.dispatch("home/fetchData", route.params.id)
    }
}
</script>

<style lang="scss" scoped></style>
