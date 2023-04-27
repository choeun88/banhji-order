let eqOp = [{ text:'Is Exactly', value:'eq' }];
let detailOp = [
    { text:'Is Exactly', value:'eq' },
    { text:'Contains', value:'contains' }
]

module.exports = {
    RULE : [
        { text:'Date', value:'statement_date', operators: eqOp },
        { text:'Number', value:'bank_ref', operators: eqOp },
        { text:'Details', value:'details', operators: detailOp },
        { text:'Debit', value:'debit', operators: eqOp },
        { text:'Credit', value:'credit', operators: eqOp },
        { text:'Currency', value:'currency', operators: eqOp }
    ],
    EXCEL_MAPPING : [
        { text:'Date', value:'statement_date' },
        { text:'Number', value:'bank_ref' },
        { text:'Details', value:'details' },
        { text:'Debit', value:'debit' },
        { text:'Credit', value:'credit' },
        { text:'Balance', value:'balance' },
        { text:'Currency', value:'currency' }
    ]
}