

const { dataStore } = require("@/observable/store");
var company_data = dataStore.company
// const { getFormSetting } = require("@/scripts/settingsHandler.js")
const kendo =  require("@progress/kendo-ui");
const  {vuetify} = require('./vuetify.js')
// const settingsHandler = require("@/scripts/settingsHandler");

const dateFormat = (date) =>{
    return kendo.toString(new Date(date), company_data.dateFormat)
}
var table_header = 'capitalize';
var marginX = 0.75;
// const numberFormat = (value) =>{
//     return kendo.toString(value, 'n2')
// }
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
                    @font-face {
                        font-family: 'Niradei-Medium';
                        font-weight: 600;
                        font-display: swap;
                        font-style: normal;
                        src: url('https://s3.ap-southeast-1.amazonaws.com/images.banhji/font/Niradei-Medium.woff2') format('woff2');
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
                        h4,h2,h1,h5,h3,h3{
                            font-family: 'Niradei-Bold' !important;
                            font-weight: 700;
                        }
                        td{
                     
                            font-family: 'Niradei-Regular';
                        }
                        table,tr,td{
                            border-collapse: collapse !important; 
                            font-family: 'Niradei-Regular';
                        }
                        span,p{
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
                    .font_regulary {
                        font-family: 'Niradei-Regular' !important;
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
                        font-family: 'Niradei-Bold' !important;
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
                    .items_tb_border_no{
                        border: none;
                        padding: 6px;
                        height: 32px;
                    }
                    .items_tb_border_no th{
                        border: none !important;
                        text-align: left !important;
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
                    .font_regular{
                        font-family: 'Niradei-Regular';
                    }
                    .line_30{
                        line-height: 30px;
                    }
                </style>
            </head>
        <body>
`;
}
const Footer = `</body></html>`

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
function rederListAcounting(data,language,currency_d_base,currency_r_base,one,two){
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${ en.account.name }</td>
                ${
                    one ? `<td class= " ">${en.description}</td>` : ''
                }
   
                <td class="tright">${en.amount >=0 ?  currency_d_base+ Number(en.amount).toLocaleString()    +currency_r_base : '0'}</td>
                <td class="tright">${en.amount<0  ?  currency_d_base+  Number(en.amount*(-1)).toLocaleString()  + currency_r_base : '0'}</td>
                ${
                    two ? `<td class= " ">${rendClasslist(en)}</td>` : ''
                }
            
            </tr>
        `;
     
  
    })
    return items;
}

exports.JournalVourcher = (data, setting,is_print) => {
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
                            <h2 style="margin: 0px; ${center_text}; width: 100%;" class="line_30" >${company_data.name}</h2>
                            <table  style="width:100%; text-align: left; ${ address_center_log_left && setting.logo.position =='right' ? 'text-align: right;': ''}">
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
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Journal Vourcher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> JV No.'}</td>
                                <td style="widht:120px;">${data ? data.journal.number : 'JlV00000009'}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ?  dateFormat(data.journal.journal_date)  : '00-00-0000'}</td>
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
                                <td class="text-bold">${setting.language=='English' ? 'Type': setting.language=='Khmer' ?  'ប្រភេទ' : 'ប្រភេទ Type'}</td>
                                <td colspan="1"></td>
                            </tr>
                            <tr>
                                <td  colspan="4" style="width: 180px;"><span class="text-bold">${setting.language=='English' ? 'Transaction Type': setting.language=='Khmer' ? 'ប្រភេទប្រតិបត្តិការ' : 'ប្រភេទប្រតិបត្តិការ Transaction Type'}</span>: ${data ?   data.journal.journal_type : 'Journal,...'} </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="width: 180px;"><span class="text-bold">${setting.language=='English' ? 'Purpose': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpose'}:</span> ${data ? data.journal.description: ''}</td>
                                
                            </tr>
                        </body>
                    </table>
                 </div>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
    
                            <tr>
                                <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Code': setting.language=='Khmer' ? 'លេខកូដ' : 'លេខកូដ Code'}</td>
                                <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី  Account'}</td>
                                ${
                                    setting.column.one ?
                                    ` 
                                        <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</td>
                                    ` : 
                                    ''
                                }

                                <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                                ${
                                    setting.column.two ?
                                    ` 
                                        <td class="text-bold text-center acc_header" >${setting.language=='English' ? 'Class': setting.language=='Khmer' ?  'ថ្នាក់' : 'ថ្នាក់ Class'}</td>
                                    ` : 
                                    ''
                                }

                            </tr>
                            ${data != undefined ? rederListAcounting(data.journalEntries, setting.language,currency_d_base,currency_r_base,setting.column.one,setting.column.two) : 
                            `
                                <tr>
                                    <td></td>
                                    <td></td>
                                    ${
                                        setting.column.one ? ` <td></td>`: ''
                                    }
                                   
                                    <td></td>
                                    <td></td>
                                    ${
                                        setting.column.two ? ` <td></td>`: ''
                                    }
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    ${
                                        setting.column.one ? ` <td></td>`: ''
                                    }
                                   
                                    <td></td>
                                    <td></td>
                                    ${
                                        setting.column.two ? ` <td></td>`: ''
                                    }
                                </tr>
                            ` }
                            <tr>
                                <td class="tright"> ${setting.language=='English' ? 'Currency': setting.language=='Khmer' ? 'រូបិយប័ណ្ណ' : 'រូបិយប័ណ្ណ Currency'} ${ !setting.column.one ?  `:${ data ?  data.currency.code: ''}`: ''}</td>
                                ${
                                   setting.column.one ?  ` <td>${ data ?  data.currency.code: ''}</td>`: ''
                                }
   
                                <td class="text-bold" colspan="${setting.column.one ? 1: 0 }" style="text-align:right">${setting.language=='English' ? 'Total':  setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'}</td>
                                <td class="tright text-bold" >${data ? currency_d_base+ Number(data.dr).toLocaleString(data.dr)  +currency_r_base: '00'}</td>
                                <td  class="tright text-bold" >${data ?  currency_d_base+ Number( data.cr).toLocaleString( data.cr) +currency_r_base : '00'}</td>
                                ${
                                    setting.column.two ? `<td></td>`: ''
                                }
                           
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

//  Find me here
// =============
// Cash Reconciliation
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

exports.CashReconciliation = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let logo_align= ''
    let address_center_log_left = ""
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';
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
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Currency': setting.language=='Khmer' ?  'រូបិយប័ណ្ណ' : ' រូបិយប័ណ្ណ <br/> Item'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Note': setting.language=='Khmer' ?  'កំណត់ត្រា' : 'កំណត់ត្រា<br/> Note'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Unit':setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា<br/> QTY'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់ <br/> Amount'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Rate': setting.language=='Khmer' ?  'អត្រា' : 'អត្រា  <br/> Rate'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Exchange Amount': setting.language=='Khmer' ?  'អត្រាប្តូរប្រាក់' : 'អត្រាប្តូរប្រាក់<br/>Exchange Amount'}</th>`
    let column_9 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Remark': setting.language=='Khmer' ?  'ចំណាំ' : 'ចំណាំ<br/> Remark'}</th>`

    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                        ${setting.column.nine ? '<td></td>': ""}

                    </tr>` 
    let show_column_num = 0;
    for (const property in setting.column) {
           window.console.log(setting.column[property])
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
                            <h2 style="margin: 0px; ${center_text}; width: 100%;" class="line_30">${company_data.name}</h2>
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
                    ${address_center_log_left ? `<div style="flex:1;${hide_logo}"></div>` : ''}
                </div>
                <div  style="background:${setting.color.background2};display:flex; justify-content:space-between; align-items: center; padding:12px; height:90px; margin-top: 12px;">
                    <h2 class="text-bold" style="flex:1;margin-bottom:0px !important;font-size: 26px; line-height: 28px; color:${setting.color.color2} !important;">${setting.language=='English' ? setting.title.en.name : setting.language=='Khmer' ?  setting.title.kh.name : setting.title.kh.name+' '+ setting.title.en.name}</h2>
                    <div style= "flex: 1; padding-left: 30px; padding-top: 12px;">
                        <p class="" style="margin-bottom:6px !important; line-height:20px; color:${setting.color.color2} !important; ">${setting.language=='English' ? 'INVOICE Nº': setting.language=='Khmer' ?  'លេខ​វិ​ក័​យ​ប័ត្រ' : 'លេខ​វិ​ក័​យ​ប័ត្រ INVOICE Nº'}: ${data ? data.referenceNo: ''}</p>
                        <p class="" style="margin-bottom:6px !important; line-height:20px; color:${setting.color.color2} !important; ">${setting.language=='English' ? 'DATE': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ DATE'}:   </p>
                        ${
                            setting.show_employee ? 
                            `
                                <p class="" style="margin-bottom:0px !important;">${setting.language=='English' ? 'SALE REP': setting.language=='Khmer' ? 'អ្នកលក់' : 'អ្នកលក់ SALE REP'}:  ${data? data.employee.name: ''} </p>
                            `: ''
                        }
                    </div>
                </div>
                <div style="margin-bottom:14px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td style="width:140px;">${data ? data.supplier.name : ''}</td>
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
                                <td class="text-bold">${setting.language=='English' ? 'Acouunt': setting.language=='Khmer' ?  'គណនី' : 'គណនី Acouunt'}</td>
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
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLines,empty_td,setting.column,currency_d_base,currency_r_base  ) : empty_td }
                         <tr>
                             <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Total Actual Cash Count':  setting.language=='Khmer' ?  'ចំនួនសាច់ប្រាក់ជាក់ស្តែងសរុប' : 'ចំនួនសាច់ប្រាក់ជាក់ស្តែងសរុប Total Actual Cash Count'}</td>
                             <td class="tright">${data ? currency_d_base + kendo.toString(data.discountTotal, data.decimalFormat)  + currency_r_base : ''}</td>
                         </tr>
                        <tr>
                            <td class="tright text-bold " colspan="${show_column_num-1}">${setting.language=='English' ? 'Beginning Balance':  setting.language=='Khmer' ?  'សមតុល្យចាប់ពីផ្តើម' : 'សមតុល្យចាប់ពីផ្តើម Beginning Balance'}</td>
                            <td  class="tright">${data ? currency_d_base + kendo.toString(data.subTotal, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright " colspan="${show_column_num-1}">${setting.language=='English' ? 'Cash In':  setting.language=='Khmer' ?  'សាច់ប្រាក់ចូល' : 'សាច់ប្រាក់ចូល  Cash In'}</td>
                            <td  class="tright">${data ? currency_d_base + kendo.toString(data.totalTaxAmount, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright" colspan="${show_column_num-1}">${setting.language=='English' ? 'Cash Out':  setting.language=='Khmer' ?  'រាក់​ចេញ' : 'រាក់​ចេញ Cash Out'}</td>
                            <td class="tright">${data ? currency_d_base + kendo.toString(data.total, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright text-bold" colspan="${show_column_num-1}">${setting.language=='English' ? 'Ending Balance':  setting.language=='Khmer' ?  'ការបញ្ចប់តុល្យភាព' : 'ការបញ្ចប់តុល្យភាព Ending Balance'}</td>
                            <td class="tright">${data ? currency_d_base + kendo.toString(data.total, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
                        <tr>
                            <td class="tright" colspan="${show_column_num-1}">${setting.language=='English' ? 'Variance':  setting.language=='Khmer' ?  'គម្លាត' : 'គម្លាត Variance'}</td>
                            <td class="tright">${data ? currency_d_base + kendo.toString(data.total, data.decimalFormat)  + currency_r_base : ''}</td>
                        </tr>
 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
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




// Ban reconciliation form

exports.BankReconciliation = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let logo_align= ''
    let address_center_log_left = ""
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';
    let cash_out =   setting.language=='English' ? 'Cash Out': setting.language=='Khmer' ? 'សាច់ប្រាក់​ចេញ' : 'សាច់ប្រាក់​ចេញ Cash Out';
    let cash_in =   setting.language=='English' ? 'Cash In': setting.language=='Khmer' ? 'សាច់ប្រាក់ចូល' : 'សាច់ប្រាក់ចូល  Cash In';
    let transaction =   setting.language=='English' ? 'Transaction': setting.language=='Khmer' ? 'ប្រតិបត្តិការ' : 'ប្រតិបត្តិការ  Transaction';
    let transactions =   setting.language=='English' ? 'Transactions': setting.language=='Khmer' ? 'ប្រតិបត្តិការ' : 'ប្រតិបត្តិការ Transactions';
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    if(setting.table_header == 1){  
        table_header = 'uppercase'
    }else{
        table_header = 'capitalize'
    }
    marginX = setting.margin/100;
    styles.fontSize = setting.fontSize;
    styles.headerFontSize = setting.headerFontSize;

    window.console.log(setting ,'Setting')

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
    // let currency_d_base = ''
    // let currency_r_base = ''
    // if(data){
    //     currency_d_base =  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'$' : ''
    //     currency_r_base =  data.currency.code !== 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'៛'  : ''
    // }
    let count_cast_in= 0
    let amount_cash_in = 0
    let amount_cash_out = 0
    let count_cahs_out = 0
    if(data){
        data.entries.forEach(item => {
            if(item.amount >= 0){
                count_cast_in =count_cast_in+1
                amount_cash_in = amount_cash_in+ item.amount
            }else{
                count_cahs_out= amount_cash_in+1
                amount_cash_out= amount_cash_out+item.amount
            }
        })

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
                            <h2 style="margin: 0px; ${center_text}; width: 100%;" class="line_30">${company_data.name}</h2>
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
                    ${address_center_log_left ? `<div style="flex:1;${hide_logo}"></div>` : ''}
                </div>
                <div style="">
                    ${
                    setting.title.en.status && !setting.title.kh.status ? 
                        `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.en.name}</h2>`
                    :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/>${setting.title.en.name}</h2>`
                    :  `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                    }
                </div>
                <div style="margin-bottom:14px" >
                  <p class="text-center font_regular">${setting.language=='English' ? 'As of': setting.language=='Khmer' ?  'ដូច​ពេល​ឥឡូវ' : 'ដូច​ពេល​ឥឡូវ As of'}: <span class="text-bold"> ${data ? dateFormat(data.ending_balance_date) : '00-00-000'} </span> </p>
                  <p class="text-center">${setting.language=='English' ? 'ACCOUNT': setting.language=='Khmer' ?  'គណនី' : 'គណនី ACCOUNT'}: <span class="text-bold">${setting.language=='English' ? data ? data.account.number+' - ' +data.account.name: '112202' : setting.language=='Khmer' ? data ? data.account.number+' - ' +data.account.local_name:'112202'  : data ? data.account.number+' - ' +data.account.local_name +'-'+data.account.name:'112202'  }</span> </p>
                  <p class="tright text-bold">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  Nº'}: ${data ? data.number: 'RC00002'}</p>
                    <table class="items_tb_border_no">
                        <body>
                            <tr>
                                <td class="text-bold" style="padding: 6px 2px;">${setting.language=='English' ? 'Beginning Balance From Records': setting.language=='Khmer' ?  'ចាប់ផ្តើមតុល្យភាពពីកំណត់ត្រា' : 'ចាប់ផ្តើមតុល្យភាពពីកំណត់ត្រា <br/>  Beginning Balance From Records'}</td>
                                <td class="tright text-bold">${data ? Number(data.opening_balance).toLocaleString() : '--'}</td>

                            </tr>
                            <tr>
                                <td class="" style="padding: 6px 0 6px 40px;"><span class="text-bold">${setting.language=='English' ? 'Add': setting.language=='Khmer' ?  'បន្ថែម' : 'បន្ថែម  Add'}: </span> ${cash_in} (${count_cast_in}   ${count_cast_in <=1 ? transaction : transactions} )</td>
                                <td class="tright">${amount_cash_in}</td
                            </tr>
                            <tr>
                                <td class="" style="padding: 6px 0 6px 40px;"><span class="text-bold">${setting.language=='English' ? 'Less': setting.language=='Khmer' ?  'តិច' : 'តិច  Less'}:</span> ${cash_out} ((${count_cahs_out}   ${count_cahs_out <=1 ? transaction :transactions } ) </td>
                                <td class="tright">${amount_cash_out}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="padding: 6px 2px">${setting.language=='English' ? 'Ending Balance From Records': setting.language=='Khmer' ? 'ការបញ្ចប់សមតុល្យពីកំណត់ត្រា' : 'ការបញ្ចប់សមតុល្យពីកំណត់ត្រា <br/> Ending Balance From Records'}:</td>
                                <td class="text-bold tright">${data ?  Number(data.ending_balance).toLocaleString(): '--'}</td>

                            </tr>
                            <tr>
                                <td class="text-bold" style="padding: 6px 2px">${setting.language=='English' ? 'Ending Bank Balance From bank statement': setting.language=='Khmer' ?  'ការបញ្ចប់សមតុល្យធនាគារពីរបាយការណ៍ធនាគារ' : 'ការបញ្ចប់សមតុល្យធនាគារពីរបាយការណ៍ធនាគារ <br/> Ending Bank Balance From bank statement'}:</td>
                                <td class="text-bold tright"> ${data ? Number(data.reportingEndingBalance).toLocaleString(): '--'}</td>
                            </tr>
                            <tr>
                                <td class="" style="padding: 6px 0 6px 40px;"><span>${setting.language=='English' ? 'Variance':  setting.language=='Khmer' ?  'គម្លាត' : 'គម្លាត Variance'}:</td>
                                <td class="tright">${data ? Number(data.variance_amount).toLocaleString() : '--'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="padding: 6px 2px">${setting.language=='English' ? 'Un-Reconciled Transactions': setting.language=='Khmer' ?  'ប្រតិបត្តិការដែលមិនត្រឺមត្រូវ' : 'ប្រតិបត្តិការដែលមិនត្រឺមត្រូវ <br/> Un-Reconciled Transactions'}:</td>
                                <td class="text-bold tright"></td>
                            </tr>
                    
                        </body>
                    </table>
                 </div>
                
                 <div style="margin-top:12px" >
                 </div>
                 ${
                     setting.signature.option == 1 ?
                    `
                        <table style="margin-top: 20px;" class="items_tb_border_no">
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
                     <table style="margin-top: 12px;" class="items_tb_border_no">
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
                                        `<td style="padding: 6px;">
                                            <span>${position_text}:</span>
                                        </td>`
                                        
                                    :
                                    ''
                                }
        
                                ${
                                    setting.signature.reviewed_by.status  ? 
                                        `<td style="padding: 6px;">
                                            <span>${position_text}:</span>
                                        </td>`
                                    :
                                    ''
                                }
                                ${
                                    setting.signature.verified_by.status  ? 
                                        `<td style="padding: 6px;">
                                            <span>${position_text}:</span>
                                        </td>`
                                    :
                                    ''
                                }
                                ${
                                    setting.signature.approved_by.status  ? 
                                        `<td style="padding: 6px;">
                                            <span>${position_text}:</span>
                                        </td>`
                                    :
                                    ''
                                }
                                ${
                                    setting.signature.recorded_by.status  ? 
                                        `<td style="padding: 6px;">
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
                                        `<td style="padding: 6px;">
                                            <span>${date}:</span>
                                        </td>`
                                    
                                    :
                                    ''
                                }

                                ${
                                    setting.signature.reviewed_by.status  ? 
                                        `<td style="padding: 6px;">
                                            <span>${date}:</span>
                                        </td>`
                                    :
                                    ''
                                }
                                ${
                                    setting.signature.verified_by.status  ? 
                                        `<td style="padding: 6px;">
                                            <span>${date}:</span>
                                        </td>`
                                    :
                                    ''
                                }
                                ${
                                    setting.signature.approved_by.status  ? 
                                        `<td style="padding: 6px;">
                                            <span>${date}:</span>
                                        </td>`
                                    :
                                    ''
                                }
                                ${
                                    setting.signature.recorded_by.status  ? 
                                        `<td style="padding: 6px;">
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
// Bank Transaction
// Bank Transaction

function rederListAcountingCashTransaction(data,language,currency_d_base,currency_r_base){
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${en.account.name }</td>
                <td class= " ">${en.description}</td>
                <td class="tright">${en.amount >=0 ?  currency_d_base+ Number(en.amount).toLocaleString()    +currency_r_base : '0'}</td>
                <td class="tright">${en.amount<0  ?  currency_d_base+  Number(en.amount*(-1)).toLocaleString()  + currency_r_base : '0'}</td>
            
            </tr>
        `;
     
  
    })
    return items;
}
 const renderListFrom = (data,language,currency_d_base,currency_r_base)=>{
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.name }</td>
                <td class= " ">${en.description}</td>
                <td style="width:80px;">${en.ref_number}</td>
                <td class="tright">${en.amount<0  ?  currency_d_base+  Number(en.amount*(-1)).toLocaleString()  + currency_r_base : currency_d_base+Number(en.amount).toLocaleString()+currency_r_base }</td>
            
            </tr>
        `;
     
  
    })
    return items;
 }
 const renderListTo= (data,language,currency_d_base,currency_r_base)=>{
    var items = ""
    data.forEach((en) => {

            items = items + `
            <tr>
                <td class="tleft">${en.account.name }</td>
                <td class= " ">${en.description}</td>
                <td style="width:80px;">${en.ref_number}</td>
                <td class="tright">${en.amount<0  ?  currency_d_base+  Number(en.amount*(-1)).toLocaleString()  + currency_r_base : currency_d_base+ Number(en.amount).toLocaleString()+currency_r_base }</td>
            
            </tr>
        `;
     
  
    })
    return items;
 }
