export default class  {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.abbr                   = data.abbr || 'EM' 
        this.name                   = data.name || 'Employee'
        this.format                 = data.format   || 5
        this.separator              = data.separator || '-'
        this.preview                = data.preview || 'EM-00001'
    }
    constuct(data) {
        this.constructor(data);
    }
}
