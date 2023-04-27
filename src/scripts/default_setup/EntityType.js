module.exports = {
    // Accounting
    JOURNAL: "journal",
    SALE_DEPOSIT_VIEW: "sale_deposit_view",
    AUTO_JOURNAL: "auto_journal",
    GENERAL_JOURNAL: "general_journal",
    ADJUSTMENT: "adjustment",
    TRANSACTION_TYPE: {
        journal:"General Journal",
        expenses: "Expenses",
        cash_advance: "Cash Advance",
        advance_settlement: "Advance Settlement",
        reimbursement: "Reimbursement",
        sale_deposit_view: "Sale Deposit View",
        adjustment: "Adjustment"
    },
    JOURNAL_TYPES: [
        { text:"General Journal", value:"general_journal" },
        { text:"Adjustment", value:"adjustment" },
        { text:"Opening Balance", value:"opening_balance" },
        { text:"Closing Entry", value:"closing_entry" },
        { text:"Reclassification", value:"reclassification" },
        { text:"Accrual", value:"accrual" },
        { text:"Depreciation/Amortization", value:"depreciation_amortization" },
        { text:"Other", value:"other" }
    ],

    // Working Capital
    EXPENSES: "expenses",
    EXPENSE_SUMMARY: "expenses_summary",
    ADVANCE_REQUEST: "advance_request",
    CASH_ADVANCE: "cash_advance",
    ADVANCE_SETTLEMENT: "advance_settlement",
    REIMBURSEMENT: "reimbursement",
    CASH_TRANSACTION_TYPES:[
        { text:"Deposit", value:"deposit" },
        { text:"Withdrawal", value:"withdrawal" },
        { text:"Transfer", value:"transfer" },
    ],
    FUND_RECEIPT : "fund_receipt",

    // Reconciliation
    CASH_RECONCILIATION: "cash_reconciliation",
    BANK_RECONCILIATION_MANUAL: "bank_reconciliation_manual",
    BANK_RECONCILIATION_BANK_FEEDS: "bank_reconciliation_bank_feed",

    // Loan
    LOAN: "loan",
    FINANCIAL_INSTITUTE: "financialinstitute",
    BANK_ACCOUNT: "bankaccount",

    // CONTACT
    SUPPLIER : "supplier",
    EMPLOYEE : "employee"
};