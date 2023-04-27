export default class TransactionSource {
    constructor (data = {}) {
        this.uuid = data.uuid || ''
        this.transaction_uuid = data.transaction_uuid || ''
        this.module_id = data.module_id || ''
        this.module_name = data.module_name || ''
        this.type = data.type || ''
    }

    construct(data) {
        this.constructor(data)
    }

}
