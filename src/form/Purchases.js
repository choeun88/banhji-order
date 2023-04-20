

const { dataStore } = require("@/observable/store");
var company_data = dataStore.company
// const { getFormSetting } = require("@/scripts/settingsHandler.js")
const kendo =  require("@progress/kendo-ui");
const  {vuetify} = require('./vuetify.js')


const dateFormat = (date) =>{
    return kendo.toString(new Date(date), company_data.dateFormat)
}
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
                    table{
                        width: 100%;
                        margin-top: 8px;
                        margin-bottom: 8px;
                        border-collapse: collapse;
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


function rederList(data,empty_td,show_column,currency_d,currency_r){
    var items = ""
    data.forEach((i,index) => {
        let class1 = Object.keys(i.class1).length !=0  ? i.class1.name: '' ;
        let class2 =  Object.keys(i.class2).length !=0 ? i.class2.name: ''  ;
        let class3 = Object.keys(i.class3).length !=0 ? i.class3.name: '' ;
        let class4 = Object.keys(i.class4).length !=0 ? i.class4.name: '' ;
        let class5 =  Object.keys(i.class5).length !=0 ? i.class5.name: ''  ;
        let amountDisccount = i.discountExchangeAmount ? currency_d+kendo.toString(i.discountExchangeAmount, i.decimalFormat)+currency_r : currency_d+0+currency_r;
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+ i.item.name+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+ i.description +'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+ i.qty +'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+ i.uom.uom.name +'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+ currency_d+kendo.toString(i.cost, i.decimalFormat)+currency_r +'</td>': ''} 
                    ${show_column.eight ? '<td class="text-center">'+ currency_d+kendo.toString(i.vatTaxExchangeAmount, i.decimalFormat)+currency_r  +'</td>': ''} 
                    ${show_column.nine ? '<td class="text-center">'+ kendo.toString(new Date(i.serviceDate), i.dateFormat) +'</td>': ''} 
                    ${show_column.ten ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDateTo), i.dateFormat) +'</td>': ''} 
                    ${show_column.ten1 ? '<td class="text-center">'+ amountDisccount +'</td>': ''} 
                    ${show_column.ten2 ? '<td class="text-center">'+  class1  +'</td>': ''} 
                    ${show_column.ten3 ? '<td class="text-center">'+ class2 +'</td>': ''} 
                    ${show_column.ten4 ? '<td class="tright">'+ class3  +'</td>': ''} 
                    ${show_column.ten5 ? '<td class="text-center">'+  class4  +'</td>': ''} 
                    ${show_column.ten6 ? '<td class="tright">'+ class5 +'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+currency_d+kendo.toString(i.exchangeAmount, i.decimalFormat)+currency_r +'</td>': ''}  

                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td 
    }
    return items;
}

function rederListAcounting(data,language,currency_d_base,currency_r_base, format){
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${ en.account.name }</td>
                <td class= " ">${''}</td>
                <td class="tleft">${en.type == 'dr' ?  currency_d_base+  kendo.toString(en.exchangeAmount, format)  +currency_r_base : '0'}</td>
                <td class="tleft">${en.type == 'cr' ?  currency_d_base+ kendo.toString(en.exchangeAmount*(-1), format)+ currency_r_base : '0'}</td>
            </tr>
        `;
     
  
    })
    return items;
}

exports.PurchaseOrder = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let logo_align= ''
    let address_center_log_left = ""
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';
    // let signature_break =  setting.language=='Both' ? '<br/>': '';
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }

    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
        logo_align = "text-align:center;"
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
        logo_align = "text-align:right;"
    }else{
        m_right = "margin-right:20px";
        logo_align = "text-align:left;"
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
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Item': setting.language=='Khmer' ?  'ទំនិញ' : ' ទំនិញ <br/> Item'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'QTY':setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ<br/> QTY'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Cost': setting.language=='Khmer' ?  'តម្លៃ' : 'តម្លៃ  <br/> Cost'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Tax': setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ  <br/> Tax'}</th>`
    let column_9 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date From': setting.language=='Khmer' ?  'ចាប់ពីថ្ងៃ' : 'ចាប់ពីថ្ងៃ  <br/> Date From'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date To': setting.language=='Khmer' ?  'ដល់ថ្ងៃ' : 'ដល់ថ្ងៃ  <br/> Date To'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 1': setting.language=='Khmer' ?  'ថ្នាក់ 1' : 'ថ្នាក់ 1  <br/> Class 1'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 2': setting.language=='Khmer' ?  'ថ្នាក់ 1' : 'ថ្នាក់ 2  <br/> Class 2'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 3': setting.language=='Khmer' ?  'ថ្នាក់ 2' : 'ថ្នាក់ 3  <br/> Class 3'}</th>`
    let column_15 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 4': setting.language=='Khmer' ?  'ថ្នាក់ 3' : 'ថ្នាក់ 4  <br/> Class 4'}</th>`
    let column_16 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 5': setting.language=='Khmer' ?  'ថ្នាក់ 5' : 'ថ្នាក់ 5  <br/> Class 5'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`

    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                        ${setting.column.nine ? '<td></td>': ""}
                        ${setting.column.ten8 ? '<td></td>': ""}
                        ${setting.column.ten1 ? '<td></td>': ""}
                        ${setting.column.ten2 ? '<td></td>': ""}
                        ${setting.column.ten3 ? '<td></td>': ""}
                        ${setting.column.ten4 ? '<td></td>': ""}
                        ${setting.column.ten5 ? '<td></td>': ""}
                        ${setting.column.ten6 ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}

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
                        <div class="logo" style="width: 97%;margin-left: -9px; ${logo_align} ">
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
                  ${
                    setting.title.en.status && !setting.title.kh.status ? 
                        `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.en.name}</h2>`
                    :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/>${setting.title.en.name}</h2>`
                    :  `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                  }
                   
                </div>
                <div style="margin-bottom:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td style="widht:120px;">${data ? data.supplier.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Voucher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Voucher No.'}</td>
                                <td>${data ? data.referenceNo : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Transaction Type': setting.language=='Khmer' ? 'ប្រភេទប្រតិបត្តិការ' : 'ប្រភេទប្រតិបត្តិការ Transaction Type'}</td>
                                <td class="text-bold">${data ? data.transactionType.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ?  data.transactionDate : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Contact Info': setting.language=='Khmer' ?  'ព័ត៌មានទំនាក់ទំនង' : 'ព័ត៌មានទំនាក់ទំនង Contact Info'}</td>
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}</td>
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
                            ${setting.column.eight ? column_8 : ""}
                            ${setting.column.nine ? column_9 : ""}
                            ${setting.column.ten ? column_10 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                            ${setting.column.ten5 ? column_15 : ""}
                            ${setting.column.ten6 ? column_16 : ""}
                            ${setting.column.seven ? column_7 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLines,empty_td,setting.column,currency_d_base,currency_r_base  ) : empty_td }
                         <tr>
                             <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Discount':  setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ Discount'}</td>
                             <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.discountTotal, data.decimalFormat)  + currency_r_base : ''}</td>
                         </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Sub Total':  setting.language=='Khmer' ?  'សរុបរង' : 'សរុបរង Sub Total'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.subTotal, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Tax':  setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ Tax'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.totalTaxAmount, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Total':  setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.total, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'គណនី' : 'គណនី Code'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'ផ្នែកអាជីវកម្ម' : 'ផ្នែកអាជីវកម្ម Segment'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                            </tr>
                            ${data != undefined ? rederListAcounting(data.jRaw, setting.language,currency_d_base,currency_r_base,data.decimalFormat) : 
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

exports.PurchaseVoucher = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let logo_align= ''
    let address_center_log_left = ""
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }

    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
        logo_align = "text-align:center;"
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
        logo_align = "text-align:right;"
    }else{
        m_right = "margin-right:20px";
        logo_align = "text-align:left;"
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
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Item': setting.language=='Khmer' ?  'ទំនិញ' : ' ទំនិញ <br/> Item'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'QTY':setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ<br/> QTY'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Cost': setting.language=='Khmer' ?  'តម្លៃ' : 'តម្លៃ  <br/> Cost'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Tax': setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ  <br/> Tax'}</th>`
    let column_9 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date From': setting.language=='Khmer' ?  'ចាប់ពីថ្ងៃ' : 'ចាប់ពីថ្ងៃ  <br/> Date From'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date To': setting.language=='Khmer' ?  'ដល់ថ្ងៃ' : 'ដល់ថ្ងៃ  <br/> Date To'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 1': setting.language=='Khmer' ?  'ថ្នាក់ 1' : 'ថ្នាក់ 1  <br/> Class 1'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 2': setting.language=='Khmer' ?  'ថ្នាក់ 1' : 'ថ្នាក់ 2  <br/> Class 2'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 3': setting.language=='Khmer' ?  'ថ្នាក់ 2' : 'ថ្នាក់ 3  <br/> Class 3'}</th>`
    let column_15 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 4': setting.language=='Khmer' ?  'ថ្នាក់ 3' : 'ថ្នាក់ 4  <br/> Class 4'}</th>`
    let column_16 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 5': setting.language=='Khmer' ?  'ថ្នាក់ 5' : 'ថ្នាក់ 5  <br/> Class 5'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`

    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                        ${setting.column.nine ? '<td></td>': ""}
                        ${setting.column.ten8 ? '<td></td>': ""}
                        ${setting.column.ten1 ? '<td></td>': ""}
                        ${setting.column.ten2 ? '<td></td>': ""}
                        ${setting.column.ten3 ? '<td></td>': ""}
                        ${setting.column.ten4 ? '<td></td>': ""}
                        ${setting.column.ten5 ? '<td></td>': ""}
                        ${setting.column.ten6 ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}

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
                        <div class="logo" style="width: 97%;margin-left: -9px; ${logo_align} ">
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
                    ${address_center_log_left ? `<div style="flex:1;${hide_logo}"  ></div>` : ''}
                </div>
                <div style="margin-bottom: 8px;">
                  ${
                    setting.title.en.status && !setting.title.kh.status ? 
                        `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height: 32px;">${setting.title.en.name}</h2>`
                    :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/>${setting.title.en.name}</h2>`
                    :  `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                  }
                   
                </div>
                <div style="margin-bottom:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td style="widht:120px;">${data ? data.supplier.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Voucher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Voucher No.'}</td>
                                <td>${data ? data.referenceNo : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Transaction Type': setting.language=='Khmer' ? 'ប្រភេទប្រតិបត្តិការ' : 'ប្រភេទប្រតិបត្តិការ Transaction Type'}</td>
                                <td class="text-bold">${data ? data.transactionType.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ?  data.transactionDate : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Contact Info': setting.language=='Khmer' ?  'ព័ត៌មានទំនាក់ទំនង' : 'ព័ត៌មានទំនាក់ទំនង Contact Info'}</td>
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}</td>
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
                            ${setting.column.eight ? column_8 : ""}
                            ${setting.column.nine ? column_9 : ""}
                            ${setting.column.ten ? column_10 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                            ${setting.column.ten5 ? column_15 : ""}
                            ${setting.column.ten6 ? column_16 : ""}
                            ${setting.column.seven ? column_7 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLines,empty_td,setting.column,currency_d_base,currency_r_base  ) : empty_td }
                         <tr>
                             <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Discount':  setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ Discount'}</td>
                             <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.discountTotal, data.decimalFormat)  + currency_r_base : ''}</td>
                         </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Sub Total':  setting.language=='Khmer' ?  'សរុបរង' : 'សរុបរង Sub Total'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.subTotal, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Tax':  setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ Tax'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.totalTaxAmount, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Total':  setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.total, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'លេខកូដ' : 'លេខកូដ Code'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'ផ្នែកអាជីវកម្ម' : 'ផ្នែកអាជីវកម្ម Segment'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                            </tr>
                            ${data != undefined ? rederListAcounting(data.jRaw, setting.language,currency_d_base,currency_r_base,data.decimalFormat) : 
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

// Expnese
function rendClasslist(item){
    
    let class_list="";
    let class_1 = item.class1.name !="" ?  "C1: "+item.class1.name+ "<br/>": '';
    let class_2 = item.class2.name !="" ? "C2: "+item.class2.name+ "<br/>": '';
    let class_3 = item.class3.name !="" ? "C3: "+item.class3.name+ "<br/>": '';
    let class_4 = item.class4.name !="" ? "C4: "+item.class4.name+ "<br/>": ''
    let class_5 = item.class5.name !="" ? "C5: "+item.class5.name: ''
    class_list =   class_1+ class_2+ class_3 + class_4 + class_5;
    return class_list; 
}
function rederExpenseListAcounting(data,language,currency_d_base,currency_r_base, format){
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${en.account.name }</td>
                <td class="tleft">${en.exchanged_amount >=0 ?  currency_d_base+  kendo.toString(en.exchanged_amount, format)  +currency_r_base : '0'}</td>
                <td class="tleft">${en.exchanged_amount <0 ?  currency_d_base+ kendo.toString(en.exchanged_amount*(-1), format)+ currency_r_base : '0'}</td>
                <td class= " ">${rendClasslist(en)}</td>
            </tr>
        `;
     
  
    })
    return items;
}
function usePaymentOption(option){
    switch(option){
        case 0:
            return 'Credit';
        case 1: 
            return 'Cash';
        case 2: 
            return 'Reimbursement';
        default:
         return "Cash Advance"
    }
}

function rederExpenseList(data,empty_td,show_column,currency_d,currency_r){
    var items = ""
    data.forEach((i,index) => {
        let class1 = Object.keys(i.class1).length !=0  ? i.class1.name: '' ;
        let class2 =  Object.keys(i.class2).length !=0 ? i.class2.name: ''  ;
        let class3 = Object.keys(i.class3).length !=0 ? i.class3.name: '' ;
        let class4 = Object.keys(i.class4).length !=0 ? i.class4.name: '' ;
        let class5 =  Object.keys(i.class5).length !=0 ? i.class5.name: ''  ;
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+ i.item.name+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+ i.description +'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+ i.quantity +'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+ i.uom.name +'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+ currency_d+kendo.toString(i.price, i.decimalFormat)+currency_r +'</td>': ''} 
                    ${show_column.eight ? '<td class="text-center">'+ currency_d+kendo.toString(i.exchanged_tax_amount, i.decimalFormat)+currency_r  +'</td>': ''} 
                    ${show_column.nine ? '<td class="text-center">'+ kendo.toString(new Date(i.serviceDate), i.dateFormat) +'</td>': ''} 
                    ${show_column.ten ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDateTo), i.dateFormat) +'</td>': ''} 
                    ${show_column.ten1 ? '<td class="text-center">'+ currency_d+i.discount.amount+currency_r +'</td>': ''} 
                    ${show_column.ten2 ? '<td class="text-center">'+  class1  +'</td>': ''} 
                    ${show_column.ten3 ? '<td class="text-center">'+ class2 +'</td>': ''} 
                    ${show_column.ten4 ? '<td class="tright">'+ class3  +'</td>': ''} 
                    ${show_column.ten5 ? '<td class="text-center">'+  class4  +'</td>': ''} 
                    ${show_column.ten6 ? '<td class="tright">'+ class5 +'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+currency_d+kendo.toString(i.exchanged_amount, i.decimalFormat)+currency_r +'</td>': ''}  

                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td 
    }
    return items;
}
exports.Expense = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let logo_align= ''
    let address_center_log_left = ""
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';
    // let signature_break =  setting.language=='Both'?'<br/>': '' ;
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ' ;
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;

    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
        logo_align = "text-align:center;"
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
        logo_align = "text-align:right;"
    }else{
        m_right = "margin-right:20px";
        logo_align = "text-align:left;"
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
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Item': setting.language=='Khmer' ?  'ទំនិញ' : ' ទំនិញ <br/> Item'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'QTY':setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ<br/> QTY'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Price': setting.language=='Khmer' ?  'តម្លៃ' : 'តម្លៃ  <br/> Price'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Tax': setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ  <br/> Tax'}</th>`
    let column_9 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date From': setting.language=='Khmer' ?  'ចាប់ពីថ្ងៃ' : 'ចាប់ពីថ្ងៃ  <br/> Date From'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date To': setting.language=='Khmer' ?  'ដល់ថ្ងៃ' : 'ដល់ថ្ងៃ  <br/> Date To'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 1': setting.language=='Khmer' ?  'ថ្នាក់ 1' : 'ថ្នាក់ 1  <br/> Class 1'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 2': setting.language=='Khmer' ?  'ថ្នាក់ 1' : 'ថ្នាក់ 2  <br/> Class 2'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 3': setting.language=='Khmer' ?  'ថ្នាក់ 2' : 'ថ្នាក់ 3  <br/> Class 3'}</th>`
    let column_15 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 4': setting.language=='Khmer' ?  'ថ្នាក់ 3' : 'ថ្នាក់ 4  <br/> Class 4'}</th>`
    let column_16 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Class 5': setting.language=='Khmer' ?  'ថ្នាក់ 5' : 'ថ្នាក់ 5  <br/> Class 5'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`

    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                        ${setting.column.nine ? '<td></td>': ""}
                        ${setting.column.ten8 ? '<td></td>': ""}
                        ${setting.column.ten1 ? '<td></td>': ""}
                        ${setting.column.ten2 ? '<td></td>': ""}
                        ${setting.column.ten3 ? '<td></td>': ""}
                        ${setting.column.ten4 ? '<td></td>': ""}
                        ${setting.column.ten5 ? '<td></td>': ""}
                        ${setting.column.ten6 ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}

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
                        <div class="logo" style="width: 97%;margin-left: -9px; ${logo_align} ">
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
                    ${address_center_log_left ? `<div style="flex:1;${hide_logo}"  ></div>` : ''}
                </div>
                <div style="margin-bottom: 8px;">
                  ${
                    setting.title.en.status && !setting.title.kh.status ? 
                        `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.en.name}</h2>`
                    :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/> ${setting.title.en.name}</h2>`
                    :  `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                  }
                   
                </div>
                <div style="margin-bottom:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td style="width: 170px;">${data ? data.supplier.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Voucher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Voucher No.'}</td>
                                <td style="min-width: 140px;">${data ? data.number : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Transaction Type': setting.language=='Khmer' ? 'ប្រភេទប្រតិបត្តិការ' : 'ប្រភេទប្រតិបត្តិការ Transaction Type'}</td>
                                <td class="text-bold">${data ? usePaymentOption(data.use_for_option) : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ? dateFormat(data.date) : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Contact Info': setting.language=='Khmer' ?  'ព័ត៌មានទំនាក់ទំនង' : 'ព័ត៌មានទំនាក់ទំនង Contact Info'}</td>
                                <td colspan="3">${data ? data.supplier.address : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}</td>
                                <td colspan="3">${data ? data.voucher_note : ''}</td>
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
                            ${setting.column.eight ? column_8 : ""}
                            ${setting.column.nine ? column_9 : ""}
                            ${setting.column.ten ? column_10 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                            ${setting.column.ten5 ? column_15 : ""}
                            ${setting.column.ten6 ? column_16 : ""}
                            ${setting.column.seven ? column_7 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederExpenseList(data.itemLines,empty_td,setting.column,currency_d_base,currency_r_base  ) : empty_td }
                         <tr>
                             <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Discount':  setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ Discount'}</td>
                             <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.discountAmount, data.decimalFormat)  + currency_r_base : ''}</td>
                         </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Sub Total':  setting.language=='Khmer' ?  'សរុបរង' : 'សរុបរង Sub Total'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.subTotal, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Tax':  setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ Tax'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.whdTax, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright text-bold" colspan="${show_column_num-1}">${setting.language=='English' ? 'Total':  setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + kendo.toString(data.totalAmount, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
     
                            <tr>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'លេខកូដ' : 'លេខកូដគណនី Code'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី Account'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Class': setting.language=='Khmer' ?  'ថ្នាក់' : 'ថ្នាក់ Class'}</td>
                            </tr>
                            ${data != undefined ? rederExpenseListAcounting(data.expense_entries, setting.language,currency_d_base,currency_r_base,data.decimalFormat) : 
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
// sale deposit
function rederPaymentOption(paymentOption){
    let refpayment = ""
    paymentOption.forEach((i,index)=>{
        refpayment = index == 0 ? refpayment +i.paymentOption.type :  refpayment+ ", " +i.paymentOption.type  
    })
    return refpayment;
}
function rederPaymentRef(paymentRef){
    let ref = ""
    paymentRef.forEach((i,index)=>{
        ref = index == 0 ? ref +i.refNo :  ref+ ", " +i.refNo  
    })
    return ref;
}

exports.PurchaseDeposite = (data, setting,is_print) => {
    // let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
 
    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' ||  data.currency.code != 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }
     return ` 
        ${Header(setting.page,is_print)}
     
         <div class="">
                <div class="row">
                        <div class="logo col-7" style="padding-bottom:0px;" >
                            <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important;  margin-top: 6px;" />
                        </div>
                        <div class="logo col-5" style="padding-bottom:0px;" > 
                        ${
                            setting.title.en.status && !setting.title.kh.status ? 
                                `<h1 style="text-align: left;margin-top:0px;width: 100%;line-height:32px; font-size: 22px;">${setting.title.en.name}</h1>`
                            :  setting.title.en.status && setting.title.kh.status ?   ` <h1 style="font-size: 22px;text-align: left;margin-top: 0px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/>${setting.title.en.name}</h1>`
                            :  `<h1 style="text-align: left;margin-top: 0px;width: 100%;line-height:32px;font-size: 22px;">${setting.title.kh.name}</h1>`
                          }

                            <table  class="items_tb_border" style="width:100%;">
                                <body>
                                    <tr>
                                        <td style="background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'DATE': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ DATE'}</td>
                                        <td style="width: 140px;"> ${data ? data.transactionDate : ''}</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'No.': setting.language=='Khmer' ?  'លេខបង្កាន់ដៃ' : 'លេខបង្កាន់ដៃ No.'}</td>
                                        <td style="width: 140px;">${data ? data.referenceNo: ''}</td>
                                    </tr>
                                </body>
                            </table>
                        </div>
                </div>
                <div class="row" style="margin:0px !important">
                    <div class="col-7" style="padding-left:0px !important; padding-right:12px !important; padding-bottom:0px !important;">
                        <table class="items_tb_border">
                            <body>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Receive From': setting.language=='Khmer' ?  'ទទួលពីឈ្មោះ' : 'ទទួលពីឈ្មោះ <br/> Receive From'}</td>
                                <td>${data ? 'name' : ''}</td>
                            </tr>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Contact Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន <br/> Contact Address'}</td>
                                <td>${data ? '' : ''} </td>
                            </tr>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង <br/> Purpose'}</td>
                                <td> ${data ? data.journalNote : ''}</td>
                            </tr>
                            <tr>
                                <td style="width: 130px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Reference Document': setting.language=='Khmer' ?  'លេខយោង' : 'លេខយោង <br/> Reference Document'}</td>
                                <td>${rederPaymentRef(data? data.itemLines: [])}</td>
                            </tr>
                            </body>
                        </table>
                    </div>
                <div class="col-5"  style="padding-left:6px !important; padding-right:0px !important; padding-bottom:0px !important;">
                   <h4>${setting.language=='English' ? 'TOTAL PAID AMOUNT': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់បង់សរុប' : 'ចំនួនទឹកប្រាក់បង់សរុប <br/> TOTAL PAID AMOUNT'}</h4>
                   <div style="width:100%;height:40px;background-color: ${setting.color.background}; color: ${setting.color.color}; padding:12px; margin-top:6px;">
                     <p style="text-align:center;margin:0px;">
                        ${ data ? currency_d+data.amount+currency_r: '00.00'}
                     </p>
                   </div>
                   <h4 style="margin-top: 10px;">${setting.language=='English' ? 'Mode of payment': setting.language=='Khmer' ?  'វិធីសាស្រ្តទូទាត់' : 'វិធីសាស្រ្តទូទាត់ Mode of payment'}:</h4>
                   <p>${rederPaymentOption(data? data.itemLines: [])}</p>
                </div>
            </div>
            <div class="row" style="margin:0px !important">
                <div class="col-7" style="padding-left:0px !important; padding-top:0px !important; padding-right:12px !important;" >
                    <p>${setting.language=='English' ? 'On behalf of Banhji Company': setting.language=='Khmer' ?  'ក្នុងនាមក្រុមហ៊ុនបញ្ចី' : 'ក្នុងនាមក្រុមហ៊ុនបញ្ចី On behalf of Banhji Company'}</p>
                    <div style="height:2px;border-bottom:1px solid #000;width:90%; margin-top:70px"></div>
                    <h4>${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</h4>
                </div>
                <div class="col-5" style="padding:0px !important;">
                    <p>${setting.language=='English' ? 'Paid By': setting.language=='Khmer' ?  'បង់ប្រាក់ដោយ' : 'បង់ប្រាក់ដោយ Paid By'}: </p>
                    <div style="height:2px;border-bottom:1px solid #000;width:90%; margin-top:70px"></div>
                    <h4>${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</h4>
                </div>
                <div class="col-12" style="padding:0px !important;">
                    <p style="margin-top:10px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: ${company_data ? company_data.invoiceAddress: ''} </p>
                </div>
            </div>
         </div>
      
       ${Footer}
     `;
}



exports.print = (data, form_id, setting) => {
  company_data = dataStore.company
  let  is_print = true;
  if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
  var contents = "";
  if(form_id == 1){
    contents =  this.PurchaseVoucher(data, setting,is_print)
  }else if(form_id == 2){
    contents =  this.PurchaseOrder(data, setting,is_print)
  }
  else if(form_id == 3){
    contents =  this.PurchaseDeposite(data, setting,is_print)
  }else if(form_id == 4){
    contents =  this.Expense(data, setting,is_print)
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
