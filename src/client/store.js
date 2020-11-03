import Vue from "vue"
import Vuex from "vuex"

const { Store } = Vuex

Vue.use(Vuex)

export function createStore() {
    return new Store({
        store: {},
        mutations: {},
        actions: {},
        modules: {}
    })
}
