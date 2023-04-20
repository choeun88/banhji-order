const { dataStore } = require("@/observable/store");
const company_data = dataStore.company
const { getFormSetting } = require("@/scripts/settingsHandler.js")
const kendo =  require("@progress/kendo-ui");
const  {vuetify} = require('./vuetify.js')
var table_header = 'capitalize';
var marginX = 0.75;
var styles = {};
const Header = (page,is_print)=>{
    return`
        <html>
            <head>
            <title>Test</title>

                <style rel="stylesheet" >
                    @font-face {
                        font-family: 'Niradei-Bold';
                        font-weight: bold;
                        font-display: swap;
                        font-style: normal;
                        src: url('https://s3.ap-southeast-1.amazonaws.com/images.banhji/font/Niradei-Bold.woff2') format('woff2');
                    }
                    @font-face {
                        font-family: 'Niradei-Regular';
                        font-weight: 600;
                        font-display: swap;
                        font-style: normal;
                        src: url('https://s3.ap-southeast-1.amazonaws.com/images.banhji/font/Niradei-Regular.woff2') format('woff2');
                    }
                    ${is_print ? vuetify() : ''}
                    * {
                        -webkit-print-color-adjust: true;
                        -webkit-print-color-adjust: exact;
                    }
                    @page {
                        size: ${page};
                        margin: 0.75in ${marginX}in; 
                    }
  
                    body { 
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    table,tr,td{
                        border-collapse: collapse !important; 
                    }
                    table{
                    width:100%;
                    }
                    
                    @media print {
                        html, body {
                            font-family: 'Niradei-Regular', serif;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact;
                        },
                        .pagebreak {
                            clear: both;
                            page-break-before: always !important;
                            page-break-after: always !important;
                        }
                        table { page-break-after:auto }
                        tr    { page-break-inside:avoid; break-after:auto }
                        thead {display: table-row-group;}
                        h4,h2,h1,h5,h3{
                            font-family: 'Niradei-Bold', serif;
                            font-weight: 700;
                        }
                        td,span{
                            font-family: 'Niradei-Regular', serif;
                        }
                    }
                    .items tr td{
                        border: 0.7px solid #000;
                        padding: 6px;
                        height: 32px;
                    }
                    .items_bottom th{
                        padding: 8px 6px !important ;
                        border-bottom: 1px solid  #000;
                        border-collapse: collapse;
                        border-right: none !important;
                        border-left: none !important;
                    }
                    .form_setting table th{
                        padding: 8px 6px !important ;
                        border: 1px solid  #000;
                        border-collapse: collapse;
                        clear: both;
                        page-break-before: always !important;
                        page-break-after: always !important;
                        text-transform: ${table_header};
                        font-size: ${styles.fontSize}px !important;
                    }
                    .form_setting td{
                        font-size: ${styles.fontSize}px !important;
                        font-family: 'Niradei-Regular';
                    }
                    .acc_header{
                        text-transform: ${table_header};
                        font-size: ${styles.fontSize}px !important;
                    }
                    .form_setting h2{
                        font-size: ${styles.headerFontSize}px !important;
                    }
                    .form_setting p{
                        font-size: ${styles.fontSize}px !important;    font-family: 'Niradei-Regular'  !important;
                    }
                    .acc_header{
                        text-transform: ${table_header};
                    }
                    table th td{
                        clear: both;
                        break-before: always !important;
                        break-after: always !important;
                    }
                    .items_bottom tr td{
                        border-bottom: 1px solid #000 !important;
                        padding: 6px;
                        height: 32px;
                    }
                    .items_bottom_prepare tr td{
                        border-bottom: 1px solid #000 !important;
                        padding: 6px;
                        height: 32px;
                    }
                    .items_bottom_prepare tr td:first-child{
                        border-top: 1px solid #000 !important;
                    }
                    .items_bottom_prepare tr td:nth-child(2){
                        border-top: 1px solid #000 !important;
                    }
                    .items_bottom_prepare tr td:nth-child(3){
                        border-top: 1px solid #000 !important;
                    }
                    .items_tb_border tr td{
                        border: 1px solid #000;
                        padding: 6px;
                        height: 32px;
                    }
                    .flex{
                        display: flex;
                    }
                    .tleft{
                        text-align: left !important;
                    }
                    .tright{
                        text-align: right !important;
                    }
                    .text-bold{
                        font-weight: bold;
                        font-family: 'Niradei-Bold' !important;
                    }
                    .text-center{
                        text-align: center !important;
                    }
                    .signature_td{
                        height: 60px !important;
                    }
               
                </style>
            </head>
        <body>
`;
}
const Footer = `</body></html>`

