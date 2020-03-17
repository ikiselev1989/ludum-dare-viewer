export default class Cache {
    constructor() {
        this.storageItemPrefix = 'ludum-dare-'
    }

    setEventListCache(event, data) {
        localStorage.setItem(`${this.storageItemPrefix}${event}`, JSON.stringify(data))
    }

    getEventListCache(event) {
        const data = localStorage.getItem(`${this.storageItemPrefix}${event}`)

        return data ? JSON.parse(data) : null
    }
}