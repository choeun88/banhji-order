

const { dataStore } = require("@/observable/store");
var company_data = dataStore.company
// const { getFormSetting } = require("@/scripts/settingsHandler.js")
const kendo =  require("@progress/kendo-ui");
const  {vuetify} = require('./vuetify.js')
// const settingsHandler = require("@/scripts/settingsHandler");

const dateFormat = (date) =>{
    return kendo.toString(new Date(date), company_data.dateFormat)
}
const numberFormat = (value) =>{
    return kendo.toString(value, 'n2')
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
                    ${is_print ? vuetify() : ''}
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
                        print-color-adjust: exact;
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
                        td{
                     
                            font-family: 'Niradei-Regular';
                        }
                        table,tr,td{
                            border-collapse: collapse !important; 
                            font-family: 'Niradei-Regular';
                        }
                        span{
                            font-family: 'Niradei-Regular';
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


let toal_expensereimbures = 0;

// Advancevoucher form

function rederListAdvance(data,language,currency_d_base,currency_r_base,one){
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${en.account.name }</td>
                ${
                    one ? `<td class= " ">${en.description}</td>` : ''
                }
   
                <td class="tright" >${en.amount >=0 ?  currency_d_base+ Number(en.amount).toLocaleString()    +currency_r_base : '0'}</td>
                <td class="tright" >${en.amount<0  ?  currency_d_base+  Number(en.amount*(-1)).toLocaleString()  + currency_r_base : '0'}</td>
                <td class="tleft" ></td>
            </tr>
        `;
     
  
    })
    return items;
}

exports.AdvanceVourcher = (data, setting,is_print) => {
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
                            <h2 style="margin: 0px; ${center_text}; width: 100%; line-height: 30px;">${company_data.name}</h2>
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
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'អ្នកស្នើសុំ' : 'អ្នកស្នើសុំ Name'}</td>
                                <td  style="width: 180px;">${data ? data.employee.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Advance Vourcher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ AV No.'}</td>
                                <td>${data ? data.cashAdvance.ref_number : 'JV00000009'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Position': setting.language=='Khmer' ?  'តំណែង' : 'តំណែង Position'}</td>
                                <td> ${data ?   '' : ''} </td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td> ${data ?  dateFormat(data.cashAdvance.advance_date)  : '00-00-0000'}</td>
                                
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Segment'}</td>
                                <td> ${data ?   data.segment.name : ''} </td>
                                <td class="text-bold">${setting.language=='English' ? 'Business Unit': setting.language=='Khmer' ?  'អង្គភាពអាជីវកម្ម' : 'អង្គភាពអាជីវកម្ម Business Unit'}</td>
                                <td> ${data ?   data.location.name : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Project': setting.language=='Khmer' ?  'គម្រោង' : 'គម្រោង Project'}</td>
                                <td colspan="3">${data ?   data.project.name : ''} </td>
                            </tr>
                            <tr>
                                <td  colspan="1" style=""><span class="text-bold">${setting.language=='English' ? 'Mode of payment': setting.language=='Khmer' ?  'វិធីសាស្រ្តទូទាត់' : 'វិធីសាស្រ្តទូទាត់ Mode of payment'} </td>
                                <td colspan="3">    
                                    <span class="text-bold">${setting.language=='English' ? 'Mode of payment': setting.language=='Khmer' ?  'វិធីសាស្រ្តទូទាត់' : 'វិធីសាស្រ្តទូទាត់ Mode of payment'}:</span> ${data ?   data.paymentMethod.name : ''}
                                    <br/>
                                    <span class="text-bold">${setting.language=='English' ? 'Currency Required': setting.language=='Khmer' ?  'ប្រភេទរូបិយប័ណ្ណ' : 'ប្រភេទរូបិយប័ណ្ណ Currency Required'}:</span> ${data ?   data.currency.code : ''}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="1" style=""><span class="text-bold">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}</span></td>
                                <td colspan="3"> ${data ? data.cashAdvance.description: ''}</td>
                                
                            </tr>
                        </body>
                    </table>
                 </div>
                 <div style="margin-top:16px" >
                    <table class="items_tb_border">
                        <body>
                
                            <tr>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'លេខកូដ' : 'លេខកូដ Code'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                ${
                                    setting.column.one ?
                                    ` 
                                        <td class="text-bold acc_header" >${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</td>
                                    ` : 
                                    ''
                                }

                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                                <td class="text-bold acc_header" >${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'ផ្នែកអាជីវកម្ម' : 'ផ្នែកអាជីវកម្ម Segment'}</td>
                              

                            </tr>
                            ${data != undefined ? rederListAdvance(data.cashAdvance.details, setting.language,currency_d_base,currency_r_base,setting.column.one,setting.column.two) : 
                            `
                                <tr>
                                    <td></td>
                                    <td></td>
                                    ${
                                        setting.column.one ? ` <td></td>`: ''
                                    }
                                   
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    ${
                                        setting.column.one ? ` <td></td>`: ''
                                    }
                                   
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                 
                                </tr>
                            ` }
                            <tr>
                                <td class="text-bold" colspan="${setting.column.one ? 5: 4}" style="text-align:right">${setting.language=='English' ? 'Total':  setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                                <td class="tright" >${data ?  currency_d_base+ Number(data.total).toLocaleString() +currency_r_base : '00'}</td>
                           
                           
                            </tr>
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

//  reimburesment expense
//  reimburesment expense
//  reimburesment expense

// 
function rederListReimburesement(data,empty_td,show_column,currency_d,currency_r){
    var items = ""
    data.forEach((i,index) => {
        // let amountDisccount = i.discountExchangeAmount ? currency_d+kendo.toString(i.discountExchangeAmount, i.decimalFormat)+currency_r : currency_d+0+currency_r;
       let amt = 0;
        i.expense_entries.forEach(ele => {
            if (ele.amount>0) {
                amt += ele.amount;
            }
        });

        toal_expensereimbures += amt;
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+ i.number+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+ i.supplier.name +'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+ i.voucher_note +'</td>': ''} 
                    ${show_column.five ? '<td class="tright">'+ currency_d+Number(amt).toLocaleString()+currency_r +'</td>': ''} 

                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td 
    }
    return items;
}

function rederListAcountingReimburesment(data,language,currency_d_base,currency_r_base){
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${en.account.name }</td>
                <td class="tleft">${en.amount >=0 ?  currency_d_base+ Number(en.amount).toLocaleString()    +currency_r_base : '0'}</td>
                <td class="tleft">${en.amount<0  ?  currency_d_base+  Number(en.amount*(-1)).toLocaleString()  + currency_r_base : '0'}</td>
         
            
            </tr>
        `;
     
  
    })
    return items;
}


exports.ReimbursememtVourcher = (data, setting,is_print) => {
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
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Invoice No.': setting.language=='Khmer' ?  'លេខ​វិ​ក័​យ​ប័ត្រ' : 'លេខ​វិ​ក័​យ​ប័ត្រ  <br/> Invoice No.'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Supplier': setting.language=='Khmer' ?  'ទំនិញ' : ' ទំនិញ <br/> Supplier'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា <br/> Amount'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount':setting.language=='Khmer' ?  'រូបិយប័ណ្ណ' : 'រូបិយប័ណ្ណ <br/> Amount'}</th>`

    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                    </tr>` 
    let show_column_num = 5;
    // for (const property in setting.column) {
    //         if(setting.column[property]){
    //             show_column_num +=1
    //         }
    // }

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
                            <h2 style="margin: 0px; ${center_text}; width: 100%; line-height: 30px;">${company_data.name}</h2>
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
                                <td class="text-bold" style="width: 200px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td style="min-width: 120px;" >${data ? data.payer.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Number': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Number'}</td>
                                <td>${data ? data.number : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Mode of payment': setting.language=='Khmer' ?  'វិធីសាស្រ្តទូទាត់' : 'វិធីសាស្រ្តទូទាត់ Mode of payment'}</td>
                                <td ></td>
                                <td class="text-bold" style="min-width: 130px;">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td style="min-width: 180px;">${data ? dateFormat(data.reimbursement_date) : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Segment': setting.language=='Khmer' ? 'ផ្នែក' : 'ផ្នែក Segment '}</td>
                                <td >${data ?  data.segment.name: ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Project': setting.language=='Khmer' ?  'គម្រោង' : 'Project គម្រោង'}</td>
                                <td style="width: 200px;">${data ? data.project  ? data.project.name: '': ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}</td>
                                <td colspan="3" >${data ? data.description : ''}</td>
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
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederListReimburesement(data.expenses,empty_td,setting.column,currency_d_base,currency_r_base  ) : empty_td }
                  
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Total':  setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                            <td colspan="3" class="tright">${data ? currency_d_base + Number(toal_expensereimbures).toLocaleString() + currency_r_base : ''}</td>
                        </tr>
 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" >${setting.language=='English' ? 'Account Code': setting.language=='Khmer' ? 'លេខកូដគណនី' : 'លេខកូដគណនី Account Code'}</td>
                                <td class="text-bold" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                <td class="text-bold" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                            </tr>
                            ${data != undefined ? rederListAcountingReimburesment(data.journal_entries, setting.language,currency_d_base,currency_r_base) :
                            `
                                <tr>
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
// advance settlerment voucher

function rederListAdvanceSettlement(data,empty_td,show_column){
    var items = ""
    data.forEach((i,index) => {
       let currency_d=  i.currency.code == 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative :'$' : ''
        let currency_r =  i.currency.code !== 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative :'៛'  : ''
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="tleft">'+ i.number+'</td>': ''} 
                    ${show_column.three ? '<td class="tleft">'+ i.name +'</td>': ''} 
                    ${show_column.four ? '<td class="tleft">'+ i.description +'</td>': ''} 
                    ${show_column.five ? '<td class="tright">'+ currency_d+numberFormat(i.amount)+currency_r +'</td>': ''} 

                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td 
    }
    return items;
}

function rederListAcountingSettelement(data,language,currency_d_base,currency_r_base){
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${en.account.name }</td>
                <td class="tright">${en.amount >=0 ?  currency_d_base+ Number(en.amount).toLocaleString()    +currency_r_base : '0'}</td>
                <td class="tright">${en.amount<0  ?  currency_d_base+  Number(en.amount*(-1)).toLocaleString()  + currency_r_base : '0'}</td>
         
            
            </tr>
        `;
     
  
    })
    return items;
}
exports.AdvanaceSettlement = (data, setting,is_print) => {
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
    let receipt_paid = setting.language=='English' ? 'Amount Receipt/Paid':  setting.language=='Khmer' ?  'ទឹកប្រាក់ទទួល/បង់' : 'ទឹកប្រាក់ទទួល/បង់ Amount Receipt/Paid'
    if(data){
        if(data.total.remaining > 0){
             receipt_paid = setting.language=='English' ? 'Receipt Amount':  setting.language=='Khmer' ?  'ទឹកប្រាក់បានទទួលបាន' : 'ទឹកប្រាក់បានទទួលបាន Receipt Amount'
        }else if(data.total.remaining === 0){
            receipt_paid = setting.language=='English' ? 'Amount':  setting.language=='Khmer' ?  'ទឹកប្រាក់' : 'ទឹកប្រាក់ Amount'
        }
        else{
            receipt_paid = setting.language=='English' ? 'Paid Amount':  setting.language=='Khmer' ?  'ទឹកប្រាក់បានទូទាត់' : 'ទឹកប្រាក់បានទូទាត់ Amount Paid '
        }
      
    }

    // column
    let column_1  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Transaction': setting.language=='Khmer' ?  'ប្រតិបត្តិការ' : 'ប្រតិបត្តិការ  <br/> Transaction'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Supplier': setting.language=='Khmer' ?  'ទំនិញ' : ' ទំនិញ <br/> Supplier'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា <br/> Amount'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount':setting.language=='Khmer' ?  'រូបិយប័ណ្ណ' : 'រូបិយប័ណ្ណ <br/> Amount'}</th>`

    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
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
                                <td style="width: 200px;" >${data ? data.employee.name : ''}</td>
                                <td style="width: 170px;" class="text-bold">${setting.language=='English' ? 'Number': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Number'}</td>
                                <td>${data ? data.advanceSettlement.number : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Position': setting.language=='Khmer' ?  'តំណែង' : 'តំណែង Position'}</td>
                                <td ></td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td style="width: 200px;">${data ? dateFormat(data.advanceSettlement.settlement_date)  : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Segement': setting.language=='Khmer' ? 'ផ្នែក' : 'ផ្នែក Segment '}</td>
                                <td >${data ?  data.segment.name: ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Location': setting.language=='Khmer' ?  'ទីតាំង' : 'Location ទីតាំង'}</td>
                                <td style="width: 200px;">${data ? '' : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}</td>
                                <td colspan="3" >${data ? data.advanceSettlement.description: ''}</td>
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
                         </tr>
                     </thead>
                     <tbody>
                        ${
                           data != undefined ? rederListAdvanceSettlement(data.clearingTransactionGrouping,empty_td,setting.column,currency_d_base,currency_r_base  ) : empty_td 
                        }
                  
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Cash Advance':  setting.language=='Khmer' ?  'សក្ខីប័ត្រជំរះបុរេប្រទាន' : 'សក្ខីប័ត្រជំរះបុរេប្រទាន Cash Advance'}(${data ? data.cashAdvance.number : ''})</td>
                            <td   class="tright">${data ? currency_d_base +numberFormat(data.total.advancedAmount) + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                        <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Settled Amount':  setting.language=='Khmer' ?  'ចំនួនទឹកបានប្រាក់ទូទាត់' : 'ចំនួនទឹកបានប្រាក់ទូទាត់ Settled Amount'}</td>
                        <td   class="tright">${data ? currency_d_base + numberFormat(data.total.settledAmount) + currency_r_base : ''}</td>
                    </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${receipt_paid}</td>
                            <td   class="tright text-bold">${data ?  currency_d_base+ numberFormat(data.total.remaining): ''}</td>
                        </tr>

 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold text-center acc_header"  style="width:120px;">${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'លេខកូដ' : 'លេខកូដ Code'}</td>
                                <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                            </tr>
                            ${
                                data != undefined ?
                                    rederListAcountingSettelement(data.advanceSettlement.journal_entries, setting.language,currency_d_base,currency_r_base)
                                  :
                            `
                                <tr>
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
// Advance request
// ==============================
// ******************************
exports.AdvanceRequest = (data, setting,is_print) => {
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
                    :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/> ${setting.title.en.name}</h2>`
                    :  `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                  }
                   
                </div>
                <div style="margin-bottom:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'អ្នកស្នើសុំ' : 'អ្នកស្នើសុំ Name'}</td>
                                <td  style="width: 180px;">${data ? data.employee.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Number': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ Number'}</td>
                                <td>${data ? data.cashAdvance.advance_date : 'JV00000009'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Position': setting.language=='Khmer' ?  'តំណែង' : 'តំណែង Position'}</td>
                                <td> ${data ?   '' : ''} </td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td> ${data ?  dateFormat(data.cashAdvance.advance_date)  : '00-00-0000'}</td>
                                
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Segment'}</td>
                                <td> ${data ?   data.segment.name : ''} </td>
                                <td class="text-bold">${setting.language=='English' ? 'Business Unit': setting.language=='Khmer' ?  'អង្គភាពអាជីវកម្ម' : 'អង្គភាពអាជីវកម្ម Business Unit'}</td>
                                <td> ${data ?   data.location.name : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Project': setting.language=='Khmer' ?  'គម្រោង' : 'គម្រោង Project'}</td>
                                <td colspan="1">${data ?   data.project.name : ''} </td>
                                <td class="text-bold">${setting.language == 'English' ? 'Due Date': setting.language=='Khmer' ?  'ថ្ងៃផុតកំណត់' : 'ថ្ងៃផុតកំណត់ Due Date'}</td>
                                <td colspan="1">${data ? dateFormat(data.cashAdvance.expected_date): ''} </td>
                            </tr>
                            <tr>
                                <td colspan="3" class="tright">${setting.language=='English' ? 'Total':  setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                                <td class="tright text-bold" >${data ? currency_d_base+numberFormat(data.cashAdvance.request_amount)+currency_r_base: ''}</td>
                            </tr>
                  
                        </body>
                    </table>
                 </div>
                 <div style="margin-top:16px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td style="border-bottom: none;" class="text-bold">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}</td>
                            </tr>
                            <tr>
                                <td class="" style="height:100px; display: block;" >${data ? data.cashAdvance.purpose: ''}</td>
                            </tr>
                           
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


// function getSegment(){
//     settingsHandler
//     .getSeg(this.reimbursement.expenses[0].segment_uuid)
//     .then((res) => {
//     window.console.log(res.data.data,'segemnt')
// })
// let data_print= this.reimbursement;


// }


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
  if(form_id === 1){
    contents = this.AdvanceVourcher(data, setting,is_print)
  }else if(form_id === 3){
    toal_expensereimbures= 0
    contents = this.ReimbursememtVourcher(data, setting,is_print)
  }else if(form_id === 4){
    contents = this.AdvanaceSettlement(data, setting,is_print)
  }else if(form_id === 5){
    contents = this.AdvanceRequest(data, setting,is_print)
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
