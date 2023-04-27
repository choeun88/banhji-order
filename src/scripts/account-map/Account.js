export default class Account {
    constructor(data = {}) {
        this.id = data.uuid || ''
        this.uuid = data.uuid || ''
        this.account_uuid = data.account_uuid || ''
        this.name = data.name || ''
        this.local_name = data.local_name || ''
        this.number = data.number || ''
        this.is_taxable = data.is_taxable || 0
        this.banhjiAccCode = data.banhjiAccCode || 0
        this.group_code = data.group_code || 0
        this.parent_account = data.parent_account || {}
        this.type_code = data.type_code || 0
        this.account_type = data.account_type || {}

    }

    constuct(data) {
        this.constructor(data);
    }
}