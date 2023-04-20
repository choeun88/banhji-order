const { dataStore } = require("@/observable/store");
var company_data = dataStore.company
const kendo =  require("@progress/kendo-ui");
const { getFormSetting } = require("@/scripts/settingsHandler.js")
var JsBarcode = require('jsbarcode');
var QRCode = require('qrcode')
var table_header = 'capitalize';
var marginX = 0.75;
var styles = {};

const  {vuetify} = require('./vuetify.js')

const { kQr } = require('./kQrcode')

function textToBase64Barcode(text){
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE39"});
    return canvas.toDataURL("image/png");
}

const Header = (page) => {
    return `
        <html>
            <head>
            <title>Invoice</title>
            <style rel="stylesheet" >
                ${vuetify()}
                * {
                    -webkit-print-color-adjust: true;
                    -webkit-print-color-adjust: exact;
                }
                @page {
                    size: ${page};
                    margin: 0.75in ${marginX}in; 
                }
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

                body { 
                    -webkit-print-color-adjust: exact;
                    font-family: 'Niradei-Regular', sans-serif;
                    print-color-adjust: exact;
                }
                ul,li {
                    list-style-type: inherit !important;
                    margin: 0 0 0 15px;
                    padding: 0 !important;
                }
                ul li>ul{
                    list-style-type: circle !important;
                    margin: 0 0 0 15px;
                    padding: 0 !important;
                }
                table,tr,td{
                    border-collapse: collapse !important; 
                }
                table{
                 width:100%;
                }
                @media print {
                    html, body {
                        font-family: 'Niradei-Regular', sans-serif;
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
                    div{
                        break-inside: avoid;
                    }
                }
                .form_setting table th{
                    padding: 8px 6px !important ;
                    border: 1px solid  #000;
                    border-collapse: collapse;
                    clear: both;
                    page-break-before: always !important;
                    page-break-after: always !important;
                    text-transform: ${table_header}  !important;;
                    font-size: ${styles.fontSize}px !important;
                }
                .form_setting td{
                    font-size: ${styles.fontSize}px !important;
                    font-family: 'Niradei-Regular';
                }
                .acc_header{
                    text-transform: ${table_header} !important;
                    font-size: ${styles.fontSize}px !important;
                }
                .form_setting h2{
                    font-size: ${styles.headerFontSize}px !important;
                }
                .form_setting p{
                    font-size: ${styles.fontSize}px !important;
                }
                table th td{
                    clear: both;
                    break-before: always !important;
                    break-after: always !important;
                }
                table{
                    width: 100%;
                    clear: both;
                    margin-top: 8px;
                    margin-bottom: 8px;
                    border-collapse: collapse;
                }
                .items tr td{
                    border: 0.7px solid #000;
                    padding: 6px;
                    height: 32px;
                }
                .table_payment{
                    clear: both;
                    page-break-inside:auto;
                    page-break-before: always !important;
                    page-break-after: always !important;
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
                    text-align: left;
                }
                .tright{
                    text-align: right;
                }
                .text-bold{
                    font-weight: bold;
                    font-family: 'Niradei-Bold' !important;
                }
                .text-center{
                    text-align: center;
                }
                p{
                    line-height: 15px;
                    font-family: 'Roboto', sans-serif;
                }
                .row{
                    margin-top: 0px ;
                    margin-bottom: 0px;
                }
                </style>
            </head>
        <body>
`;
}
const Footer = `</body></html>`

