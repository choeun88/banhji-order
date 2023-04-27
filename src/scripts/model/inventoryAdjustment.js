export default class InventoryAdjustment {
    constructor(data = {}) {
        this.id = data.id || ''
        this.uuid = data.uuid || '' // qldb id
        this.type = data.type || ''
        this.journal_uuid = data.journal_uuid || ''
        this.number = data.number || ''
        this.referenceNo = data.referenceNo || ''
        this.abbr = data.abbr || ''
        this.itemLine = data.itemLine || {}
        this.account = data.account || {}
        this.stockCount = data.stockCount || {}
        this.transactionDate = data.transactionDate || new Date().toISOString().substring(0, 10)
        this.transactionType = data.transactionType || {}
        this.monthOf = data.monthOf || new Date().toISOString().substring(0, 7)
        this.segment = data.segment || {}
        this.location = data.location || {}
        this.project = data.project || {}
        this.employee = data.employee || {}
        this.exchangeRate = data.exchangeRate || {}
        this.currency = data.currency || {}
        this.jRaw = data.jRaw || []
        this.transactionNote = data.transactionNote || ''
        this.journalNote = data.journalNote || ''
        this.txnRate = data.txnRate || 1
        this.amount = data.amount || 0
        this.exchangeAmount = data.exchangeAmount || 1
        this.qty = data.qty || 1
        this.dr = data.dr || 0
        this.cr = data.cr || 0
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 7)
    }

    constuct(data) {
        this.constructor(data);
    }
}

