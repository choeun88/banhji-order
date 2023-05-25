export default class FormContent {
  constructor (data = {}) {
    this.id = data.id || ''
    this.accountReceivable = data.accountReceivable || false
    this.lateFeeOpt = data.lateFeeOpt || false
    this.saleChannel = data.saleChannel || false
    this.hideSidebar = data.hideSidebar || true
    this.monthOf = data.monthOf || false
    this.segment = data.segment || false
    this.businessUnit = data.businessUnit || false
    this.project = data.project || false
    this.email = data.email || ''
    this.employee = data.employee || false
    this.accountLanguage = data.accountLanguage || 'English'
    this.secondaryAccount = data.secondaryAccount || false
    this.C1 = data.C1 || false
    this.C2 = data.C2 || false
    this.C3 = data.C3 || false
    this.C4 = data.C4 || false
    this.C5 = data.C5 || false
  }

  constuct (data) {
    this.constructor(data)
  }
}
