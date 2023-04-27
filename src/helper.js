'use strict'
/* eslint-disable */
import {i18n} from '@/i18n';
import kendo from '@progress/kendo-ui';
import XLSX from "xlsx";
import LinkTemplateComponent from "@/components/kendo_templates/LinkTemplate";
import {
    ClosingDateModel,
    ExchangeRateModel,
    UserModel,
    ClassModel,
} from '@/scripts/model/AppModels';

/* Vuex */
import store from '@/store';
// const InsituteDateFormat = store.getters["institute/dateFormat"];
// const InsituteBaseCurrency = store.getters["institute/baseCurrency"];
// const InsituteApprovedReportingDate = store.getters["institute/approvedReportingDate"];
// const InsituteFiscalDate = store.getters["institute/fiscalDate"];
// const accountLanguage = store.getters["accounting/language"];

/* Cookie */
const cookieJS = require("@/cookie.js");
const cookie = cookieJS.getCookie();

const Swal = require('sweetalert2');
const CryptoJS = require("crypto-js");
const {
    closingDateHandler,
    prefixHandler,
    currencyHandler,
} = require("@/scripts/AppHandlers");
const {AccountTypeCode} = require("@/scripts/default_setup/Collections");
const OrderNumberPL = require("@/scripts/default_setup/OrderNumberPL.js");

let exports = {};

/* Get User */
exports.getUser = () => {
    return new UserModel(cookie.user);
}

// Remove Currency Format From A Number
exports.removeCurrencyFormat = (num) => {
    return num.replace(/[^\d.-]+/g, "");
}

// Link Template
exports.linkTemplate = (displayText, urlPath) => {
    return {
        template: LinkTemplateComponent,
        templateArgs: {
            text: displayText,
            url: urlPath,
            related: {},
        }
    };
}

// Generate Accounting Number
exports.generateAccountingNumber = async (prefixType, transactionDate) => {
    // Call All Prefixes
    let prefixes = await store.dispatch('prefixes/getList');

    let pf = prefixes.find(value => value.type.toLowerCase() === prefixType.toLowerCase());

    // Structure
    let structure = '', txnDate = new Date(transactionDate);
    switch (pf.structure.toLowerCase()) {
        case 'yyyy':
            structure = txnDate.getFullYear().toString();
            break;
        case 'yy':
            structure = txnDate.getFullYear().toString().substr(2);
            break;
        case 'yyyymm':
            structure = txnDate.getFullYear().toString() + (txnDate.getMonth() + 1).toString().padStart(2, '0');
            break;
        case 'yymm':
            structure = txnDate.getFullYear().toString().substr(2) + (txnDate.getMonth() + 1).toString().padStart(2, '0');
            break;

        default:// None structure
            break;
    }

    // Prefix Format "JE-yymm-00000"
    let shortPrefix = pf.abbr + pf.prefixSeparator + structure + pf.numberSeparator,
        fullPrefix = pf.abbr + pf.prefixSeparator + pf.structure + pf.numberSeparator + '0'.repeat(pf.format) + `@${pf.sequcencing}`;

    // Call Last Number
    const lastNumberResponse = await prefixHandler.lastNumber({
        params : {
            prefix          : fullPrefix,
            shorten_prefix  : shortPrefix,
            journal_date    : transactionDate,
        }
    });
    const lastNumbers = lastNumberResponse.data;

    /* Starting Number */
    let lastNumber = pf.number;

    /* Sequcencing */
    switch (pf.sequcencing.toLowerCase()) {
        case 'month':// Month
            if(kendo.parseInt(lastNumbers.monthly_last_number) !== 0){
                lastNumber = kendo.parseInt(lastNumbers.monthly_last_number) + 1;
            }

            break;
        case 'year':// Year
            if(kendo.parseInt(lastNumbers.yearly_last_number) !== 0){
                lastNumber = kendo.parseInt(lastNumbers.yearly_last_number) + 1;
            }

            break;
        default:// Prefix
            if(kendo.parseInt(lastNumbers.last_number) !== 0){
                lastNumber = kendo.parseInt(lastNumbers.last_number) + 1;
            }
            
            break;
    }

    /* Full Number */
    let number = pf.abbr + pf.prefixSeparator + structure + pf.numberSeparator + lastNumber.toString().padStart(pf.format, '0');

    /* Result */
    return {
        number: number,
        last_number: lastNumber,
        prefix_format: fullPrefix,
        prefix: pf,
    }
}

