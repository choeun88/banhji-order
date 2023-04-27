export default class ExchangeRate {
  constructor (data = {}) {
    this.id             = data.id || ''
    this.sk             = data.sk || '' // id
    this.pk             = data.pk || '' // institute_id
    this.code           = data.code || ''
    this.name           = data.name || ''
    this.symbol         = data.symbol || ''
    this.symbolNative   = data.symbolNative || ''
    this.source         = data.source || ''
    this.rate           = data.rate || 1
    this.method         = data.method || ''
    this.forYear        = data.forYear || 0
    this.recordDate     = data.recordDate || ''
    this.reportingPeriod = data.reportingPeriod || {}
  }

  constuct(data) {
    this.constructor(data);
  }
}