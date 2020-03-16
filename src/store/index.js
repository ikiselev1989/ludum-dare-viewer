import Vue from 'vue'
import Vuex from 'vuex'
import {NODE_ID, LIST, PAGE, CURRENT_EVENT, CURRENT_TYPE, USER, PLATFORMS} from '../constants/store'
import {API_PATH} from '../constants/path'
import api from '../utils/api'
import {feedFilter, nodesFilter, Store} from '../utils/helpers'
import qs from 'qs'

Vue.use(Vuex)

let store = new Store()

// current event
store.stateObjectImplement(CURRENT_EVENT, {
    value: null,
    action: async (store) => {
        const root = await api.get(`${API_PATH}node2/get/1`)
        const {meta} = root.node[0]
        const {featured} = meta

        const {node} = await api.get(`${API_PATH}node2/get/${featured}`)
        const {slug} = node[0]

        store.commit(CURRENT_EVENT, slug)

        return slug
    }
})

// current type
store.stateObjectImplement(CURRENT_TYPE, {
    value: 'All',
})

// node_id
store.stateObjectImplement(NODE_ID, {
    value: 0,
    action: async (store) => {
        const {node_id} = await api.get(`${API_PATH}node2/walk/1/events/ludum-dare/${store.getters[CURRENT_EVENT]}`);
        store.commit(NODE_ID, node_id)

        return node_id
    }
})

// page
store.stateObjectImplement(PAGE, {
    value: 0,
    action: async (store, value) => {
        store.commit(PAGE, value)
        await store.dispatch(LIST)
    }
})

// list
store.stateObjectImplement(LIST, {
    value: [],
    action: async (store) => {
        const {state} = store

        const offset = 24 * state[PAGE]
        const limit = 24

        let currentType = (store.getters[CURRENT_TYPE].toLowerCase()) === 'all' ? 'compo+jam' : store.getters[CURRENT_TYPE]

        const {feed} = await  api.get(`${API_PATH}node/feed/${store.getters[NODE_ID]}/grade-01-result+reverse+parent/item/game/${currentType}?offset=${offset}&limit=${limit}`)

        let list = []

        if (feed.length > 0) {
            const feedIds = feedFilter(feed)

            const {node} = await api.get(API_PATH + `node2/get/${feedIds.join('+')}`)

            list = nodesFilter(node, store.getters[PLATFORMS])
        }

        store.commit(LIST, list)
    }
})

store.stateObjectImplement(USER, {
    value: null,
    action: async (store, form = null) => {
        let id = 0

        if (form) {
            const options = {
                method: 'POST',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: qs.stringify(form),
                url: `${API_PATH}user/login/`,
            };

            try {
                let {data} = await api.request(options)
                id = data.id || id
            } catch (e) {

            }
        }
        else {
            try {
                let {data} = await api.get(`${API_PATH}user/get`)
                id = data.id || id
            } catch (e) {

            }
        }

        store.commit(USER, id)
    }
})

store.stateObjectImplement(PLATFORMS, {
    value: []
})

export default new Vuex.Store(store.value)