// Get Last Exchange Rate By Date
exports.getLastExchangeRateByDate = async (date, code) => {
    let xrate = new ExchangeRateModel(InsituteBaseCurrency);

    if (code !== InsituteBaseCurrency.code) {
        const response = await currencyHandler.getLastExchangeRateByDate(date, code);
        if (response.data.data) {
            xrate = new ExchangeRateModel(response.data.data[0]);
        }
    }

    return xrate;
}

// Convert Date to ISO
exports.toISODate = (aDate) => {
    let today = new Date();
    let theDate = new Date(aDate || "");
    theDate.setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());

    return new Date(theDate.getTime()).toISOString();
}

/* Convert Date to Month Of Format */
exports.toMonthOfFormat = (aDate) => {
    return kendo.toString(new Date(aDate), "yyyy-MM");
}

// Get Last Day
exports.getLastDay = (d) => {
    let aDate = new Date(d),
		lastDay = new Date(aDate.getFullYear(), aDate.getMonth()+1, 0);

    return lastDay;
}

// Date Format
exports.dateFormat = (theDate) => {
    let formatedDate = theDate;
    if (formatedDate !== '') {
        formatedDate = kendo.toString(new Date(theDate), InsituteDateFormat)
    }

    return formatedDate;
}
exports.dateTimeFormat = (theDate) => {
    let formatedDate = theDate;
    if (formatedDate !== '') {
        formatedDate = kendo.toString(new Date(theDate), InsituteDateFormat + " hh:mm tt")
    }

    return formatedDate;
}
// Date Format form
exports.instituteDateFormat = () => {
    return InsituteDateFormat;
}
// Alert Error Message
exports.alertErrorMsg = (msg = '') => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: i18n.t('Oops...!'),
        text: msg,
        showConfirmButton: true,
    });
}

// Pre-Confirm Closing Date
async function preConfirmClosingDate(txnDate) {
    let result = false,
        cdate = await closingDateHandler.last();

    if (typeof cdate.data.data != "undefined") {
        let cd = new ClosingDateModel(cdate.data.data);

        if (txnDate <= kendo.toString(new Date(cd.closingDate), "yyyy-MM-dd")) {
            let confirmPsw = await Swal.fire({
                title: "Please Enter Password!",
                text: "You are recording within closing date, please confirm password.",
                icon: "warning",
                input: "password",
                inputPlaceholder: "Password...",
                inputAttributes: {
                    autocapitalize: "off",
                    autocorrect: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,
                preConfirm: (password) => {
                    // Decrypt (Password, Key)
                    let pswInBytes = CryptoJS.AES.decrypt(
                        cd.password,
                        cookie.instituteId
                    );
                    let originalPsw = pswInBytes.toString(
                        CryptoJS.enc.Utf8
                    );

                    // Compare Password
                    if (password === originalPsw) {
                        return true;
                    } else {
                        Swal.showValidationMessage(
                            "Password Does Not Macth!"
                        );
                    }
                },
            });
            result = Boolean(confirmPsw.value);
        } else {
            result = true; // Greater than closing date
        }
    } else {
        result = true; // Not use closing date
    }

    return result;
}

// Show Alert
function showAlert(msg) {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: i18n.t('Oops...!'),
        text: msg,
        showConfirmButton: true,
    });
}
// Show Alert
exports.showAlertCredit =(msg) => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: i18n.t('credit_limit'),
        text:i18n.t(msg), 
        showConfirmButton: true,
    });
}
// Field Require Alert
exports.fieldRequired =(msg) => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: i18n.t('Oops...!'),
        text:i18n.t(msg), 
        showConfirmButton: true,
    });
}
// Get Fiscal Date By Date (Object)
exports.getFiscalDateByDate = (theDate, isPrevious=false) => {
    let aDate = new Date(theDate);

    let fiscalYear = InsituteFiscalDate.find((i) => aDate >= new Date(i.start_date) && aDate <= new Date(i.end_date));
    if(isPrevious){
        let currentIndex = InsituteFiscalDate.indexOf(fiscalYear);

        fiscalYear = InsituteFiscalDate[currentIndex -1];
    }

    return fiscalYear;
}

