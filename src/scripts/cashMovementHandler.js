const axios 	= require('axios')
const apiUrl 	= require('../apiUrl.js') 

// GET
module.exports.getCashMovement = async function (params) {
    try {
        const response = await axios.get(apiUrl.general_ledger_get, params);
        
        let data = []
        if(response.data){
            let result = response.data
            data['numberOfAccount'] = 0
            data['numberOfAccountWithNegativeBalance'] = 0
            data['lines'] = []

            result.forEach(value => {
                if(value.account.account_type.number == 1 || value.account.account_type.number == 5){ // filter Bank Account [1,5]
                    let bal = value.openingBalance
                    if (value.account.account_type.nature == 'Cr') {
                        bal = bal * -1
                    }
                    value.lines.forEach(row => {
                        if (value.account.account_type.nature == 'Cr') {
                            if (row.amount > 0) {
                                bal = bal - row.amount
                            } else {
                                bal = bal + (row.amount * -1) 
                            }
                        } else {
                            bal = bal + row.amount
                        }
                        // Set dr/cr from amount
                        var dr = '', cr = '';
                        if(row.amount < 0){
                            cr = row.amount * -1
                        }else{
                            dr = row.amount
                        }

                        data.lines.push({
                            id              : row.journal.uuid,
                            journal_type    : row.journal.journal_type,
                            journal_date    : new Date(row.journal.journal_date),
                            journal_number  : row.journal.number,
                            description     : row.description,
                            name            : '',
                            account_id      : value.account.uuid,
                            account         : value.account.number +' '+ value.account.name,
                            account_type    : value.account.account_type,
                            account_group   : [],
                            dr              : dr,
                            cr              : cr,
                            balance         : bal,
                            openBal         : value.openingBalance,
                        })
                    })
                }
            })
        }

        return data;
    } catch (error) {
        window.console.error(error);
    }
}