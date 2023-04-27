module.exports = {
    PAYMENT_OPINION_TYPE: {
        CASH_PAYMENT: 'Cash',
        BILL_PAYMENT: 'Bill Payment',
        CARD_PAYMENT: 'Card Payment',
        QR_PAYMENT: 'QR Payment',
        BANK_TRANSFER: 'Bank Payment',
        BANK_DISBURSEMENT: 'Bank Disbursement',
        CHEQUE_PAYMENT: 'Cheque Payment'
    },
    TYPE_CUSTOMER: 'Customer',
    TYPE_SALE: 'Sale',
    TYPE_VENDOR: 'Vendor',
    TYPE_PURCHASE: 'Purchase',
    TYPE_SUPPLIER: 'Supplier',
    ACCOUNT_TYPE_NUMBER: 3,
    MAX_DECIMAL: 5,
    LATE_FEE: {
        METHOD_FIXED: 'Fixed',
        METHOD_COMPOUND: 'Compound',
        NATURE_AMOUNT: 'Amount',
        NATURE_PERCENTAGE: 'Percentage',
        METHOD: ['Fixed', 'Compound'],
        NATURE: ['Amount', 'Percentage']
    }
}