// Generate Fiscal Months
exports.generateFiscalMonths = (startDate, endDate, columnBy, dateFormat="MMM yyyy") => {
    let fiscalMonths = [],
        interval = 1,
        sdate = new Date(startDate),
        edate = new Date(endDate),
        pairMonth = edate;

    while (sdate <= edate) {
        if (columnBy === "4") { // Quarter
            interval = 3;
            pairMonth = new Date(sdate);
            pairMonth.setMonth(sdate.getMonth() + (interval -1));
            fiscalMonths.push(kendo.toString(sdate, dateFormat) +" - "+ kendo.toString(new Date(pairMonth), dateFormat));
        } else if (columnBy === "2") { // Semi-Annual
            interval = 6;
            pairMonth = new Date(sdate);
            pairMonth.setMonth(sdate.getMonth() + (interval -1));
            fiscalMonths.push(kendo.toString(sdate, dateFormat) +" - "+ kendo.toString(new Date(pairMonth), dateFormat));
        } else { // Month
            interval = 1;
            fiscalMonths.push(kendo.toString(sdate, dateFormat));
        }

        // Next Month
        sdate.setMonth(sdate.getMonth() + interval);
    }
    
    return fiscalMonths;
}

// Format FiscalDate
exports.formatFiscalDate = (aDate) => {
    return kendo.toString(new Date(aDate), "MMM yyyy");
},

// Validate Closing Date (B Kethya forced me to do like this, in case he says No) also Rothny jol dai jol jerng
exports.validateClosingDate = async (aDate) => {
    let today = new Date(), 
        txnDate = new Date(aDate);
    today.setHours(0,0,0,0);
    txnDate.setHours(0,0,0,0);

    let currentFiscalYear = InsituteFiscalDate.find((i) => today >= new Date(i.start_date).setHours(0,0,0,0) && today <= new Date(i.end_date).setHours(0,0,0,0));
    let txnFiscalYear = InsituteFiscalDate.find((i) => txnDate >= new Date(i.start_date).setHours(0,0,0,0) && txnDate <= new Date(i.end_date).setHours(0,0,0,0));

    if(txnFiscalYear.end_date < currentFiscalYear.start_date){ /* Booking backdate */
        if(InsituteApprovedReportingDate < today){ /* Not allow to book backdate */
            showAlert(i18n.t("msg_alert_approved_reporting_date"));

            return false;
        }
    }
    return await preConfirmClosingDate(txnDate);

    // Check if back date transaction
    // if (txnDate < today) {
    //     let currentFiscalDate = institute.fiscalDate.find((i) => i.start_date <= today && i.end_date >= today),
    //         approvedReportingDate = kendo.toString(new Date(institute.approvedReportingDate), "yyyy-MM-dd");

    //     // Approved Reporting Date
    //     if (txnDate < currentFiscalDate.start_date) {// Within previous fiscal date
    //         if (txnDate >= approvedReportingDate) {
    //             result = await preConfirmClosingDate(txnDate);
    //         } else {// Within previous fiscal date with expired approved reporting date
    //             showAlert(i18n.t("msg_alert_approved_reporting_date"));
    //         }
    //     } else {// Within Closing Date
    //         result = await preConfirmClosingDate(txnDate);
    //     }
    // } else {
    //     result = true;// None back date transaction
    // }

    // return result;
}

// Get Max Number Of Account
exports.getMaxNumberOfAccount = async (accountTypeCode) => {
    await store.dispatch('accounts/getList');

    let paList = store.state.accounts.list.filter(item => item.type_code === accountTypeCode);

    let number = "";
    if(paList.length > 0){
        let parentNums = [];
        paList.forEach(value => {
            parentNums.push(kendo.parseInt(value.number));
        });
        let bigNum = Math.max(...parentNums);
        number = bigNum + 10;
    }

    return number;
}

// Group Expenses by Cash Advance (Advance Settlement Page)
exports.groupExpenseByCashAdvance = (data) => {
    let g = {};

    data.forEach(value => {
        let id = value.journal.uuid;
        if (value.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE) {
            if (g[id]) {
                g[id]['amount'] += value.amount * -1;
                g[id]['exchanged_amount'] += value.exchanged_amount * -1;
            } else {
                g[id] = {
                    uuid: id,
                    name: value.primary_contact.name,
                    number: value.journal.number,
                    amount: value.amount * -1,
                    description: value.description,
                    exchanged_amount: value.exchanged_amount * -1,
                    currency: value.currency,
                    segment_uuid: value.segment_uuid,
                    journal_date: value.journal?.journal_date  || '',
                    exchange_rate: value.exchange_rate
                }
            }
        }
    })

    return Object.values(g);
}

