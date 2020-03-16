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

export function nodesFilter(nodes, platforms) {
    const filteredNodes = nodes.map((item) => {
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
            cover: meta.cover ? `${LD_STATIC_PATH}${meta.cover.replace('///', '')}.480x384.fit.jpg` : '/no-image.jpeg',
            sources: links
        }
    })

    return filteredNodes.filter((node) => {
        if (platforms.length > 0) {
            const filteredLinks = node.sources.filter((item) => {
                return platforms.indexOf(item[3]) !== -1;
            })

            if (filteredLinks.length === 0) {
                return false;
            }
        }

        return node;
    })
}