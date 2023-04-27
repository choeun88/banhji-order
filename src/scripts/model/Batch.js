export default class Batch {
  constructor(data = {}) {
    this.id = data.id || ''
    this.batchId = data.batchId || ''
    this.expireDate = data.expireDate || new Date().toISOString().substr(0, 10)
    this.description = data.description || ''
    this.stock = data.stock || ''
  }
  constuct(data) {
    this.constructor(data);
  }
}