// Group Expense By Employee (Reimburstment Page)
exports.groupExpenseByEmployee = (data) => {
    let g = [];

    data.forEach(value => {
        let amt = 0, xamt = 0;
        value.expense_entries.forEach(ele => {
            if (ele.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE) {
                amt += ele.amount * -1;
                xamt += ele.exchanged_amount * -1;
            }
        });

        g.push({
            uuid: value.uuid,
            name: value.supplier.name,
            number: value.number,
            amount: amt,
            exchanged_amount: xamt,
            currency: value.bill_currency,
        });
    })

    return g;
}

// Account Editor
exports.accountEditor = (container, options, data) => {
    let acc_language = accountLanguage === 'English' ? "account_type.name" :  "account_type.local_name";
    let acc_template = accountLanguage === 'English' ?"<span>#=number# #=name#</span>" :  "<span>#=number# #=local_name#</span>";
    return kendo.jQuery('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            autoWidth: true,
            height: 400,
            filter: "contains",
            filtering: function(e) {
                var filter = e.filter;
                
                var newFilter = {
                    logic: "or",
                    filters: [
                        { field: "number", operator: "contains", value: filter.value },
                        { field: "name", operator: "contains", value: filter.value },
                    ]
                };
                this.dataSource.filter(newFilter);

                // Important: stop default filter
                e.preventDefault();
            },
            dataTextField: "number",
            dataValueField: "uuid",
            template: acc_template ,
            optionLabel: "--- Select ---",
            dataSource: new kendo.data.DataSource({
                data: data,
                group: {
                    field: acc_language ,
                    compare: function (a, b) {// Order by number
                        if (a.items[0].number === b.items[0].number) {
                            return 0
                        } else if (a.items[0].number > b.items[0].number) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                },
            })
        })
}

// Read Excel File
exports.getExcelData = async (rawFile) => {
    return new Promise((resolve) => {
        /* Initial File Reader */
        const reader = new FileReader();

        reader.onload = (e) => {
            /* Parse data */
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: 'array'});

            /* Get first worksheet */
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            /* Convert array of arrays */
            let results = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            resolve(results);
        }

        // Read File
        reader.readAsArrayBuffer(rawFile);
    })
}

// Transalate to local language
exports.localTranslate = (lang) => {
    let word = lang;

    if (lang.toLowerCase() === "asset") {
        word = "ទ្រព្យសកម្ម";
    } else if (lang.toLowerCase() === "current asset") {
        word = "ទ្រព្យសកម្មរយៈពេលខ្លី";
    } else if (lang.toLowerCase() === "non-current asset") {
        word = "ទ្រព្យសកម្មរយៈពេលវែង";
    } else if (lang.toLowerCase() === "liabilities") {
        word = "បំណុល";
    } else if (lang.toLowerCase() === "current liabilities") {
        word = "បំណុលរយៈពេលខ្លី";
    } else if (lang.toLowerCase() === "non-current liabilities") {
        word = "បំណុលរយៈពេលវែង";
    } else if (lang.toLowerCase() === "equity") {
        word = "ដើមទុន";
    } else if (lang.toLowerCase() === "retained earning") {
        word = "ប្រាក់ចំណេញរក្សាទុក";
    }

    return word;
}

/* Reform data to HierarchicalDataSource */
exports.reformDataToHierarchicalDataSource = (dataItems) => {
    let g = {};

    /* Parent Levels */
    dataItems.forEach(value => {
        let clazz = new ClassModel(value);
        
        /* Nature */
        if(clazz.clazz.id !== ""){
            g[clazz.clazz.id] = {
                id : clazz.clazz.id,
                parentId : null,
                code : clazz.clazz.code,
                name : clazz.clazz.name,
                items : [],
                hasChildren : true,
            };
        }
        /* Type */
        if(clazz.classType.id !== ""){
            g[clazz.classType.id] = {
                id : clazz.classType.id,
                parentId : clazz.clazz.id,
                code : clazz.classType.code,
                name : clazz.classType.name,
                items : [],
                hasChildren : true,
            };
        }
        /* Group */
        if(clazz.classGroup.id !== ""){
            g[clazz.classGroup.id] = {
                id : clazz.classGroup.id,
                parentId : clazz.classType.id,
                code : clazz.classGroup.code,
                name : clazz.classGroup.name,
                items : [],
                hasChildren : true,
            };
        }
        /* Sub Group */
        if(clazz.classSubGroup.id !== ""){
            g[clazz.classSubGroup.id] = {
                id : clazz.classSubGroup.id,
                parentId : clazz.classGroup.id,
                code : clazz.classSubGroup.code,
                name : clazz.classSubGroup.name,
                hasChildren : false,
            };
        }
    });

    /* Add Parents */
    let list = [];
    for (let key in g)
    list.push(g[key]);
    
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].items = []; // initialize the children
    }
    
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parentId]].items.push(node);
        } else {
            roots.push(node);
        }
    }
    
    return roots;
}

