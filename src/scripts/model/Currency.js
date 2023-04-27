export default class Currency {
  constructor (data = {}) {
    this.id             = data.id || ''
    this.code           = data.code || ''
    this.name           = data.name || ''
    this.name_plural    = data.name_plural || ''
    this.symbol         = data.symbol || ''
    this.symbol_native  = data.symbol_native || ''
    this.locale         = data.locale || ''
  }

  constuct(data) {
    this.constructor(data);
  }
}