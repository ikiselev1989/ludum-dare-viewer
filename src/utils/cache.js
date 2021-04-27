export default class Cache {
    constructor() {
        this.storageItemPrefix = 'ludum-dare-'
        this.storageViewedItemPrefix = 'ludum-dare-viewed-'
    }

    setEventListCache(event, data) {
        localStorage.setItem(`${this.storageItemPrefix}${event}`, JSON.stringify(data))
    }

    setViewedEventListCache(event, data) {
        localStorage.setItem(`${this.storageViewedItemPrefix}${event}`, JSON.stringify(data))
    }

    getEventListCache(event) {
        const data = localStorage.getItem(`${this.storageItemPrefix}${event}`)

        return data ? JSON.parse(data) : null
    }

    getViewedEventListCache(event) {
        const data = localStorage.getItem(`${this.storageViewedItemPrefix}${event}`)

        return data ? JSON.parse(data) : []
    }

    clearEventListCache(event) {
        localStorage.removeItem(`${this.storageItemPrefix}${event}`)
        localStorage.removeItem(`${this.storageViewedItemPrefix}${event}`)
    }
}