exports.DefaultInvoice = (data, form_id, setting, is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let m_top = ""
    let address_center_log_left = ""
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    marginX = setting.margin / 100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if (setting.table_header == 1) {
        table_header = 'uppercase'
    } else {
        table_header = 'capitalize'
    }


    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
        m_top = "margin-top:0px";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
        m_top = "margin-top: 8px";
    }else{
        m_right = "margin-right:20px";
        m_top = "margin-top:8px";
    }

    if(setting.address.align == 'center'){
        center_text = "text-align:center !important";
        address_center_log_left = true
    }else if(setting.address.align == 'left'){
        center_text = "text-align:left !important";
        address_center_log_left = false
    }else{
        center_text = "text-align:right !important";
        address_center_log_left =false
    }

    let hide_logo =''
    if(setting.logo.hide){
        hide_logo ="display:none;"
    }
    let is_header = ''
    if(setting.header){
        is_header ="display:none;"
    }
    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' || data.currency.code != 'USD' ?  data.currency.symbolNative :  '' : ''

    // column
    let column_1  = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date From': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ​ពី' : 'កាលបរិច្ឆេទ​ពី <br/> Date From'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date To': setting.language=='Khmer' ?  'ដល់កាលបរិច្ឆេទ​' : 'ដល់កាលបរិច្ឆេទ​  <br/> Date To'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Item':setting.language=='Khmer' ?  'ទំនិញ' : 'ទំនិញ<br/> Item'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'On Hand': setting.language=='Khmer' ?  'ស្តុកក្នុងដៃ' : 'ស្តុកក្នុងដៃ  <br/> On Hand'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Quanity': setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ  <br/> Quanity'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_9  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Unit Price': setting.language=='Khmer' ?  'តម្លៃឯកតា' : 'តម្លៃឯកតា  <br/> Unit Price'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Modifier': setting.language=='Khmer' ?  'កំណែប្រែ' : 'កំណែប្រែ  <br/> Modifier'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'VAT': setting.language=='Khmer' ?  'អាករលើតម្លៃបន្ថែម' : 'អាករលើតម្លៃបន្ថែម  <br/> VAT'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Specific Tax': setting.language=='Khmer' ?  'អាករពិសេស' : 'អាករពិសេស  <br/> Specific Tax'}</th>`
    let column_15 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Other Tax': setting.language=='Khmer' ?  'ពន្ធផ្សេងទៀត' : 'ពន្ធផ្សេងទៀត  <br/>  Other Tax'}</th>`
    let column_16 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Public Lighting Tax': setting.language=='Khmer' ?  'អាករបំភ្លឺសាធារណៈ' : 'អាករបំភ្លឺសាធារណៈ  <br/> Public Lighting Tax'}</th>`
    let column_17 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Sale Unit': setting.language=='Khmer' ?  'ឯកតាលក់' : 'ឯកតាលក់  <br/> Sale Unit'}</th>`
    let column_18 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Employee': setting.language=='Khmer' ?  'និយោជិក' : 'និយោជិក  <br/> Employee'}</th>`
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
                        ${setting.column.ten5 ? '<td></td>': ""}
                        ${setting.column.ten6 ? '<td></td>': ""}
                        ${setting.column.ten7 ? '<td></td>': ""}
                        ${setting.column.ten ? '<td></td>': ""}        
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
             <div  style="display: flex; ${logo_postion}; position: relative;">
                 <div style="${m_left}; ${hide_logo}; ${m_right}; ${ address_center_log_left ? 'flex:1': ''}">
                     <div class="logo" style="width: 100%;margin-left: -9px; ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''}">
                         <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                     </div>
                 </div>
                 <div class=""style="flex:4;${is_header}">
                    <div style="${m_top}">
                        <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data.name}</h2>
                        <table  style="width:100%; text-align: left;">
                            <tr style="${center_text}">
                                <td style="line-height: 22px; font-weight: bold;">${setting.language=='English' ? 'VATIN':  setting.language=='Khmer' ? 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ': 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ (VATIN)' }</td>
                            </tr>
                            <tr style="${center_text}">
                                <td style="line-height: 22px;"> ${setting.language=='English' ? 'HP': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ HP'}:  ${company_data.companyPhone}</td>
                            </tr>
                            <tr style="${center_text}">
                                <td style="line-height: 22px;"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: ${company_data.invoiceAddress}</td>
                            </tr>
                        </table>
                    </div>
                 </div>
                 ${address_center_log_left ? `<div style="flex:1;${hide_logo}"></div>` : ''}
             </div>
             <div>
                 <h2 style="text-align: center; width: 100%;">${setting.title}</h2>
             </div>
                 
                 <div class="row" style="margin:0px !important" >
                     <div class="col-7" style="padding: 0px; ">
                         <p style="font-weight: bold; margin-bottom: 6px;" >${setting.language=='English' ? 'CUSTOMER INFO': setting.language=='Khmer' ? 'ព័ត៌មានអតិថិជន' : 'ព័ត៌មានអតិថិជន CUSTOMER INFO'}</p>
                         <table>
                             <body>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                    <td>:</td>
                                    <td>${data ? data.customer.name : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Project': setting.language=='Khmer' ? 'គម្រោង' : 'គម្រោង Project'}</td>
                                    <td>:</td>
                                    <td>${data ? data.project.name ? data.project.name : '' : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                    <td>:</td>
                                    <td> ${data ? data.billingAddress.name : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Tel': setting.language=='Khmer' ?  'លេខទូរស័ព្ទ' : 'លេខទូរស័ព្ទ Tell'}</td>
                                    <td>:</td>
                                    <td> ${data ? data.customer.contactAddress.phoneNumber: ''}</td>
                                </tr>
                             </body>
                         </table>
                     </div>
                     <div class="col-5" style="padding: 0px;">
                         <table>
                             <body>
                                 <tr>
                                     <td style="width: 120px;">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'លេខ' : 'ល.រ Nº'}</td>
                                     <td>:</td>
                                     <td>CIN339939</td>
                                 </tr>
                                 <tr>
                                     <td style="width: 120px;">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'} </td>
                                     <td>:</td>
                                     <td>18-01-2021</td>
                                 </tr>
                             </body>
                         </table>
                     </div>
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
                            ${setting.column.ten8 ? column_18 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                            ${setting.column.ten5 ? column_15 : ""}
                            ${setting.column.ten6 ? column_16 : ""}
                            ${setting.column.ten7 ? column_17 : ""}
                            ${setting.column.ten ? column_10 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLines,empty_td,currency_d,currency_r,setting.column  ) : empty_td }
                        <tr>
                            <td class="text-center" colspan="${ show_column_num >6 ? show_column_num - 5 : show_column_num-3 }" rowspan="5">${data ? data.customer.noteOnInvoice  : ''}</td>
                            <td class="acc_header tright" colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Sub Total':setting.language=='Khmer' ? 'សរុបរង' : 'សរុបរង Sub Total'}</td>
                            <td class="tright">${data != undefined ?  currency_d+kendo.toString(data.subTotal, data.decimalFormat)+currency_r: ''}</td>
                        </tr>
                        <tr>
                            
                            <td class="acc_header tright" colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ? 'ការបញ្ចុះតម្លៃ' : 'ការបញ្ចុះតម្លៃ Discount'} </td>
                            <td class="tright"> ${data != undefined ? currency_d+kendo.toString(data.discountTotal, data.decimalFormat)+currency_r: ''}</td>
                        </tr>
                        <tr>
                            
                            <td class="acc_header tright"   colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Total': setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'} </td>
                            <td class="tright"> ${data != undefined ?currency_d+kendo.toString(data.total, data.decimalFormat)+currency_r : ''}</td>
                        </tr>
                        <tr>
                            
                            <td class="acc_header tright"  colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Deposit': setting.language=='Khmer' ? 'ការដាក់ប្រាក់': 'ការដាក់ប្រាក់ Deposit'} </td>
                            <td class="tright">${data != undefined ? currency_d+kendo.toString(data.depositAmount, data.decimalFormat)+currency_r: ''}</td>
                        </tr>
                        <tr>
                            
                            <td class="acc_header tright"  colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Amount Due':  setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់ដែលត្រូវសង' : 'ចំនួនទឹកប្រាក់ដែលត្រូវសង Amount Due'}</td>
                            <td class="tright">${ data != undefined ? currency_d+kendo.toString(data.amountDue, data.decimalFormat)+currency_r : ''} </td>
                        </tr>
                     </tbody>
                 </table>
                 <table style="margin-top: 32px;" class="items">
                    <tbody>
                        <tr style="text-align:center">
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<th  class="text-bold">'+ setting.signature.prepared_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.reviewed_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.verified_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.approved_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.recorded_by.text+'</th>'
                            :
                            ''
                        }
                        </tr>
                        <tr>
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        </tr>
                    </tbody>
                </table>
                 <div style="margin-top:60px"> 
                     <div class="row" style="margin:0px !important">
                         <div class="col-6"> 
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p style="line-height: 18px;" class="text-bold text-center">${setting.language=='English' ? "Customer's Signature & Name": setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ <br/> Customer's Signature & Name"}</p>
                         </div>
                         <div class="col-6">
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p style="line-height: 18px;" class="text-bold text-center">${setting.language=='English' ? "Seller's Signature & Name":setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់ <br/> Seller's Signature & Name"}</p>
                         </div>
                     </div>
                 </div>
                 <div style="margin-top: 50px;">
                     <p>${setting.language=='English' ? '<span  style="font-weight: bold;">Note:</span> Original invoice for customer, copied invoice for seller':setting.language=='Khmer' ?  ' <span  style="font-weight: bold;">សម្គាល់:</span> វិក័យប័ត្រមានភាពតឹងរឹងសម្រាប់អតិថិជនដែលបានចម្លងវិក្កយបត្រសម្រាប់អ្នកលក់': '<span  style="font-weight: bold;">សម្គាល់:</span> វិក័យប័ត្រមានភាពតឹងរឹងសម្រាប់អតិថិជនដែលបានចម្លងវិក្កយបត្រសម្រាប់អ្នកលក់ <br/>  <span  style="font-weight: bold;">Note:</span> Original invoice for customer, copied invoice for seller'}</p>
                 </div>
               
         </div>
       ${Footer}
     `;
}
/*
one = No
two = data from
three = data to
four = item
five = desription
six = On hand
seven = Qty
eight =  UOM
nine = unit Price || price
ten = amount
ten1 = Modifier
ten2 = Discount
ten3 = Vat
ten4 = Specifi Tax
ten5 = Other tax
ten6 = Public Lighting tax
ten7 = Sale unit
ten8 = Employee
*/
function rederList(data,empty_td,currency_d,currency_r,show_column){
    var items = ""
    data.forEach((i,index) => {
        let uomName = i.uom.uom ? i.uom.uom.name : i.uom.name
        let specificTaxExchangeAmount = i.specificTaxExchangeAmount ?  i.specificTaxExchangeAmount  : ''
        let publicLightingTaxExchangeAmount = i.publicLightingTaxExchangeAmount ?  i.publicLightingTaxExchangeAmount  : ''
        let otherTaxExchangeAmount = i.otherTaxExchangeAmount ?  i.otherTaxExchangeAmount  : ''
        let vatTaxExchangeAmount = i.vatTaxExchangeAmount ?  i.vatTaxExchangeAmount  : ''
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDate), i.dateFormat)+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDateTo), i.dateFormat)+'</td>': ''} 
                    ${show_column.four ? '<td class="tleft">'+i.item.name+'</td>': ''} 
                    ${show_column.five ? '<td class="tleft">'+i.description+'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+i.qoh+'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+i.qty+'</td>': ''} 
                    ${show_column.eight ? '<td class="text-center">'+ uomName +'</td>': ''} 
                    ${show_column.nine ? '<td class="text-center">'+currency_d+kendo.toString(i.price, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten8 ? '<td class="text-center">'+ i.employee.name +'</td>': ''} 
                    ${show_column.ten1 ? '<td class="text-center">'+i.modifier.name+'</td>': ''} 
                    ${show_column.ten2 ? '<td class="text-center">'+currency_d+kendo.toString(i.discountExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten3 ? '<td class="text-center">'+currency_d+kendo.toString(vatTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten4 ? '<td class="text-center">'+currency_d+kendo.toString(specificTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten5 ? '<td class="text-center">'+currency_d+kendo.toString(otherTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten6 ? '<td class="text-center">'+currency_d+kendo.toString(publicLightingTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten7 ? '<td class="text-center">'+i.saleUnit.name+'</td>': ''} 
                    ${show_column.ten ? '<td class="tright">'+ currency_d+kendo.toString(i.amount, i.decimalFormat)+currency_r+'</td>': ''} 
                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td 
    }
    return items;
}
async function rederPaymentList(payment,currency_d,currency_r,language,currency){
    var items = ""
    for(const i of payment){
        window.console.log(i)
        let getKqr = await kQr(currency.code,i);
        let qrcode = ""
        let barcode = textToBase64Barcode(i.paymentCode)
        QRCode.toDataURL(getKqr,{margin: 0.5}, function (err, url) {
            if (err) window.console.error(err)
             qrcode = url
        })
        if(i.status !== 3 && i.status !== 4){
            items = items + `
            <tr>
            <td class="text-left">
                <h2 style="font-size: 20px !important; color: #ED1A3A; margin-bottom: 0px !important">
                    ${i.paymentCode.replace('psc-',"")}
                </h2>
            </td>
            <td style="padding: 0 6px !important;"  class="text-left text-bold font_16">
                <div class="payment">
                <img src="${barcode}" style="height:75px;margin-top:3px;" />
                </div>
            </td>
            <td style="padding: 1px 4px !important;"
                class="text-left ">
                <img src="${qrcode}" style="height:60px; width:auto ; margin: auto;display: block;" />
            </td>
            <td class="tright">
                ${currency_d+i.amount+currency_r}
            </td>
        </tr>
            `;
        }
   
    }

    if(items == ''){
        return "";
    }
    return `
    <table class="table_payment">
        <thead>
        <tr>
            <th class="text-uppercase">${language=='English' ? 'CODE.': language=='Khmer' ?  'លេខកូដ' : 'កូដ  <br/> CODE.'}</th>
            <th class="text-uppercase"> ${language=='English' ? 'BARCODE': language=='Khmer' ?  'លេខកូដ' : 'កូដ  <br/> Code.'} </th>
            <th class="text-uppercase">  ${language=='English' ? 'QR CODE': language=='Khmer' ?  'កូដ' : 'កូដ  <br/> QR CODE'} </th>
            <th class="text-uppercase">${language=='English' ? 'AMOUNT': language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់ <br/> AMOUNT'} </th>
        </tr>
        </thead>
        <tbody>
            ${items}
        </tbody>
    </table>
    `
}
function rederAvaibleBank(billBank){
    var bamks_image = ""
    billBank.forEach((i) => {
        bamks_image = bamks_image + `
        <img style="height:38px; margin:3px;" src="${i.logo}"/>
        `;
    });
    return bamks_image;

}
exports.CommercialInvoice =  async (data, setting,is_print,payment) => { 
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let m_top = ""
    let address_center_log_left = ""
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    marginX = setting.margin / 100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if (setting.table_header == 1) {
        table_header = 'uppercase'
    } else {
        table_header = 'capitalize'
    }
    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
        m_top = "margin-top:0px";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
        m_top = "margin-top: 8px";
    }else{
        m_right = "margin-right:10px";
        m_top = "margin-top:8px";
    }
    if(setting.address.align == 'center'){
        center_text = "text-align:center !important";
        address_center_log_left = true
    }else if(setting.address.align == 'left'){
        center_text = "text-align:left !important";
        address_center_log_left = false
    }else{
        center_text = "text-align:right !important";
        address_center_log_left = true
    }
    let hide_logo =''
    if(setting.logo.hide){
        hide_logo ="display:none;"
    }
    let is_header = ''
    if(setting.header){
        is_header ="display:none;"
    }
    let transactionDate = data ?  kendo.toString(new Date(data.transactionDate), data.itemLines[0].dateFormat) : ''
    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' || data.currency.code != 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    // column
    let column_1  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date From': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ​ពី' : 'កាលបរិច្ឆេទ​ពី <br/> Date From'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date To': setting.language=='Khmer' ?  'ដល់កាលបរិច្ឆេទ​' : 'ដល់កាលបរិច្ឆេទ​  <br/> Date To'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Item':setting.language=='Khmer' ?  'ទំនិញ' : 'ទំនិញ<br/> Item'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'On Hand': setting.language=='Khmer' ?  'ស្តុកក្នុងដៃ' : 'ស្តុកក្នុងដៃ  <br/> On Hand'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Quanity': setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ  <br/> Quanity'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_9  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Unit Price': setting.language=='Khmer' ?  'តម្លៃឯកតា' : 'តម្លៃឯកតា  <br/> Unit Price'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Modifier': setting.language=='Khmer' ?  'កំណែប្រែ' : 'កំណែប្រែ  <br/> Modifier'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'VAT': setting.language=='Khmer' ?  'អាករលើតម្លៃបន្ថែម' : 'អាករលើតម្លៃបន្ថែម  <br/> VAT'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Specific Tax': setting.language=='Khmer' ?  'អាករពិសេស' : 'អាករពិសេស  <br/> Specific Tax'}</th>`
    let column_15 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Other Tax': setting.language=='Khmer' ?  'ពន្ធផ្សេងទៀត' : 'ពន្ធផ្សេងទៀត  <br/>  Other Tax'}</th>`
    let column_16 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Public Lighting Tax': setting.language=='Khmer' ?  'អាករបំភ្លឺសាធារណៈ' : 'អាករបំភ្លឺសាធារណៈ  <br/> Public Lighting Tax'}</th>`
    let column_17 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Sale Unit': setting.language=='Khmer' ?  'ឯកតាលក់' : 'ឯកតាលក់  <br/> Sale Unit'}</th>`
    let column_18 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Employee': setting.language=='Khmer' ?  'និយោជិក' : 'និយោជិក  <br/> Employee'}</th>`
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
                        ${setting.column.ten5 ? '<td></td>': ""}
                        ${setting.column.ten6 ? '<td></td>': ""}
                        ${setting.column.ten7 ? '<td></td>': ""}
                        ${setting.column.ten ? '<td></td>': ""}        
                    </tr>` 
    let show_column_num = 0;
    for (const property in setting.column) {
            if(setting.column[property]){
                show_column_num +=1
            }
    }
    window.console.log("2");
    let qrcode_link =  '';   
    let inv_link = dataStore.publick_inv_link ;
    if(inv_link){
        QRCode.toDataURL(inv_link,{margin: 0.5}, function (err, url) {
            if (err) window.console.error(err)
            qrcode_link = url
        })
    }
    let inv_address = ''
    if(setting.customer_address_option === 1){
        inv_address = data ? data.billingAddress.name : '';
    }else{
        inv_address = data ? data.deliveryAddress.name : '';
    }
    window.console.log("3");
    return ` 
        ${Header(setting.page,is_print)}
         <div class="form_setting">
             <div  style="display: flex; ${logo_postion}">
                 <div style="margin-top: 10px; ${m_left}; ${hide_logo}; ${m_right};${ address_center_log_left ? 'flex:1': ''}" >
                     <div class="logo" style="width: 100%;margin-left: -9px; ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''} ">
                         <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 4px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                     </div>
                 </div>
                 <div class=""  style="flex:4;${is_header}">
                     <div style="${m_top}">
                        <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data ? company_data.name: 'Name'}</h2>
                         <table  style="width:100%; text-align: left;margin-bottom:0px;margin-top:0px;">
                             <tr style="${center_text}">
                                 <td style="line-height: 22px;">${setting.language=='English' ? 'VATIN':  setting.language=='Khmer' ? 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ': 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ (VATIN)' }:  ${company_data ? company_data.vatTin : ''}</td>
                             </tr>
                             <tr style="${center_text}">
                                 <td style="line-height: 22px;"> ${setting.language=='English' ? 'HP': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ HP'}:  ${company_data.companyPhone}</td>
                             </tr>
                             <tr style="${center_text}">
                                 <td style="line-height: 22px;"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: ${company_data.invoiceAddress}</td>
                             </tr>
                         </table>
                     </div>
                 </div>
                 ${address_center_log_left ? `<div style="flex:1;${hide_logo}" ></div>` : ''}
             </div>
        
             <div  style="background:${setting.color.background2};display:flex; justify-content:space-between; align-items: center; color:${setting.color.color2};padding:12px; height:90px; margin-top: 20px;">
                <h2 class="text-bold acc_header" style="flex:1;margin-bottom:0px !important; color:${setting.color.color2}">${setting.language=='English' ? setting.title.en.name : setting.language=='Khmer' ?  setting.title.kh.name : setting.title.kh.name+' '+ setting.title.en.name}</h2>
                <div style= "flex: 1">
                    <p class="acc_header" style="margin-bottom:6px !important;">${setting.language=='English' ? 'Invoice Nº': setting.language=='Khmer' ?  'លេខ​វិ​ក័​យ​ប័ត្រ' : 'លេខ​វិ​ក័​យ​ប័ត្រ Invoice Nº'}: ${data ? data.referenceNo: ''}</p>
                    <p class="acc_header" style="margin-bottom:6px !important;">${setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}:  ${transactionDate} </p>
                    ${
                        setting.show_employee ? 
                        `
                            <p class="" style="margin-bottom:0px !important;">${setting.language=='English' ? 'SALE REP': setting.language=='Khmer' ? 'អ្នកលក់' : 'អ្នកលក់ SALE REP'}:  ${data? data.employee.name: ''} </p>
                        `: ''
                    }
                </div>
            </div>
                 

                 <div style="margin-top:12px; margin-bottom:12px;">
                    <table class="items_tb_border">
                        <body>
                              <tr>
                                  <td rowspan="2" style="width: 180px;">${setting.language=='English' ? 'Customer': setting.language=='Khmer' ?  'អតិថិជន' : 'អតិថិជន (Customer)'}</td>
                                  <td>${data ? data.customer.contactPerson ? data.customer.contactPerson[0].name : ''  : ''}</td>
                                  <td style="width: 170px;">${setting.language=='English' ? 'Due Date': setting.language=='Khmer' ?  'ថ្ងៃផុត​កំណត់' : 'ថ្ងៃផុត​កំណត់ Due Date'}</td>
                                  <td> ${data ?  kendo.toString(new Date(data.dueDate), data.itemLines[0].dateFormat)  : ''}</td>
                              </tr>
                              <tr>
                                <td>${data ? data.customer.name : ''}</td>
                                <td style="width: 170px;">${setting.language=='English' ? 'Payment Term': setting.language=='Khmer' ?  'លក្ខខណ្ឌ ទូទាត់' : 'លក្ខខណ្ឌ ទូទាត់ Payment Term'}</td>
                                <td> ${data ? data.paymentTerm.name : ''}</td>
                              </tr>
                              <tr>
                                  <td style="width: 180px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                  <td colspan="3">${inv_address}</td>
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
                            ${setting.column.ten8 ? column_18 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                            ${setting.column.ten5 ? column_15 : ""}
                            ${setting.column.ten6 ? column_16 : ""}
                            ${setting.column.ten7 ? column_17 : ""}
                            ${setting.column.ten ? column_10 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLines,empty_td,currency_d,currency_r,setting.column ) : empty_td }

                        ${
                            setting.rate ? `

                                <tr>
                                    <td colspan="${ show_column_num-1}" class="tright text-bold">${setting.language=='English' ? 'Exchange Rate': setting.language=='Khmer' ?  'អត្រា​ប្តូ​រ​ប្រាក់' : 'អត្រា​ប្តូ​រ​ប្រាក់ Exchange Rate'}</td>
                                    <td class="tright" >${data != undefined ?  Object.keys(data.taxExchangeRate).length >0  ? data.taxExchangeRate.rate : '': ''}</td>
                                </tr>
                                <tr>
                                    <td colspan="${ show_column_num-1}" class="tright text-bold">${setting.language=='English' ? 'Total': setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                                    <td class="tright" >${data != undefined ? Object.keys(data.taxExchangeRate).length >0  ? kendo.toString(data.total/data.taxExchangeRate.rate, data.decimalFormat)+data.taxExchangeRate.symbol : kendo.toString(data.total, data.decimalFormat): ''}</td>
                                </tr>
                            `
                            : ''
                        }
                       
                        <tr>
                            <td colspan="${ show_column_num-1}" class="tright text-bold">${setting.language=='English' ? 'Grand Total (Vat Inclusive)':  setting.language=='Khmer' ?  'សរុប (បូកបញ្ចូលទាំងអាករ) ' : 'សរុបរួម Grand Total (Vat Inclusive) '}</td>
                            <td class="tright" >${data != undefined ?  currency_d+kendo.toString(data.total, data.decimalFormat) +currency_r: ''}</td>
                        </tr>
                     </tbody>
                 </table>
                <div style="margin-top:10px; margin-bottom: 16px;"> 
                    <div class="row" style="margin:0px !important">
                        <div class="col-7" style="border: 0.8px solid #000000"> 
                            ${data ? data.customer.noteOnInvoice : ''}
                        </div>
                        <div class="col-5" style="padding-bottom:0px;">
                             ${
                                setting.signature.customer.status ? 
                                 ` 
                                    <div style="margin:10px 24px;border-bottom: 1px solid #000000; padding-top: 20px;">
                                    </div>
                                    <p style="line-height: 18px;margin-bottom: 50px;" class="text-bold text-center">${setting.language=='English' ?  setting.signature.customer.text : setting.language=='Khmer' ?   setting.signature.customer.text_kh :  setting.signature.customer.text_kh+ "<br/>"+ setting.signature.customer.text} </p>
                                 `
                                 : ''
                             }
                             ${
                                setting.signature.seller.status ? 
                                ` 
                                    <div style="margin:10px 24px;border-bottom: 1px solid #000000;"></div>
                                    <p style="line-height: 18px; margin-bottom: 0px !important;" class="text-bold text-center">${setting.language=='English' ?  setting.signature.seller.text : setting.language=='Khmer' ?   setting.signature.seller.text_kh :  setting.signature.seller.text_kh+ "<br/>"+ setting.signature.seller.text}</p>
                                `
                                : ''
                            }
                         

                            </div>
                    </div>
                </div>
                ${setting.paymentOption ? 
                    `
                        <div style="border-bottom: 1px solid #000000"></div>
                        <div style="display: flex;  flex-direction: column;">
                                <div style="flex:2; margin-top: 10px;">
                                  <div style="display:flex;">
                                        <div style="flex:1; margin-right:20px;">
                                            <p style="font-size: 10px; margin-bottom :6px; margin-top:0px;"> ${setting.language=='English' ? "The payment referent code and QR Code can be used with following financial institutions: " : setting.language=='Khmer' ?  'លោកអ្នកអាចធ្វើការទូទាត់តាមរយះភ្នាក់ងាររបស់ស្ថាប័នហិរញ្ញវត្ថុខាងក្រោមនេះ  ' : "លោកអ្នកអាចធ្វើការទូទាត់តាមរយះភ្នាក់ងាររបស់ស្ថាប័នហិរញ្ញវត្ថុខាងក្រោមនេះ The payment referent code and QR Code can be used with following financial institutions:"} </p>
                                            <div style= "border: 1px solid #000000 ; padding: 5px;">
                                                ${rederAvaibleBank(data ?  Object.keys(data.billPayment).length > 0  ?  data.billPayment.bank : [] : [])}
                                            </div>
                                        </div>
                                        <div>
                                            <p style="font-size: 10px; margin-bottom :4px; margin-top:0px;"> ${setting.language=='English' ? "Invoice link:" : setting.language=='Khmer' ?  'តំណរភ្ជាប់វិក្កយបត្រ ' : "តំណរភ្ជាប់វិក្កយបត្រ Invoice link:"} </p>
                                            <img style="height:58px; margin:3px;" src="${qrcode_link}"/>
                                        </div>
                                    </div>
                                </div>
                                <div style="flex:2; margin-top: 10px; break-inside: avoid;" >
                                    ${ data ? await rederPaymentList(payment,currency_d,currency_r,setting.language,data.currency) :'' }
                                </div>
                        </div>
                    `
                    :
                  ''
                }
                <div style="border-bottom: 6px solid #000;margin-top:8px;"></div>
         </div>
       ${Footer}
    `;
}

//  Tax item
function itemListTaxList(item,format,currency_d,currency_r,language, colspan){
    // let other_tax = '(Amount-Discount)*TaxBase*Rate'
    // let public_tax = '(Amount-Discount)*TaxBase*Rate'
    // let specific_tax = '(Amount-Discount)*TaxBase*Rate'
    // let vat_tax = '(Amount-Discount)*TaxBase*Rate'
    // window.console.log("itemline of tax",itemsLine)
    // if(Object.keys(itemsLine.otherTax).length != 0){
    //     other_tax = itemsLine.otherTax.defaultTax + ' | ' + '(Amount-Discount)*TaxBase*Rate'
    // }
    var items = ""
        for (const property in item) {
            let tax_info = ''
            if( property == 'Other Tax'){
                if(language == "English"){
                    tax_info = "Other Tax"
                }else if(language == "Khmer"){
                    tax_info = "ពន្ធផ្សេងទៀត"
                }else{
                    tax_info = "ពន្ធផ្សេងទៀត Other Tax"
                }
            }
            if( property == 'Public Lighting Tax'){
                if(language == "English"){
                    tax_info = "Public Lighting Tax"
                }else if(language == "Khmer"){
                    tax_info = "ពន្ធលើភ្លើងបំភ្លឺសាធារណៈ"
                }else{
                    tax_info = "ពន្ធលើភ្លើងបំភ្លឺសាធារណៈ Public Lighting Tax"
                }
            }
            if( property == 'Specific Tax'){
                if(language == "English"){
                    tax_info = "Specific Tax"
                }else if(language == "Khmer"){
                    tax_info = "ពន្ធជាក់លាក់"
                }else{
                    tax_info = "ពន្ធជាក់លាក់ Specific Tax"
                }
            }
            if( property == 'VAT/GST'){
                if(language == "English"){
                    tax_info = "VAT/GST"
                }else if(language == "Khmer"){
                    tax_info = "ពន្ធអាករ/ទំនិញនិងសេវាកម្ម"
                }else{
                    tax_info = "ពន្ធអាករ/ទំនិញនិងសេវាកម្ម VAT/GST"
                }
            }
            items = items + ` <tr>
                <td class="tright text-bold" colspan="${colspan}" style="padding-left:16px">${tax_info}</td>
                <td class="tright" >${ currency_d+kendo.toString(item[property], format)+currency_r }</td>
            </tr>
            `
        }
    return items;
}

function rederListTax(data,empty_td,currency_d,currency_r,show_column){
    var items = ""
    data.forEach((i,index) => {
        let uomName = i.uom.uom ? i.uom.uom.name : i.uom.name
        let specificTaxExchangeAmount = i.specificTaxExchangeAmount ?  i.specificTaxExchangeAmount  : ''
        let publicLightingTaxExchangeAmount = i.publicLightingTaxExchangeAmount ?  i.publicLightingTaxExchangeAmount  : ''
        let otherTaxExchangeAmount = i.otherTaxExchangeAmount ?  i.otherTaxExchangeAmount  : ''
        let vatTaxExchangeAmount = i.vatTaxExchangeAmount ?  i.vatTaxExchangeAmount  : ''
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDate), i.dateFormat)+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDateTo), i.dateFormat)+'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+i.item.name+'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+i.description+'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+i.qoh+'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+i.qty+'</td>': ''} 
                    ${show_column.eight ? '<td class="text-center">'+ uomName +'</td>': ''} 
                    ${show_column.nine ? '<td class="text-center">'+currency_d+kendo.toString(i.price, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten8 ? '<td class="text-center">'+ i.employee.name +'</td>': ''} 
                    ${show_column.ten1 ? '<td class="text-center">'+i.modifier.name+'</td>': ''} 
                    ${show_column.ten2 ? '<td class="text-center">'+currency_d+kendo.toString(i.discountExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten3 ? '<td class="text-center">'+currency_d+kendo.toString(vatTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten4 ? '<td class="text-center">'+currency_d+kendo.toString(specificTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten5 ? '<td class="text-center">'+currency_d+kendo.toString(otherTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten6 ? '<td class="text-center">'+currency_d+kendo.toString(publicLightingTaxExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten7 ? '<td class="text-center">'+i.saleUnit.name+'</td>': ''} 
                    ${show_column.ten ? '<td class="tright">'+ currency_d+kendo.toString(i.amount, i.decimalFormat)+currency_r+'</td>': ''} 
                </tr>

            `;
    })
    if(data.length <=2){
        items = items + empty_td +  empty_td;
    }
    return items;
}
exports.taxInvoice = (data, form_id, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let m_top = ""
    let address_center_log_left = ""
    marginX = setting.margin / 100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if (setting.table_header == 1) {
        table_header = 'uppercase'
    } else {
        table_header = 'capitalize'
    }

    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
        m_top = "margin-top:0px";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
        m_top = "margin-top: 8px";
    }else{
        m_right = "margin-right:10px";
        m_top = "margin-top: 8px;"
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

    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' || data.currency.code != 'USD' ?  data.currency.symbolNative :  '' : ''

    // column
    let column_1  = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date From': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ​ពី' : 'កាលបរិច្ឆេទ​ពី <br/> Date From'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date To': setting.language=='Khmer' ?  'ដល់កាលបរិច្ឆេទ​' : 'ដល់កាលបរិច្ឆេទ​  <br/> Date To'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Item':setting.language=='Khmer' ?  'ទំនិញ' : 'ទំនិញ<br/> Item'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'On Hand': setting.language=='Khmer' ?  'ស្តុកក្នុងដៃ' : 'ស្តុកក្នុងដៃ  <br/> On Hand'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Quanity': setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ  <br/> Quanity'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_9  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Unit Price': setting.language=='Khmer' ?  'តម្លៃឯកតា' : 'តម្លៃឯកតា  <br/> Unit Price'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Modifier': setting.language=='Khmer' ?  'កំណែប្រែ' : 'កំណែប្រែ  <br/> Modifier'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'VAT': setting.language=='Khmer' ?  'អាករលើតម្លៃបន្ថែម' : 'អាករលើតម្លៃបន្ថែម  <br/> VAT'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Specific Tax': setting.language=='Khmer' ?  'អាករពិសេស' : 'អាករពិសេស  <br/> Specific Tax'}</th>`
    let column_15 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Other Tax': setting.language=='Khmer' ?  'ពន្ធផ្សេងទៀត' : 'ពន្ធផ្សេងទៀត  <br/>  Other Tax'}</th>`
    let column_16 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Public Lighting Tax': setting.language=='Khmer' ?  'អាករបំភ្លឺសាធារណៈ' : 'អាករបំភ្លឺសាធារណៈ  <br/> Public Lighting Tax'}</th>`
    let column_17 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Sale Unit': setting.language=='Khmer' ?  'ឯកតាលក់' : 'ឯកតាលក់  <br/> Sale Unit'}</th>`
    let column_18 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Employee': setting.language=='Khmer' ?  'និយោជិក' : 'និយោជិក  <br/> Employee'}</th>`
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
                        ${setting.column.ten5 ? '<td></td>': ""}
                        ${setting.column.ten6 ? '<td></td>': ""}
                        ${setting.column.ten7 ? '<td></td>': ""}
                        ${setting.column.ten ? '<td></td>': ""}        
                    </tr>` 
    let show_column_num = 0;
    for (const key in setting.column) {
            if(setting.column[key]){
                show_column_num +=1
            }
    }

    return   ` 

        ${Header(setting.page,is_print)}
         <div class="form_setting">
             <div  style="display: flex; ${logo_postion}">
                 <div style="margin-top: 14px; ${m_left}; ${hide_logo}; ${m_right};${ address_center_log_left ? 'flex:1': ''} " >
                     <div class="logo" style="width: 100%;margin-left: -9px; ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''}">
                         <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 10px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                     </div>
                 </div>
                 <div  style="flex:4; ${is_header} width:100%;">
                     <div style="${m_top}">
                        <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data ? company_data.name : ''}</h2>
                         <table  style="width:100%; text-align: left;">
                             <tr style="${center_text}">
                                 <td style="line-height: 22px; font-weight: bold;">${setting.language=='English' ? 'VATIN':  setting.language=='Khmer' ? 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ': 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ (VATIN)' }</td>
                             </tr>
                             <tr style="${center_text}">
                                 <td style="line-height: 22px;"> ${setting.language=='English' ? 'HP': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ HP'}:  ${company_data.companyPhone}</td>
                             </tr>
                             <tr style="${center_text}">
                                 <td style="line-height: 22px;"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: ${company_data.invoiceAddress}</td>
                             </tr>
                         </table>
                     </div>
                 </div>
                 ${address_center_log_left ? `<div style="flex:1;${hide_logo}"  ></div>` : ''}
             </div>
             <div style="margin-bottom: 0px;">
                 <h2 style="text-align: center; width:100%;">${setting.title}</h2>
             </div>
                 
                 <div class="row" style="margin:0px !important">
                     <div class="col-7" style="padding-left:0px !important; padding-right:6px !important;padding-bottom:0px !important;">
                         <table class="items_tb_border">
                             <body>
                                 <tr>
                                     <td style="width: 180px;">${setting.language=='English' ? 'Customer': setting.language=='Khmer' ?  'អតិថិជន' : 'អតិថិជន (Customer)'}</td>
                                     <td>${data ? data.customer.contactPerson.length !=0 ? data.customer.contactPerson[0].name : ''  : ''}</td>
                                 </tr>
                                 <tr>
                                     <td style="width: 180px;">${setting.language=='English' ? 'Company': setting.language=='Khmer' ? 'ក្រុមហ៊ុន' : 'ក្រុមហ៊ុន (Company)'}</td>
                                     <td>${data ? data.customer.name : ''}</td>
                                 </tr>
                                 <tr>
                                     <td style="width: 180px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                     <td> ${data ? data.billingAddress.name : ''}</td>
                                 </tr>
                                 <tr>
                                     <td style="width: 180px;">${setting.language=='English' ? 'Telephone': setting.language=='Khmer' ?  'លេខទូរស័ព្ទ' : 'លេខទូរស័ព្ទ (Telephone)'}</td>
                                     <td> ${data ? data.customer.contactAddress.phoneNumber : ''}</td>
                                 </tr>
                                 <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'VATTIN': setting.language=='Khmer' ?  'លេខអត្តសញ្ញាណកម្ម' : 'លេខអត្តសញ្ញាណកម្ម (VATTIN)'}</td>
                                    <td></td>
                                </tr>
                             </body>
                         </table>
                     </div>
                     <div class="col-5"  style="padding-left:6px !important; padding-right:0px !important;padding-bottom:0px !important;">
                        <table class="items_tb_border">
                            <body>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Invoice NO': setting.language=='Khmer' ?  'លេខ​វិ​ក័​យ​ប័ត្រ' : 'លេខ​វិ​ក័​យ​ប័ត្រ Invoice NO'}</td>
                                    <td>${data ? data.referenceNo: ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'DATE': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ DATE'}</td>
                                    <td> ${data ? data.transactionDate : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Exchange Rate': setting.language=='Khmer' ?  'អត្រា​ប្តូ​រ​ប្រាក់' : 'អត្រា​ប្តូ​រ​ប្រាក់ Exchange Rate'}</td>
                                    <td> ${data ? currency_d+kendo.toString(data.exchangeAmount, data.decimalFormat)+'<span style="line-height: 12px;">'+currency_r+'</span></td>' : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Payment Term': setting.language=='Khmer' ?  'លក្ខខណ្ឌ ទូទាត់' : 'លក្ខខណ្ឌ ទូទាត់ Payment Term'}</td>
                                    <td> ${data ? data.paymentTerm.name : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Due Date': setting.language=='Khmer' ?  'ថ្ងៃផុត​កំណត់' : 'ថ្ងៃផុត​កំណត់ Due Date'}</td>
                                    <td> ${data ? data.dueDate : ''}</td>
                                </tr>
                            </body>
                        </table>
                     </div>
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
                            ${setting.column.ten8 ? column_18 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                            ${setting.column.ten5 ? column_15 : ""}
                            ${setting.column.ten6 ? column_16 : ""}
                            ${setting.column.ten7 ? column_17 : ""}
                            ${setting.column.ten ? column_10 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederListTax(data.itemLines,empty_td,currency_d,currency_r, setting.column) : empty_td }
                         <tr>
                             <td colspan="${ show_column_num >6 ? show_column_num - 5 : show_column_num-3 }" rowspan="16">${data ? data.customer.noteOnInvoice  : ''}</td>
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Sub Total':setting.language=='Khmer' ? 'សរុបរង' : 'សរុបរង Sub Total'}</td>
                             <td  class="tright">${data != undefined ?    currency_d+kendo.toString(data.subTotal, data.decimalFormat)+currency_r : ''}</td>
                         </tr>
                         <tr>
                            
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Total Discount': setting.language=='Khmer' ? 'សរុបបញ្ចុះតម្លៃ' : 'សរុបបញ្ចុះតម្លៃ Total Discount'}</td>
                             <td  class="tright">${data != undefined ?  currency_d+kendo.toString(data.discountTotal, data.decimalFormat)+currency_r: ''}</td>
                         </tr>
                        ${data != undefined ? itemListTaxList(data.taxListTotal,data.decimalFormat,currency_d,currency_r,setting.language,show_column_num <=6 ? 2 : 4) :   `
                             ` 
                        }
                         <tr>
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម Grand Total'}</td>
                             <td class="tright" >${data != undefined ?  currency_d+kendo.toString(data.total, data.decimalFormat)+currency_r: ''}</td>
                         </tr>
                     </tbody>
                 </table>
                 <table style="margin-top: 32px;" class="items">
                    <tbody>
                        <tr style="text-align:center">
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<th  class="text-bold">'+ setting.signature.prepared_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.reviewed_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.verified_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.approved_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.recorded_by.text+'</th>'
                            :
                            ''
                        }
                        </tr>
                        <tr>
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        </tr>
                    </tbody>
                </table>
                 <div style="margin-top:50px"> 
                     <div class="row" style="margin:0px !important">
                         <div class="col-6"> 
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p style="line-height: 18px;" class="text-bold text-center">${setting.language=='English' ? "Customer's Signature & Name": setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ <br/> Customer's Signature & Name"}</p>
                         </div>
                         <div class="col-6">
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p style="line-height: 18px;" class="text-bold text-center">${setting.language=='English' ? "Seller's Signature & Name":setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់ <br/> Seller's Signature & Name"}</p>
                         </div>
                     </div>
                 </div>
         </div>
       ${Footer}
     `;
}
// Tax 2
function rederListTax2(data,empty_td,currency_d,currency_r,show_column){
    var items = ""
    data.forEach((i,index) => {
        let uomName = i.uom.uom ? i.uom.uom.name : i.uom.name
        let specificTaxExchangeAmount = i.specificTaxExchangeAmount ?  currency_d+kendo.toString(i.specificTaxExchangeAmount, i.decimalFormat)+currency_r  : ''
        let publicLightingTaxExchangeAmount = i.publicLightingTaxExchangeAmount ?  currency_d+kendo.toString(i.publicLightingTaxExchangeAmount, i.decimalFormat)+currency_r : ''
        let otherTaxExchangeAmount = i.otherTaxExchangeAmount ?  currency_d+kendo.toString(i.otherTaxExchangeAmount, i.decimalFormat)+currency_r  : ''
        let vatTaxExchangeAmount = i.vatTaxExchangeAmount ?  currency_d+kendo.toString(i.vatTaxExchangeAmount, i.decimalFormat)+currency_r : ''
        let incTaxAmount = i.includeTaxExchangeAmount ? currency_d+kendo.toString(i.includeTaxExchangeAmount, i.decimalFormat)+currency_r : ''
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDate), i.dateFormat)+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+kendo.toString(new Date(i.serviceDateTo), i.dateFormat)+'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+i.item.name+'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+i.description+'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+i.qoh+'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+i.qty+'</td>': ''} 
                    ${show_column.eight ? '<td class="text-center">'+ uomName +'</td>': ''} 
                    ${show_column.nine ? '<td class="text-center">'+currency_d+kendo.toString(i.price, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten ? '<td class="text-center">'+currency_d+kendo.toString(i.amount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten1 ? '<td class="text-center">'+i.modifier.name+'</td>': ''} 
                    ${show_column.ten2 ? '<td class="text-center">'+currency_d+kendo.toString(i.discountExchangeAmount, i.decimalFormat)+currency_r+'</td>': ''} 
                    ${show_column.ten3 ? '<td class="text-center">'+vatTaxExchangeAmount+'</td>': ''} 
                    ${show_column.ten4 ? '<td class="text-center">'+specificTaxExchangeAmount+'</td>': ''} 
                    ${show_column.ten5 ? '<td class="text-center">'+otherTaxExchangeAmount+'</td>': ''} 
                    ${show_column.ten6 ? '<td class="text-center">'+publicLightingTaxExchangeAmount+'</td>': ''} 
                    ${show_column.ten7 ? '<td class="text-center">'+i.saleUnit.name+'</td>': ''} 
                    ${show_column.ten8 ? '<td class="tright">'+incTaxAmount+'</td>': ''} 
                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td +  empty_td
    }
    return items;
}
exports.taxInvoice2 = (data, form_id, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let m_top = ''
    let address_center_log_left = "";
    marginX = setting.margin / 100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if (setting.table_header == 1) {
        table_header = 'uppercase'
    } else {
        table_header = 'capitalize'
    }

    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
        m_top = "margin-top:0px";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
        m_top = "margin-top: 8px";
    }else{
        m_right = "margin-right:10px";
        m_top = "margin-top: 8px;"
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

    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' || data.currency.code != 'USD' ?  data.currency.symbolNative :  '' : ''
    // column
    let column_1  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date From': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ​ពី' : 'កាលបរិច្ឆេទ​ពី <br/> Date From'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Date To': setting.language=='Khmer' ?  'ដល់កាលបរិច្ឆេទ​' : 'ដល់កាលបរិច្ឆេទ​  <br/> Date To'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Item':setting.language=='Khmer' ?  'ទំនិញ' : 'ទំនិញ<br/> Item'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'On Hand': setting.language=='Khmer' ?  'ស្តុកក្នុងដៃ' : 'ស្តុកក្នុងដៃ  <br/> On Hand'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Quanity': setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ  <br/> Quanity'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_9  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Unit Price': setting.language=='Khmer' ?  'តម្លៃឯកតា' : 'តម្លៃឯកតា  <br/> Unit Price'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Modifier': setting.language=='Khmer' ?  'កំណែប្រែ' : 'កំណែប្រែ  <br/> Modifier'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'VAT': setting.language=='Khmer' ?  'អាករលើតម្លៃបន្ថែម' : 'អាករលើតម្លៃបន្ថែម  <br/> VAT'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Specific Tax': setting.language=='Khmer' ?  'អាករពិសេស' : 'អាករពិសេស  <br/> Specific Tax'}</th>`
    let column_15 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Other Tax': setting.language=='Khmer' ?  'ពន្ធផ្សេងទៀត' : 'ពន្ធផ្សេងទៀត  <br/>  Other Tax'}</th>`
    let column_16 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Public Lighting Tax': setting.language=='Khmer' ?  'អាករបំភ្លឺសាធារណៈ' : 'អាករបំភ្លឺសាធារណៈ  <br/> Public Lighting Tax'}</th>`
    let column_17 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Sale Unit': setting.language=='Khmer' ?  'ឯកតាលក់' : 'ឯកតាលក់  <br/> Sale Unit'}</th>`
    let column_18 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount Incl.Tax': setting.language=='Khmer' ?  'ថ្លៃរួមអាករ' : 'ថ្លៃរួមអាករ  <br/> Amount Incl.Tax'}</th>`
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
                        ${setting.column.ten ? '<td></td>': ""}
                        ${setting.column.ten1 ? '<td></td>': ""}
                        ${setting.column.ten2 ? '<td></td>': ""}
                        ${setting.column.ten3 ? '<td></td>': ""}
                        ${setting.column.ten4 ? '<td></td>': ""}
                        ${setting.column.ten5 ? '<td></td>': ""}
                        ${setting.column.ten6 ? '<td></td>': ""}
                        ${setting.column.ten7 ? '<td></td>': ""}
                        ${setting.column.ten8 ? '<td></td>': ""}        
                    </tr>` 
    // let colspan = ' '
    // if(setting.column.two ||  setting.column.three){
    //     if(setting.column.two &&  setting.column.three){
    //         'colspan="4"'
    //     }else{
    //         'colspan="3"'
    //     }
    //   colspan = 'colspan="4"'
    // }else{
    //     colspan = ' colspan="2"'
    // }
    // let colspan2 = ' '
    // if(setting.column.one){
    //    colspan2 = ''
    // }else{
    //     colspan2 = ' colspan="1"'
    // }
    let vat = ''
    let pl_tax = ''
    let other_tax = ''
    let specific_tax = ''

    if(data){
            for (const property in data.taxListTotal) {
                if( property == 'Other Tax'){
                    other_tax =  currency_d+kendo.toString(data.taxListTotal[property], data.decimalFormat)+currency_r
                }
                if( property == 'Public Lighting Tax'){
                    pl_tax = currency_d+kendo.toString(data.taxListTotal[property], data.decimalFormat)+currency_r
                }
                if( property == 'Specific Tax'){
                    specific_tax = currency_d+kendo.toString(data.taxListTotal[property], data.decimalFormat)+currency_r
                }
                if( property == 'VAT/GST'){
                    vat = currency_d+kendo.toString(data.taxListTotal[property], data.decimalFormat)+currency_r
            }
        }
    }
    let subTotal = data ? currency_d+ kendo.toString(data.subTotal, data.decimalFormat)+ currency_r : ''
    let totalAmount = data ? currency_d+kendo.toString(data.total, data.decimalFormat)+currency_r : ''
     return ` 
    
        ${Header(setting.page,is_print)}
     
         <div class="form_setting">
             <div  style="display: flex; ${logo_postion}">
                 <div style="margin-top: 14px; ${m_left}; ${hide_logo}; ${m_right}; ${ address_center_log_left ? 'flex:1': ''}">
                     <div class="logo" style="width: 100%;margin-left: -9px;  ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''} ">
                         <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 10px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                     </div>
                 </div>
                 <div  style="flex:4; ${is_header} width:100%;">
                     <div style="${m_top}">
                        <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data.name}</h2>
                         <table  style="width:100%; text-align: left;">
                             <tr style="${center_text}">
                                 <td style="line-height: 22px; font-weight: bold;">${setting.language=='English' ? 'VATIN':  setting.language=='Khmer' ? 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ': 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ (VATIN)' }</td>
                             </tr>
                             <tr style="${center_text}">
                                 <td style="line-height: 22px;"> ${setting.language=='English' ? 'HP': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ HP'}:  ${company_data.companyPhone}</td>
                             </tr>
                             <tr style="${center_text}">
                                 <td style="line-height: 22px;"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: ${company_data.invoiceAddress}</td>
                             </tr>
                         </table>
                     </div>
                 </div>
                 ${address_center_log_left ? `<div style="flex:1;${hide_logo}" ></div>` : ''}
             </div>
             <div style="margin-bottom:0px;">
                 <h2 style="text-align: center;width:100%;">${setting.title}</h2>
             </div>
                 
                 <div class="row" style="margin:0px !important">
                     <div class="col-7" style="padding-left:0px !important; padding-right:6px !important; padding-bottom:0px !important;">
                         <table class="items_tb_border">
                             <body>
                                <tr>
                                    <td style="width: 180px;">${setting.language=='English' ? 'Customer': setting.language=='Khmer' ?  'អតិថិជន' : 'អតិថិជន (Customer)'}</td>
                                    <td>${data ? data.customer.contactPerson.length !=0 ? data.customer.contactPerson[0].name : ''  : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 180px;">${setting.language=='English' ? 'Company': setting.language=='Khmer' ? 'ក្រុមហ៊ុន' : 'ក្រុមហ៊ុន (Company)'}</td>
                                    <td>${data ? data.customer.name : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 180px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                    <td> ${data ? data.billingAddress.name : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 180px;">${setting.language=='English' ? 'Telephone': setting.language=='Khmer' ?  'លេខទូរស័ព្ទ' : 'លេខទូរស័ព្ទ (Telephone)'}</td>
                                    <td>${data ? data.customer.contactAddress.phoneNumber : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'VATTIN': setting.language=='Khmer' ?  'លេខអត្តសញ្ញាណកម្ម' : 'លេខអត្តសញ្ញាណកម្ម (VATTIN)'}</td>
                                    <td></td>
                                </tr>
                             </body>
                         </table>
                     </div>
                     <div class="col-5"  style="padding-left:6px !important; padding-right:0px !important; padding-bottom:0px !important;">
                        <table class="items_tb_border">
                            <body>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Invoice NO': setting.language=='Khmer' ?  'លេខ​វិ​ក័​យ​ប័ត្រ' : 'លេខ​វិ​ក័​យ​ប័ត្រ Invoice NO'}</td>
                                    <td>${data ? data.referenceNo: ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'DATE': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ DATE'}</td>
                                    <td> ${data ? data.transactionDate : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Exchange Rate': setting.language=='Khmer' ?  'អត្រា​ប្តូ​រ​ប្រាក់' : 'អត្រា​ប្តូ​រ​ប្រាក់ Exchange Rate'}</td>
                                    <td> ${data ? currency_d+kendo.toString(data.exchangeAmount, data.decimalFormat)+'<span style="line-height: 12px;">'+currency_r+'</span></td>' : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Payment Term': setting.language=='Khmer' ?  'លក្ខខណ្ឌ ទូទាត់' : 'លក្ខខណ្ឌ ទូទាត់ Payment Term'}</td>
                                    <td> ${data ? data.paymentTerm.name : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 170px;">${setting.language=='English' ? 'Due Date': setting.language=='Khmer' ?  'ថ្ងៃផុត​កំណត់' : 'ថ្ងៃផុត​កំណត់ Due Date'}</td>
                                    <td> ${data ? data.dueDate : ''}</td>
                                </tr>
                            </body>
                        </table>
                     </div>
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
                            ${setting.column.ten5 ? column_15 : ""}
                            ${setting.column.ten6 ? column_16 : ""}
                            ${setting.column.ten7 ? column_17 : ""}
                            ${setting.column.ten8 ? column_18 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederListTax2(data.itemLines,empty_td,currency_d,currency_r, setting.column) : empty_td }

                         <tr>
                            
                            <td colspan="2">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម Grand Total'}</td>
                            ${setting.column.two ? '<td></td>' : ""}
                            ${setting.column.three ? '<td></td>' : ""}
                            ${setting.column.four ? '<td></td>' : ""}
                            ${setting.column.five ? '<td></td>' : ""}
                            ${setting.column.six ? '<td></td>' : ""}
                            ${setting.column.eight ? '<td></td>' : ""}
                            ${setting.column.nine ? '<td></td>' : ""}
                            ${setting.column.ten ? '<td>'+ subTotal +'</td>' : ""}
                            ${setting.column.ten1 ? '<td></td>' : ""}
                            ${setting.column.ten2 ? '<td>discount</td>' : ""}
                            ${setting.column.ten3 ? '<td>'+vat+'</td>' : ""}
                            ${setting.column.ten4 ? '<td>'+specific_tax+'</td>' : ""}
                            ${setting.column.ten5 ? '<td>'+other_tax+'</td>' : ""}
                            ${setting.column.ten6 ? '<td>'+pl_tax+'</td>' : ""}
                            ${setting.column.ten7 ? '<td></td>' : ""}
                            ${setting.column.ten8 ? '<td>'+ totalAmount +'</td>' : ""}
                        </tr>
                     </tbody>
                 </table>
                 <table style="margin-top: 32px;" class="items">
                    <tbody>
                        <tr style="text-align:center">
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<th  class="text-bold">'+ setting.signature.prepared_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.reviewed_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.verified_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.approved_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.recorded_by.text+'</th>'
                            :
                            ''
                        }
                        </tr>
                        <tr>
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        </tr>
                    </tbody>
                </table>
                 <div style="margin-top:50px"> 
                     <div class="row" style="margin:0px !important">
                         <div class="col-6"> 
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p style="line-height: 18px;" class="text-bold text-center">${setting.language=='English' ? "Customer's Signature & Name": setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ <br/> Customer's Signature & Name"}</p>
                         </div>
                         <div class="col-6">
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p style="line-height: 18px;" class="text-bold text-center">${setting.language=='English' ? "Seller's Signature & Name":setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់ <br/> Seller's Signature & Name"}</p>
                         </div>
                     </div>
                 </div>
         </div>
       ${Footer}
     `;
}



exports.print = async (data, form_id, setting,payment) => {
  company_data = dataStore.company
  marginX = setting.margin / 100;
  styles.fontSize = setting.fontSize;
  styles.headerFontSize = setting.headerFontSize;
  if (setting.table_header == 1) {
      table_header = 'uppercase'
  } else {
      table_header = 'capitalize'
  }

  let  is_print = true;
  var contents = ""
  if(form_id == 1){
    contents = this.DefaultInvoice(data, form_id, setting,is_print)
  }else if(form_id == 2){
    contents =  await this.CommercialInvoice(data,  setting, is_print,payment)
  }else if(form_id == 3){
    contents =  this.taxInvoice(data, form_id, setting, is_print)
  }else if(form_id == 4){
    contents = this.taxInvoice2(data, form_id, setting, is_print)
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
    //   window.frames["frame1"].focus();
      window.frames["frame1"].print();
      document.body.removeChild(frame1);
  }, 300);
};

exports.getPrint = async (data,payment) => {
    let id = 1
    let form_type = data.transactionType.name;
    if (data.transactionType.name == "Commercial Invoice") {
      id = 2
    }else if(data.transactionType.name == "Tax Invoice"){
        if(data.formTemplate.name =="Template Two"){
            id = 4
            form_type = 'Tax Invoice2'
        }else{
            id = 3
        }
    }
    let parm_f = `?formType=${form_type}`
    await getFormSetting(parm_f).then(  res => {
        window.console.log(res);
        if (res.data.statusCode === 200) {
          if(res.data.data.length > 0){
            this.print(data, id, res.data.data["0"].settings,payment)
          }else{
             alert("Please save form setting first! សូមរក្សាទុកការកំណត់ទម្រង់ជាមុនសិន");
          }
        }
    })
    return true
}