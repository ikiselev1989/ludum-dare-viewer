import Vue from 'vue'
import Vuex from 'vuex'
import {NODE_ID, LIST, PAGE} from '../constants/store'
import api from '../utils/api'
import {feedFilter, nodesFilter, Store} from '../utils/helpers'

Vue.use(Vuex)

const apiPath = 'https://api.ldjam.com/vx/'
let store = new Store()

// node_id
store.stateObjectImplement(NODE_ID, {
    value: 0,
    mutation: (state, payload) => state[NODE_ID] = payload,
    action: async (store) => {
        const {node_id} = await api.get(`${apiPath}node2/walk/1/events/ludum-dare/45/games`);
        store.commit(NODE_ID, node_id)
    }
})

// page
store.stateObjectImplement(PAGE, {
    value: 0,
})

//
store.stateObjectImplement(LIST, {
    value: [],
    mutation: (state, payload) => state[LIST] = payload,
    action: async (store) => {
        const {state} = store

        const offset = 24 * state[PAGE]
        const limit = 24

        const {feed} = await  api.get(`${apiPath}node/feed/${state[NODE_ID]}/grade-01-result+reverse+parent/item/game/compo+jam?offset=${offset}&limit=${limit}`)

        const feedIds = feedFilter(feed)

        const {node} = await api.get(apiPath + `node2/get/${feedIds.join('+')}`)

        store.commit(LIST, nodesFilter(node))
    }
})

export default new Vuex.Store(store.value)
