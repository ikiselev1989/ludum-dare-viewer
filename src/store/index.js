import Vue from 'vue'
import Vuex from 'vuex'
import {
    CURRENT_EVENT,
    CURRENT_TYPE,
    FILTERED_LIST,
    ITEM_LIMIT,
    LIST,
    MAX_NODES,
    NODE_ID,
    PAGE,
    PAGE_NUMBER,
    PLATFORMS,
    USER,
    VIEWED_LIST
} from '../constants/store'
import {API_PATH} from '../constants/path'
import api from '../utils/api'
import {
    asyncForEach,
    chunkArray,
    feedFilter,
    nodesEventTypeFilter,
    nodesFieldsFilter,
    nodesPlatformsFilter,
    Store
} from '../utils/helpers'
import qs from 'qs'
import Cache from '../utils/cache'

Vue.use(Vuex)

const cache = new Cache()
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

// page number
store.stateObjectImplement(PAGE_NUMBER, {
    value: 0
})

store.stateObjectImplement(PAGE, {
    value: [],
    action: async (store) => {
        const {state} = store

        const feeds = state[FILTERED_LIST]

        const pages = chunkArray(feeds, ITEM_LIMIT)

        if (!pages[state[PAGE_NUMBER]]) {
            let page = (pages.length - 1) > 0 ? pages.length - 1 : 0

            store.commit(PAGE_NUMBER, page)
        }

        store.commit(PAGE, pages.length > 0 ? pages[state[PAGE_NUMBER]] : [])
    }
})

// list
store.stateObjectImplement(LIST, {
    value: [],
    action: async (store) => {
        let list = []

        let page = 0
        const node = store.getters[NODE_ID]

        const cacheData = cache.getEventListCache(node)

        if (!cacheData || (cacheData && cacheData.length === 0)) {
            const loop = async () => {
                const {feed} = await api.get(`${API_PATH}node/feed/${node}/smart+reverse+parent/item/game/compo+jam/?limit=50&offset=${page * 50}`)

                if (feed && feed.length > 0) {
                    const feedIds = feedFilter(feed)

                    list = [...list, ...feedIds]

                    page++

                    if (feed.length === 50) {
                        await loop()
                    }
                }
            }

            await loop()

            let nodes = []
            const promises = []

            if (list && list.length > 0) {
                let feedsChunks = chunkArray(list, MAX_NODES)

                await asyncForEach(feedsChunks, async (feeds) => {
                    promises.push(new Promise(async (resolve) => {
                        const {node} = await api.get(API_PATH + `node2/get/${feeds.join('+')}`)
                        nodes = nodes.concat(nodesFieldsFilter(node))

                        resolve()
                    }))
                })
            }

            await Promise.all(promises).then(() => {
                store.commit(LIST, nodes)
                cache.setEventListCache(node, nodes)
            })
        }
        else {
            store.commit(LIST, cacheData)
        }
    }
})

// visited
store.stateObjectImplement(VIEWED_LIST, {
    value: [],
    action: async ({commit, state, getters}, payload) => {
        const node = getters[NODE_ID]
        let cacheData = state[VIEWED_LIST]

        if (payload) {
            cacheData = [
                ...cacheData,
                payload
            ]

            cache.setViewedEventListCache(node, cacheData)
        }
        else {
            cacheData = cache.getViewedEventListCache(node)
        }

        commit(VIEWED_LIST, cacheData)
    }
})

store.stateObjectImplement(FILTERED_LIST, {
    value: [],
    action: (store) => {
        let filtered_list = nodesPlatformsFilter(store.getters[LIST], store.getters[PLATFORMS])
        filtered_list = nodesEventTypeFilter(filtered_list, store.getters[CURRENT_TYPE])

        store.commit(FILTERED_LIST, filtered_list)
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
