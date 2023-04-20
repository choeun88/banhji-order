
const { dataStore } = require("@/observable/store");
const  {vuetify} = require('./vuetify.js')
const kendo =  require("@progress/kendo-ui");
var company_data = dataStore.company
var table_header = 'capitalize';
var marginX = 0.75;
var styles = {};
const cookieJS = require("@/cookie.js");
const { instituteId, user } = cookieJS.getCookie();
var JsBarcode = require('jsbarcode');
function textToBase64Barcode(text){
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE39"});
    return canvas.toDataURL("image/png");
}

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
                    },
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
                    font-size: ${styles.fontSize}px !important;
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
const numberFormat = (number, format = 'n2') =>{
    return kendo.toString(number, format)
}

exports.SaleOrder = (data, form_id, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }

    let address_center_log_left = ""
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
    let column_1 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'No.': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ <br/> No.'}</th>`
    let column_2 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Number': setting.language=='Khmer' ?  'លេខកូដ' : 'លេខកូដ <br/> Number'}</th>`
    let column_3 = `<th class="text-bold acc_header tleft" style="line-height:20px">${setting.language=='English' ? 'Item Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា <br/> Item Description'}</th>`
    let column_4 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Uom': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> Uom'}</th>`
    let column_5 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Qty': setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ  <br/> Qty'}</th>`
    let column_6 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Unit Price':setting.language=='Khmer' ?  'តម្លៃ​ឯកតា' : 'តម្លៃ​ឯកតា  <br/> Unit Price'}</th>`
    let column_7 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Discount':setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_8 = `<th class="text-bold acc_header tright" style="line-height:20px">${setting.language=='English' ? 'Total': setting.language=='Khmer' ?  'សរុប' : 'សរុប  <br/> Total'}</th>`
    let empty_td =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                    </tr>` 
    let currency_d = data ?  data.priceLevel.currency.code == 'USD' ?  data.priceLevel.currency.symbolNative ? data.priceLevel.currency.symbolNative : data.priceLevel.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.priceLevel.currency.code == 'KHR' ||  data.priceLevel.currency.code != 'USD' ?  data.priceLevel.currency.symbolNative ? data.priceLevel.currency.symbolNative : data.priceLevel.currency.symbol_native :  '' : ''
    
     return ` 
        ${Header(setting.page,is_print)}
     
         <div class="form_setting">
                <div  style="display: flex; ${logo_postion}">
                    <div style="${m_left}; ${hide_logo}; ${m_right};${ address_center_log_left ? 'flex:1': ''}">
                        <div class="logo" style="width: 10%;margin-left: -9px;  ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''} ">
                            <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                        </div>
                    </div>
                    <div  style="flex:4; ${is_header}">
                        <div class="">
                            <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data ? company_data.name  : ''}</h2>
                        
                            <table  style="width:100%; text-align: left;margin-top:0px !important;">
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: </span> ${company_data ? company_data.invoiceAddress: ''}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Tel': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ Tel'}: </span> ${company_data ? company_data.companyPhone : ''}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Email': setting.language=='Khmer' ? 'អ៊ីមែល' : 'អ៊ីមែល Email'}:</span>  ${company_data ? company_data.invoiceEmail : '' }</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Websit': setting.language=='Khmer' ? 'គេហទំព័រ' : 'គេហទំព័រ Website'}:</span> ${company_data ? company_data.website: ""}</td>
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
                <div class="row" style="background-color: ${setting.color.background}; color: ${setting.color.color}; margin:0px !important; ">
                    <div class="col-7">
                        <p class="text-bold" style="font-weight: bold; margin-bottom: 6px;" >${setting.language=='English' ? 'CUSTOMER INFO': setting.language=='Khmer' ? 'ព័ត៌មានអតិថិជន' : 'ព័ត៌មានអតិថិជន CUSTOMER INFO'}:</p>
                        <table>
                            <body>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px; ">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                    <td style="color: ${setting.color.color};">:</td>
                                    <td>${data ? data.customer.name : ''}</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Project': setting.language=='Khmer' ? 'គម្រោង' : 'គម្រោង Project'}</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Tel': setting.language=='Khmer' ?  'លេខទូរស័ព្ទ' : 'លេខទូរស័ព្ទ Tell'}</td>
                                    <td>:</td>
                                    <td>03939393</td>
                                </tr>
                            </body>
                        </table>
                    </div>
                    <div class="col-5">
                        <table>
                            <body>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 120px;">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ Nº'}</td>
                                    <td>:</td>
                                    <td>${data ? data.referenceNo: ''}</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 120px;">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'} </td>
                                    <td>:</td>
                                    <td> ${data ? data.transactionDate : ''}</td>
                                </tr>
                            </body>
                        </table>
                    </div>
                </div>
                <div  style="background: #000;display:flex; justify-content:space-between; color:#fff;padding:12px">
                   
                      <p class="text-bold acc_header" style="flex:1;margin-bottom:0px !important;">${setting.language=='English' ? 'Term of payment': setting.language=='Khmer' ?  'លក្ខខណ្ឌ' : 'លក្ខខណ្ឌ <br/> Term of payment'}: Cash</p>
                      <p class="text-bold acc_header" style="flex:1;margin-bottom:0px !important;">${setting.language=='English' ? 'Validity Period': setting.language=='Khmer' ?  'លក្ខខណ្ឌ' : 'សុពលភាព <br/> Validity Period'}: 17-02-2021</p>
                </div>
                <table class="items_bottom" style="margin-top:0px !important;margin-bottom:0px !important">
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
                         </tr>
                     </thead>
                     <tbody>
                         ${data != undefined ? rederList(data.itemLines,empty_td,currency_d,currency_r,setting.column) : empty_td }
                     </tbody>
                 </table>
                 <div class="row" style="margin:0px !important;">
                    <div class="col-6" style="padding:0px !important;">
                        ${data ? data.customer.noteOnInvoice: "" }
                    </div>
                    <div class="col-6" style="padding:0px !important;">
                    <table class="items_bottom" style="margin-top:0px !important;">
                        <tbody>
                            <tr>
                                <td class="text-bold acc_header tright" >${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតំលៃ' : 'បញ្ចុះតំលៃ Discount'} </td>
                                <td class="tright">${data ? data.discountTotal : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold acc_header tright"> ${setting.language=='English' ? 'Sub Total':setting.language=='Khmer' ? 'សរុបរង' : 'សរុបរង Sub Total'}</td>
                                <td class="tright">${data ? data.subTotal : '00000.00'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold acc_header tright">${setting.language=='English' ? 'Tax': setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ Tax'}</td>
                                <td class="tright">${data ? data.totalTaxAmount : ''}</td>
                            </tr>
                            <tr>
                                <td style="background:#000;color:#fff;"  class="text-bold acc_header tright">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម Grand Total'}</td>
                                <td class="tright">${data ? data.total : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
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

function rederList(data,empty_td,currency_d,currency_r,show_column){
    var items = ""
    // show_column.one = No
    // show_column.two = Number
    // show_column.three = Description
    // show_column.four = UOM
    // show_column.five = Qty
    // show_column.six = Unity price
    // show_column.seven = Discount
    // show_column.eight = Amount
    data.forEach((i,index) => {
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+index+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+i.number+'</td>': ''} 
                    ${show_column.three ? '<td class="tleft">'+i.description+'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+i.uom.uom.name+'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+i.qty+'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+currency_d+i.price+currency_r+'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+currency_d+i.discountAmount+currency_r+'</td>': ''} 
                    ${show_column.eight ? '<td class="tright">'+currency_d+i.amount+currency_r+'</td>': ''} 
                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td +  empty_td
    }
    return items;
}

exports.SaleQuote = (data, form_id, setting,is_print) => {

    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }

    let address_center_log_left = ""
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
    let column_1 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'No.': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ <br/> NO.'}</th>`
    let column_2 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Number': setting.language=='Khmer' ?  'លេខកូដ' : 'លេខកូដ <br/> Number'}</th>`
    let column_3 = `<th class="text-bold acc_header tleft" style="line-height:20px">${setting.language=='English' ? 'Item Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា <br/> Item Description'}</th>`
    let column_4 = `<th class="text-bold acc_header " style="line-height:20px">${setting.language=='English' ? 'Uom': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> Uom'}</th>`
    let column_5 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Qty': setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ  <br/> Qty'}</th>`
    let column_6 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Unit Price':setting.language=='Khmer' ?  'តម្លៃ​ឯកតា' : 'តម្លៃ​ឯកតា  <br/> Unit Price'}</th>`
    let column_7 = `<th class="text-bold acc_header" style="line-height:20px">${setting.language=='English' ? 'Discount':setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_8 = `<th class="text-bold acc_header tright" style="line-height:20px">${setting.language=='English' ? 'Total': setting.language=='Khmer' ?  'សរុប' : 'សរុប  <br/> Total'}</th>`
    let empty_td =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                    </tr>` 
    let currency_d = data ?  data.priceLevel.currency.code == 'USD' ?  data.priceLevel.currency.symbolNative ? data.priceLevel.currency.symbolNative : data.priceLevel.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.priceLevel.currency.code == 'KHR' ||  data.priceLevel.currency.code != 'USD' ?  data.priceLevel.currency.symbolNative ? data.priceLevel.currency.symbolNative : data.priceLevel.currency.symbol_native :  '' : ''
     return ` 
        ${Header(setting.page,is_print)}
     
         <div class="form_setting">
                <div  style="display: flex; ${logo_postion}">
                    <div style="${m_left}; ${hide_logo}; ${m_right};${ address_center_log_left ? 'flex:1': ''}">
                        <div class="logo" style="width: 100%;margin-left: -9px;${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''} ">
                            <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                        </div>
                    </div>
                    <div  style="flex:4; ${is_header}">
                        <div class="">
                            <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 30px;">${company_data ? company_data.name : ''}</h2>
                            <table  style="width:100%; text-align: left;margin-top:0px !important;">
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: </span> ${company_data ? company_data.invoiceAddress: ''}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Tel': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ Tel'}: </span> ${company_data ? company_data.companyPhone: '' }</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Email': setting.language=='Khmer' ? 'អ៊ីមែល' : 'អ៊ីមែល Email'}:</span>  ${company_data ? company_data.invoiceEmail : '' }</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Websit': setting.language=='Khmer' ? 'គេហទំព័រ' : 'គេហទំព័រ Website'}:</span> ${company_data ?  company_data.website : '' }</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    ${address_center_log_left ? `<div style="flex:1;${hide_logo}"></div>` : ''}
                </div>
                <div style="margin-bottom: 8px;">
                    ${
                        setting.title.en.status && !setting.title.kh.status ? 
                            `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.en.name}</h2>`
                        :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/>${setting.title.en.name}</h2>`
                        :  `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                    }
                </div>
                <div class="row" style="background-color: ${setting.color.background}; color: ${setting.color.color};margin:0px !important; ">
                    <div class="col-7">
                        <p class="text-bold" style="font-weight: bold; margin-bottom: 6px;" >${setting.language=='English' ? 'CUSTOMER INFO': setting.language=='Khmer' ? 'ព័ត៌មានអតិថិជន' : 'ព័ត៌មានអតិថិជន CUSTOMER INFO'}:</p>
                        <table>
                            <body>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px; ">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                    <td style="color: ${setting.color.color};">:</td>
                                    <td>${data ? data.customer.name : ''}</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Project': setting.language=='Khmer' ? 'គម្រោង' : 'គម្រោង Project'}</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Tel': setting.language=='Khmer' ?  'លេខទូរស័ព្ទ' : 'លេខទូរស័ព្ទ Tell'}</td>
                                    <td>:</td>
                                    <td></td>
                                </tr>
                            </body>
                        </table>
                    </div>
                    <div class="col-5">
                        <table>
                            <body>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 120px;">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ Nº'}</td>
                                    <td>:</td>
                                    <td>${data ? data.referenceNo: ''}</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 120px;">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'} </td>
                                    <td>:</td>
                                    <td> ${data ? data.transactionDate : ''}</td>
                                </tr>
                            </body>
                        </table>
                    </div>
                </div>
                <div  style="background: #000;display:flex; justify-content:space-between; color:#fff;padding:12px">
                   
                      <p class="text-bold acc_header" style="flex:1;margin-bottom:0px !important;">${setting.language=='English' ? 'Term of payment': setting.language=='Khmer' ?  'លក្ខខណ្ឌ' : 'លក្ខខណ្ឌ <br/> Term of payment'}: Cash</p>
                      <p class="text-bold acc_header" style="flex:1;margin-bottom:0px !important;">${setting.language=='English' ? 'Validity Period': setting.language=='Khmer' ?  'លក្ខខណ្ឌ' : 'សុពលភាព <br/> Validity Period'}: 17-02-2021</p>
                </div>
                <table class="items_bottom" style="margin-top:0px !important;margin-bottom:0px !important">
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
                         </tr>
                     </thead>
                     <tbody>
                         ${data != undefined ? rederList(data.itemLines,empty_td,currency_d,currency_r,setting.column) : empty_td }
                     </tbody>
                 </table>
                 <div class="row" style="margin:0px !important;">
                    <div class="col-6" style="padding: 6px 0px !important;">
                        ${data ? data.customer.noteOnInvoice: "" }
                    </div>
                    <div class="col-6" style="padding:0px !important;">
                    <table class="items_bottom" style="margin-top:0px !important;">
                        <tbody>
                            <tr>
                                <td class="text-bold acc_header  tright" >${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតំលៃ' : 'បញ្ចុះតំលៃ Discount'} </td>
                                <td class="tright">${data ? currency_d+data.discountTotal+currency_r : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold acc_header tright"> ${setting.language=='English' ? 'Sub Total':setting.language=='Khmer' ? 'សរុបរង' : 'សរុបរង Sub Total'}</td>
                                <td class="tright">${data ? currency_d+data.subTotal+currency_r: '00000.00'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold acc_header tright">${setting.language=='English' ? 'Tax': setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ Tax'}</td>
                                <td class="tright">${data ? currency_d+ data.totalTaxAmount+currency_r : ''}</td>
                            </tr>
                            <tr>
                                <td style="background:#000;color:#fff;"  class="text-bold acc_header tright">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម Grand Total'}</td>
                                <td class="tright">${data ? currency_d+data.total+currency_r : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
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

function rederPaymentRef(paymentRef){
    let ref = ""
    paymentRef.forEach((i,index)=>{
        ref = index == 0 ? ref +i.refNo :  ref+ ", " +i.refNo  
    })
    return ref;
}
function rederPaymentOption(paymentOption){
    let refpayment = ""
    paymentOption.forEach((i,index)=>{
        refpayment = index == 0 ? refpayment +i.paymentOption.type :  refpayment+ ", " +i.paymentOption.type  
    })
    return refpayment;
}
exports.SaleDeposite = (data, form_id, setting,is_print) => {
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }

    // let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
 
    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' ||  data.currency.code != 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol_native :  '' : ''
    window.console.log(currency_d,currency_r)
     return ` 
        ${Header(setting.page,is_print)}
     
         <div class="form_setting">
                <div class="row">
                        <div class="logo col-7" style="padding-bottom:0px;" >
                            <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important;  margin-top: 6px;" />
                        </div>
                        <div class="logo col-5" style="padding-bottom:0px;" > 
                            <h4 style="margin-top:0px; color:#000; font-weight: bold; font-size: 22px;">${setting.language=='English' ? 'Sale Deposit': setting.language=='Khmer' ?  'ប្រាក់កក់អតិថិជន' : 'ប្រាក់កក់អតិថិជន Sale Deposit'}</h4>
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
                                <td>${data ? data.customer.name : ''}</td>
                            </tr>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Contact Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន <br/> Contact Address'}</td>
                                <td>${data ? data.customer.billingAddress.address ?  data.customer.billingAddress.address[0].name : '' : ''} </td>
                            </tr>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង <br/> Purpose'}</td>
                                <td> ${data ? data.journalNote : ''}</td>
                            </tr>
                            <tr>
                                <td style="width: 130px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Reference Document': setting.language=='Khmer' ?  'លេខយោង' : 'លេខយោង <br/> Reference Document'}</td>
                                <td>${rederPaymentRef(data? data.itemLine: [])}</td>
                            </tr>
                            </body>
                        </table>
                    </div>
                <div class="col-5"  style="padding-left:6px !important; padding-right:0px !important; padding-bottom:0px !important;">
                   <h4>${setting.language=='English' ? 'TOTAL RECEIVED AMOUNT': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់ដែលទទួលបានសរុប' : 'ចំនួនទឹកប្រាក់ដែលទទួលបានសរុប <br/> TOTAL RECEIVED AMOUNT'}</h4>
                   <div style="width:100%;height:40px;background-color: ${setting.color.background}; color: ${setting.color.color}; padding:12px; margin-top:6px;">
                     <p style="text-align:center;margin:0px;">
                        ${ data ? currency_d+data.amount+currency_r: '00.00'}
                     </p>
                   </div>
                   <h4 style="margin-top: 10px;">${setting.language=='English' ? 'Mode of payment': setting.language=='Khmer' ?  'វិធីសាស្រ្តទូទាត់' : 'វិធីសាស្រ្តទូទាត់ Mode of payment'}:</h4>
                   <p>${rederPaymentOption(data? data.itemLine: [])}</p>
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
// Render list receipt
function rederListReceipt(data,check_panalty,check_discount){
    var items = ""

    data.forEach((i) => {
        let currency_d =  i.currency.code == 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative : i.currency.symbol :  '' 
        let currency_r =  i.currency.code == 'KHR' ||  i.currency.code != 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative : i.currency.symbol :  '' 
        items = items + `
                <tr>
                    <td class="text-center">${i.referenceNo}</td>
                    <td class="text-center">${i.paymentCode}</td>
                    <td class="text-center">${i.paymentOption.name}</td>
                     <td class="tright">${currency_d+ numberFormat(i.amountTobePaid)+currency_r}</td>
                    ${check_panalty > 0 ? `<td class="tright">${i.penalty}</td>`: ''} 
                    ${check_discount > 0 ? `<td class="tright">${i.exchangeDiscount}</td>`: ''}
                    <td class="tright">${currency_d+ numberFormat(i.paidAmount)+currency_r}</td>
                </tr>
            `;
    })
    return items;
}
function rederListReceiptRupp(data,check_panalty,check_discount,note){
    var items = ""

    data.forEach((i) => {
        let currency_d =  i.currency.code == 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative : i.currency.symbol :  '' 
        let currency_r =  i.currency.code == 'KHR' ||  i.currency.code != 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative : i.currency.symbol :  '' 
        items = items + `
                <tr>
                    <td class="tleft">${i.referenceNo}</td>
                    <td class="tleft">${note}</td>
                    ${data.length> 1 ? `<td class="text-center">${i.paymentOption.name}</td>`: ''}
                     <td class="tright">${currency_d+numberFormat(i.amountTobePaid)+currency_r}</td>
                    ${check_panalty > 0 ? `<td class="tright">${i.penalty}</td>`: ''} 
                    ${check_discount > 0 ? `<td class="tright">${i.exchangeDiscount}</td>`: ''}
                    <td class="tright">${currency_d+ numberFormat(i.paidAmount)+currency_r}</td>
                </tr>
            `;
    })
    return items;
}

exports.CashReceipt = (data, form_id, setting,is_print) => {
    window.console.log("company_data",data);
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
    // let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    // let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';

    let connectId = data ? data.customer.connectId != '' ?  data.customer.connectId :    data.customer.number : '0000';
    let barcode = textToBase64Barcode(connectId)
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

    let amountToPaid = 0;
    if(data){
        data.itemLine.map(i=> {
            amountToPaid +=i.amountTobePaid
        })
    }
    // let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
 
    // base currency
    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' ||  data.currency.code != 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol :  '' : ''
    let check_panalty = 0;
    let check_discount = 0;
    if(data){
        data.itemLine.forEach(i=> {
            check_panalty = check_panalty + i.penalty
            check_discount = check_discount+ i.exchangeDiscount
        })
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
                                <td style="line-height: 22px;">${company_data.invoiceAddress ? company_data.invoiceAddress: "st 132 , Norodom Phnom Penh, KH" }</td>
                            </tr>
                            <tr style="${center_text}">
                                <td style="line-height: 22px;"> ${setting.language=='English' ? 'Phone': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ Phone'}: ${company_data.companyPhone}  </td>
                            </tr>
                        </table>
                    </div>
                </div>
                ${address_center_log_left ? `<div style="flex:1;${hide_logo}" ></div>` : ''}
            </div>
            <div style="border-bottom: 1px solid black; margin-top: 10px;">
            </div>
                <div style=" justify-content: space-around;display: flex;">
                    <div style="flex: 1" >
                        <img src="${barcode}" style="height:75px;margin-top:3px;" />
                    </div>
                    <div style="flex:2; padding-left:12px; padding-right:12px;" >
                        ${
                            setting.title.en.status && !setting.title.kh.status ? 
                                `<h2 style="text-align: center;margin-top: 6px;width: 100%;line-height:32px;">${setting.title.en.name}</h2>`
                            :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top:6px; width: 100%;line-height:32px;">${setting.title.kh.name} / ${setting.title.en.name}</h2>`
                            :  `<h2 style="text-align: center;margin-top: 6px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                        }
                    </div>
                    <div style="flex: 1; margin-top: 12px;" >
                        <p style="margin-bottom: 4px;">${setting.language=='English' ? 'No.': setting.language=='Khmer' ?  'លេខបង្កាន់ដៃ' : 'លេខបង្កាន់ដៃ No.'}:  <span>${data ? data.referenceNo: ''}</span></p>
                        <p> ${setting.language=='English' ? 'DATE': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ DATE'}: <span>${data ? data.transactionDate : ''}</span></p>
                    </div>
                </div>
                <div style=" justify-content: space-around;display: flex;">
                    <div style="flex: 1" >
                        <p class="text-bold"> ${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}: ${data ? data.customer.name : ''} </p>
                    </div>
                    <div style="flex:1" >
                        <p class="text-bold">  ${setting.language=='English' ? 'Gender': setting.language=='Khmer' ?  'ភេទ' : 'ភេទ Gender'}:   ${data ? data.customer.name : ''} </p>
                    </div>
                    ${
                    setting.language=='Khmer' ?
                    ` <div style="flex: 1" > <p class="text-bold"> ឈ្មោះឡាតាំង:   ${data ? data.customer.alternativeName : ''} </p> </div>`: ''
                    }
                </div>
                <div class="item" style="flex: 1;">
                    <table class="items_tb_border" style="width:100%">
                        <body>
                        <tr style="background-color: ${setting.color.background}; color: ${setting.color.color};">
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Invoice No.': setting.language=='Khmer' ? 'លេខវិក្កយបត្រ' : 'លេខវិក្កយបត្រ <br/> Invoice No.'}</td>
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Payment Code': setting.language=='Khmer' ?  'លេខកូដទូទាត់' : 'លេខកូដទូទាត់ <br/>  Payment Code'}</td>
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Payment Option': setting.language=='Khmer' ?  'វិធីសាស្ត្រទូទាត់' : 'វិធីសាស្ត្រទូទាត់ <br/> Payment Option'}</td>
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់ Amount'}</td>
                            ${check_panalty >0 ? ` <td class="text-bold text-center" >${setting.language=='English' ? 'Penalty': setting.language=='Khmer' ?  'ពិន័យ' : 'ពិន័យ Penalty'}</td>`:``}
                            ${check_discount > 0 ? `<td class="text-bold text-center" >${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ <br/> Discount'}</td>`:``} 
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Receipt Amount': setting.language=='Khmer' ?  'ទឹកប្រាក់ដែលត្រូវបង់' : 'ទឹកប្រាក់ដែលត្រូវបង់ <br/>  Receipt Amount'}</td>
                        </tr>
                        ${ data ? rederListReceipt(data.itemLine,check_panalty,check_discount,data.transactionNote): 
                        `
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                ${check_panalty >0 ? `<td></td>`: '' }
                                ${check_discount >0 ? `<td></td>`: '' }
                                <td></td>
                            </tr>
                        `
                        }
                        ${
                            data ? 

                            data.transactionNote!= '' ?
                            `
                            <tr>
                                <td colspan="${check_panalty >0 && check_discount > 0 ? '7':  check_panalty >0 ? '6' : check_discount >0 ? '6' : '5' }"> ${ data ? data.transactionNote: ''}</td>
                            </tr>
                            `
                            : ''
                            : ''
                        }
                        <tr>
                            <td class="tright text-bold "  colspan="3">${setting.language=='English' ? 'Total:':  setting.language=='Khmer' ?  'សរុប៖' : 'សរុប Total:'}</td>
                            <td class="tright text-bold">${currency_d+numberFormat(amountToPaid)+currency_r}</td>
                            ${check_panalty >0 ? `<td></td>`: '' }
                            ${check_discount >0 ? `<td></td>`: '' }
                            <td class="tright text-bold">${ data ?  currency_d+numberFormat(data.total)+currency_r: ''}</td>
                        </tr>
                        </body>
                    </table>
                </div>
                <div class="row" style="margin-top:40px !important; margin-left:0px !important; margin-right:0px !important;">
                    <div class="col-7" style="padding-left:0px !important; padding-top:0px !important; padding-right:12px !important;" >
                        <p>${setting.language=='English' ? setting.signature.prepared_by.text :  setting.language=='Khmer' ?  setting.signature.prepared_by.text_kh :  setting.signature.prepared_by.text_kh+' '+setting.signature.prepared_by.text}: ${ setting.signature.verified_by.text} </p>
                    </div>
                    <div class="col-5" style="padding:0px !important; display: flex;">
                        <p>${setting.language=='English' ? 'Signature': setting.language=='Khmer' ?  'ហត្ថលេខា' : 'ហត្ថលេខា Signature'}  </p>
                        <div style ="width: 100%;border-bottom: 1px dotted; height: 11px;margin-left: 12px; "></div>
                    </div>
                </div>
            </div>
         </div>
      
       ${Footer}
     `;
}
exports.CashReceiptRupp = (data, form_id, setting,is_print) => {
    window.console.log("company_data",data);
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
    // let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    // let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';

    let connectId = data ? data.customer.connectId != '' ?  data.customer.connectId :    data.customer.number : '999999';
    let barcode = textToBase64Barcode(connectId)
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
    let amountToPaid = 0;
    if(data){
        data.itemLine.map(i=> {
            amountToPaid +=i.amountTobePaid
        })
    }
    // let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
 
    // base currency
    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' ||  data.currency.code != 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol :  '' : ''
    let check_panalty = 0;
    let check_discount = 0;
    if(data){
        data.itemLine.forEach(i=> {
            check_panalty = check_panalty + i.penalty
            check_discount = check_discount+ i.exchangeDiscount
        })
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
                        <h2 style="margin: 0px; ${center_text}; width: 100%;line-height: 33px;"><span style="font-size: 26px !important;" >សកលវិទ្យាល័យភូមិន្នភ្នំពេញ. </span><br/> <span style="font-size: 18px !important;" > ROYAL UNIVERSITY OF PHNOM PENH </span></h2>
                        <table  style="width:100%; text-align: left; ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''}">
                            <tr style="${center_text}">
                                <td style="line-height: 22px;">${company_data.invoiceAddress ? company_data.invoiceAddress: "st 132 , Norodom Phnom Penh, KH" }</td>
                            </tr>
                            <tr style="${center_text}">
                                <td style="line-height: 22px;"> ${setting.language=='English' ? 'Phone': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ Phone'}: ${company_data.companyPhone}  </td>
                            </tr>
                        </table>
                    </div>
                </div>
                ${address_center_log_left ? `<div style="flex:1; flex: 1;justify-content: end;flex-direction: column;display: flex;${hide_logo}" >
                    <p style="margin-bottom: 0px;border: 1px solid #d9d6d6;padding: 3px;margin-bottom: 0px;">បង់ប្រាក់រួចមិនអាចដកវិញបាន <br/> Nonerefundable</p>
                </div>` : ''}
            </div>
            <div style="border-bottom: 1px solid black; margin-top: 10px;">
            </div>
                <div style=" justify-content: space-around;display: flex;">
                    <div style="flex: 1" >
                        <img src="${barcode}" style="height:75px;margin-top:3px;" />
                    </div>
                    <div style="flex:2; padding-left:12px; padding-right:12px;" >
                        ${
                            setting.title.en.status && !setting.title.kh.status ? 
                                `<h2 style="text-align: center;margin-top: 6px;width: 100%;line-height:32px;">${setting.title.en.name}</h2>`
                            :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top:6px; width: 100%;line-height:32px;">${setting.title.kh.name} / ${setting.title.en.name}</h2>`
                            :  `<h2 style="text-align: center;margin-top: 6px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                        }
                    </div>
                    <div style="flex: 1; margin-top: 12px;" >
                        <p style="margin-bottom: 4px;">${setting.language=='English' ? 'No.': setting.language=='Khmer' ?  'លេខបង្កាន់ដៃ' : 'លេខបង្កាន់ដៃ No.'}:  <span>${data ? data.referenceNo: ''}</span></p>
                        <p> ${setting.language=='English' ? 'DATE': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ DATE'}: <span>${data ? data.transactionDate : ''}</span></p>
                    </div>
                </div>
                <div style=" justify-content: space-around;display: flex;">
                    <div style="flex: 1" >
                        <p class="text-bold"> ${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}: ${data ? data.customer.name : ''} </p>
                    </div>
   
                    ${
                    setting.language=='Khmer' ?
                    ` <div style="flex: 1" >  <p>  <span class="text-bold">  ឈ្មោះឡាតាំង:   ${data ? data.customer.alternativeName : ''} </span> </p> </div>`: ''
                    }
                    ${
                        data ? 
                        data.itemLine.length == 1  ?
                        `
                            <div style="flex:1" >
                                <p> <span class="text-bold"> ${setting.language=='English' ? 'Payment Option': setting.language=='Khmer' ?  'វិធីសាស្ត្រទូទាត់' : 'វិធីសាស្ត្រទូទាត់ <br/> Payment Option'}:</span> ${data.itemLine[0].paymentOption.name}</p>
                            </div>
                        `
                        : '' : ''
                    }
                  
                </div>
                <div class="item" style="flex: 1;">
                    <table class="items_tb_border" style="width:100%">
                        <body>
                        <tr style="background-color: ${setting.color.background}; color: ${setting.color.color};">
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Invoice No.': setting.language=='Khmer' ? 'លេខវិក្កយបត្រ' : 'លេខវិក្កយបត្រ <br/> Invoice No.'}</td>
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ពិពណ៌នា' : 'ពិពណ៌នា  <br/> Description'}</td>
                            ${
                                data ? 
                                data.itemLine.length > 1  ?
                                `
                                    <td class="text-bold text-center" >${setting.language=='English' ? 'Payment Option': setting.language=='Khmer' ?  'វិធីសាស្ត្រទូទាត់' : 'វិធីសាស្ត្រទូទាត់ <br/> Payment Option'}</td>
                                `
                                : '' : ''
                            }
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនត្រូវទូទាត់' : 'ចំនួនត្រូវទូទាត់ Amount'}</td>
                            ${check_panalty >0 ? ` <td class="text-bold text-center" >${setting.language=='English' ? 'Penalty': setting.language=='Khmer' ?  'ពិន័យ' : 'ពិន័យ Penalty'}</td>`:``}
                            ${check_discount > 0 ? `<td class="text-bold text-center" >${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ <br/> Discount'}</td>`:``} 
                            <td class="text-bold text-center" >${setting.language=='English' ? 'Receipt Amount': setting.language=='Khmer' ?  'ចំនួនទទួល' : 'ចំនួនទទួល <br/>  Receipt Amount'}</td>
                        </tr>
                        ${ data ? rederListReceiptRupp(data.itemLine,check_panalty,check_discount,data.transactionNote): 
                        `
                            <tr>
                                <td></td>
                                <td></td>
                                ${
                                    data ? 
                                    data.itemLine.length == 1  ?
                                    `
                                        <td></td>
                                    `
                                    : '' : ''
                                }
                                <td></td>
                                ${check_panalty >0 ? `<td></td>`: '' }
                                ${check_discount >0 ? `<td></td>`: '' }
                                <td></td>
                            </tr>
                        `
                        }
                        <tr>
                            ${
                                data ? 
                                data.itemLine.length == 1  ?
                                `
                                    <td class="tright text-bold " colspan="2">${setting.language=='English' ? 'Total:':  setting.language=='Khmer' ?  'សរុប៖' : 'សរុប Total:'}</td>
                                `
                                :  `<td class="tright text-bold "  colspan="3">${setting.language=='English' ? 'Total:':  setting.language=='Khmer' ?  'សរុប៖' : 'សរុប Total:'}</td>`
                            : `<td class="tright text-bold "  colspan="2">${setting.language=='English' ? 'Total:':  setting.language=='Khmer' ?  'សរុប៖' : 'សរុប Total:'}</td>`
                            }
                            <td class="tright text-bold">${currency_d+numberFormat(amountToPaid)+currency_r}</td>
                            ${check_panalty >0 ? `<td></td>`: '' }
                            ${check_discount >0 ? `<td></td>`: '' }
                            <td class="tright text-bold">${ data ?  currency_d+numberFormat(data.total)+currency_r: ''}</td>
                        </tr>
                        </body>
                    </table>
                </div>
                <div class="row" style="margin-top:40px !important; margin-left:0px !important; margin-right:0px !important;">
                    <div class="col-7" style="padding-left:0px !important; padding-top:0px !important; padding-right:12px !important;" >
                        <p>${setting.language=='English' ? setting.signature.prepared_by.text :  setting.language=='Khmer' ?  setting.signature.prepared_by.text_kh :  setting.signature.prepared_by.text_kh+' '+setting.signature.prepared_by.text}: ${ user['custom:firstName'] + ' ' + user['custom:lastName']} </p>
                    </div>
                    <div class="col-5" style="padding:0px !important; display: flex;">
                        <p>${setting.language=='English' ? 'Signature': setting.language=='Khmer' ?  'ហត្ថលេខា' : 'ហត្ថលេខា Signature'}  </p>
                        <div style ="width: 100%;border-bottom: 1px dotted; height: 11px;margin-left: 12px; "></div>
                    </div>
                </div>
            </div>
         </div>
      
       ${Footer}
     `;
}

exports.CashReceiptBackUp = (data, form_id, setting,is_print) => {

    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;
      if(setting.table_header == 1){  
          table_header = 'uppercase'
      }else{
          table_header = 'capitalize'
      }
    // let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
 
    // base currency
    let currency_d = data ?  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol :  '' : ''
    let currency_r = data ?  data.currency.code == 'KHR' ||  data.currency.code != 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative : data.currency.symbol :  '' : ''
    let check_panalty = 0;
    let check_discount = 0;
    if(data){
        data.itemLine.forEach(i=> {
            check_panalty = check_panalty + i.penalty
            check_discount = check_discount+ i.exchangeDiscount
        })
    }
     return ` 
        ${Header(setting.page,is_print)}
     
         <div class="form_setting">
                <div class="row">
                        <div class="logo col-7" style="padding-bottom:0px;" >
                            <img src="${ setting.logo.isPrimary ? company_data.logPrimary.length> 0 && company_data.logPrimary[0].url  : company_data.logSecondary.length> 0 && company_data.logSecondary[0].url  }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important;  margin-top: 6px;" />
                        </div>
                        <div class="logo col-5" style="padding-bottom:0px;" > 
                            ${
                                setting.title.en.status && !setting.title.kh.status ? 
                                    `<h2 style="text-align: left;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.en.name}</h2>`
                                :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: left;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/>${setting.title.en.name}</h2>`
                                :  `<h2 style="text-align: left;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
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
                    <div class="col-7" style="padding-left:0px !important; padding-right:12px !important; padding-bottom:0px !important;padding-top:0px !important;">
                        <table class="items_tb_border">
                            <body>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Receive From': setting.language=='Khmer' ?  'ទទួលពីឈ្មោះ' : 'ទទួលពីឈ្មោះ <br/> Receive From'}</td>
                                <td>${data ? data.customer.name : ''}</td>
                            </tr>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Contact Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន <br/> Contact Address'}</td>
                                <td>${data ?  '' : ''}</td>
                            </tr>
                            <tr>
                                <td style="width: 180px;background-color:${setting.color.background2};color:${setting.color.color2} ">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង <br/> Purpose'}</td>
                                <td> ${data ? data.journalNote : ''}</td>
                            </tr>
                            </body>
                        </table>
                    </div>
                <div class="col-5"  style="padding-left:6px !important; padding-right:0px !important; padding-bottom:0px !important;">
                   <h4>${setting.language=='English' ? 'TOTAL RECEIVED AMOUNT': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់ដែលទទួលបានសរុប' : 'ចំនួនទឹកប្រាក់ដែលទទួលបានសរុប <br/> TOTAL RECEIVED AMOUNT'}</h4>
                   <div style="width:100%;height:40px;background-color: ${setting.color.background}; color: ${setting.color.color}; padding:12px; margin-top:6px;">
                     <p style="text-align:center;margin:0px; text-bold">
                        ${ data ? currency_d+numberFormat(data.exchangeAmount)+currency_r : '00.00'}
                     </p>
                   </div>
                </div>
                <div class="item" style="flex: 1;">
                    <table class="items_tb_border" style="width:100%">
                        <body>
                            <tr>
                                <td class="text-bold text-center" >${setting.language=='English' ? 'Invoice No.': setting.language=='Khmer' ? 'លេខវិក្កយបត្រ' : 'លេខវិក្កយបត្រ <br/> Invoice No.'}</td>
                                <td class="text-bold text-center" >${setting.language=='English' ? 'Payment Code': setting.language=='Khmer' ?  'លេខកូដទូទាត់' : 'លេខកូដទូទាត់ <br/>  Payment Code'}</td>
                                <td class="text-bold text-center" >${setting.language=='English' ? 'Payment Option': setting.language=='Khmer' ?  'ជម្រើសនៃការទូទាត់' : 'ជម្រើសនៃការទូទាត់ <br/> Payment Option'}</td>
                                <td class="text-bold text-center" >${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់ Amount'}</td>
                               ${check_panalty >0 ? ` <td class="text-bold text-center" >${setting.language=='English' ? 'Penalty': setting.language=='Khmer' ?  'ពិន័យ' : 'ពិន័យ Penalty'}</td>`:``}
                               ${check_discount > 0 ? `<td class="text-bold text-center" >${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ <br/> Discount'}</td>`:``} 
                                <td class="text-bold text-center" >${setting.language=='English' ? 'Receipt Amount': setting.language=='Khmer' ?  'ទឹកប្រាក់ដែលត្រូវបង់' : 'ទឹកប្រាក់ដែលត្រូវបង់ <br/>  Receipt Amount'}</td>
                            </tr>
                            ${ data ? rederListReceipt(data.itemLine,check_panalty,check_discount,data.transactionNote): 
                            `
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            `
                            }

                    

                        </body>
                    </table>
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


exports.GetReceipt = (data, form_id, setting,is_print) => {
    if(instituteId === 'inst-02594737' ||  instituteId === 'inst-19008911' ){
        //   RUPP
        return this.CashReceiptRupp(data, form_id, setting,is_print)
      } else {
        return this.CashReceipt(data, form_id, setting,is_print)
      }
}
exports.print = (data, form_id, setting) => {
  company_data = dataStore.company;
  window.console.log("company_data",company_data);
  let  is_print = true;
  marginX = setting.margin/100;
  styles.fontSize = setting.fontSize;
  styles.headerFontSize = setting.headerFontSize;
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }
  var contents = "";
  if(form_id == 1){
    contents =  this.SaleOrder(data, form_id, setting,is_print)
  }else if(form_id == 3){
    contents =  this.SaleDeposite(data, form_id, setting,is_print)
  }else if(form_id == 4){
      if(instituteId === 'inst-02594737' ||  instituteId === 'inst-19008911'){
        //   RUPP
        contents =  this.CashReceiptRupp(data, form_id, setting,is_print)
      } else {
        contents =  this.CashReceipt(data, form_id, setting,is_print)
      }

  }
  else{
    contents =  this.SaleQuote(data, form_id, setting,is_print)
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