/* Parse Float From String */
exports.parseFloatFromString = (value, coerce) => {
    value = String(value).trim();

    if ('' === value) {
        return value;
    }

    // check if the string can be converted to float as-is
    var parsed = parseFloat(value);
    if (String(parsed) === value) {
        return fixDecimals(parsed, 2);
    }

    // replace arabic numbers by latin
    value = value
    // arabic
    .replace(/[\u0660-\u0669]/g, function(d) {
        return d.charCodeAt(0) - 1632;
    })

    // persian
    .replace(/[\u06F0-\u06F9]/g, function(d) {
        return d.charCodeAt(0) - 1776;
    });

    // remove all non-digit characters
    var split = value.split(/[^\dE-]+/);

    if (1 === split.length) {
        // there's no decimal part
        return fixDecimals(parseFloat(value), 2);
    }

    for (var i = 0; i < split.length; i++) {
        if ('' === split[i]) {
            return coerce ? fixDecimals(parseFloat(0), 2) : NaN;
        }
    }

    // use the last part as decimal
    var decimal = split.pop();

    // reconstruct the number using dot as decimal separator
    return fixDecimals(parseFloat(split.join('') +  '.' + decimal), 2);
}

function fixDecimals(num, precision) {
    return (Math.floor(num * 100) / 100).toFixed(precision);
}
exports.requireRate = () => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: i18n.t('set_exchange_rate'),
        text:  i18n.t('set_exchange_rate_desc'),
        confirmButtonText: i18n.t('ok'),
        showConfirmButton: true,
    });

}

/* Discount Calculation */
exports.getDiscountCalculation = (discountItem, subTotal) => {
    let amount = 0;
    if (discountItem.nature.toLowerCase() === "amount") {
        amount = kendo.parseFloat(discountItem.amount);
    } else if (discountItem.nature.toLowerCase() === "percentage") {
        amount = subTotal * (kendo.parseFloat(discountItem.amount) / 100);
    }

    return amount;
}

/* Tax Calculation */
exports.getTaxCalculation = (tax, amount) => {
    var formula = tax.formula;
    var inAmt = kendo.parseFloat(amount);
    var nAmt = kendo.parseFloat(amount);
    var taxBase = kendo.parseFloat(tax.taxBase) / 100;
    var rate = kendo.parseFloat(tax.rate) / 100;
    var total = eval(formula);
    window.console.log(inAmt, nAmt, taxBase, rate, formula, total);

    return total;
}

/* Apply Segment Share Rate */
exports.applySegmentShareRates = (entry, segmentShareRates) => {
    let shareRate = [];
    if(segmentShareRates.length > 0){
        segmentShareRates.forEach(value => {
            let shareAmount = 0;
            if(value.rate != 0){
                shareAmount = (entry.amount * value.rate) / 100;
            }
            shareRate.push({
                uuid: value.id,
                tax_amount: entry.tax_amount,
                tax_exchanged_amount: entry.tax_exchanged_amount,
                currency_amount: [
                    { 
                        name: entry.currency.name,
                        amount: shareAmount,
                        code: entry.currency.code,
                        exchanged_amount: shareAmount * entry.exchange_rate,
                        tax_amount: entry.tax_amount,
                        tax_exchanged_amount: entry.tax_exchanged_amount
                    }
                ],
                balance: shareAmount * entry.exchange_rate,
                percentage: value.rate,
            });
        });
    }

    return shareRate;
}

/* Get List Of Dates */
exports.getListOfDates = (date1, date2) => {
    let dates = [],
        interval = 0,
        d1 = new Date(date1),
        d2 = new Date(date2);
    
    while (d1 <= d2) {
        dates.push(d1.toISOString().substring(0, 10));

        // Next Month
        d1.setMonth(d1.getMonth() + 1);
        interval++;
    }
    
    return dates;
}

/* Get Order Number PL */
exports.getOrderPL = (number) => {
    let order = number;
    
    if(OrderNumberPL[number]){
        order = OrderNumberPL[number];
    }
    
    return order;
}

export default exports;