exports.CommercialInvoice = (data, form_id, setting,is_print) => {
    window.console.log('data',data)
    window.console.log('form_id',form_id)
    window.console.log('setting',setting)
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let m_top = ""
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
        m_right = "margin-right:20px";
        m_top = "margin-top:8px";
    }

    if(setting.address.align == 'center'){
        center_text = "text-align:center !important";
    }else if(setting.address.align == 'left'){
        center_text = "text-align:left !important";
    }else{
        center_text = "text-align:right !important";
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
         <div class="">
             <div  style="display: flex; ${logo_postion}">
                 <div style="${m_left}; ${hide_logo}; ${m_right}">
                     <div class="logo" style="width: 97%;margin-left: -9px;">
                         <img src="${company_data.imgProfile ? company_data.imgProfile.thumb: ''}" style="margin-bottom: 4px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                     </div>
                 </div>
                 <div class=""  style="flex: 1;${is_header}">
                     <div style="${m_top}">
                        <h2 style="margin: 0px; ${center_text}; width: 100%;">${company_data.name}</h2>
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
             </div>
             <div>
                 <h2 style="text-align: center;margin-top: 14px; width: 100%;">${setting.title}</h2>
             </div>
                 
                 <div class="row" style="margin:0px !important">
                     <div class="col-7">
                         <p style="font-weight: bold; margin-bottom: 6px;" >${setting.language=='English' ? 'CUSTOMER INFO': setting.language=='Khmer' ? 'ព័ត៌មានអតិថិជន' : 'ព័ត៌មានអតិថិជន CUSTOMER INFO'}:</p>
                         <table>
                             <body>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                    <td>:</td>
                                    <td> ${data ? data.customer.name : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Project': setting.language=='Khmer' ? 'គម្រោង' : 'គម្រោង Project'}</td>
                                    <td>:</td>
                                    <td> ${data ? data.project.name ? data.project.name : '' : ''}</td>
                                </tr>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                    <td>:</td>
                                    <td> ${data ? data.billingAddress.name : ''} </td>
                                </tr>
                                <tr>
                                    <td style="width: 130px;">${setting.language=='English' ? 'Tel': setting.language=='Khmer' ?  'លេខទូរស័ព្ទ' : 'លេខទូរស័ព្ទ Tell'}</td>
                                    <td>:</td>
                                    <td> ${data ? data.customer.contactAddress.phoneNumber: ''}</td>
                                </tr>
                             </body>
                         </table>
                     </div>
                     <div class="col-5">
                         <table>
                             <body>
                                 <tr>
                                     <td style="width: 120px;">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ Nº'}</td>
                                     <td>:</td>
                                     <td> ${data ? data.referenceNo: ''}</td>
                                 </tr>
                                 <tr>
                                     <td style="width: 120px;">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'} </td>
                                     <td>:</td>
                                     <td> ${data ? data.transactionDate : ''}</td>
                                 </tr>
                                 <tr>
                                     <td style="width: 120px;">${setting.language=='English' ? 'Due Date':setting.language=='Khmer' ?  'ថ្ងៃផុតកំណត់' : 'ថ្ងៃផុតកំណត់ Due Date'}  </td>
                                     <td>:</td>
                                     <td> ${data ? data.dueDate : ''}</td>
                                 </tr>
                             </body>
                         </table>
                     </div>
                 </div>
                 <p style="font-weight: bold; margin-bottom: 2px;" >${setting.language=='English' ? 'VATIN':  setting.language=='Khmer' ? 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ': 'លេខអត្តសញ្ញាណកម្មសារពើពន្ធ (VATIN)' }:</p>
                 <p style="font-weight: bold; margin-bottom: 6px;margin-left:30px" >${setting.language=='English' ? '(If any)':  setting.language=='Khmer' ? '(ប្រសិនបើមាន)': '(ប្រសិនបើមាន / If any )' }</p>
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
                         <tr>
                             <td class="text-left" colspan="${ show_column_num >6 ? show_column_num - 5 : show_column_num-3 }" rowspan="5"> ${data ? data.customer.noteOnInvoice : ''}</td>
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Sub Total':setting.language=='Khmer' ? 'សរុបរង' : 'សរុបរង Sub Total'}</td>
                             <td class="tright">${data != undefined ?  currency_d+kendo.toString(data.subTotal, data.decimalFormat)+currency_r: ''}</td>
                         </tr>
                         <tr>
                            
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ? 'ការបញ្ចុះតម្លៃ' : 'ការបញ្ចុះតម្លៃ Discount'} </td>
                             <td class="tright"> ${data != undefined ? currency_d+kendo.toString(data.discountTotal, data.decimalFormat)+currency_r: ''}</td>
                         </tr>
                         <tr>
                             
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Total': setting.language=='Khmer' ?  'សរុប' : 'សរុប Total'} </td>
                             <td class="tright"> ${data != undefined ? currency_d+kendo.toString(data.total, data.decimalFormat)+currency_r : ''}</td>
                         </tr>
                         <tr>
                             
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Deposit': setting.language=='Khmer' ? 'ការដាក់ប្រាក់': 'ការដាក់ប្រាក់ Deposit'} </td>
                             <td class="tright">${data != undefined ? currency_d+kendo.toString(data.depositAmount, data.decimalFormat)+currency_r: ''}</td>
                         </tr>
                         <tr>
                             
                             <td colspan="${ show_column_num <=6 ? 2 : 4}" class="tright text-bold">${setting.language=='English' ? 'Amount Due':  setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់ដែលត្រូវសង' : 'ចំនួនទឹកប្រាក់ដែលត្រូវសង Amount Due'}</td>
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
                 <div style="margin-top:50px"> 
                     <div class="row" style="margin:0px !important">
                         <div class="col-6"> 
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p class="text-bold text-center">${setting.language=='English' ? "Customer's Signature & Name": setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ <br/> Customer's Signature & Name"}</p>
                         </div>
                         <div class="col-6">
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p class="text-bold text-center">${setting.language=='English' ? "Seller's Signature & Name":setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់ <br/> Seller's Signature & Name"}</p>
                         </div>
                     </div>
                 </div>
                 <div style="margin-top: 40px;">
                     <p>${setting.language=='English' ? '<span  style="font-weight: bold;">Note:</span> Original invoice for customer, copied invoice for seller':setting.language=='Khmer' ?  ' <span  style="font-weight: bold;">សម្គាល់:</span> វិក័យប័ត្រមានភាពតឹងរឹងសម្រាប់អតិថិជនដែលបានចម្លងវិក្កយបត្រសម្រាប់អ្នកលក់': '<span  style="font-weight: bold;">សម្គាល់:</span> វិក័យប័ត្រមានភាពតឹងរឹងសម្រាប់អតិថិជនដែលបានចម្លងវិក្កយបត្រសម្រាប់អ្នកលក់ <br/>  <span  style="font-weight: bold;">Note:</span> Original invoice for customer, copied invoice for seller'}</p>
                 </div>
               
         </div>
       ${Footer}
     `;
}

// Banhji Invoice
exports.BanhjiInvoice = (data, form_id, setting,is_print) => {
    window.console.log('data',data)
    window.console.log('form_id',form_id)
    window.console.log('setting',setting)
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let m_top = ""
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
        m_right = "margin-right:20px";
        m_top = "margin-top: 8px";
    }

    if(setting.address.align == 'center'){
        center_text = "text-align:center !important";
    }else if(setting.address.align == 'left'){
        center_text = "text-align:left !important";
    }else{
        center_text = "text-align:right !important";
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
         <div class="">
             <div  style="display: flex; ${logo_postion}">
                 <div style="${m_left}; ${hide_logo}; ${m_right}">
                     <div class="logo" style="width: 97%;margin-left: -9px;">
                         <img src="${company_data.imgProfile ? company_data.imgProfile.thumb: ''}" style="margin-bottom: 10px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                     </div>
                 </div>
                 <div  style="flex: 1; ${is_header} width:100%;">
                     <div style="${m_top}">
                        <h2 style="margin: 0px; ${center_text}; width: 100%;">${company_data ? company_data.name : ''}</h2>
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
             </div>
       
             <div  style="background: #000;display:flex; justify-content:space-between; align-items: center; color:#fff;padding:12px; height:90px; margin-top: 20px;">
                <p class="text-bold" style="flex:1;margin-bottom:0px !important;">${setting.language=='English' ? 'INVOICE': setting.language=='Khmer' ?  'វិក័យប័ត្រ' : 'វិក័យប័ត្រ  INVOICE'}</p>
                <div style= "flex: 1">
                    <p class="" style="margin-bottom:6px !important;">${setting.language=='English' ? 'INVOICE Nº': setting.language=='Khmer' ?  'លេខ​វិ​ក័​យ​ប័ត្រ' : 'លេខ​វិ​ក័​យ​ប័ត្រ INVOICE Nº'}: 17-02-2021</p>
                    <p class="" style="margin-bottom:0px !important;">${setting.language=='English' ? 'DATE': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ DATE'}: 17-02-2021</p>
                </div>
            </div>
            <div class="row" style="margin:0px !important">
                <div class="col-7" style="padding-left:0px !important; padding-right:6px !important;padding-bottom:0px !important;  padding-top:6px !important;">
                    <table class="items_tb_border">
                        <body>
                                 <tr>
                                     <td style="width: 180px;">${setting.language=='English' ? 'Customer': setting.language=='Khmer' ?  'អតិថិជន' : 'អតិថិជន (Customer)'}</td>
                                     <td>${data ? data.customer.contactPerson.length !=0 ? data.customer.contactPerson[0].name : ''  : ''}</td>
                                 </tr>
                                 <tr>
                                     <td style="width: 180px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                     <td> ${data ? data.billingAddress.name : ''}</td>
                                 </tr>
                             </body>
                         </table>
                     </div>
                     <div class="col-5"  style="padding-left:6px !important; padding-right:0px !important;padding-bottom:0px !important; padding-top:6px !important;">
                        <table class="items_tb_border">
                            <body>
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
                             <td colspan="${ show_column_num-1}" class="tright text-bold">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុប (បូកបញ្ចូលទាំងអាករ) ' : 'សរុបរួម Grand Total (Vat Inclusive) '}</td>
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
                 <div style="margin-top:10px"> 
                     <div class="row" style="margin:0px !important">
                         <div class="col-7"> 
                            <p style="margin-bottom: 4px !important; " > កំណត់សម្គាល់៖ </p>
                            <ul>
                                <li>
                                    <span>អ្នកអាចបង់ប្រាក់ផ្ទាល់នៅនៅការិយាល័យបង់ប្រាក់របស់ក្រុមហ៊ុន ឬតាមភ្នាក់ងាររបស់ស្ថាប័នហិរញ្ញវត្ថុដូចមានរាយនាមខាងក្រោម។ ក្នុងករណីអ្នកត្រូវការផ្ទេសាច់ប្រាក់តាមធនាគារ សូមផ្ទេរមកកាន់គណនី៖</span>
                                <ul>
                                        <li>abca</li>
                                        <li>bbb</li>
                                    </ul>
                                </li>
                            </ul>
                         </div>
                         <div class="col-5">
                            <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                            <p class="text-bold text-center" style="margin-bottom: 70px;" >${setting.language=='English' ? "Customer's Signature & Name": setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកទិញ <br/> Customer's Signature & Name"}</p>
                             <div style="margin:10px 24px;border-bottom: 1px solid #000;"></div>
                             <p class="text-bold text-center">${setting.language=='English' ? "Seller's Signature & Name":setting.language=='Khmer' ?  'ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់' : "ហត្ថលេខា និងឈ្មោះរបស់អ្នកលក់ <br/> Seller's Signature & Name"}</p>
                         </div>
                     </div>
                 </div>
         </div>
       ${Footer}
     `;
}
