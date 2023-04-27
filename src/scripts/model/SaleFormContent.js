export default class SaleFormContent {
    constructor (data = {}) {
      this.id = data.id || ''
      this.serviceDate = data.serviceDate || false
      this.serviceDateTo = data.serviceDateTo || false
      this.discountItem = data.discountItem || false
      this.otherCharge = data.otherCharge || false
      this.specificTax = data.specificTax || false
      this.otherTax = data.otherTax || false
      this.publicLightingTax = data.publicLightingTax || false
      this.saleUnit = data.saleUnit || false
      this.modifier = data.modifier || false
      this.employee = data.employee || false
      this.decimal = data.decimal || 2
      this.saleQuote = data.saleQuote || 'Quote'
      this.saleOrder = data.saleOrder || 'Sale Order'
      this.statement = data.statement || false
      this.accountReceivable = this.accountReceivable || false
      this.lateFeeOpt = this.lateFeeOpt || false
      this.saleChannel = this.saleChannel || false
      this.hideSidebar = this.hideSidebar || false
      this.monthOf = this.monthOf || false
      this.creditLimit = this.creditLimit || false
      this.settings = this.settings || { segment_prefix: '', segment_prefix_order: '', segment_prefix_qoute: '', sale_unit: 'Sale Unit', project: 'Project', priceLevel: false }
  
      this.negativeInventory = data.negativeInventory || true
      this.lateFee = data.lateFee || true
      this.email = data.email || { subject: '#fromTransaction #referenceNo from #name ', copyTo: 'nimol@banhji.com' }
      this.pdfAttachment = data.pdfAttachment || true
      this.invoiceReminder = data.invoiceReminder || false
      this.reminder1 = data.reminder1 || {
        reminder: false,
        reminderDay: 3,
        reminderPeriod: 'Before',
        subjectLine: 'Reminder: Invoice [Invoice No] from [Name]',
        greeting: true,
        title: 'Dear',
        title1: '[Name]',
        emailMessage: 'Just a reminder that we have not received a payment for this invoice yet. Let us know if you have questions.\n' +
                  '\n' +
                  'Thanks for your business!'
  
      }
      this.reminder2 = data.reminder2 || {
        reminder: false,
        reminderDay: 0,
        reminderPeriod: 'after',
        subjectLine: 'Reminder: Invoice [Invoice No] from [Name]',
        greeting: true,
        title: 'Dear',
        title1: '[Name]',
        emailMessage: 'Just a reminder that we have not received a payment for this invoice yet. Let us know if you have questions.\n' +
                  '\n' +
                  'Thanks for your business!'
  
      }
      this.reminder3 = data.reminder3 || {
        reminder: false,
        reminderDay: 3,
        reminderPeriod: 'after',
        subjectLine: 'Reminder: Invoice [Invoice No] from [Name]',
        greeting: true,
        title: 'Dear',
        title1: '[Name]',
        emailMessage: 'Just a reminder that we have not received a payment for this invoice yet. Let us know if you have questions.\n' +
                  '\n' +
                  'Thanks for your business!'
  
      }
      this.subOfCustomer = data.subOfCustomer || false
    }
  
    constuct (data) {
      this.constructor(data)
    }
  }
  