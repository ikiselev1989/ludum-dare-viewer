import {LD_SITE_PATH, LD_STATIC_PATH} from '../constants/path'
import ICONS from '../constants/icons'
import PLATFORMS from '../constants/platforms'

export class Store {
    constructor() {
        this.value = {}
    }

    stateObjectImplement(name, {value, mutation, action}) {
        if (!mutation)
            mutation = (state, payload) => state[name] = payload

        if (!action)
            action = () => {}

        this.value = {
            ...this.value,
            state: {
                [name]: value,
                ...this.value.state
            },
            mutations: {
                [name]: mutation,
                ...this.value.mutations
            },
            actions: {
                [name]: action,
                ...this.value.actions
            },
            getters: {
                [name]: state => state[name],
                ...this.value.getters
            }
        }
    }
}

export function feedFilter(feed) {
    return feed.map((item) => {
        return item.id
    })
}

export function nodesFieldsFilter(nodes) {
    return nodes.map((item) => {
        let {id, name, meta, path, subsubtype} = item
        let links = []

        Object.keys(meta).map((key) => {
            if (key !== '' && key.match(/^link-\d+$/)) {
                links.push([ICONS[meta[`${key}-tag`]], meta[key], meta[`${key}-name`], PLATFORMS[meta[`${key}-tag`]]])
            }
        })

        return {
            id,
            name,
            type: subsubtype,
            url: LD_SITE_PATH + path.replace('/^\//', ''),
            cover: meta.cover ? `${LD_STATIC_PATH}${meta.cover.replace('///', '')}.480x384.fit.jpg` : process.env.BASE_URL + 'no-image.jpeg',
            sources: links
        }
    })
}

export function nodesPlatformsFilter(nodes, platforms = []) {
    return nodes.filter((node) => {
        if (platforms.length > 0) {
            const filteredLinks = node.sources.filter((item) => {
                return platforms.indexOf(item[3]) !== -1
            })

            if (filteredLinks.length === 0) {
                return false
            }
        }

        return true
    })
}

export function nodesEventTypeFilter(nodes, type = 'all') {
    type = type.toLowerCase()

    if (type === 'all') {
        return nodes
    }

    return nodes.filter((node) => {
        return node.type === type
    })
}

export function chunkArray(arr, size) {
    return Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
        arr.slice(i * size, i * size + size)
    )
}

export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