function rederList(data,empty_td,show_column){
    var items = ""
    data.forEach((i,index) => {
        let currency_d =  i.currency.code == 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative : i.currency.symbol_native :  '' 
        let currency_r =  i.currency.code == 'KHR' || i.currency.code != 'USD' ?  i.currency.symbolNative :  '' 
    
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+ i.referenceNo+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+ i.billNumber +'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+kendo.toString(new Date(i.dueDate), i.dateFormat) +'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+ i.overDue +'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+i.paymentTerm.name+'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+i.paymentOption.name+'</td>': ''} 
                    ${show_column.eight ? '<td class="text-center">'+i.bankReferenceNo +'</td>': ''} 
                    ${show_column.nine ? '<td class="text-center">'+i.status+'</td>': ''} 
                    ${show_column.ten ? '<td class="text-center">'+i.currency.code+'</td>': ''} 
                    ${show_column.ten1 ? '<td class="text-center">'+ currency_d+kendo.toString(i.amount, i.decimalFormat)+currency_r  +'</td>': ''} 
                    ${show_column.ten2 ? '<td class="text-center">'+  currency_d+kendo.toString(i.discount, i.decimalFormat)+currency_r   +'</td>': ''} 
                    ${show_column.ten3 ? '<td class="text-center">'+ currency_d+kendo.toString(i.amountTobePaid, i.decimalFormat)+currency_r  +'</td>': ''} 
                    ${show_column.ten4 ? '<td class="tright">'+ currency_d+kendo.toString(i.paidAmountTobase, i.decimalFormat)+currency_r  +'</td>': ''} 
                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td +  empty_td
    }
    return items;
}

