import Vue from 'vue'
import Vuex from 'vuex'
import {NODE_ID, LIST, PAGE, CURRENT_EVENT, CURRENT_TYPE} from '../constants/store'
import api from '../utils/api'
import {feedFilter, nodesFilter, Store} from '../utils/helpers'

Vue.use(Vuex)

const apiPath = 'https://api.ldjam.com/vx/'
let store = new Store()

// current event
store.stateObjectImplement(CURRENT_EVENT, {
    value: null,
    action: async (store) => {
        const root = await api.get(`${apiPath}node2/get/1`)
        const {meta} = root.node[0]
        const {featured} = meta

        const {node} = await api.get(`${apiPath}node2/get/${featured}`)
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
        const {node_id} = await api.get(`${apiPath}node2/walk/1/events/ludum-dare/${store.getters[CURRENT_EVENT]}`);
        store.commit(NODE_ID, node_id)

        return node_id
    }
})

// page
store.stateObjectImplement(PAGE, {
    value: 0,
    action: async (store, value) => {
        store.commit(PAGE, value)
        store.dispatch(LIST)
    }
})

// list
store.stateObjectImplement(LIST, {
    value: [],
    mutation: (state, payload) => state[LIST] = payload,
    action: async (store) => {
        const {state} = store

        const offset = 24 * state[PAGE]
        const limit = 24

        let currentType = (store.getters[CURRENT_TYPE].toLowerCase()) === 'all' ? 'compo+jam' : store.getters[CURRENT_TYPE]

        const {feed} = await  api.get(`${apiPath}node/feed/${store.getters[NODE_ID]}/grade-01-result+reverse+parent/item/game/${currentType}?offset=${offset}&limit=${limit}`)

        if (feed.length > 0) {
            const feedIds = feedFilter(feed)

            const {node} = await api.get(apiPath + `node2/get/${feedIds.join('+')}`)

            store.commit(LIST, nodesFilter(node))
        }
    }
})

export default new Vuex.Store(store.value)
