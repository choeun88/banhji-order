export default class LoanPaymentTerm {
  constructor (data = {}) {
    if(!data) {
      this.uuid = data.uuid || '';
      this.name = data.name || '';
    } else {
      this.name = '';
      this.uuid = '';
    }
  }
  constuct (data) {
    this.constructor(data);
  }
}