function rederListAcounting(data,language){
    var items = ""
    data.forEach((i) => {
        i.entries.forEach(en => {
            let currency_d_base =  en.currency.code == 'USD' ?  en.currency.symbolNative ? en.currency.symbolNative :'$' : ''
            let currency_r_base =  en.currency.code !== 'USD' ?  en.currency.symbolNative ? en.currency.symbolNative :'៛'  : ''
            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${language == 'English' ? en.account.name  :  language == 'Khmer'?  en.account.local_name :  en.account.local_name+ '<br/>'+  en.account.name }</td>
                <td class="tleft">${en.type == 'dr' ?  currency_d_base+en.exchangeAmount+currency_r_base : '0'}</td>
                <td class="tleft">${en.type == 'cr' ?  currency_d_base+en.exchangeAmount*(-1)+currency_r_base : '0'}</td>
                <td class= " ">${en.segment.name}</td>
            </tr>
        `;
        })
  
    })
    return items;
}

exports.PaymentVoucher = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let address_center_log_left = ""
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'

    }
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';

    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
    }else{
        m_right = "margin-right:20px";
    }
    if(setting.address.align == 'center'){
        center_text = "text-align:center !important";
        address_center_log_left = true
    }else if(setting.address.align == 'left'){
        center_text = "text-align:left !important";
        address_center_log_left = false
    }else{
        center_text = "text-align:right !important";
        address_center_log_left = false
    }
    let hide_logo =''
    if(setting.logo.hide){
        hide_logo ="display:none;"
    }
    let is_header = ''
    if(setting.header){
        is_header ="display:none;"
    }
    let currency_d_base = ''
    let currency_r_base = ''
    if(data){
        currency_d_base =  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'$' : ''
        currency_r_base =  data.currency.code !== 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'៛'  : ''
    }
    // column
    let column_1  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Purchase No': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ​ពី' : 'កាលបរិច្ឆេទ​ពី <br/> Purchase No'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Vendor Invoice No': setting.language=='Khmer' ?  'ដល់កាលបរិច្ឆេទ​' : 'ដល់កាលបរិច្ឆេទ​  <br/> Vendor Invoice No'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Due Date':setting.language=='Khmer' ?  'ថ្ងៃផុតកំណត់' : 'ថ្ងៃផុតកំណត់<br/> Due Date'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Over Due': setting.language=='Khmer' ?  'ហួសកំណត់' : 'ហួសកំណត់  <br/> Over Due'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Payment Term': setting.language=='Khmer' ?  'លក្ខខណ្ឌទូទាត់' : 'លក្ខខណ្ឌទូទាត់  <br/> Payment Term'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Payment Option': setting.language=='Khmer' ?  'ជម្រើសនៃការទូទាត់' : 'ជម្រើសនៃការទូទាត់  <br/> Payment Option'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Ref No': setting.language=='Khmer' ?  'លេខយោង' : 'លេខយោង  <br/> Ref No'}</th>`
    let column_9 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Status': setting.language=='Khmer' ?  'ស្ថានភាព' : 'ស្ថានភាព  <br/> Status'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Currency': setting.language=='Khmer' ?  'រូបិយប័ណ្ណ' : 'រូបិយប័ណ្ណ  <br/> Currency'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount to be paid': setting.language=='Khmer' ?  'ទឹកប្រាក់ដែលត្រូវបង់' : 'ទឹកប្រាក់ដែលត្រូវបង់  <br/> Amount to be paid'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Paid Amount': setting.language=='Khmer' ?  'ទឹកប្រាក់បានបង់' : 'ទឹកប្រាក់បានបង់  <br/> Paid Amount'}</th>`
    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                        ${setting.column.nine ? '<td></td>': ""}
                        ${setting.column.ten8 ? '<td></td>': ""}
                        ${setting.column.ten1 ? '<td></td>': ""}
                        ${setting.column.ten2 ? '<td></td>': ""}
                        ${setting.column.ten3 ? '<td></td>': ""}
                        ${setting.column.ten4 ? '<td></td>': ""}
                    </tr>` 
    let show_column_num = 0;
    for (const property in setting.column) {
            if(setting.column[property]){
                show_column_num +=1
            }
    }

     return ` 
        ${Header(setting.page,is_print)}
         <div class="form_setting">
                <div  style="display: flex; ${logo_postion}">
                    <div style="${m_left}; ${hide_logo}; ${m_right} ;${ address_center_log_left ? 'flex:1': ''}">
                        <div class="logo" style="width: 97%;margin-left: -9px;">
                            <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                        </div>
                    </div>
                    <div  style="flex:4; ${is_header}">
                        <div class="">
                            <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data.name}</h2>
                            <table  style="width:100%; text-align: left; ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''}">
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}:${company_data.invoiceAddress}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"> ${setting.language=='English' ? 'Phone': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ Phone'}: ${company_data.companyPhone} | ${setting.language=='English' ? 'Email': setting.language=='Khmer' ? 'អ៊ីមែល' : 'អ៊ីមែល Email'}: ${company_data.companyEmail} </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    ${address_center_log_left ? `<div style="flex:1;${hide_logo}" ></div>` : ''}
                </div>
                <div style="margin-bottom: 8px;">
                    <h2 style="text-align: center;margin-top: 20px;width: 100%">${setting.title}</h2>
                </div>
                <div style="margin-bottom:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td style="min-width: 160px;" >${data ? data.supplier.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Voucher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Voucher No.'}</td>
                                <td style="min-width: 160px;" >${data ? data.referenceNo : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Transaction Type': setting.language=='Khmer' ? 'ប្រភេទប្រតិបត្តិការ' : 'ប្រភេទប្រតិបត្តិការ Transaction Type'}</td>
                                <td class="text-bold">${data ? data.transactionType.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ? kendo.toString(new Date(data.transactionDate), data.itemLine[0].dateFormat) : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpuse': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpuse'}</td>
                                <td colspan="3">${data ? data.journalNote : ''}</td>
                            </tr>
                        </body>
                    </table>
                 </div>
                 <table class="items">
                     <thead>
                         <tr style="background-color: ${setting.color.background}; color: ${setting.color.color};">
                            ${setting.column.one ? column_1 : ""}
                            ${setting.column.two ? column_2 : ""}
                            ${setting.column.three ? column_3 : ""}
                            ${setting.column.four ? column_4 : ""}
                            ${setting.column.five ? column_5 : ""}
                            ${setting.column.six ? column_6 : ""}
                            ${setting.column.seven ? column_7 : ""}
                            ${setting.column.eight ? column_8 : ""}
                            ${setting.column.nine ? column_9 : ""}
                            ${setting.column.ten ? column_10 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLine,empty_td,setting.column  ) : empty_td }
                         <tr>
                             <td class="tright" colspan="${show_column_num-1}">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម Grand Total'}</td>
                             <td colspan="3" class="tright">${data ? currency_d_base + data.total + currency_r_base : ''}</td>
                         </tr>
 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'លេខកូដ' : 'លេខកូដគណនី Code'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'ផ្នែកអាជីវកម្ម' : 'ផ្នែកអាជីវកម្ម Segment'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                            </tr>
                            ${data != undefined ? rederListAcounting(data.jRaw, setting.language) : 
                            `
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ` }
                        
                        </body>
                    </table>
                 </div>
                 ${
                    setting.signature.option == 1 ?
                   `
                       <table style="margin-top: 20px;" class="items_bottom_prepare">
                       <tbody>
                           <tr>
                           ${
                               setting.signature.prepared_by.status  ? 
                                  `<td style="">${setting.language=='English' ? setting.signature.prepared_by.text :  setting.language=='Khmer' ?  setting.signature.prepared_by.text_kh :  setting.signature.prepared_by.text_kh+'<br/>'+setting.signature.prepared_by.text}</td>  ${setting.signature.position ? '<td>'+position_text+'</td>'  : ''}   <td>${date}</td> `
                               :
                               ''
                           }
                           </tr>
                           <tr>
                           ${
                               setting.signature.reviewed_by.status  ? 
                               `<td>${setting.language=='English' ? setting.signature.reviewed_by.text :  setting.language=='Khmer' ?  setting.signature.reviewed_by.text_kh :  setting.signature.reviewed_by.text_kh+'<br/>'+setting.signature.reviewed_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                           ${
                               setting.signature.verified_by.status  ? 
                                   `<td>${setting.language=='English' ? setting.signature.verified_by.text :  setting.language=='Khmer' ?  setting.signature.verified_by.text_kh :  setting.signature.verified_by.text_kh+'<br/>'+setting.signature.verified_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           <tr>
                           ${
                               setting.signature.approved_by.status  ? 
                               `<td>${setting.language=='English' ? setting.signature.approved_by.text :  setting.language=='Khmer' ?  setting.signature.approved_by.text_kh :  setting.signature.approved_by.text_kh+'<br/>'+setting.signature.approved_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                           <tr>
                           ${
                               setting.signature.posted_by.status  ? 
                               `<td>${setting.language=='English' ? setting.signature.posted_by.text :  setting.language=='Khmer' ?  setting.signature.posted_by.text_kh :  setting.signature.posted_by.text_kh+'<br/>'+setting.signature.posted_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                           <tr>
                           ${
                               setting.signature.recorded_by.status  ? 
                               `<td> ${setting.language=='English' ? setting.signature.recorded_by.text :  setting.language=='Khmer' ?  setting.signature.recorded_by.text_kh :  setting.signature.recorded_by.text_kh+'<br/>'+setting.signature.recorded_by.text}  </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                       </tbody>
                       </table>
                   `
                    :
                    `  
                    <table style="margin-top: 12px;" class="items_tb_border">
                           <tbody>
                               <tr style="text-align:center">
                               ${
                                   setting.signature.prepared_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.prepared_by.text :  setting.language=='Khmer' ?  setting.signature.prepared_by.text_kh :  setting.signature.prepared_by.text_kh+'<br/>'+setting.signature.prepared_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.reviewed_by.text :  setting.language=='Khmer' ?  setting.signature.reviewed_by.text_kh :  setting.signature.reviewed_by.text_kh+'<br/>'+setting.signature.reviewed_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.verified_by.text :  setting.language=='Khmer' ?  setting.signature.verified_by.text_kh :  setting.signature.verified_by.text_kh+'<br/>'+setting.signature.verified_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.approved_by.text :  setting.language=='Khmer' ?  setting.signature.approved_by.text_kh :  setting.signature.approved_by.text_kh+'<br/>'+setting.signature.approved_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                setting.signature.posted_by.status  ? 
                                    `<th  class="text-bold">${setting.language=='English' ? setting.signature.posted_by.text :  setting.language=='Khmer' ?  setting.signature.posted_by.text_kh :  setting.signature.posted_by.text_kh+'<br/>'+setting.signature.posted_by.text}</th>`
                                :
                                ''
                                }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.recorded_by.text :  setting.language=='Khmer' ?  setting.signature.recorded_by.text_kh :  setting.signature.recorded_by.text_kh+'<br/>'+setting.signature.recorded_by.text}</th>`
                                   :
                                   ''
                               }
                               </tr>
                               <tr>
                               ${
                                   setting.signature.prepared_by.status  ? 
                                       `<td class="signature_td"></td>`
                                       
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               ${
                                setting.signature.posted_by.status  ? 
                                    '<td class="signature_td"></td>'
                                :
                                ''
                                }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               </tr>
                               ${
                                   setting.signature.position ? 
                                   `
                                   <tr>
                                   ${
                                   setting.signature.prepared_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                       
                                   :
                                   ''
                               }
       
                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                                   </tr>
                                   ` : ''
                               }
                           
                               <tr>
                               ${
                                   setting.signature.prepared_by.status  ? 
                                       `<td style="">
                                           <span>${date}:</span>
                                       </td>`
                                   
                                   :
                                   ''
                               }

                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       `<td>
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       `<td>
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       `<td style="">
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                setting.signature.posted_by.status  ? 
                                    `<td style="">
                                        <span>${date}:</span>
                                    </td>`
                                :
                                ''
                               }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       `<td style="">
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               </tr>
                           </tbody>
                       </table>
                    `
                }
         </div>
       ${Footer}
     `;
}
exports.PaymentVoucher2 = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let address_center_log_left = ""
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'

    }
    marginX = setting.margin/100;
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';

    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
    }else{
        m_right = "margin-right:20px";
    }
    if(setting.address.align == 'center'){
        center_text = "text-align:center !important";
        address_center_log_left = true
    }else if(setting.address.align == 'left'){
        center_text = "text-align:left !important";
        address_center_log_left = false
    }else{
        center_text = "text-align:right !important";
        address_center_log_left = false
    }
    let hide_logo =''
    if(setting.logo.hide){
        hide_logo ="display:none;"
    }
    let is_header = ''
    if(setting.header){
        is_header ="display:none;"
    }
    let currency_d_base = ''
    let currency_r_base = ''
    if(data){
        currency_d_base =  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'$' : ''
        currency_r_base =  data.currency.code !== 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'៛'  : ''
    }
    // column
    let column_1  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Purchase No': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ​ពី' : 'កាលបរិច្ឆេទ​ពី <br/> Purchase No'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Vendor Invoice No': setting.language=='Khmer' ?  'ដល់កាលបរិច្ឆេទ​' : 'ដល់កាលបរិច្ឆេទ​  <br/> Vendor Invoice No'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Due Date':setting.language=='Khmer' ?  'ថ្ងៃផុតកំណត់' : 'ថ្ងៃផុតកំណត់<br/> Due Date'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Over Due': setting.language=='Khmer' ?  'ហួសកំណត់' : 'ហួសកំណត់  <br/> Over Due'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Payment Term': setting.language=='Khmer' ?  'លក្ខខណ្ឌទូទាត់' : 'លក្ខខណ្ឌទូទាត់  <br/> Payment Term'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Payment Option': setting.language=='Khmer' ?  'ជម្រើសនៃការទូទាត់' : 'ជម្រើសនៃការទូទាត់  <br/> Payment Option'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Ref No': setting.language=='Khmer' ?  'លេខយោង' : 'លេខយោង  <br/> Ref No'}</th>`
    let column_9 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Status': setting.language=='Khmer' ?  'ស្ថានភាព' : 'ស្ថានភាព  <br/> Status'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Currency': setting.language=='Khmer' ?  'រូបិយប័ណ្ណ' : 'រូបិយប័ណ្ណ  <br/> Currency'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount to be paid': setting.language=='Khmer' ?  'ទឹកប្រាក់ដែលត្រូវបង់' : 'ទឹកប្រាក់ដែលត្រូវបង់  <br/> Amount to be paid'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Paid Amount': setting.language=='Khmer' ?  'ទឹកប្រាក់បានបង់' : 'ទឹកប្រាក់បានបង់  <br/> Paid Amount'}</th>`
    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                        ${setting.column.nine ? '<td></td>': ""}
                        ${setting.column.ten8 ? '<td></td>': ""}
                        ${setting.column.ten1 ? '<td></td>': ""}
                        ${setting.column.ten2 ? '<td></td>': ""}
                        ${setting.column.ten3 ? '<td></td>': ""}
                        ${setting.column.ten4 ? '<td></td>': ""}
                    </tr>` 
    let show_column_num = 0;
    for (const property in setting.column) {
            if(setting.column[property]){
                show_column_num +=1
            }
    }

     return ` 
        ${Header(setting.page,is_print)}
         <div class="">
                <div  style="display: flex; ${logo_postion}">
                    <div style="${m_left}; ${hide_logo}; ${m_right} ;${ address_center_log_left ? 'flex:1': ''}">
                        <div class="logo" style="width: 97%;margin-left: -9px;">
                            <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                        </div>
                    </div>
                    <div  style="flex:4; ${is_header}">
                        <div class="">
                            <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data.name}</h2>
                            <table  style="width:100%; text-align: left; ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''}">
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}:${company_data.invoiceAddress}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"> ${setting.language=='English' ? 'Phone': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ Phone'}: ${company_data.companyPhone} | ${setting.language=='English' ? 'Email': setting.language=='Khmer' ? 'អ៊ីមែល' : 'អ៊ីមែល Email'}: ${company_data.companyEmail} </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    ${address_center_log_left ? `<div style="flex:1;${hide_logo}" ></div>` : ''}
                </div>
                <div style="margin-bottom: 8px;">
                    <h2 style="text-align: center;margin-top: 20px;width: 100%">${setting.title}</h2>
                </div>
                <div style="margin-bottom:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 160px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td style="min-width: 160px;" >${data ? data.supplier.name : ''}</td>
                                <td  style="min-width: 160px;"><span class="text-bold"> ${setting.language=='English' ? 'Mode of payments': setting.language=='Khmer' ? 'របៀបនៃការបង់ប្រាក់' : 'របៀបនៃការបង់ប្រាក់ Mode of payments'}:</span> ${data ? '' : 'Check'} </td> 
                                <td class="text-bold" style="min-width: 150px;">${setting.language=='English' ? 'Voucher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Voucher No.'}</td>
                                <td style="min-width: 70px;" >${data ? data.referenceNo : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Type': setting.language=='Khmer' ? 'ប្រភេទប្រតិបត្តិការ' : 'ប្រភេទប្រតិបត្តិការ Type'}</td>
                                <td class="text-bold">${data ? data.transactionType.name : ''}</td>
                                <td  style="min-width: 160px;"> <span class="text-bold"> ${setting.language=='English' ? 'Currency': setting.language=='Khmer' ? 'រូបិយប័ណ្ណ' : 'រូបិយប័ណ្ណ Currency'}:</span> </td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ? kendo.toString(new Date(data.transactionDate), data.itemLine[0].dateFormat) : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpuse': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpuse'}</td>
                                <td colspan="4">${data ? data.journalNote : ''}</td>
                            </tr>
                        </body>
                    </table>
                 </div>
                 <table class="items">
                     <thead>
                         <tr style="background-color: ${setting.color.background}; color: ${setting.color.color};">
                            ${setting.column.one ? column_1 : ""}
                            ${setting.column.two ? column_2 : ""}
                            ${setting.column.three ? column_3 : ""}
                            ${setting.column.four ? column_4 : ""}
                            ${setting.column.five ? column_5 : ""}
                            ${setting.column.six ? column_6 : ""}
                            ${setting.column.seven ? column_7 : ""}
                            ${setting.column.eight ? column_8 : ""}
                            ${setting.column.nine ? column_9 : ""}
                            ${setting.column.ten ? column_10 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLine,empty_td,setting.column  ) : empty_td }
                         <tr>
                             <td class="tright" colspan="${show_column_num-1}">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម Grand Total'}</td>
                             <td colspan="3" class="tright">${data ? currency_d_base + data.total + currency_r_base : ''}</td>
                         </tr>
 
                     </tbody>
                 </table>
    
                ${
                    setting.signature.option == 1 ?
                   `
                       <table style="margin-top: 20px;" class="items_bottom_prepare">
                       <tbody>
                           <tr>
                           ${
                               setting.signature.prepared_by.status  ? 
                                  `<td style="">${setting.language=='English' ? setting.signature.prepared_by.text :  setting.language=='Khmer' ?  setting.signature.prepared_by.text_kh :  setting.signature.prepared_by.text_kh+'<br/>'+setting.signature.prepared_by.text}</td>  ${setting.signature.position ? '<td>'+position_text+'</td>'  : ''}   <td>${date}</td> `
                               :
                               ''
                           }
                           </tr>
                           <tr>
                           ${
                               setting.signature.reviewed_by.status  ? 
                               `<td>${setting.language=='English' ? setting.signature.reviewed_by.text :  setting.language=='Khmer' ?  setting.signature.reviewed_by.text_kh :  setting.signature.reviewed_by.text_kh+'<br/>'+setting.signature.reviewed_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                           ${
                               setting.signature.verified_by.status  ? 
                                   `<td>${setting.language=='English' ? setting.signature.verified_by.text :  setting.language=='Khmer' ?  setting.signature.verified_by.text_kh :  setting.signature.verified_by.text_kh+'<br/>'+setting.signature.verified_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           <tr>
                           ${
                               setting.signature.approved_by.status  ? 
                               `<td>${setting.language=='English' ? setting.signature.approved_by.text :  setting.language=='Khmer' ?  setting.signature.approved_by.text_kh :  setting.signature.approved_by.text_kh+'<br/>'+setting.signature.approved_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                           <tr>
                           ${
                               setting.signature.posted_by.status  ? 
                               `<td>${setting.language=='English' ? setting.signature.posted_by.text :  setting.language=='Khmer' ?  setting.signature.posted_by.text_kh :  setting.signature.posted_by.text_kh+'<br/>'+setting.signature.posted_by.text} </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                           <tr>
                           ${
                               setting.signature.recorded_by.status  ? 
                               `<td> ${setting.language=='English' ? setting.signature.recorded_by.text :  setting.language=='Khmer' ?  setting.signature.recorded_by.text_kh :  setting.signature.recorded_by.text_kh+'<br/>'+setting.signature.recorded_by.text}  </td> ${setting.signature.position ? '<td>'+position_text+'</td>' : ''}   <td>${date}</td>`
                               :
                               ''
                           }
                           </tr>
                       </tbody>
                       </table>
                   `
                    :
                    `  
                    <table style="margin-top: 12px;" class="items_tb_border">
                           <tbody>
                               <tr style="text-align:center">
                               ${
                                   setting.signature.prepared_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.prepared_by.text :  setting.language=='Khmer' ?  setting.signature.prepared_by.text_kh :  setting.signature.prepared_by.text_kh+'<br/>'+setting.signature.prepared_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.reviewed_by.text :  setting.language=='Khmer' ?  setting.signature.reviewed_by.text_kh :  setting.signature.reviewed_by.text_kh+'<br/>'+setting.signature.reviewed_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.verified_by.text :  setting.language=='Khmer' ?  setting.signature.verified_by.text_kh :  setting.signature.verified_by.text_kh+'<br/>'+setting.signature.verified_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.approved_by.text :  setting.language=='Khmer' ?  setting.signature.approved_by.text_kh :  setting.signature.approved_by.text_kh+'<br/>'+setting.signature.approved_by.text}</th>`
                                   :
                                   ''
                               }
                               ${
                                setting.signature.posted_by.status  ? 
                                    `<th  class="text-bold">${setting.language=='English' ? setting.signature.posted_by.text :  setting.language=='Khmer' ?  setting.signature.posted_by.text_kh :  setting.signature.posted_by.text_kh+'<br/>'+setting.signature.posted_by.text}</th>`
                                :
                                ''
                                }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       `<th  class="text-bold">${setting.language=='English' ? setting.signature.recorded_by.text :  setting.language=='Khmer' ?  setting.signature.recorded_by.text_kh :  setting.signature.recorded_by.text_kh+'<br/>'+setting.signature.recorded_by.text}</th>`
                                   :
                                   ''
                               }
                               </tr>
                               <tr>
                               ${
                                   setting.signature.prepared_by.status  ? 
                                       `<td class="signature_td"></td>`
                                       
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               ${
                                setting.signature.posted_by.status  ? 
                                    '<td class="signature_td"></td>'
                                :
                                ''
                                }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       '<td class="signature_td"></td>'
                                   :
                                   ''
                               }
                               </tr>
                               ${
                                   setting.signature.position ? 
                                   `
                                   <tr>
                                   ${
                                   setting.signature.prepared_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                       
                                   :
                                   ''
                               }
       
                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       `<td style="">
                                           <span>${position_text}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                                   </tr>
                                   ` : ''
                               }
                           
                               <tr>
                               ${
                                   setting.signature.prepared_by.status  ? 
                                       `<td style="">
                                           <span>${date}:</span>
                                       </td>`
                                   
                                   :
                                   ''
                               }

                               ${
                                   setting.signature.reviewed_by.status  ? 
                                       `<td>
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.verified_by.status  ? 
                                       `<td>
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                   setting.signature.approved_by.status  ? 
                                       `<td style="">
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               ${
                                setting.signature.posted_by.status  ? 
                                    `<td style="">
                                        <span>${date}:</span>
                                    </td>`
                                :
                                ''
                               }
                               ${
                                   setting.signature.recorded_by.status  ? 
                                       `<td style="">
                                           <span>${date}:</span>
                                       </td>`
                                   :
                                   ''
                               }
                               </tr>
                           </tbody>
                       </table>
                    `
                }
                <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" colspan="5">${setting.language=='English' ? 'For Accounting Department Only': setting.language=='Khmer' ?  'សម្រាប់នាយកដ្ឋានគណនេយ្យតែប៉ុណ្ណោះ' : 'សម្រាប់នាយកដ្ឋានគណនេយ្យតែប៉ុណ្ណោះ For Accounting Department Only'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'លេខកូដ' : 'លេខកូដគណនី Code'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'ផ្នែកអាជីវកម្ម' : 'ផ្នែកអាជីវកម្ម Segment'}</td>

                            </tr>
                            ${data != undefined ? rederListAcounting(data.jRaw, setting.language) : 
                            `
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ` }
                        
                        </body>
                    </table>
                </div>
         </div>
       ${Footer}
     `;
}

exports.print = (data, id, setting) => {
    window.console.log(id)
    window.console.log('seeting',setting)
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }
    marginX = setting.margin/100;
    let  is_print = true;
    var contents = '';
    if(setting.form_number === 1){
        contents = this.PaymentVoucher(data, setting,is_print);
    } else {
        contents = this.PaymentVoucher2(data, setting,is_print);
    }
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write(contents);
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 300);
};

exports.getPrint = async (data) => {
    let id = 1
    let form_type = "Payment Voucher";

    let parm_f = `?formType=${form_type}`
    await getFormSetting(parm_f).then(  res => {
        if (res.data.statusCode === 200) {
          if(res.data.data.length > 0){
            this.print(data, id, res.data.data["0"].settings)
          }else{
            alert("Please save form first!");
          }
        }
    })
    return true
}