exports.BankTransaction = (data, setting,is_print) => {
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let logo_align= ''
    let address_center_log_left = ""
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    let position_text =  setting.language=='English' ? 'Position': setting.language=='Khmer' ? 'តួនាទី' : 'តួនាទី <br/> Position';
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
    let trnsactionType = (type)=>{
        let txt_type = ""
        if(type == "deposit"){
            txt_type = setting.language=='English' ? 'Deposit': setting.language=='Khmer' ?  'ដាក់ប្រាក់' : 'ដាក់ប្រាក់ Withdraw'
        }else if(type == "transfer"){
            txt_type = setting.language=='English' ? 'Transfer': setting.language=='Khmer' ?  'ផ្ទេរប្រាក់' : 'ផ្ទេរប្រាក់ Transfer'
        }else{
            txt_type = setting.language=='English' ? 'Withdraw': setting.language=='Khmer' ?  'ដកប្រាក់' : 'ដកប្រាក់ Withdraw'
        }
        return txt_type;
    }
    // column
    let column_1  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Code': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</th>`
    // let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'ផ្នែកអាជីវកម្ម' : 'ផ្នែកអាជីវកម្ម Segment'}</th>`

    // let empty_td  =  `<tr> 
    //                     ${setting.column.one ? '<td></td>': ""}
    //                     ${setting.column.two ? '<td></td>': ""}
    //                     ${setting.column.three ? '<td></td>': ""}
    //                     ${setting.column.four ? '<td></td>': ""}
    //                     ${setting.column.five ? '<td></td>': ""}
    //                     ${setting.column.six ? '<td></td>': ""}
    //                     ${setting.column.eight ? '<td></td>': ""}
    

    //                 </tr>` 

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
                            <h2 style="margin: 0px; ${center_text}; width: 100%;" class="line_30">${company_data.name}</h2>
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
                  :  setting.title.en.status && setting.title.kh.status ?   ` <h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name} <br/> ${setting.title.en.name} </h2>`
                  :  `<h2 style="text-align: center;margin-top: 20px;width: 100%;line-height:32px;">${setting.title.kh.name}</h2>`
                }
                 
              </div>
                <div style="margin-bottom:0px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold">${setting.language=='English' ? 'Type': setting.language=='Khmer' ?  'ប្រភេទ' : 'ប្រភេទ Type'}</td>
                                <td style="width:140px;text-transform:uppercase;">${ data?  trnsactionType(data.journal.transaction_type): ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Voucher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Voucher No.'}</td>
                                <td>${data ?  data.journal.number : '00011112'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" >${setting.language=='English' ? 'Memo': setting.language=='Khmer' ?  'អនុស្សរណៈ' : 'អនុស្សរណៈ Memo'}</td>
                                <td style="width:140px;">${data ? data.journal.description : ''}</td>
                                <td class="text-bold"> ${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ? dateFormat(data.journal.journal_date)  : ''}</td>
                            </tr>
                        </body>
                    </table>
                 </div>
                 <div style="display:flex;">
                    <div style="margin-bottom:6px; margin-right:4px; flex:1" >
                        <table class="items_tb_border" >
                            <body>
                                <tr>
                                    <td colspan="4" class="text-center text-bold acc_header">${setting.language=='English' ? 'From': setting.language=='Khmer' ?  'ចាប់ពី' : 'ចាប់ពី From'}</td>
                                </tr>
                                <tr>
                                    <td class="acc_header">${setting.language=='English'  ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី <br/> Account'}</td>
                                    <td class="acc_header">${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</td>
                                    <td class="acc_header">${setting.language=='English'  ? 'Ref No.': setting.language=='Khmer' ?  'លេខឯកសារយោងរ' : 'លេខឯកសារយោងរ<br/> Ref No.'}</td>
                                    <td class="acc_header">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</td>
                                </tr>
                                ${ data ? renderListFrom(data.fromAccountEntries,setting.language,currency_d_base,currency_r_base ) : 
                                    `  
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>`
                                }
                             
                            </body>
                        </table>
                    </div>
                    <div style="margin-bottom:6px; margin-left: 4px; flex:1;" >
                        <table class="items_tb_border">
                            <body>
                                <tr>
                                    <td colspan="4" class="text-center text-bold acc_header">${setting.language=='English' ? 'To': setting.language=='Khmer' ?  'ទៅដល់' : 'ទៅដល់ From'}</td>
                                </tr>
                                <tr>
                                    <td class="acc_header">${setting.language=='English'  ? 'Account': setting.language=='Khmer' ?  'គណនី' : 'គណនី <br/> Account'}</td>
                                    <td class="acc_header" >${setting.language=='English' ? 'Description': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា  <br/> Description'}</td>
                                    <td class="acc_header" >${setting.language=='English'  ? 'Ref No.': setting.language=='Khmer' ?  'លេខឯកសារយោងរ' : 'លេខឯកសារយោងរ<br/> Ref No.'}</td>
                                    <td class="acc_header">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</td>
                                </tr>
                                ${ data ? renderListTo(data.toAccountEntries,setting.language,currency_d_base,currency_r_base ) : 
                                    `  
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>`
                                }
                            </body>
                        </table>
                    </div>
                </div>
                 <table class="items" style="margin-top:0px !important;">
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
                        ${data != undefined ? rederListAcountingCashTransaction(data.journal.journal_entries,setting.language,currency_d_base,currency_r_base  ) : `
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                            </tr>
                        ` }
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
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



exports.print = (data, form_id, setting) => {
  company_data = dataStore.company
  styles.fontSize = setting.fontSize;
  styles.headerFontSize = setting.headerFontSize;
  let  is_print = true;
  var contents = "";
  if(form_id === 1){
    contents = this.JournalVourcher(data, setting,is_print)
  }else if(form_id === 2){
    contents = this.CashReconciliation(data, setting,is_print)
  }else if ( form_id == 3){
      contents = this.BankReconciliation(data, setting,is_print)
  }else if (form_id == 4){
      contents = this.BankTransaction(data, setting, is_print)
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
  }, 400);
};
